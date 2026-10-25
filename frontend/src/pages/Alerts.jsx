import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Alerts Page Component
 * Feature 6: Real-time Beach Safety & Weather Alerts
 */
function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/alerts');
      const data = await res.json();
      if (Array.isArray(data)) {
        setAlerts(data);
        setLastRefreshed(new Date());
      }
    } catch (err) {
      console.error('Failed to load alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  const getAlertBadgeClass = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('wave') || t.includes('swell') || t.includes('cyclone')) return 'badge-danger';
    if (t.includes('current') || t.includes('undertow')) return 'badge-warning';
    return 'badge-info';
  };

  return (
    <div className="page-container">
      {/* Header */}
      <section className="page-header">
        <span className="page-badge">⚠️ Hazard Monitoring</span>
        <h1 className="page-title">Live Beach Safety & Sea Alerts</h1>
        <p className="page-description">
          Real-time weather advisories, high-swell forecasts, and active wave warnings issued by coastal authorities and meteorological centers.
        </p>
      </section>

      {/* Control bar */}
      <div className="alerts-control-bar">
        <div>
          <span>Active Advisories: <strong>{alerts.length}</strong></span>
          <span className="refresh-time"> • Last refreshed: {lastRefreshed.toLocaleTimeString()}</span>
        </div>
        <button onClick={fetchAlerts} className="btn-refresh" disabled={loading}>
          {loading ? 'Refreshing...' : '🔄 Refresh Alerts'}
        </button>
      </div>

      {/* Alerts List */}
      {loading ? (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Fetching active advisories from safety API...</p>
        </div>
      ) : alerts.length === 0 ? (
        <div className="empty-box">
          <h3>🟢 All Coasts Clear</h3>
          <p>No active storm or high swell warnings at this time. Always obey lifeguard flags.</p>
        </div>
      ) : (
        <div className="alerts-grid">
          {alerts.map((alert) => (
            <div key={alert._id} className="alert-card-detailed">
              <div className="alert-card-header">
                <div className="alert-type-group">
                  <span className="alert-icon-lg">⚠️</span>
                  <div>
                    <h3 className="alert-beach-title">{alert.beachName}</h3>
                    <span className="alert-date">
                      Reported: {alert.date ? new Date(alert.date).toLocaleString() : 'Active Today'}
                    </span>
                  </div>
                </div>
                <span className={`badge ${getAlertBadgeClass(alert.type)}`}>
                  {alert.type}
                </span>
              </div>

              <div className="alert-card-body">
                <p className="alert-message">{alert.message}</p>
              </div>

              <div className="alert-card-footer">
                <span className="advisory-label">
                  <strong>Tourist Advisory:</strong> Stay clear of the surf breakline & observe lifeguard flags.
                </span>
                <Link to="/emergency" className="btn-alert-emergency">Emergency Help →</Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Advisory explanation block */}
      <section className="safety-section-block" style={{ marginTop: '3rem' }}>
        <h3>How to Respond When a Safety Alert is Active</h3>
        <div className="highlights-grid" style={{ marginTop: '1rem' }}>
          <div className="highlight-card">
            <h4>1. Check Lifeguard Towers</h4>
            <p>Look for the red or yellow flags hoisted along the shoreline before walking down to the wet sand.</p>
          </div>
          <div className="highlight-card">
            <h4>2. Keep Children on Dry Sand</h4>
            <p>Sudden sneaker waves can sweep tourists from knee-deep water into deep channels within seconds.</p>
          </div>
          <div className="highlight-card">
            <h4>3. Avoid Sea Walls & Rocks</h4>
            <p>During high wave alerts, waves crash violently over breakwaters. Never stand on wet boulders for photos.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Alerts;
