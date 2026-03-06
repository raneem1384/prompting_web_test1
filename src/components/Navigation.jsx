import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Wand2, FlaskConical, Zap, Flame, ChevronDown, User, Globe, Bell, Search, Settings } from 'lucide-react';
import './Navigation.css';
const links = [
    { to: '/', label: 'main dashboard', icon: LayoutDashboard },
    { to: '/modules', label: 'learning path', icon: BookOpen },
    { to: '/builder', label: 'prompt builder', icon: Wand2 },
    { to: '/playground', label: 'playground', icon: FlaskConical },
];

export default function Navigation() {
    const navigate = useNavigate();

    return (
        <header className="nav-top-header">
            <div className="nav-container">
                <div className="nav-logo-pixel" onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/logo-new.png" alt="Promptra Logo" className="nav-custom-logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
                    <span className="pixel-text logo-text" style={{ fontSize: '0.9rem', marginLeft: '12px', fontWeight: 'bold' }}>Promptra</span>
                </div>

                {/* Main Navigation Links */}
                <nav className="nav-pills-container">
                    <div className="nav-pills-box pixel-box">
                        {links.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) => `nav-pill-link pixel-text ${isActive ? 'active' : ''}`}
                            >
                                <div className="nav-pill-content">
                                    <Icon size={18} className="nav-pill-icon" />
                                    <span>{label}</span>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* User & Controls Info */}
                <div className="nav-user-controls">
                    <div className="nav-actions">
                        <button className="nav-action-btn"><Search size={18} /></button>
                        <button className="nav-action-btn">
                            <Bell size={18} />
                            <span className="nav-badge">3</span>
                        </button>
                        <button className="nav-action-btn"><Settings size={18} /></button>
                    </div>
                    <div className="nav-divider"></div>
                    <div className="nav-user-group pixel-text">
                        <ChevronDown size={16} />
                        <span className="user-id">Raneem</span>
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
