import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Sparkles, Send, RotateCcw, Copy, Check, AlertCircle, TrendingUp, Lightbulb, CheckCircle2 } from 'lucide-react';
import './Playground.css';

/* ─── AI Prompt Coach Logic (Simplified for Redesign) ────────────────────────── */
const patterns = {
    role: /\b(you are|act as|behave as|pretend (you are|to be)|imagine you('re| are)|as an|as a)\b/i,
    task: /\b(write|create|generate|explain|summarize|list|describe|analyze|compare|give me|provide|draft|compose|suggest|design|build|help me|translate|convert)\b/i,
    context: /\b(for|because|since|given that|the (user|audience|reader|person)|this is for|background|context|situation|scenario|purpose|goal|objective|use case)\b/i,
    format: /\b(format|bullet|numbered|table|list|paragraph|json|xml|markdown|step.by.step|in (a |the )?(form|format|style)|as a (table|list|bullet)|using (headings|sections))\b/i,
    constraints: /\b(only|limit|avoid|don't|do not|no more than|maximum|minimum|under \d+|within|must not|should not|keep it|exclude|never|without)\b/i,
};

const mockResponses = [
    "Based on your structured prompt, I've generated a response that addresses all your requirements. The clarity of your instructions allowed me to focus on provided context and format.",
    "Excellent prompt. Here is the requested analysis provided in the specific format you asked for. Notice how the constraints were strictly followed to ensure conciseness.",
    "I've processed your request. By defining a clear role and task, you've ensured the output is professional and aligned with your intended audience."
];

function analyzePrompt(text) {
    if (!text.trim()) return null;
    const words = text.trim().split(/\s+/).length;

    const detected = {
        role: patterns.role.test(text),
        task: patterns.task.test(text),
        context: patterns.context.test(text),
        format: patterns.format.test(text),
        constraints: patterns.constraints.test(text),
    };

    const score = Math.min(100, (Object.values(detected).filter(Boolean).length * 20));

    const suggestions = [];
    if (!detected.role) suggestions.push({ type: 'Role', text: 'Define who the AI should act as (e.g., Expert Teacher).' });
    if (!detected.task) suggestions.push({ type: 'Task', text: 'Use a strong action verb to define the goal.' });
    if (!detected.context) suggestions.push({ type: 'Context', text: 'Specify the audience or background situation.' });
    if (!detected.format) suggestions.push({ type: 'Format', text: 'Declare the desired output structure (list, table, etc.).' });
    if (!detected.constraints) suggestions.push({ type: 'Constraints', text: 'Add limitations like word count or prohibited topics.' });

    return { score, suggestions, detected, words };
}

export default function Playground() {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState('coach'); // 'coach' | 'response'
    const [copied, setCopied] = useState(false);

    const handleAnalyze = () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setTimeout(() => {
            setResult(analyzePrompt(prompt));
            setLoading(false);
            setTab('coach');
        }, 800);
    };

    const copy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="pg-page-v3">
            <div className="pixel-scanline" />

            <div className="pg-header pixel-box pixel-grid-bg">
                <div>
                    <span className="pixel-subtitle">Practice Space</span>
                    <h1 className="pixel-title" style={{ margin: 0 }}>Prompt Playground</h1>
                    <p className="pixel-text" style={{ fontSize: '0.5rem', color: 'var(--c-pixel-gray)', marginTop: '8px' }}>Write, analyze, and refine your prompts with the AI Coach.</p>
                </div>
            </div>

            <div className="pg-layout">
                <div className="pg-left">
                    <div className="pg-input-card pixel-box" style={{ padding: 0 }}>
                        <div className="pg-card-header" style={{ padding: '12px 20px', borderBottom: '4px solid var(--c-pixel-black)', display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--c-pixel-light-gray)' }}>
                            <FlaskConical size={16} />
                            <span className="pixel-text" style={{ fontSize: '0.6rem' }}>Your Prompt</span>
                            <button className="pixel-btn-link pixel-text" style={{ marginLeft: 'auto', fontSize: '0.45rem' }} onClick={() => setPrompt('')}>Clear</button>
                        </div>
                        <textarea
                            className="pg-textarea pixel-text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Paste or write your prompt here..."
                            style={{
                                width: '100%',
                                minHeight: '300px',
                                padding: '24px',
                                border: 'none',
                                outline: 'none',
                                fontSize: '0.8rem',
                                lineHeight: '1.8',
                                background: 'transparent',
                                resize: 'none'
                            }}
                        />
                        <div className="pg-card-footer" style={{ padding: '16px 20px', borderTop: '4px solid var(--c-pixel-black)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--c-pixel-light-gray)' }}>
                            <span className="pixel-text" style={{ fontSize: '0.45rem', opacity: 0.7 }}>{prompt.trim() ? prompt.trim().split(/\s+/).length : 0} words</span>
                            <div className="pg-actions">
                                <button className="btn-pixel btn-pixel-secondary" onClick={() => copy(prompt)} style={{ padding: '8px' }}>
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                                <button
                                    className="btn-pixel"
                                    onClick={handleAnalyze}
                                    disabled={!prompt.trim() || loading}
                                    style={{ padding: '8px 16px' }}
                                >
                                    {loading ? (
                                        <span className="pixel-text" style={{ fontSize: '0.5rem' }}>Analyzing...</span>
                                    ) : (
                                        <><Send size={14} /> <span className="pixel-text" style={{ fontSize: '0.5rem' }}>Analyze</span></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pg-tips-card pixel-box" style={{ padding: '1.5rem', background: 'var(--c-pixel-black)', color: 'var(--c-pixel-white)', borderStyle: 'solid' }}>
                        <div className="pg-tips-header" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <Lightbulb size={16} color="var(--c-pixel-yellow)" />
                            <span className="pixel-text" style={{ fontSize: '0.6rem' }}>Quick Tips</span>
                        </div>
                        <ul className="pg-tips-list" style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                            <li className="pixel-text" style={{ fontSize: '0.45rem', marginBottom: '8px', lineHeight: '1.6' }}>• Start with a clear identity: "You are a..."</li>
                            <li className="pixel-text" style={{ fontSize: '0.45rem', marginBottom: '8px', lineHeight: '1.6' }}>• Specify your audience for the right tone</li>
                            <li className="pixel-text" style={{ fontSize: '0.45rem', lineHeight: '1.6' }}>• Declare a format: "Provide a bulleted list"</li>
                        </ul>
                    </div>
                </div>

                <div className="pg-right">
                    {!result && !loading ? (
                        <div className="pg-empty pixel-box" style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <FlaskConical size={40} strokeWidth={1.5} />
                            <h3 className="pixel-text" style={{ marginTop: '16px', fontSize: '0.7rem' }}>Ready for Analysis</h3>
                            <p className="pixel-text" style={{ fontSize: '0.45rem', maxWidth: '240px', marginTop: '12px', lineHeight: '1.8', opacity: 0.7 }}>Enter a prompt and click Analyze to receive professional feedback from the Prompt Coach.</p>
                        </div>
                    ) : loading ? (
                        <div className="pg-empty pixel-box" style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <div className="pg-loader" />
                            <p className="pixel-text" style={{ fontSize: '0.5rem' }}>Evaluating structure...</p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pg-results"
                        >
                            <div className="pg-score-card pixel-box" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                                <div className="pg-score-circle" style={{ width: '80px', height: '80px' }}>
                                    <svg viewBox="0 0 36 36" className="pg-circular-chart">
                                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--c-pixel-light-gray)" />
                                        <path className="circle" strokeDasharray={`${result.score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--c-pixel-yellow)" strokeWidth="3" />
                                        <text x="18" y="20.35" className="percentage pixel-text" style={{ fontSize: '0.4rem', textAnchor: 'middle' }}>{result.score}</text>
                                    </svg>
                                </div>
                                <div className="pg-score-info">
                                    <div className="pixel-text" style={{ fontSize: '0.6rem', marginBottom: '10px' }}>Prompt Quality Score</div>
                                    <div className="pg-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {Object.entries(result.detected).map(([key, val]) => (
                                            <span key={key} className="pixel-text" style={{
                                                fontSize: '0.35rem',
                                                padding: '4px 6px',
                                                background: val ? 'var(--c-pixel-green)' : 'var(--c-pixel-light-gray)',
                                                border: '2px solid black'
                                            }}>
                                                {val ? '✓' : '✗'} {key.toUpperCase()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pg-tabs pixel-box" style={{ padding: '4px', display: 'flex', gap: '4px', marginBottom: '16px', background: 'var(--c-pixel-black)' }}>
                                <button className={`pixel-text ${tab === 'coach' ? 'active' : ''}`} onClick={() => setTab('coach')} style={{
                                    flex: 1, padding: '8px', fontSize: '0.45rem',
                                    background: tab === 'coach' ? 'var(--c-pixel-yellow)' : 'transparent',
                                    color: tab === 'coach' ? 'black' : 'white',
                                    border: 'none'
                                }}>
                                    Coach Feedback
                                </button>
                                <button className={`pixel-text ${tab === 'response' ? 'active' : ''}`} onClick={() => setTab('response')} style={{
                                    flex: 1, padding: '8px', fontSize: '0.45rem',
                                    background: tab === 'response' ? 'var(--c-pixel-yellow)' : 'transparent',
                                    color: tab === 'response' ? 'black' : 'white',
                                    border: 'none'
                                }}>
                                    Simulated Response
                                </button>
                            </div>

                            <div className="pg-tab-content">
                                {tab === 'coach' ? (
                                    <div className="pg-suggestions" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {result.suggestions.length > 0 ? (
                                            result.suggestions.map((s, i) => (
                                                <div key={i} className="pixel-box" style={{ display: 'flex', gap: '12px', padding: '12px', fontSize: '0.8rem', background: 'white' }}>
                                                    <AlertCircle size={16} color="var(--c-pixel-red)" style={{ flexShrink: 0 }} />
                                                    <div className="pixel-text" style={{ fontSize: '0.45rem', lineHeight: '1.6' }}>
                                                        <strong style={{ color: 'var(--c-pixel-red)' }}>{s.type}:</strong> {s.text}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="pixel-box" style={{ background: 'var(--c-pixel-green)', padding: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                <CheckCircle2 size={18} />
                                                <span className="pixel-text" style={{ fontSize: '0.5rem' }}>This prompt is expertly structured.</span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="pg-response pixel-box" style={{ minHeight: '150px', background: 'white', padding: '20px' }}>
                                        <div className="pixel-text" style={{ fontSize: '0.5rem', lineHeight: '1.8', textTransform: 'none' }}>
                                            {mockResponses[Math.floor(Math.random() * mockResponses.length)]}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
