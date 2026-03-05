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
        <div className="landing-pixel-v3">
            <div className="pixel-scanline" />

            {/* ── Header ── */}
            <header className="l-header-pixel pixel-box">
                <div className="l-header-inner">
                    <div className="l-logo-pixel" onClick={() => navigate('/')}>
                        <div className="l-logo-mark-pixel">
                            <Zap size={18} fill="var(--c-pixel-yellow)" color="black" />
                        </div>
                        <span className="pixel-text" style={{ fontSize: '0.7rem' }}>PromptIQ</span>
                    </div>
                    <button className="btn-pixel btn-pixel-secondary" onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px' }}>
                        <span className="pixel-text" style={{ fontSize: '0.45rem' }}>Open App</span> <ArrowRight size={14} />
                    </button>
                </div>
            </header>

            {/* ── Hero ── */}
            <section className="l-hero-pixel pixel-grid-bg">
                <motion.div
                    className="l-hero-inner-pixel"
                    initial="hidden" animate="show" variants={stagger}
                >
                    <motion.div variants={fadeUp} className="pixel-box" style={{ background: 'var(--c-pixel-yellow)', padding: '6px 12px', alignSelf: 'center', marginBottom: 24 }}>
                        <span className="pixel-text" style={{ fontSize: '0.4rem' }}>Interactive Learning Platform</span>
                    </motion.div>
                    <motion.h1 variants={fadeUp} className="pixel-title l-hero-title-pixel" style={{ fontSize: '2.5rem', textAlign: 'center', lineHeight: '1.2' }}>
                        Learn to communicate<br />
                        with AI <span style={{ color: 'var(--c-pixel-red)' }}>effectively</span>.
                    </motion.h1>
                    <motion.p variants={fadeUp} className="pixel-text l-hero-desc-pixel" style={{ textAlign: 'center', maxWidth: '700px', margin: '24px auto', fontSize: '0.6rem', lineHeight: '1.8', textTransform: 'none', color: 'var(--c-pixel-gray)' }}>
                        Most people use AI tools daily but never unlocked their full potential.
                        PromptIQ teaches you prompt engineering through interactive lessons,
                        hands-on practice, and real feedback — not passive video lectures.
                    </motion.p>
                    <motion.div variants={fadeUp} className="l-hero-actions-pixel" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button className="btn-pixel" onClick={() => navigate('/dashboard')} style={{ padding: '16px 32px' }}>
                            <span className="pixel-text" style={{ fontSize: '0.6rem' }}>Start Learning</span> <ArrowRight size={18} />
                        </button>
                        <button className="btn-pixel btn-pixel-secondary" onClick={() => navigate('/builder')} style={{ padding: '16px 32px' }}>
                            <span className="pixel-text" style={{ fontSize: '0.6rem' }}>Try Builder</span>
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── Features ── */}
            <section className="l-section-pixel">
                <div className="l-section-inner-pixel">
                    <motion.div
                        className="l-section-header-pixel"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        <span className="pixel-subtitle" style={{ color: 'var(--c-pixel-red)' }}>What you get</span>
                        <h2 className="pixel-title" style={{ marginTop: '12px' }}>Everything to master prompt engineering</h2>
                    </motion.div>
                    <motion.div
                        className="l-features-grid-pixel"
                        initial="hidden" whileInView="show" viewport={{ once: true }}
                        variants={stagger}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}
                    >
                        {features.map(({ icon: Icon, title, desc }) => (
                            <motion.div key={title} variants={fadeUp} className="pixel-box" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div className="pixel-icon-box" style={{ width: '40px', height: '40px', background: 'var(--c-pixel-yellow)', border: '3px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon size={18} />
                                </div>
                                <h3 className="pixel-text" style={{ fontSize: '0.6rem' }}>{title}</h3>
                                <p className="pixel-text" style={{ fontSize: '0.45rem', textTransform: 'none', lineHeight: '1.6', color: 'var(--c-pixel-gray)' }}>{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="l-cta-pixel" style={{ padding: '100px 24px', background: 'var(--c-pixel-black)', color: 'white' }}>
                <motion.div
                    className="l-cta-inner-pixel"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                >
                    <h2 className="pixel-title" style={{ color: 'var(--c-pixel-yellow)', marginBottom: '24px' }}>Ready to write better prompts?</h2>
                    <p className="pixel-text" style={{ fontSize: '0.6rem', textTransform: 'none', marginBottom: '32px', opacity: 0.8 }}>
                        Join learners building real AI skills through practice, not passive reading.
                    </p>
                    <button
                        className="btn-pixel"
                        style={{ padding: '16px 40px' }}
                        onClick={() => navigate('/dashboard')}
                    >
                        <span className="pixel-text" style={{ fontSize: '0.7rem' }}>Start for Free</span> <ArrowRight size={20} />
                    </button>
                </motion.div>
            </section>

            <footer className="l-footer-pixel" style={{ padding: '40px 24px', textAlign: 'center', borderTop: '4px solid black' }}>
                <span className="pixel-text" style={{ fontSize: '0.6rem' }}>PROMPTIQ</span>
                <p className="pixel-text" style={{ fontSize: '0.4rem', marginTop: '12px', opacity: 0.5 }}>&copy; 2026 · Interactive Prompt Engineering Platform</p>
            </footer>
        </div>
    );
}
