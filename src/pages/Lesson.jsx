import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, AlertCircle, Info, ArrowLeft } from 'lucide-react';
import './Lesson.css';

const lessons = [
    {
        id: 1,
        title: 'The Power of Specification',
        content: [
            { type: 'p', text: 'Prompt engineering is the art of formulating queries so that an AI model produces the most accurate and useful results. The key to effective prompting is specification.' },
            { type: 'p', text: 'Consider the difference between "Write a story" and "Write a 200-word sci-fi story about a robot discovering a plant on a desolate planet." The more detail you provide, the better the AI can align with your intent.' },
            { type: 'tip', text: 'Think of the AI as a very capable but literal-minded intern. They need clear instructions to do a good job.' },
            { type: 'p', text: 'In this module, we will explore how even minor changes in wording can drastically alter the quality of the output.' },
        ],
        quiz: {
            question: 'Which of these is the most effective prompt structure?',
            options: [
                'A short, vague request.',
                'A long paragraph with no clear goal.',
                'A specific instruction with role, task, and constraints.',
                'Asking the AI to guess what you want.'
            ],
            correct: 2
        }
    }
];

export default function Lesson() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ans, setAns] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const lesson = lessons[0]; // For demo, use the first one

    const handleQuiz = (idx) => {
        if (submitted) return;
        setAns(idx);
    };

    return (
        <div className="ls-page-v3">
            <div className="pixel-scanline" />

            <Link to="/modules" className="ls-back pixel-text" style={{ fontSize: '0.5rem', marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--c-pixel-gray)', textDecoration: 'none' }}>
                <ArrowLeft size={14} /> Back to Modules
            </Link>

            <div className="ls-layout">
                <motion.main
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ls-content pixel-box"
                >
                    <div className="ls-progress-container" style={{ marginBottom: '32px' }}>
                        <div className="pixel-progress-container" style={{ height: '8px' }}>
                            <div className="pixel-progress-fill" style={{ width: '25%' }} />
                        </div>
                        <div className="pixel-text" style={{ fontSize: '0.45rem', marginTop: '8px', color: 'var(--c-pixel-gray)' }}>
                            Lesson 1 of 4
                        </div>
                    </div>

                    <h1 className="pixel-title ls-title" style={{ marginBottom: '24px' }}>{lesson.title}</h1>

                    <div className="ls-body">
                        {lesson.content.map((c, i) => {
                            if (c.type === 'p') return <p key={i} className="pixel-text ls-p" style={{ fontSize: '0.6rem', lineHeight: '1.8', marginBottom: '20px', textTransform: 'none' }}>{c.text}</p>;
                            if (c.type === 'tip') return (
                                <div key={i} className="ls-tip pixel-box" style={{ background: 'var(--c-pixel-yellow)', margin: '32px 0', padding: '1.5rem', display: 'flex', gap: '16px' }}>
                                    <Info size={18} style={{ flexShrink: 0 }} />
                                    <p className="pixel-text" style={{ fontSize: '0.5rem', lineHeight: '1.6', textTransform: 'none' }}>{c.text}</p>
                                </div>
                            );
                            return null;
                        })}
                    </div>

                    <div className="ls-quiz" style={{ borderTop: '4px solid var(--c-pixel-black)', paddingTop: '48px' }}>
                        <h3 className="pixel-subtitle ls-quiz-title" style={{ color: 'var(--c-pixel-red)', marginBottom: '12px' }}>Knowledge Check</h3>
                        <p className="pixel-text ls-quiz-q" style={{ fontSize: '0.65rem', marginBottom: '24px' }}>{lesson.quiz.question}</p>
                        <div className="ls-quiz-options" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                            {lesson.quiz.options.map((opt, i) => {
                                const isSelected = ans === i;
                                const isCorrect = submitted && i === lesson.quiz.correct;
                                const isWrong = submitted && ans === i && i !== lesson.quiz.correct;

                                let bgColor = 'white';
                                if (isSelected) bgColor = 'var(--c-pixel-light-gray)';
                                if (isCorrect) bgColor = 'var(--c-pixel-green)';
                                if (isWrong) bgColor = 'var(--c-pixel-red)';

                                return (
                                    <button
                                        key={i}
                                        className="pixel-box ls-quiz-opt"
                                        onClick={() => handleQuiz(i)}
                                        style={{
                                            background: bgColor,
                                            padding: '16px 20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '14px',
                                            textAlign: 'left',
                                            cursor: submitted ? 'default' : 'pointer',
                                            transition: 'transform 0.1s'
                                        }}
                                    >
                                        <div className="ls-opt-indicator">
                                            {isCorrect ? <CheckCircle2 size={16} /> : isSelected ? <Circle size={16} fill="var(--c-pixel-yellow)" /> : <Circle size={16} />}
                                        </div>
                                        <span className="pixel-text" style={{ fontSize: '0.5rem', textTransform: 'none' }}>{opt}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="ls-quiz-footer" style={{ minHeight: '44px' }}>
                            {!submitted ? (
                                <button
                                    className="btn-pixel"
                                    disabled={ans === null}
                                    onClick={() => setSubmitted(true)}
                                    style={{ padding: '12px 24px' }}
                                >
                                    <span className="pixel-text" style={{ fontSize: '0.5rem' }}>Check Answer</span>
                                </button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="ls-feedback"
                                    style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                                >
                                    {ans === lesson.quiz.correct ? (
                                        <div className="pixel-text" style={{ color: 'var(--c-pixel-green)', fontSize: '0.55rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <CheckCircle2 size={18} /> Correct! Well done.
                                        </div>
                                    ) : (
                                        <div className="pixel-text" style={{ color: 'var(--c-pixel-red)', fontSize: '0.55rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <AlertCircle size={18} /> Not quite right.
                                        </div>
                                    )}
                                    {ans !== lesson.quiz.correct && (
                                        <button className="pixel-btn-link pixel-text" style={{ fontSize: '0.45rem', marginLeft: 'auto' }} onClick={() => { setSubmitted(false); setAns(null); }}>Retry</button>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.main>

                <aside className="ls-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="ls-nav pixel-box" style={{ padding: '20px' }}>
                        <h4 className="pixel-subtitle" style={{ fontSize: '0.55rem', marginBottom: '16px' }}>Jump to Lesson</h4>
                        <div className="ls-nav-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[1, 2, 3, 4].map(idx => (
                                <button key={idx} className={`ls-nav-item pixel-text ${idx === 1 ? 'active' : ''}`} style={{
                                    display: 'flex', alignItems: 'center', gap: '12px', padding: '8px',
                                    background: idx === 1 ? 'var(--c-pixel-yellow)' : 'transparent',
                                    border: 'none', textAlign: 'left', fontSize: '0.45rem',
                                    color: idx === 1 ? 'black' : 'var(--c-pixel-gray)',
                                    position: 'relative'
                                }}>
                                    <span style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black', background: 'white', color: 'black' }}>{idx}</span>
                                    Lesson {idx}
                                    {idx === 1 && <div style={{ position: 'absolute', left: '-2px', top: '4px', bottom: '4px', width: '4px', background: 'black' }} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            <div className="ls-footer-nav" style={{ marginTop: '48px', paddingTop: '32px', borderTop: '4px solid var(--c-pixel-black)', display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn-pixel btn-pixel-secondary" disabled style={{ padding: '12px 24px', opacity: 0.5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ChevronLeft size={16} /> <span className="pixel-text" style={{ fontSize: '0.5rem' }}>Previous</span>
                    </div>
                </button>
                <button className="btn-pixel" onClick={() => navigate('/modules')} style={{ padding: '12px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="pixel-text" style={{ fontSize: '0.5rem' }}>Next Lesson</span> <ChevronRight size={16} />
                    </div>
                </button>
            </div>
        </div>
    );
}
