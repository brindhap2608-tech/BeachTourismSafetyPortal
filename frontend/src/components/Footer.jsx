import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * Shows quick navigation, emergency hotlines, and college project info
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <div className="footer-brand">
            <span className="brand-icon">🌊</span>
            <h3>BeachSafe Portal</h3>
          </div>
          <p className="footer-desc">
            An Interactive Beach Tourism & Safety Information Portal created for safe, informed coastal visits across India.
          </p>
          <p className="college-tag">🎓 College Final Project Model (Full MERN Stack)</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/beaches">Beach Directory (All 6 Beaches)</Link></li>
            <li><Link to="/safety">Safety Guidelines & Flag Meanings</Link></li>
            <li><Link to="/alerts">Real-time Weather & Sea Alerts</Link></li>
            <li><Link to="/admin">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Emergency Hotlines</h4>
          <div className="footer-emergency-box">
            <p><strong>🚨 Coast Guard SAR:</strong> <a href="tel:1554">1554</a></p>
            <p><strong>🚔 Police Helpline:</strong> <a href="tel:100">100 / 112</a></p>
            <p><strong>🚑 Medical Ambulance:</strong> <a href="tel:108">108</a></p>
            <p><strong>⚓ Coastal Police:</strong> <a href="tel:1093">1093</a></p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Interactive Beach Tourism & Safety Information Portal. Developed for Academic Review.</p>
      </div>
    </footer>
  );
}

export default Footer;
