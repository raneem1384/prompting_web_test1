import { useNavigate } from 'react-router-dom';
import { BookOpen, Lock, CheckCircle2, Clock, ChevronRight, Star } from 'lucide-react';
import './Modules.css';

const modules = [
    {
        id: 1, title: 'Prompt Basics', icon: '🧠',
        desc: 'Understand what a prompt is, how AI models process them, and why wording matters.',
        status: 'done', lessons: 4, xp: 100,
        topics: ['What is a prompt?', 'How AI reads input', 'Common mistakes', 'Your first prompt'],
    },
    {
        id: 2, title: 'Prompt Structure', icon: '🏗️',
        desc: 'Learn the five core components of an effective prompt: Role, Task, Context, Format, and Constraints.',
        status: 'active', lessons: 5, xp: 120,
        topics: ['Role assignment', 'Task clarity', 'Adding context', 'Output formats', 'Setting constraints'],
    },
    {
        id: 3, title: 'Context & Constraints', icon: '🎯',
        desc: 'Guide AI behavior with precise context. Limit, focus, and shape responses using constraints.',
        status: 'locked', lessons: 5, xp: 150,
        topics: ['Why context matters', 'Relevant vs. noise', 'Constraint types', 'Negative constraints', 'Applied practice'],
    },
    {
        id: 4, title: 'Improving AI Responses', icon: '⚡',
        desc: 'Learn to evaluate AI output, identify weaknesses, and iteratively improve your prompts.',
        status: 'locked', lessons: 6, xp: 180,
        topics: ['Reading AI responses', 'Evaluation rubrics', 'Iterative prompting', 'Follow-up prompts', 'Tone control', 'Formatting mastery'],
    },
    {
        id: 5, title: 'Advanced Techniques', icon: '🚀',
        desc: 'Dive into chain-of-thought, few-shot prompting, system messages, and meta-prompts.',
        status: 'locked', lessons: 7, xp: 200,
        topics: ['Chain-of-thought', 'Few-shot examples', 'Zero-shot vs few-shot', 'System messages', 'Meta-prompting', 'Persona stacking', 'Prompt testing'],
    },
];

const statusLabel = { done: 'Completed', active: 'In Progress', locked: 'Locked' };
const statusBadge = { done: 'badge-green', active: 'badge-primary', locked: '' };

export default function Modules() {
    const navigate = useNavigate();
    return (
        <div className="page animate-fadeIn">
            <div className="modules-header">
                <div>
                    <p className="section-label">Learning Path</p>
                    <h1 className="modules-title">All Modules</h1>
                    <p style={{ color: 'var(--color-muted)', marginTop: 6 }}>
                        Complete modules in order to unlock advanced content and earn XP.
                    </p>
                </div>
            </div>

            <div className="modules-grid">
                {modules.map((m) => (
                    <div key={m.id} className={`module-card card ${m.status}`}>
                        <div className="module-card-header">
                            <div className="module-card-icon">{m.icon}</div>
                            <div className="module-card-status">
                                {m.status === 'done' && <span className={`badge ${statusBadge.done}`}><CheckCircle2 size={11} />{statusLabel.done}</span>}
                                {m.status === 'active' && <span className={`badge ${statusBadge.active}`}><Clock size={11} />{statusLabel.active}</span>}
                                {m.status === 'locked' && <span className="badge" style={{ background: 'var(--color-surface2)', color: 'var(--color-subtle)' }}><Lock size={11} />{statusLabel.locked}</span>}
                            </div>
                        </div>

                        <h2 className="module-card-title">{m.title}</h2>
                        <p className="module-card-desc">{m.desc}</p>

                        <div className="module-topics">
                            {m.topics.map(t => <span className="tag" key={t}>{t}</span>)}
                        </div>

                        <div className="module-card-footer">
                            <div className="module-meta">
                                <span className="module-meta-item"><BookOpen size={13} />{m.lessons} lessons</span>
                                <span className="module-meta-item"><Star size={13} />+{m.xp} XP</span>
                            </div>
                            <button
                                className={`btn ${m.status === 'locked' ? 'btn-ghost' : 'btn-primary'}`}
                                style={{ fontSize: '0.85rem', padding: '9px 18px' }}
                                onClick={() => m.status !== 'locked' && navigate(`/lesson/${m.id}`)}
                                disabled={m.status === 'locked'}
                            >
                                {m.status === 'done' ? 'Review' : m.status === 'active' ? 'Continue' : 'Locked'}
                                {m.status !== 'locked' && <ChevronRight size={14} />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
