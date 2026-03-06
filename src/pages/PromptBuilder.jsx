import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, RotateCcw, Copy, Check, Info, Sparkles } from 'lucide-react';
import './PromptBuilder.css';

const toolbarElements = [
    {
        id: 'context',
        label: 'Context',
        options: [
            { label: 'Academic research', text: 'I am conducting academic research on...' },
            { label: 'Business proposal', text: 'I am drafting a professional business proposal for...' },
            { label: 'Social media post', text: 'I am creating content for a social media platform regarding...' },
            { label: 'Technical documentation', text: 'I am writing technical documentation for...' },
            { label: 'Creative project', text: 'I am working on a creative project focused on...' },
        ]
    },
    {
        id: 'persona',
        label: 'Persona',
        options: [
            { label: 'Expert Teacher', text: 'Act as an expert teacher with 20 years of experience.' },
            { label: 'Software Engineer', text: 'Act as a senior software engineer known for clean code.' },
            { label: 'Marketing Strategist', text: 'Act as a high-level marketing strategist.' },
            { label: 'Creative Writer', text: 'Act as an award-winning creative writer.' },
            { label: 'Data Scientist', text: 'Act as a precision-oriented data scientist.' },
        ]
    },
    {
        id: 'goal',
        label: 'Goal',
        options: [
            { label: 'Summarize this text', text: 'Summarize the following text in a concise manner.' },
            { label: 'Explain simply', text: 'Explain the following concept simply, as if to a beginner.' },
            { label: 'Create a quiz', text: 'Generate a 5-question quiz based on this information.' },
            { label: 'Generate ideas', text: 'Brainstorm 5 creative ideas for this project.' },
            { label: 'List key points', text: 'Extract and list the key points from this document.' },
            { label: 'Explain in detail', text: 'Provide a comprehensive and detailed explanation of...' },
        ]
    },
    {
        id: 'audience',
        label: 'Audience',
        options: [
            { label: 'Complete Beginners', text: 'The target audience consists of complete beginners.' },
            { label: 'Busy Executives', text: 'The audience is busy executives who need high-level insights.' },
            { label: 'Technical Peers', text: 'The audience is a group of technical peers with deep knowledge.' },
            { label: 'General Public', text: 'The content is intended for the general public.' },
        ]
    },
    {
        id: 'structure',
        label: 'Structure',
        options: [
            { label: 'Bullet Points', text: 'Present the response in a clear bulleted list.' },
            { label: 'Markdown Table', text: 'Use a Markdown table to organize the information.' },
            { label: 'Step-by-Step', text: 'Provide a logical, step-by-step guide.' },
            { label: 'Executive Summary', text: 'Format as an executive summary with key takeaways.' },
        ]
    },
    {
        id: 'constraints',
        label: 'Constraints',
        options: [
            { label: 'Under 100 words', text: 'Keep the entire response under 100 words.' },
            { label: 'No Jargon', text: 'Strictly avoid all technical jargon and complex terms.' },
            { label: 'Professional Tone', text: 'Maintain a strictly professional and formal tone.' },
            { label: 'No Preamble', text: 'Start directly with the answer, no conversational filler.' },
        ]
    },
    {
        id: 'addons',
        label: 'Add-ons',
        options: [
            { label: 'Include Examples', text: 'Provide 3 concrete examples to illustrate the points.' },
            { label: 'Suggest resources', text: 'Recommend 2-3 additional resources for further reading.' },
            { label: 'Anticipate FAQs', text: 'Address 3 potential follow-up questions or concerns.' },
            { label: 'Cite sources', text: 'Ensure all claims are backed by credible citations.' },
        ]
    }
];

export default function PromptBuilder() {
    const [promptText, setPromptText] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [copied, setCopied] = useState(false);
    const editorRef = useRef(null);

    const handleInsert = (text) => {
        const textarea = editorRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const textBefore = promptText.substring(0, start);
        const textAfter = promptText.substring(end);

        // Add a space if there isn't one already at the insertion point
        const separator = (textBefore.length > 0 && !textBefore.endsWith(' ') && !textBefore.endsWith('\n')) ? ' ' : '';

        const newText = textBefore + separator + text + textAfter;

        setPromptText(newText);
        setActiveDropdown(null);

        // Focus editor and restore cursor position after insertion
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + separator.length + text.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 10);
    };

    const copyPrompt = () => {
        navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    return (
        <div className="pb-page-v3">
            <div className="pixel-scanline" />

            <div className="pb-header pixel-box pixel-grid-bg">
                {/* LEGO bricks decorative strip on top */}
                <div className="pb-lego-strip">
                    {[
                        { color: '#facc15', delay: 0, size: 28, rot: 10 },
                        { color: '#f87171', delay: 0.4, size: 22, rot: -12 },
                        { color: '#60a5fa', delay: 0.8, size: 26, rot: 6 },
                        { color: '#34d399', delay: 1.1, size: 20, rot: 18 },
                        { color: '#a78bfa', delay: 0.55, size: 24, rot: -7 },
                        { color: '#fb923c', delay: 0.9, size: 18, rot: 14 },
                    ].map((b, i) => (
                        <motion.div
                            key={i}
                            className="pb-lego-brick"
                            style={{
                                width: b.size,
                                height: b.size * 0.65,
                                background: b.color,
                                rotate: b.rot,
                                flexShrink: 0,
                            }}
                            animate={{ y: [0, -8, 0], rotate: [b.rot, b.rot + 6, b.rot] }}
                            transition={{ duration: 2.4 + i * 0.25, repeat: Infinity, delay: b.delay, ease: 'easeInOut' }}
                        >
                            <span className="pb-lego-nub" style={{ left: '22%' }} />
                            <span className="pb-lego-nub" style={{ left: '62%' }} />
                        </motion.div>
                    ))}
                </div>

                {/* Header bottom row: title + action buttons */}
                <div className="pb-header-bottom">
                    <div className="pb-header-main">
                        <span className="pixel-subtitle">Prompt writing assistant</span>
                        <h1 className="pixel-title" style={{ margin: 0 }}>Prompt Builder</h1>
                        <p className="pixel-text" style={{ fontSize: '0.5rem', color: 'var(--c-pixel-gray)', marginTop: '8px' }}>Fast, flexible, and practical writing tool.</p>
                    </div>
                    <div className="pb-header-actions">
                        <button className="btn-pixel btn-pixel-secondary" onClick={() => setPromptText('')} style={{ padding: '8px 16px' }}>
                            <RotateCcw size={14} /> <span className="pixel-text" style={{ fontSize: '0.5rem' }}>Clear</span>
                        </button>
                        <button
                            className="btn-pixel"
                            onClick={copyPrompt}
                            disabled={!promptText}
                            style={{ padding: '8px 16px' }}
                        >
                            {copied ? (
                                <><Check size={14} /> <span className="pixel-text" style={{ fontSize: '0.5rem' }}>Copied!</span></>
                            ) : (
                                <><Copy size={14} /> <span className="pixel-text" style={{ fontSize: '0.5rem' }}>Copy</span></>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="pb-toolbar pixel-box" style={{ padding: '12px', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {toolbarElements.map((el) => (
                    <div key={el.id} className="pb-toolbar-item">
                        <button
                            className={`btn-pixel btn-pixel-secondary ${activeDropdown === el.id ? 'active' : ''}`}
                            onClick={() => toggleDropdown(el.id)}
                            style={{ padding: '6px 12px', fontSize: '0.5rem' }}
                        >
                            <span className="pixel-text" style={{ fontSize: '0.5rem' }}>{el.label}</span>
                            <motion.span
                                animate={{ rotate: activeDropdown === el.id ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                style={{ display: 'flex' }}
                            >
                                <ChevronDown size={12} />
                            </motion.span>
                        </button>

                        <AnimatePresence>
                            {activeDropdown === el.id && (
                                <motion.div
                                    className="pb-dropdown pixel-box"
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.1 }}
                                    style={{ position: 'absolute', top: '110%', left: 0, zIndex: 100, minWidth: '200px', padding: '8px' }}
                                >
                                    <div className="pb-dropdown-list" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {el.options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                className="pb-dropdown-opt pixel-text"
                                                onClick={() => handleInsert(opt.text)}
                                                style={{ textAlign: 'left', padding: '8px', fontSize: '0.45rem', border: '1px solid transparent' }}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <main className="pb-editor-container pixel-box" style={{ padding: 0 }}>
                <div className="pb-editor-header" style={{ padding: '12px 20px', borderBottom: '4px solid var(--c-pixel-black)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--c-pixel-light-gray)' }}>
                    <div className="pixel-text" style={{ fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={16} color="var(--c-pixel-red)" />
                        Prompt Editor
                    </div>
                    <div className="pixel-text" style={{ fontSize: '0.45rem', opacity: 0.7 }}>
                        {promptText.trim().split(/\s+/).filter(Boolean).length} words
                    </div>
                </div>

                <textarea
                    ref={editorRef}
                    className="pb-textarea pixel-text"
                    placeholder="Start typing your prompt or select elements from the toolbar above..."
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    style={{
                        width: '100%',
                        minHeight: '350px',
                        padding: '24px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '0.8rem',
                        lineHeight: '1.8',
                        background: 'transparent',
                        resize: 'vertical'
                    }}
                />

                <div className="pb-editor-footer" style={{ padding: '12px 20px', borderTop: '4px solid var(--c-pixel-black)', background: 'var(--c-pixel-light-gray)' }}>
                    <div className="pixel-text" style={{ fontSize: '0.45rem', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.7 }}>
                        <Info size={14} />
                        Tip: Select a fragment from the toolbar to instantly add it to your prompt.
                    </div>
                </div>
            </main>
        </div>
    );
}
