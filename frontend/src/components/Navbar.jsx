import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

/**
 * Navbar Component
 * Navigation bar with links to all 9 features and user login state
 */
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  // Sync logged in user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('beachUser');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('beachUser');
    setCurrentUser(null);
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return 'nav-link active';
    if (path !== '/' && location.pathname.startsWith(path)) return 'nav-link active';
    return 'nav-link';
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Brand / Logo */}
        <Link to="/" className="brand">
          <span className="brand-icon">🌊</span>
          <span className="brand-title">BeachSafe</span>
          <span className="brand-subtitle">Tourism & Safety</span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/beaches" className={isActive('/beaches')}>Beaches</Link>
          <Link to="/safety" className={isActive('/safety')}>Safety Guidelines</Link>
          <Link to="/alerts" className={isActive('/alerts')}>
            Alerts <span className="nav-alert-dot"></span>
          </Link>
          <Link to="/emergency" className={isActive('/emergency')}>Emergency</Link>
          <Link to="/admin" className={isActive('/admin')}>Admin</Link>
        </nav>

        {/* User Auth Info / Actions */}
        <div className="nav-auth">
          {currentUser ? (
            <div className="user-logged-box">
              <span className="user-greeting">
                👋 {currentUser.name || currentUser.email}
                {currentUser.role === 'admin' && <span className="admin-chip">Admin</span>}
              </span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-nav-login">Login</Link>
              <Link to="/register" className="btn-nav-register">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
