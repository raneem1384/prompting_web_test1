import { useNavigate } from 'react-router-dom';
import { Trophy, Flame, Star, BookOpen, Zap, ChevronRight, Lock, CheckCircle2, Clock } from 'lucide-react';
import './Dashboard.css';

const modules = [
    { id: 1, title: 'Prompt Basics', desc: 'What is a prompt and why it matters', xp: 100, status: 'done', lessons: 4, icon: '🧠' },
    { id: 2, title: 'Prompt Structure', desc: 'Role, Task, Context in action', xp: 120, status: 'active', lessons: 5, icon: '🏗️' },
    { id: 3, title: 'Context & Constraints', desc: 'Guide AI with precision', xp: 150, status: 'locked', lessons: 5, icon: '🎯' },
    { id: 4, title: 'Improving Responses', desc: 'Iterate and refine your prompts', xp: 180, status: 'locked', lessons: 6, icon: '⚡' },
    { id: 5, title: 'Advanced Techniques', desc: 'Chain-of-thought, few-shot & more', xp: 200, status: 'locked', lessons: 7, icon: '🚀' },
];

const badges = [
    { emoji: '🧠', label: 'First Prompt', earned: true },
    { emoji: '🔥', label: '3-Day Streak', earned: true },
    { emoji: '🏗️', label: 'Builder', earned: false },
    { emoji: '🎯', label: 'Sharpshooter', earned: false },
    { emoji: '⭐', label: 'Star Learner', earned: false },
    { emoji: '🚀', label: 'Promptonaut', earned: false },
];

const dailyChallenges = [
    { emoji: '💡', title: 'Write a prompt for a recipe assistant', xp: 30, difficulty: 'Easy' },
    { emoji: '🧪', title: 'Add a constraint to limit response length', xp: 50, difficulty: 'Medium' },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const xp = 340;
    const maxXp = 500;
    const level = 4;

    return (
        <div className="page dashboard animate-fadeIn">
            {/* ── Welcome ── */}
            <div className="dash-welcome">
                <div>
                    <h1 className="dash-title">Welcome back 👋</h1>
                    <p style={{ color: 'var(--color-muted)', marginTop: 4 }}>Keep up the momentum — you're on a roll!</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/modules')}>
                    Continue Learning <ChevronRight size={16} />
                </button>
            </div>

            {/* ── Stats ── */}
            <div className="dash-stats grid-4">
                <div className="dash-stat-card card">
                    <div className="dash-stat-icon" style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}><Star size={20} /></div>
                    <div className="dash-stat-val">{xp}</div>
                    <div className="dash-stat-label">Total XP</div>
                </div>
                <div className="dash-stat-card card">
                    <div className="dash-stat-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}><Flame size={20} /></div>
                    <div className="dash-stat-val">3</div>
                    <div className="dash-stat-label">Day Streak</div>
                </div>
                <div className="dash-stat-card card">
                    <div className="dash-stat-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}><BookOpen size={20} /></div>
                    <div className="dash-stat-val">12</div>
                    <div className="dash-stat-label">Lessons Done</div>
                </div>
                <div className="dash-stat-card card">
                    <div className="dash-stat-icon" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}><Trophy size={20} /></div>
                    <div className="dash-stat-val">2</div>
                    <div className="dash-stat-label">Badges Earned</div>
                </div>
            </div>

            {/* ── Level Progress ── */}
            <div className="section">
                <div className="dash-level-card card" style={{ padding: 24 }}>
                    <div className="dash-level-header">
                        <div className="dash-level-badge">
                            <Zap size={16} />
                            Level {level}
                        </div>
                        <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
                            {xp} / {maxXp} XP to Level {level + 1}
                        </span>
                    </div>
                    <div className="progress-bar-track" style={{ marginTop: 14, height: 10 }}>
                        <div className="progress-bar-fill" style={{ width: `${(xp / maxXp) * 100}%` }} />
                    </div>
                    <div className="dash-level-desc">
                        Complete more lessons and challenges to reach <strong>Level {level + 1}</strong>.
                    </div>
                </div>
            </div>

            <div className="dash-columns">
                {/* ── Learning Path ── */}
                <div className="section dash-modules">
                    <h2 className="dash-section-title"><BookOpen size={18} /> Learning Path</h2>
                    <div className="modules-list">
                        {modules.map((m) => (
                            <div
                                key={m.id}
                                className={`module-row card ${m.status}`}
                                onClick={() => m.status !== 'locked' && navigate(`/lesson/${m.id}`)}
                                style={{ cursor: m.status === 'locked' ? 'default' : 'pointer' }}
                            >
                                <div className="module-row-icon">{m.icon}</div>
                                <div className="module-row-info">
                                    <div className="module-row-title">{m.title}</div>
                                    <div className="module-row-desc">{m.desc}</div>
                                    <div className="module-row-meta">
                                        <span className="tag">{m.lessons} lessons</span>
                                        <span className="tag">+{m.xp} XP</span>
                                    </div>
                                </div>
                                <div className="module-row-status">
                                    {m.status === 'done' && <CheckCircle2 size={20} color="var(--color-green)" />}
                                    {m.status === 'active' && <Clock size={20} color="var(--color-primary)" />}
                                    {m.status === 'locked' && <Lock size={20} color="var(--color-subtle)" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dash-right-col">
                    {/* ── Daily Challenges ── */}
                    <div className="section">
                        <h2 className="dash-section-title"><Flame size={18} /> Daily Challenges</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {dailyChallenges.map(c => (
                                <div key={c.title} className="challenge-card card" style={{ padding: 18 }}>
                                    <div className="challenge-header">
                                        <span className="challenge-emoji">{c.emoji}</span>
                                        <div>
                                            <div className="challenge-title">{c.title}</div>
                                            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                                                <span className="badge badge-amber">{c.difficulty}</span>
                                                <span className="badge badge-primary">+{c.xp} XP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-secondary" style={{ marginTop: 12, width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                                        onClick={() => navigate('/playground')}>
                                        Start Challenge
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Badges ── */}
                    <div className="section">
                        <h2 className="dash-section-title"><Trophy size={18} /> Badges</h2>
                        <div className="badges-grid">
                            {badges.map(b => (
                                <div key={b.label} className={`badge-item ${b.earned ? 'earned' : 'locked'}`}>
                                    <span className="badge-emoji">{b.emoji}</span>
                                    <span className="badge-label">{b.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
