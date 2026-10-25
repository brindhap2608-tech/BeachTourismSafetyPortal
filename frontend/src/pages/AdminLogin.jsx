import React, { useState } from 'react';

/**
 * AdminLogin Page Component (Frontend-Only Prototype)
 * Requirements:
 * - Admin email/username
 * - Password
 * - Show/Hide password
 * - Admin Login button (navigates to Admin Dashboard)
 * - Back to User Login link
 * - Back to Home link
 * - Existing BeachSafe design theme
 */
function AdminLogin({ navigateTo }) {
  const [adminIdentifier, setAdminIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (!adminIdentifier.trim() || !password.trim()) {
      setErrorMsg('Please enter both administrative ID/email and password.');
      return;
    }

    // Frontend validation & navigation to Admin Dashboard
    setErrorMsg('');
    if (navigateTo) {
      navigateTo('admin-dashboard');
    } else {
      window.location.hash = 'admin-dashboard';
    }
  };

  // Demo auto-fill for reviewers
  const handleQuickFill = () => {
    setAdminIdentifier('admin.supervisor@beachsafe.gov.in');
    setPassword('BeachSafe@Admin2026');
    setErrorMsg('');
  };

  return (
    <div className="page-wrapper admin-login-wrapper">
      {/* Background Ambience */}
      <div className="login-backdrop-elements">
        <div className="coastal-circle circle-admin-1"></div>
        <div className="coastal-circle circle-admin-2"></div>
      </div>

      <div className="login-container admin-login-container">
        <div className="login-card admin-login-card">
          {/* Card Header */}
          <div className="login-card-header">
            <div className="admin-badge-top">
              <span className="admin-shield-icon">🛡️</span> OFFICIAL ACCESS ONLY
            </div>
            <h1 className="login-title">Coastal Authority Portal</h1>
            <p className="login-subtitle">
              Secure administrative access for Lifeguard Supervisors, Marine Police,
              and Coastal Tourism Safety Directors.
            </p>
          </div>

          {/* Prototype Notice */}
          <div className="admin-prototype-notice">
            <span className="notice-icon">💡</span>
            <div className="notice-text">
              <strong>Admin Demo Environment</strong>
              <p>Click "Quick Fill Admin Credentials" to populate demo credentials, then press Login to open the Admin Dashboard.</p>
            </div>
          </div>

          {/* Error Message if any */}
          {errorMsg && (
            <div className="login-feedback feedback-error">
              <span>⚠️ {errorMsg}</span>
              <button
                type="button"
                className="feedback-dismiss"
                onClick={() => setErrorMsg('')}
              >
                ✕
              </button>
            </div>
          )}

          {/* Form */}
          <form className="login-form" onSubmit={handleAdminLogin}>
            {/* Admin Email or Username */}
            <div className="form-group">
              <label className="form-label" htmlFor="adminIdentifier">
                Department Email / Officer ID
              </label>
              <div className="input-group">
                <span className="input-icon">👮</span>
                <input
                  id="adminIdentifier"
                  type="text"
                  className="form-input"
                  placeholder="e.g. officer.name@beachsafe.gov.in"
                  value={adminIdentifier}
                  onChange={(e) => setAdminIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password with Show/Hide toggle */}
            <div className="form-group">
              <div className="label-row">
                <label className="form-label" htmlFor="adminPassword">
                  Security Passcode
                </label>
                <span className="admin-sec-badge">Encrypted 256-Bit</span>
              </div>
              <div className="input-group">
                <span className="input-icon">🔑</span>
                <input
                  id="adminPassword"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input password-input"
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️‍🗨️ Hide' : '👁️ Show'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkbox-label">Keep session authenticated on this patrol terminal</span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-admin-submit-large">
              🛡️ Authorize & Access Admin Dashboard
            </button>
          </form>

          {/* Review Quick Fill Button */}
          <div className="admin-quick-fill-bar">
            <button
              type="button"
              className="btn-quick-fill-admin"
              onClick={handleQuickFill}
            >
              ⚡ Quick Fill Admin Credentials (Demo)
            </button>
          </div>

          {/* Navigation Links */}
          <div className="admin-nav-links-footer">
            <button
              type="button"
              className="admin-link-btn"
              onClick={() => {
                if (navigateTo) navigateTo('login');
                else window.location.hash = 'login';
              }}
            >
              ← Back to User Login
            </button>

            <span className="nav-link-dot">•</span>

            <button
              type="button"
              className="admin-link-btn"
              onClick={() => {
                if (navigateTo) navigateTo('home');
                else window.location.hash = 'home';
              }}
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
