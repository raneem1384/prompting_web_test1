import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, BrainCircuit, TrendingUp, ChevronRight } from 'lucide-react';
import './Landing.css';

const features = [
    {
        icon: BrainCircuit,
        title: 'Structured Lessons',
        desc: 'Bite-sized modules that break down prompt engineering into clear, teachable concepts.',
    },
    {
        icon: Sparkles,
        title: 'Prompt Builder',
        desc: 'Assemble prompts component by component with a live preview updating in real time.',
    },
    {
        icon: Target,
        title: 'AI Prompt Coach',
        desc: 'Submit any prompt and receive a quality score, gap analysis, and an improved version.',
    },
    {
        icon: TrendingUp,
        title: 'Track Your Progress',
        desc: 'Earn XP, level up, and measure your improvement with every lesson completed.',
    },
];

const steps = [
    { n: '01', title: 'Choose a module', desc: 'Start with the basics or jump to the technique you need.' },
    { n: '02', title: 'Build your prompt', desc: 'Use the guided Prompt Builder to structure your ideas clearly.' },
    { n: '03', title: 'Get coached', desc: 'Submit your prompt for instant, actionable AI feedback.' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function Landing() {
    const navigate = useNavigate();
    return (
        <div className="landing">
            {/* ── Header ── */}
            <header className="l-header">
                <div className="l-header-inner">
                    <div className="l-logo">
                        <div className="l-logo-mark">IQ</div>
                        <span>PromptIQ</span>
                    </div>
                    <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>
                        Open App <ArrowRight size={14} />
                    </button>
                </div>
            </header>

            {/* ── Hero ── */}
            <section className="l-hero">
                <motion.div
                    className="l-hero-inner"
                    initial="hidden" animate="show" variants={stagger}
                >
                    <motion.span variants={fadeUp} className="chip chip-amber" style={{ alignSelf: 'center', marginBottom: 20 }}>
                        Interactive Learning Platform
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="l-hero-title">
                        Learn to communicate<br />
                        with AI <span className="l-hero-highlight">effectively</span>.
                    </motion.h1>
                    <motion.p variants={fadeUp} className="l-hero-desc">
                        Most people use AI tools daily but never unlocked their full potential.
                        PromptIQ teaches you prompt engineering through interactive lessons,
                        hands-on practice, and real feedback — not passive video lectures.
                    </motion.p>
                    <motion.div variants={fadeUp} className="l-hero-actions">
                        <button className="btn btn-amber" onClick={() => navigate('/dashboard')}>
                            Start Learning Free <ArrowRight size={15} />
                        </button>
                        <button className="btn btn-outline" onClick={() => navigate('/builder')}>
                            Try Prompt Builder
                        </button>
                    </motion.div>
                    <motion.div variants={fadeUp} className="l-hero-proof">
                        <span>5 Modules</span>
                        <span className="l-proof-dot" />
                        <span>Interactive Quizzes</span>
                        <span className="l-proof-dot" />
                        <span>AI Prompt Coach</span>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── Features ── */}
            <section className="l-section">
                <div className="l-section-inner">
                    <motion.div
                        className="l-section-header"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="eyebrow">What you get</span>
                        <h2 className="l-section-title">Everything to master prompt engineering</h2>
                    </motion.div>
                    <motion.div
                        className="l-features-grid"
                        initial="hidden" whileInView="show" viewport={{ once: true }}
                        variants={stagger}
                    >
                        {features.map(({ icon: Icon, title, desc }) => (
                            <motion.div key={title} variants={fadeUp} className="l-feature-card card">
                                <div className="l-feature-icon">
                                    <Icon size={18} strokeWidth={1.8} />
                                </div>
                                <h3 className="l-feature-title">{title}</h3>
                                <p className="l-feature-desc">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── How it works ── */}
            <section className="l-section l-section-alt">
                <div className="l-section-inner">
                    <motion.div
                        className="l-section-header"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="eyebrow">How it works</span>
                        <h2 className="l-section-title">Three steps to prompt mastery</h2>
                    </motion.div>
                    <motion.div
                        className="l-steps"
                        initial="hidden" whileInView="show" viewport={{ once: true }}
                        variants={stagger}
                    >
                        {steps.map((s, i) => (
                            <motion.div key={s.n} variants={fadeUp} className="l-step">
                                <div className="l-step-num">{s.n}</div>
                                <h3 className="l-step-title">{s.title}</h3>
                                <p className="l-step-desc">{s.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="l-cta">
                <motion.div
                    className="l-cta-inner"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                >
                    <h2 className="l-cta-title">Ready to write better prompts?</h2>
                    <p className="l-cta-desc">
                        Join learners building real AI skills through practice, not passive reading.
                    </p>
                    <button
                        className="btn btn-amber"
                        style={{ fontSize: '1rem', padding: '13px 32px' }}
                        onClick={() => navigate('/dashboard')}
                    >
                        Start for Free <ArrowRight size={16} />
                    </button>
                </motion.div>
            </section>

            <footer className="l-footer">
                <span className="l-footer-brand">PromptIQ</span>
                <span className="l-footer-copy">&copy; 2026 · Interactive Prompt Engineering Platform</span>
            </footer>
        </div>
    );
}
