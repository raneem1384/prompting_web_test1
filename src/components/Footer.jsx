import React from 'react';
import './Footer.css';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="pixel-text" style={{ fontSize: '0.8rem', color: 'var(--c-pixel-yellow)', marginBottom: '16px' }}>Promptra</h3>
                    <p className="pixel-text" style={{ fontSize: '0.5rem', color: 'var(--c-pixel-gray)', maxWidth: '300px', lineHeight: '1.6', textTransform: 'none' }}>
                        Master the art of prompt engineering with interactive lessons, hands-on tools, and gamified challenges.
                    </p>
                </div>
                <div className="footer-section">
                    <h4 className="pixel-text" style={{ fontSize: '0.6rem', marginBottom: '12px' }}>Links</h4>
                    <ul className="footer-links">
                        <li><a href="#" className="pixel-text">About Us</a></li>
                        <li><a href="#" className="pixel-text">Documentation</a></li>
                        <li><a href="#" className="pixel-text">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="pixel-text" style={{ fontSize: '0.6rem', marginBottom: '12px' }}>Connect</h4>
                    <div className="footer-socials">
                        <a href="#" className="social-icon"><Twitter size={18} /></a>
                        <a href="#" className="social-icon"><Github size={18} /></a>
                        <a href="#" className="social-icon"><Mail size={18} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="pixel-text" style={{ fontSize: '0.45rem', color: 'var(--c-pixel-gray)' }}>
                    &copy; 2026 Promptra. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
