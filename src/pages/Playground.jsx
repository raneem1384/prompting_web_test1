import { useState, useRef } from 'react';
import { FlaskConical, Sparkles, Send, RotateCcw, Copy, Check, AlertCircle, TrendingUp, Lightbulb, CheckCircle2 } from 'lucide-react';
import './Playground.css';

/* ─── AI Prompt Coach Logic ─────────────────────────────── */
const patterns = {
    role: /\b(you are|act as|behave as|pretend (you are|to be)|imagine you('re| are)|as an|as a)\b/i,
    task: /\b(write|create|generate|explain|summarize|list|describe|analyze|compare|give me|provide|draft|compose|suggest|design|build|help me|translate|convert)\b/i,
    context: /\b(for|because|since|given that|the (user|audience|reader|person)|this is for|background|context|situation|scenario|purpose|goal|objective|use case)\b/i,
    format: /\b(format|bullet|numbered|table|list|paragraph|json|xml|markdown|step.by.step|in (a |the )?(form|format|style)|as a (table|list|bullet)|using (headings|sections))\b/i,
    constraints: /\b(only|limit|avoid|don't|do not|no more than|maximum|minimum|under \d+|within|must not|should not|keep it|exclude|never|without)\b/i,
    specific: /\b(\d+|specific|exactly|precise|clearly|detailed|concise|brief|short|long)\b/i,
};

const mockResponses = [
    `Here's a great approach to your request! I've analyzed your prompt carefully and structured a response that directly addresses your needs.\n\nThe key insight here is that clarity in prompting directly translates to clarity in responses. When you specify exactly what you need, the AI can focus its generation process on producing precisely that.\n\nLet me break this down into actionable points that you can immediately apply in your work.`,
    `Based on your prompt, I'll provide a structured and comprehensive response tailored to your specific requirements.\n\nFirst, let's establish the core concepts you've asked about. This involves understanding both the theoretical foundation and practical applications.\n\nThe most effective approach combines specificity in your request with clear output expectations, which your prompt demonstrates well.`,
    `Excellent prompt structure! Here's my focused response:\n\n• The first key point addresses the core of your request directly\n• Secondary considerations that add depth to the primary answer\n• Practical implications and how to apply this knowledge\n• Recommended next steps based on your stated context`,
];

function analyzePrompt(text) {
    if (!text.trim()) return null;
    const words = text.trim().split(/\s+/).length;
    const chars = text.trim().length;

    const detected = {
        role: patterns.role.test(text),
        task: patterns.task.test(text),
        context: patterns.context.test(text),
        format: patterns.format.test(text),
        constraints: patterns.constraints.test(text),
        specific: patterns.specific.test(text),
    };

    const componentScore
        = (detected.role ? 18 : 0)
        + (detected.task ? 20 : 0)
        + (detected.context ? 17 : 0)
        + (detected.format ? 15 : 0)
        + (detected.constraints ? 15 : 0)
        + (detected.specific ? 5 : 0);

    const lengthScore = words < 5 ? -10 : words < 10 ? 0 : words < 30 ? 5 : words < 80 ? 10 : 5;
    const score = Math.min(100, Math.max(5, componentScore + lengthScore));

    const suggestions = [];
    if (!detected.role) suggestions.push({ type: 'role', text: `Add a role (e.g., "You are an expert...") to guide the AI's tone and expertise.` });
    if (!detected.task) suggestions.push({ type: 'task', text: `State a clear action verb (e.g., "Write", "Analyze", "Explain") to specify what you want.` });
    if (!detected.context) suggestions.push({ type: 'context', text: 'Include context — who is the audience? What is the purpose?' });
    if (!detected.format) suggestions.push({ type: 'format', text: 'Specify an output format (bullet list, table, numbered steps, etc.).' });
    if (!detected.constraints) suggestions.push({ type: 'constraints', text: `Add a constraint (e.g., "Under 200 words", "Avoid technical jargon") to narrow the response.` });
    if (words < 8) suggestions.push({ type: 'length', text: 'Your prompt is very short. More detail usually leads to better, more targeted outputs.' });

    const improved = buildImprovedPrompt(text, detected, words);

    return { score, suggestions, detected, words, chars, improved };
}

function buildImprovedPrompt(original, detected) {
    const parts = [];
    if (!detected.role) parts.push('You are an expert assistant.');
    parts.push(original.trim());
    if (!detected.context) parts.push('The audience is a beginner with no prior knowledge on this topic.');
    if (!detected.format) parts.push('Present your response in clear bullet points with a short introduction.');
    if (!detected.constraints) parts.push('Keep your response concise and under 250 words.');
    return parts.join('\n\n');
}

const scoreColor = (s) => s >= 80 ? '#10b981' : s >= 55 ? '#6366f1' : s >= 30 ? '#f59e0b' : '#ef4444';
const scoreLabel = (s) => s >= 80 ? 'Excellent' : s >= 55 ? 'Good' : s >= 30 ? 'Needs Work' : 'Poor';

export default function Playground() {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState(null);
    const [aiResp, setAiResp] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [copiedImp, setCopiedImp] = useState(false);
    const [tab, setTab] = useState('coach');
    const textRef = useRef(null);

    const handleSubmit = () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setResult(null);
        setAiResp('');
        setTimeout(() => {
            const analysis = analyzePrompt(prompt);
            const resp = mockResponses[Math.floor(Math.random() * mockResponses.length)];
            setResult(analysis);
            setAiResp(resp);
            setLoading(false);
            setTab('coach');
        }, 900);
    };

    const handleReset = () => { setPrompt(''); setResult(null); setAiResp(''); };
    const copy = (text, fn) => { navigator.clipboard.writeText(text); fn(true); setTimeout(() => fn(false), 2000); };

    return (
        <div className="page-wide animate-fadeIn">
            <div className="pg-header">
                <div>
                    <p className="section-label">Practice Space</p>
                    <h1 className="pg-title">Prompt Playground</h1>
                    <p style={{ color: 'var(--color-muted)', marginTop: 6 }}>
                        Write any prompt and get AI feedback from the <strong style={{ color: 'var(--color-primary)' }}>Prompt Coach</strong>.
                    </p>
                </div>
            </div>

            <div className="pg-layout">
                {/* ── Input Panel ── */}
                <div className="pg-input-panel">
                    <div className="pg-input-card card">
                        <div className="pg-input-header">
                            <FlaskConical size={16} color="var(--color-primary)" />
                            <span className="pg-input-label">Your Prompt</span>
                            <button className="btn btn-ghost" style={{ marginLeft: 'auto', fontSize: '0.8rem' }} onClick={handleReset}>
                                <RotateCcw size={13} /> Clear
                            </button>
                        </div>
                        <textarea
                            ref={textRef}
                            className="pg-textarea"
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            placeholder={"Write your prompt here...\n\nExample: You are a creative writing coach. Help me write a compelling opening paragraph for a story about a time traveler. The reader is a young adult. Use vivid, sensory language. Keep it under 150 words."}
                            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(); }}
                        />
                        <div className="pg-input-footer">
                            <span className="pg-word-count">{prompt.trim() ? `${prompt.trim().split(/\s+/).length} words · ${prompt.length} chars` : 'Start typing...'}</span>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button className="btn btn-ghost" style={{ fontSize: '0.8rem' }} onClick={() => copy(prompt, setCopied)}>
                                    {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                    disabled={!prompt.trim() || loading}
                                    style={{ fontSize: '0.9rem', padding: '10px 22px' }}
                                >
                                    {loading ? 'Analyzing...' : <><Send size={14} /> Analyze</>}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Tips ── */}
                    <div className="pg-tips card" style={{ padding: 18, marginTop: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <Lightbulb size={15} color="var(--color-accent)" />
                            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Prompting Tips</span>
                        </div>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {[
                                'Start with a role: "You are a..."',
                                'Use action verbs: Write, Explain, List, Compare',
                                'Specify your audience for better tone',
                                'Ask for a specific output format',
                                'Add constraints to limit response scope',
                            ].map(tip => (
                                <li key={tip} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.83rem', color: 'var(--color-muted)' }}>
                                    <CheckCircle2 size={13} color="var(--color-green)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Results Panel ── */}
                <div className="pg-results-panel">
                    {!result && !loading && (
                        <div className="pg-empty card">
                            <span style={{ fontSize: '2.4rem' }}>🤖</span>
                            <h3>Ready to Coach</h3>
                            <p>Write a prompt and click Analyze. The Prompt Coach will evaluate it and give you actionable suggestions.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="pg-empty card">
                            <div className="pg-loading-dots">
                                <div /><div /><div />
                            </div>
                            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>Analyzing your prompt...</p>
                        </div>
                    )}

                    {result && !loading && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {/* Score Card */}
                            <div className="pg-score-card card">
                                <div className="pg-score-top">
                                    <div className="pg-score-gauge">
                                        <svg viewBox="0 0 80 80" className="pg-gauge-svg">
                                            <circle cx="40" cy="40" r="32" fill="none" stroke="var(--color-surface2)" strokeWidth="7" />
                                            <circle
                                                cx="40" cy="40" r="32" fill="none"
                                                stroke={scoreColor(result.score)} strokeWidth="7"
                                                strokeDasharray={`${(result.score / 100) * 201} 201`}
                                                strokeDashoffset="50"
                                                strokeLinecap="round"
                                                style={{ transition: 'stroke-dasharray 0.8s ease' }}
                                            />
                                        </svg>
                                        <div className="pg-gauge-center">
                                            <span className="pg-score-num" style={{ color: scoreColor(result.score) }}>{result.score}</span>
                                            <span className="pg-score-slash">/100</span>
                                        </div>
                                    </div>
                                    <div className="pg-score-info">
                                        <div className="pg-score-label" style={{ color: scoreColor(result.score) }}>{scoreLabel(result.score)}</div>
                                        <div className="pg-score-sub">{result.words} words · {result.chars} chars</div>
                                        <div className="pg-components-detected">
                                            {Object.entries(result.detected).slice(0, 5).map(([key, val]) => (
                                                <span key={key} className={`pg-component-badge ${val ? 'found' : 'missing'}`}>
                                                    {val ? '✓' : '✗'} {key.charAt(0).toUpperCase() + key.slice(1)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="pg-tabs">
                                <button className={`pg-tab ${tab === 'coach' ? 'active' : ''}`} onClick={() => setTab('coach')}>
                                    <Sparkles size={14} /> Prompt Coach
                                </button>
                                <button className={`pg-tab ${tab === 'response' ? 'active' : ''}`} onClick={() => setTab('response')}>
                                    <TrendingUp size={14} /> AI Response
                                </button>
                            </div>

                            {tab === 'coach' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {result.suggestions.length === 0 ? (
                                        <div className="pg-perfect card" style={{ padding: 20, textAlign: 'center' }}>
                                            <span style={{ fontSize: '2rem' }}>🎉</span>
                                            <h3 style={{ marginTop: 8 }}>Excellent Prompt!</h3>
                                            <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', marginTop: 6 }}>
                                                Your prompt includes all key components. You are a natural!
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="pg-suggestions-header">
                                                <AlertCircle size={15} color="var(--color-accent)" />
                                                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                                                    {result.suggestions.length} improvement{result.suggestions.length !== 1 ? 's' : ''} suggested
                                                </span>
                                            </div>
                                            {result.suggestions.map((s, i) => (
                                                <div key={i} className="pg-suggestion card">
                                                    <div className="pg-suggestion-type">{s.type.charAt(0).toUpperCase() + s.type.slice(1)}</div>
                                                    <p className="pg-suggestion-text">{s.text}</p>
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {/* Improved Prompt */}
                                    <div className="pg-improved card">
                                        <div className="pg-improved-header">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <TrendingUp size={15} color="var(--color-green)" />
                                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Improved Prompt</span>
                                            </div>
                                            <button className="btn btn-ghost" style={{ fontSize: '0.78rem', color: 'var(--color-green)' }} onClick={() => copy(result.improved, setCopiedImp)}>
                                                {copiedImp ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                                            </button>
                                        </div>
                                        <div className="pg-improved-text">{result.improved}</div>
                                        <button className="btn btn-secondary" style={{ fontSize: '0.83rem', marginTop: 14 }} onClick={() => setPrompt(result.improved)}>
                                            Use this prompt
                                        </button>
                                    </div>
                                </div>
                            )}

                            {tab === 'response' && (
                                <div className="pg-ai-response card">
                                    <div className="pg-ai-header">
                                        <div className="pg-ai-avatar">AI</div>
                                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Simulated AI Response</span>
                                        <span className="badge badge-cyan" style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>Demo</span>
                                    </div>
                                    <div className="pg-ai-text">{aiResp}</div>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: 12 }}>
                                        * This is a simulated response to demonstrate what structured prompts can produce.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
