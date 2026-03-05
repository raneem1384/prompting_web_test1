import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Star, Zap, Lock, CheckCircle2, ChevronRight, PlayCircle, Trophy } from 'lucide-react';
import './Modules.css';

const modules = [
    {
        id: 1,
        title: 'Prompt Basics',
        desc: 'Master the fundamental structure of effective AI communication.',
        lessons: 4, xp: 100, status: 'done',
        color: '#10b981' // green
    },
    {
        id: 2,
        title: 'The Role Technique',
        desc: 'Learn how to give AI a specific identity to improve response quality.',
        lessons: 5, xp: 150, status: 'active',
        color: '#f59e0b' // amber
    },
    {
        id: 3,
        title: 'Context & Framing',
        desc: 'Techniques for providing the right background info for complex tasks.',
        lessons: 6, xp: 200, status: 'locked',
        color: '#6366f1' // indigo
    },
    {
        id: 4,
        title: 'Output Formatting',
        desc: 'Controlling how AI presents its answers (tables, JSON, lists).',
        lessons: 3, xp: 120, status: 'locked',
        color: '#ec4899' // pink
    },
    {
        id: 5,
        title: 'Advanced Iteration',
        desc: 'Refining prompts and using multi-step chains for power users.',
        lessons: 8, xp: 300, status: 'locked',
        color: '#8b5cf6' // violet
    },
];

export default function Modules() {
    const navigate = useNavigate();

    return (
        <div className="modules-pixel-page">
            <div className="pixel-scanline" />

            <header className="pixel-page-header pixel-box pixel-grid-bg">
                <div className="pixel-header-content">
                    <span className="pixel-subtitle" style={{ color: 'var(--c-pixel-black)', fontWeight: 'bold' }}>WORLD 1-1</span>
                    <h1 className="pixel-title" style={{ margin: 0 }}>Learning Path</h1>
                </div>
                <div className="pixel-stats-bar pixel-box" style={{ padding: '0.5rem 1rem' }}>
                    <div className="pixel-stat-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Star size={18} fill="var(--c-pixel-yellow)" color="#000" />
                        <span className="pixel-text">LVL 4</span>
                    </div>
                </div>
            </header>

            <div className="pixel-modules-grid">
                {modules.map((m, idx) => {
                    return (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <div
                                className={`pixel-module-card pixel-box ${m.status}`}
                                onClick={() => m.status !== 'locked' && navigate(`/lesson/${m.id}`)}
                            >
                                <div className="pixel-module-header">
                                    <div className="pixel-module-icon-box" style={{
                                        backgroundColor: m.status === 'done' ? 'var(--c-pixel-green)' :
                                            m.status === 'locked' ? 'var(--c-pixel-light-gray)' :
                                                'var(--c-pixel-yellow)'
                                    }}>
                                        {m.status === 'done' ? <CheckCircle2 size={24} color="#000" /> :
                                            m.status === 'locked' ? <Lock size={24} color="#666" /> :
                                                <PlayCircle size={24} color="#000" />}
                                    </div>
                                    <span className="pixel-text" style={{ fontSize: '0.45rem', opacity: 0.7 }}>MODULE 0{m.id}</span>
                                </div>

                                <h3 className="pixel-text" style={{ fontSize: '0.75rem', margin: '12px 0 8px' }}>{m.title}</h3>
                                <p className="pixel-module-desc" style={{ fontSize: '0.8rem', color: 'var(--c-pixel-gray)', marginBottom: '16px', lineHeight: '1.4' }}>{m.desc}</p>

                                <div className="pixel-module-footer" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="pixel-text" style={{ fontSize: '0.5rem', color: 'var(--c-pixel-red)' }}>+{m.xp} XP</span>
                                    {m.status !== 'locked' ? (
                                        <button className="pixel-btn-link pixel-text" style={{ color: 'var(--c-pixel-blue)', display: 'flex', alignItems: 'center' }}>
                                            Play <ChevronRight size={14} />
                                        </button>
                                    ) : (
                                        <span className="pixel-text" style={{ fontSize: '0.45rem', color: '#666' }}>LOCKED</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* END GOAL CARD */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="pixel-module-card pixel-box mastery-card"
                    style={{ background: 'var(--c-pixel-black)', color: 'var(--c-pixel-yellow)', border: '4px solid var(--c-pixel-yellow)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                >
                    <Trophy size={32} />
                    <span className="pixel-text" style={{ fontSize: '0.7rem', marginTop: '12px' }}>World Mastery</span>
                </motion.div>
            </div>
        </div>
    );
}
