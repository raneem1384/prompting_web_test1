import { useState } from 'react';
import { Wand2, RefreshCw, Copy, Check } from 'lucide-react';
import './PromptBuilder.css';

const components = {
    role: {
        label: 'Role',
        emoji: '🎭',
        color: '#6366f1',
        desc: 'Who should the AI act as?',
        options: [
            'You are an expert software engineer',
            'You are a creative writing coach',
            'You are a professional data scientist',
            'You are a friendly high school teacher',
            'You are a senior marketing strategist',
            'You are a nutritionist and fitness expert',
            'You are an experienced UX designer',
        ],
    },
    task: {
        label: 'Task',
        emoji: '📋',
        color: '#06b6d4',
        desc: 'What should the AI do?',
        options: [
            'Explain the concept of machine learning',
            'Write a short story about overcoming failure',
            'Create a beginner workout plan for 4 weeks',
            'Summarize the key features of the given product',
            'Generate 10 creative blog post title ideas',
            'Write a professional email to reschedule a meeting',
            'Analyze the strengths and weaknesses of this strategy',
        ],
    },
    context: {
        label: 'Context',
        emoji: '📖',
        color: '#8b5cf6',
        desc: 'What background information does the AI need?',
        options: [
            'The audience is complete beginners with no technical background',
            'This is for a startup pitch to non-technical investors',
            'The reader is a 12-year-old student',
            'The user has intermediate Python knowledge',
            'This will be published on a professional LinkedIn article',
            'The content is for a mobile app onboarding screen',
            'The audience is senior-level professionals in finance',
        ],
    },
    format: {
        label: 'Output Format',
        emoji: '📐',
        color: '#10b981',
        desc: 'How should the response be structured?',
        options: [
            'Format as a numbered step-by-step guide',
            'Use clear bullet points with bold headers',
            'Present as a table with relevant columns',
            'Write in a conversational paragraph style',
            'Use a Q&A format with short answers',
            'Format as a professional report with sections',
            'Provide JSON output with relevant key-value pairs',
        ],
    },
    constraints: {
        label: 'Constraints',
        emoji: '🚦',
        color: '#f59e0b',
        desc: 'What limits or rules should the AI follow?',
        options: [
            'Keep the response under 200 words',
            'Avoid using technical jargon or acronyms',
            'Do not include any product recommendations',
            'Use simple language suitable for a general audience',
            'Focus only on free or open-source tools',
            'Do not repeat information already mentioned',
            'Keep a positive and encouraging tone throughout',
        ],
    },
};

export default function PromptBuilder() {
    const [selections, setSelections] = useState({ role: '', task: '', context: '', format: '', constraints: '' });
    const [copied, setCopied] = useState(false);

    const select = (key, val) => setSelections(s => ({ ...s, [key]: s[key] === val ? '' : val }));
    const reset = () => setSelections({ role: '', task: '', context: '', format: '', constraints: '' });

    const buildPrompt = () => {
        const parts = [
            selections.role,
            selections.task,
            selections.context && `Context: ${selections.context}`,
            selections.format,
            selections.constraints && `Important: ${selections.constraints}`,
        ].filter(Boolean);
        return parts.join('\n\n');
    };

    const prompt = buildPrompt();
    const filled = Object.values(selections).filter(Boolean).length;
    const pct = Math.round((filled / 5) * 100);

    const copyPrompt = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="page-wide animate-fadeIn">
            <div className="builder-header">
                <div>
                    <p className="section-label">Interactive Tool</p>
                    <h1 className="builder-title">Prompt Builder</h1>
                    <p style={{ color: 'var(--color-muted)', marginTop: 6 }}>
                        Select options for each component to build a structured, effective prompt.
                    </p>
                </div>
                <button className="btn btn-secondary" onClick={reset}>
                    <RefreshCw size={15} /> Reset
                </button>
            </div>

            <div className="builder-layout">
                {/* ── Component Selectors ── */}
                <div className="builder-selectors">
                    {Object.entries(components).map(([key, comp]) => (
                        <div key={key} className="builder-section card">
                            <div className="builder-section-header">
                                <div className="builder-section-icon" style={{ background: `${comp.color}1a`, color: comp.color }}>
                                    {comp.emoji}
                                </div>
                                <div>
                                    <div className="builder-section-label" style={{ color: comp.color }}>{comp.label}</div>
                                    <div className="builder-section-desc">{comp.desc}</div>
                                </div>
                                {selections[key] && (
                                    <div className="builder-section-check"><Check size={14} color="var(--color-green)" /></div>
                                )}
                            </div>
                            <div className="builder-options">
                                {comp.options.map(opt => (
                                    <button
                                        key={opt}
                                        className={`builder-option ${selections[key] === opt ? 'selected' : ''}`}
                                        style={selections[key] === opt ? { borderColor: comp.color, background: `${comp.color}15`, color: comp.color } : {}}
                                        onClick={() => select(key, opt)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Live Preview ── */}
                <div className="builder-preview-panel">
                    <div className="builder-preview-sticky">
                        <div className="builder-preview card">
                            <div className="builder-preview-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Wand2 size={16} color="var(--color-primary)" />
                                    <span className="builder-preview-title">Live Preview</span>
                                </div>
                                <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.82rem' }} onClick={copyPrompt}>
                                    {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
                                </button>
                            </div>

                            <div className="builder-completeness">
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Completeness</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: pct === 100 ? 'var(--color-green)' : 'var(--color-primary)' }}>{pct}%</span>
                            </div>
                            <div className="progress-bar-track" style={{ marginBottom: 20 }}>
                                <div className="progress-bar-fill" style={{ width: `${pct}%`, background: pct === 100 ? 'var(--color-green)' : undefined }} />
                            </div>

                            {prompt ? (
                                <div className="builder-prompt-text">{prompt}</div>
                            ) : (
                                <div className="builder-prompt-empty">
                                    <span>✨</span>
                                    <span>Select options from the left to build your prompt here in real time.</span>
                                </div>
                            )}

                            {/* Component breakdown */}
                            {Object.entries(components).map(([key, comp]) => selections[key] && (
                                <div key={key} className="builder-component-preview" style={{ borderColor: `${comp.color}30` }}>
                                    <span className="builder-component-label" style={{ color: comp.color }}>{comp.emoji} {comp.label}</span>
                                    <span className="builder-component-val">{selections[key]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
