import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Wand2, FlaskConical, Zap, Flame, ChevronDown, User } from 'lucide-react';
import './Navigation.css';

const links = [
    { to: '/dashboard', label: 'main dashboard' },
    { to: '/modules', label: 'modules v' },
    { to: '/builder', label: 'prompt builder' },
    { to: '/playground', label: 'playground' },
];

export default function Navigation() {
    const navigate = useNavigate();
    return (
        <header className="nav-top-header">
            <div className="nav-container">
                {/* Logo Section */}
                <div className="nav-logo-pixel" onClick={() => navigate('/')}>
                    <div className="nav-logo-mark-pixel">
                        <Zap size={20} fill="var(--c-pixel-yellow)" color="black" />
                    </div>
                    <span className="pixel-text logo-text">Promtra</span>
                </div>

                {/* Main Navigation Links */}
                <nav className="nav-pills-container">
                    <div className="nav-pills-box pixel-box">
                        {links.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) => `nav-pill-link pixel-text ${isActive ? 'active' : ''}`}
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* User & Streak Info */}
                <div className="nav-user-controls">
                    <div className="nav-user-group pixel-text">
                        <ChevronDown size={16} />
                        <span className="user-id">tnew-187628521</span>
                        <div className="user-avatar-mini">
                            <User size={14} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Optional bottom border or shadow can be handled in CSS */}
        </header>
    );
}
