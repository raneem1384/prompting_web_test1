import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Flame, Trophy, Play, Star, Target, Shield, Sword, Award, Rocket, ChevronRight, Terminal, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const quests = [
    {
        id: 1,
        title: 'The Recipe Alchemist',
        desc: 'Craft a prompt to transform random ingredients into a gourmet recipe.',
        xp: 30,
        icon: Sword
    },
    {
        id: 2,
        title: 'Persona Shifter',
        desc: 'Give the AI 3 different roles to solve one math problem.',
        xp: 50,
        icon: Shield
    },
];

const achievements = [
    { id: 'a1', name: 'First Prompt', icon: Star, unlocked: true },
    { id: 'a2', name: 'Context Master', icon: Target, unlocked: true },
    { id: 'a3', name: 'Prompt Architect', icon: Award, unlocked: false },
    { id: 'a4', name: 'Speed Demon', icon: Rocket, unlocked: false },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const [hasContext, setHasContext] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setHasContext(prev => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="db-page-v3">
            <div className="pixel-scanline" />

            {/* 0. MINI HERO */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="db-section db-mini-hero"
            >
                <div className="db-mini-hero-bg" />
                <div className="db-mini-hero-content" style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                    <div style={{ flex: 1 }}>
                        <h2 className="pixel-title" style={{ fontSize: '1.5rem', lineHeight: '1.3', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div>
                                Learn to communicate<br />
                                with AI <span style={{ color: 'var(--c-pixel-red)' }}>effectively</span>.
                            </div>

                            {/* Decorative Animation */}
                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    background: 'var(--c-pixel-yellow)',
                                    border: '3px solid black',
                                    boxShadow: '4px 4px 0px black'
                                }}
                            >
                                <Zap size={20} fill="#000" />
                            </motion.div>
                        </h2>
                        <p className="pixel-text" style={{ fontSize: '0.55rem', textTransform: 'none', lineHeight: '1.6', color: 'var(--c-pixel-gray)', maxWidth: '600px', margin: 0 }}>
                            Most people use AI tools daily but never unlocked their full potential.
                            Promptra teaches you prompt engineering through interactive lessons,
                            hands-on practice, and real feedback.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* 1. PLAYER STATUS */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="db-section db-player-status"
            >
                <div className="pixel-box pixel-grid-bg db-status-card">
                    <div className="db-status-left">
                        <div className="pixel-avatar-frame">
                            <Star fill="var(--c-pixel-black)" color="var(--c-pixel-black)" size={24} />
                            <div className="pixel-level-tag">LVL 3</div>
                        </div>
                        <div className="db-player-details">
                            <h1 className="pixel-title" style={{ fontSize: '1rem' }}>Raneem's Prompt Journey</h1>
                            <div className="db-xp-bar-group">
                                <div className="pixel-xp-text pixel-text" style={{ fontSize: '0.45rem', marginBottom: '4px' }}>
                                    XP 1,240 / 2,000
                                </div>
                                <div className="pixel-progress-container" style={{ height: '8px', width: '200px' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '62%' }}
                                        className="pixel-progress-fill"
                                        style={{ background: 'var(--c-pixel-yellow)' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn-pixel" onClick={() => navigate('/modules')}>
                        <span className="pixel-text" style={{ fontSize: '0.45rem' }}> My Journey</span>
                    </button>
                </div>
            </motion.section>

            {/* 2. NEXT STEP (PRIMARY FOCUS) */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="db-section db-next-step"
            >
                <h2 className="pixel-subtitle" style={{ color: 'var(--c-pixel-red)', marginBottom: '16px' }}>Continue Your Journey</h2>
                <div className="pixel-box db-next-card">
                    <div className="db-next-info">
                        <div className="db-next-header">
                            <span className="pixel-text" style={{ color: 'var(--c-pixel-yellow)', fontSize: '1.0rem' }}>CURRENT MODULE</span>
                            <h3 className="pixel-title" style={{ fontSize: '1.5rem', margin: '8px 0', color: 'white' }}>The Art of Context</h3>
                        </div>
                        <p className="pixel-text" style={{ fontSize: '0.6rem', textTransform: 'none', lineHeight: '1.6', color: '#e2e8f0', maxWidth: '500px' }}>
                            Master the technique of providing specific background information to get highly relevant AI responses.
                        </p>
                        <div className="db-next-footer" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <button className="btn-pixel" onClick={() => navigate('/modules')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--c-pixel-yellow)', color: 'black' }}>
                                <span className="pixel-text" style={{ fontSize: '0.55rem' }}>Continue Learning</span>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                    {/* Context Terminal Visual */}
                    <div className="db-context-terminal">
                        <div className="terminal-header">
                            <div className="terminal-dot" style={{ background: '#ff5f56' }} />
                            <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
                            <div className="terminal-dot" style={{ background: '#27c93f' }} />
                        </div>
                        <div className="terminal-content pixel-text">
                            <span className="p-bracket">&gt;</span> Write a plan...

                            <AnimatePresence mode="wait">
                                {hasContext ? (
                                    <motion.div
                                        key="with"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="context-layer"
                                    >
                                        <div className="line-item context-injected">
                                            <span className="p-mark">+</span> CONTEXT: Q1, Eco-startup
                                        </div>
                                        <div className="line-item result-clear">
                                            <Sparkles size={10} style={{ marginRight: 4 }} />
                                            Precise &amp; Actionable!
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="without"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="result-blurry"
                                    >
                                        Vague &amp; Generic...
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="context-meter-wrap">
                            <div className="pixel-text" style={{ fontSize: '0.3rem', marginBottom: '4px' }}>CONTEXT POWER</div>
                            <div className="context-meter-bg">
                                <motion.div
                                    className="context-meter-fill"
                                    animate={{ width: hasContext ? '100%' : '15%' }}
                                    style={{ background: hasContext ? '#34d399' : '#f87171' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            <div className="db-secondary-grid">
                {/* 3. SIDE QUESTS */}
                <section className="db-section db-side-quests">
                    <div className="db-section-header-compact">
                        <h2 className="pixel-subtitle" style={{ fontSize: '0.6rem' }}>Side Quests</h2>
                        <span className="pixel-text" style={{ fontSize: '0.4rem', color: 'var(--c-pixel-gray)' }}>Resets in 14h</span>
                    </div>
                    <div className="db-quest-stack">
                        {quests.map((q, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ x: 4 }}
                                className="pixel-box db-quest-item-compact"
                            >
                                <div className="db-quest-icon-mini" style={{ background: idx % 2 === 0 ? 'var(--c-pixel-yellow)' : 'var(--c-pixel-blue)' }}>
                                    <q.icon size={16} />
                                </div>
                                <div className="db-quest-content-mini">
                                    <h4 className="pixel-text" style={{ fontSize: '0.5rem' }}>{q.title}</h4>
                                    <span className="pixel-text" style={{ fontSize: '0.4rem', color: 'var(--c-pixel-red)' }}>+{q.xp} XP</span>
                                </div>
                                <button className="pixel-btn-link">
                                    <ChevronRight size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. ACHIEVEMENTS */}
                <section className="db-section db-achievements">
                    <h2 className="pixel-subtitle" style={{ fontSize: '0.6rem', marginBottom: '16px' }}>Medals</h2>
                    <div className="db-achievement-mini-grid">
                        {achievements.map((a) => (
                            <div key={a.id} className={`db-medal-mini ${a.unlocked ? 'unlocked' : 'locked'}`}>
                                <a.icon size={16} />
                                <div className="db-medal-tip pixel-box pixel-text">{a.name}</div>
                            </div>
                        ))}
                    </div>

                    <div className="db-streak-micro pixel-box">
                        <Flame size={14} fill="var(--c-pixel-red)" color="var(--c-pixel-red)" />
                        <span className="pixel-text" style={{ fontSize: '0.4rem' }}>3 DAY STREAK</span>
                    </div>
                </section>
            </div>
        </div>
    );
}
