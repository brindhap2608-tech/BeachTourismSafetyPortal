import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Login Page Component
 * Simple user authentication connected to POST /api/login
 */
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Login successful! Redirecting...');
        localStorage.setItem('beachUser', JSON.stringify(data.user));
        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        setError(data.message || 'Login failed. Check your email and password.');
      }
    } catch (err) {
      setError('Cannot connect to backend server. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Quick autofill buttons for evaluation
  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">🌊</span>
          <h2>Sign In to BeachSafe</h2>
          <p className="text-muted">Access tourist reviews, bookmark favorites, and post safety alerts.</p>
        </div>

        {error && <div className="alert-box alert-error">{error}</div>}
        {success && <div className="alert-box alert-success">{success}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. tourist@beachtourism.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary-block"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="demo-credentials-box">
          <h4>⚡ Quick One-Click Demo Credentials:</h4>
          <div className="demo-btn-group">
            <button
              type="button"
              onClick={() => fillDemo('tourist@beachtourism.com', 'password')}
              className="btn-demo-fill"
            >
              Fill Tourist: <code>tourist@beachtourism.com</code>
            </button>
            <button
              type="button"
              onClick={() => fillDemo('admin@beachtourism.com', 'admin')}
              className="btn-demo-fill"
            >
              Fill Admin: <code>admin@beachtourism.com</code>
            </button>
          </div>
        </div>

        <div className="auth-footer-links">
          <span>Don't have an account? </span>
          <Link to="/register">Create New Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
