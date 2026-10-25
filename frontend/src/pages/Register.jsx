import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Register Page Component
 * Simple user registration connected to POST /api/register
 */
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password || !name) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        setError(data.message || 'Registration failed. Try a different email.');
      }
    } catch (err) {
      setError('Could not connect to server. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">🌊</span>
          <h2>Join BeachSafe</h2>
          <p className="text-muted">Create a free tourist profile to rate beaches and receive alert notifications.</p>
        </div>

        {error && <div className="alert-box alert-error">{error}</div>}
        {success && <div className="alert-box alert-success">{success}</div>}

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Aditi Rao"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. aditi@gmail.com"
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
              placeholder="Choose a simple password"
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer-links">
          <span>Already have an account? </span>
          <Link to="/login">Sign In Here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
