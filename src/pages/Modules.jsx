import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Lock, CheckCircle2, ChevronRight, PlayCircle, Trophy } from 'lucide-react';
import './Modules.css';

const modules = [
    {
        id: 1,
        title: 'Prompt Basics',
        desc: 'Master the fundamental structure of effective AI communication.',
        lessons: 4, xp: 100, status: 'done',
        color: '#10b981'
    },
    {
        id: 2,
        title: 'The Role Technique',
        desc: 'Learn how to give AI a specific identity to improve response quality.',
        lessons: 5, xp: 150, status: 'active',
        color: '#f59e0b'
    },
    {
        id: 3,
        title: 'Context & Framing',
        desc: 'Techniques for providing the right background info for complex tasks.',
        lessons: 6, xp: 200, status: 'locked',
        color: '#6366f1'
    },
    {
        id: 4,
        title: 'Output Formatting',
        desc: 'Controlling how AI presents its answers (tables, JSON, lists).',
        lessons: 3, xp: 120, status: 'locked',
        color: '#ec4899'
    },
    {
        id: 5,
        title: 'Advanced Iteration',
        desc: 'Refining prompts and multi-step chains for power users.',
        lessons: 8, xp: 300, status: 'locked',
        color: '#8b5cf6'
    },
];

const allStops = [...modules, { id: 'trophy', status: 'trophy' }];

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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Star size={18} fill="var(--c-pixel-yellow)" color="#000" />
                        <span className="pixel-text">LVL 4</span>
                    </div>
                </div>
            </header>

            <div className="modules-grid-container">
                <div className="modules-path-grid">
                    {allStops.map((m, idx) => {
                        // Calculate grid position (3 columns)
                        // This creates a "Snake/Zig-Zag" pattern
                        const row = Math.floor(idx / 3);
                        const col = row % 2 === 0 ? (idx % 3) : (2 - (idx % 3));

                        return (
                            <motion.div
                                key={m.id}
                                className={`modules-grid-item ${m.status}`}
                                style={{ gridRow: row + 1, gridColumn: col + 1 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => m.status !== 'locked' && m.status !== 'trophy' && navigate(`/lesson/${m.id}`)}
                            >
                                {/* The Connection Path (drawn behind) */}
                                {idx < allStops.length - 1 && (
                                    <div className={`path-connector next-${row % 2 === 0 ? 'right' : 'left'}`} />
                                )}

                                <div className="module-node-wrap">
                                    <div className={`module-pixel-node ${m.status}`} style={{ background: m.status === 'done' ? m.color : m.status === 'active' ? 'var(--c-pixel-yellow)' : '#555' }}>
                                        {m.status === 'done' && <CheckCircle2 size={18} color="#fff" />}
                                        {m.status === 'active' && <PlayCircle size={18} color="#000" />}
                                        {m.status === 'locked' && <Lock size={16} color="#888" />}
                                        {m.status === 'trophy' && <Trophy size={20} color="var(--c-pixel-yellow)" />}
                                    </div>

                                    <div className="module-node-label pixel-text">
                                        <div className="m-title">{m.title || 'World End'}</div>
                                        <div className="m-xp">{m.xp ? `+${m.xp} XP` : 'GLORY'}</div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
