import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Wand2, FlaskConical, Zap, Flame } from 'lucide-react';
import './Navigation.css';

const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/modules', icon: BookOpen, label: 'Modules' },
    { to: '/builder', icon: Wand2, label: 'Prompt Builder' },
    { to: '/playground', icon: FlaskConical, label: 'Playground' },
];

export default function Navigation() {
    const navigate = useNavigate();
    return (
        <aside className="nav-sidebar">
            <div className="nav-logo" onClick={() => navigate('/')}>
                <div className="nav-logo-mark">
                    <Zap size={15} strokeWidth={2.5} />
                </div>
                <span className="nav-logo-text">PromptIQ</span>
            </div>

            <nav className="nav-links">
                {links.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    >
                        <Icon size={16} strokeWidth={isActive => isActive ? 2.5 : 1.8} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="nav-streak">
                <Flame size={14} className="nav-streak-icon" />
                <div className="nav-streak-info">
                    <span className="nav-streak-label">3-day streak</span>
                    <div className="progress-track" style={{ marginTop: 5 }}>
                        <div className="progress-fill" style={{ width: '60%' }} />
                    </div>
                </div>
            </div>
        </aside>
    );
}
