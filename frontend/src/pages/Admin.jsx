import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Admin Dashboard Page Component
 * Feature 9: Administrative portal to manage beaches, view stats, publish alerts, and dismiss alerts
 */
function Admin() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [beaches, setBeaches] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Alert form state
  const [alertBeach, setAlertBeach] = useState('Marina Beach');
  const [alertType, setAlertType] = useState('High Waves');
  const [alertMessage, setAlertMessage] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check local storage for admin credentials
    const saved = localStorage.getItem('beachUser');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        setCurrentUser(u);
      } catch (e) {
        setCurrentUser(null);
      }
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bRes, aRes] = await Promise.all([
        fetch('http://localhost:5000/api/beaches'),
        fetch('http://localhost:5000/api/alerts')
      ]);

      const bData = await bRes.json();
      const aData = await aRes.json();

      if (Array.isArray(bData)) setBeaches(bData);
      if (Array.isArray(aData)) setAlerts(aData);
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // One-click quick login for demo review
  const handleDemoAdminLogin = () => {
    const adminUser = {
      email: 'admin@beachtourism.com',
      name: 'Faculty Admin',
      role: 'admin'
    };
    localStorage.setItem('beachUser', JSON.stringify(adminUser));
    setCurrentUser(adminUser);
    setActionSuccess('Logged in as Administrator for Demo Review.');
    setTimeout(() => setActionSuccess(''), 3000);
  };

  // Add new alert
  const handlePublishAlert = async (e) => {
    e.preventDefault();
    if (!alertBeach || !alertMessage.trim()) {
      setActionError('Please select a beach and enter alert message.');
      return;
    }

    try {
      setSubmitting(true);
      setActionError('');
      const res = await fetch('http://localhost:5000/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          beachName: alertBeach,
          type: alertType,
          message: alertMessage.trim()
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setActionSuccess(`Safety alert published successfully for ${alertBeach}!`);
        setAlertMessage('');
        // Add to alert list immediately
        setAlerts((prev) => [data.alert, ...prev]);
        setTimeout(() => setActionSuccess(''), 4000);
      } else {
        setActionError(data.message || 'Failed to publish alert.');
      }
    } catch (err) {
      setActionError('Network error while creating alert.');
    } finally {
      setSubmitting(false);
    }
  };

  // Dismiss / Delete alert
  const handleDeleteAlert = async (id) => {
    if (!window.confirm('Are you sure you want to dismiss this safety alert?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/alerts/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setAlerts((prev) => prev.filter((a) => String(a._id) !== String(id)));
        setActionSuccess('Alert successfully dismissed.');
        setTimeout(() => setActionSuccess(''), 3000);
      }
    } catch (err) {
      setActionError('Failed to dismiss alert.');
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <section className="page-header admin-header">
        <span className="page-badge">⚙️ Management Portal</span>
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-description">
          Monitor coastal databases, review active safety advisories, and broadcast urgent sea condition notices to tourists.
        </p>

        {/* Demo Review Access Banner */}
        {!currentUser || currentUser.role !== 'admin' ? (
          <div className="admin-demo-box">
            <span>ℹ️ <strong>College Review Note:</strong> Currently previewing in Demo Mode.</span>
            <button onClick={handleDemoAdminLogin} className="btn-demo-admin">
              Click Here to Authorize as Admin
            </button>
          </div>
        ) : (
          <div className="admin-authorized-pill">
            <span>🛡️ Authorized as <strong>{currentUser.name}</strong> ({currentUser.email})</span>
          </div>
        )}
      </section>

      {/* Action Messages */}
      {actionSuccess && <div className="alert-box alert-success">{actionSuccess}</div>}
      {actionError && <div className="alert-box alert-error">{actionError}</div>}

      {/* Top Stats Overview */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="stat-icon">🏖️</span>
          <div>
            <h3 className="stat-number">{beaches.length}</h3>
            <p className="stat-label">Registered Beaches</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="stat-icon">⚠️</span>
          <div>
            <h3 className="stat-number">{alerts.length}</h3>
            <p className="stat-label">Active Safety Alerts</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="stat-icon">🟢</span>
          <div>
            <h3 className="stat-number">Live</h3>
            <p className="stat-label">System API & Database</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="stat-icon">👥</span>
          <div>
            <h3 className="stat-number">Public</h3>
            <p className="stat-label">Access Level</p>
          </div>
        </div>
      </div>

      {/* Publish New Alert Section */}
      <section className="admin-form-card">
        <h3>📢 Broadcast New Beach Safety Alert</h3>
        <p className="text-muted">Issue urgent sea advisories for high swell, rip currents, or bad weather.</p>

        <form onSubmit={handlePublishAlert} className="admin-alert-form">
          <div className="form-row">
            <div className="form-group flex-1">
              <label>Target Beach</label>
              <select
                value={alertBeach}
                onChange={(e) => setAlertBeach(e.target.value)}
                className="form-control"
              >
                {beaches.map((b) => (
                  <option key={b._id} value={b.name}>{b.name} ({b.location})</option>
                ))}
              </select>
            </div>

            <div className="form-group flex-1">
              <label>Alert Category</label>
              <select
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
                className="form-control"
              >
                <option value="High Waves">High Waves (Rough Sea)</option>
                <option value="Strong Currents">Strong Undercurrents / Rip</option>
                <option value="Weather Warning">Weather Warning (Squall / Storm)</option>
                <option value="Tide Surge">High Tide Surge Advisory</option>
                <option value="Jellyfish Advisory">Marine Life / Jellyfish Alert</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Advisory Warning Message for Tourists</label>
            <textarea
              rows={3}
              required
              placeholder="e.g. Swells exceeding 3 meters expected along shoreline. Lifeguards have raised red flags. Deep water swimming strictly restricted."
              value={alertMessage}
              onChange={(e) => setAlertMessage(e.target.value)}
              className="form-control"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary"
          >
            {submitting ? 'Publishing...' : '📢 Publish Safety Alert'}
          </button>
        </form>
      </section>

      {/* Active Alerts Management Table */}
      <section className="admin-table-section">
        <h3>Active Safety Alerts ({alerts.length})</h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Beach Name</th>
                <th>Category</th>
                <th>Advisory Details</th>
                <th>Date / Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted">No active safety alerts at this time.</td>
                </tr>
              ) : (
                alerts.map((a) => (
                  <tr key={a._id}>
                    <td><strong>{a.beachName}</strong></td>
                    <td><span className="badge badge-warning">{a.type}</span></td>
                    <td>{a.message}</td>
                    <td><small>{a.date ? new Date(a.date).toLocaleDateString() : 'Active'}</small></td>
                    <td>
                      <button
                        onClick={() => handleDeleteAlert(a._id)}
                        className="btn-action-delete"
                        title="Dismiss this alert"
                      >
                        Dismiss ✕
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Beaches Database Table */}
      <section className="admin-table-section" style={{ marginTop: '2.5rem' }}>
        <h3>Registered Beaches Database ({beaches.length})</h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Beach</th>
                <th>Location</th>
                <th>Safety Status</th>
                <th>Best Visiting Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {beaches.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div className="table-beach-item">
                      <img src={b.image} alt={b.name} className="table-thumb" />
                      <span>{b.name}</span>
                    </div>
                  </td>
                  <td>{b.location}</td>
                  <td>
                    <span className={`badge badge-${b.safetyLevel.toLowerCase().replace(/\s+/g, '-')}`}>
                      {b.safetyLevel}
                    </span>
                  </td>
                  <td><small>{b.bestTime}</small></td>
                  <td>
                    <Link to={`/beaches/${b._id}`} className="btn-table-view">
                      View Page →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Admin;
