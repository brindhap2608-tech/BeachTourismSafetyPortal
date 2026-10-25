import React from 'react';
import { SAFETY_ALERTS_DATA } from '../data/beachData';

/**
 * SafetyAlerts Component
 * Requirements:
 * - High Waves alert
 * - Strong Currents alert
 * - Weather Warning alert
 */
function SafetyAlerts() {
  return (
    <section id="alerts" className="section-container alerts-section">
      <div className="section-header">
        <div className="live-alert-indicator">
          <span className="live-pulse"></span>
          <span>LIVE HAZARD MONITOR</span>
        </div>
        <h2 className="section-title">Active Coastal Safety Alerts</h2>
        <p className="section-desc">
          Real-time ocean condition bulletins issued by Coastal Police, Meteorological Centre,
          and Beach Patrol Units.
        </p>
      </div>

      <div className="alerts-grid">
        {SAFETY_ALERTS_DATA.map((alert) => (
          <div key={alert.id} className={`alert-card ${alert.severityClass}`}>
            <div className="alert-card-header">
              <div className="alert-type-wrap">
                <span className="alert-icon">{alert.icon}</span>
                <div>
                  <h3 className="alert-type-title">{alert.type}</h3>
                  <span className="alert-location">📍 {alert.location}</span>
                </div>
              </div>
              <span className="alert-severity-badge">{alert.severity}</span>
            </div>

            <div className="alert-card-body">
              <p className="alert-message">{alert.message}</p>
              
              <div className="alert-advisory-box">
                <strong>Safety Directive:</strong> {alert.advisory}
              </div>
            </div>

            <div className="alert-card-footer">
              <span className="alert-time">⏱️ {alert.timestamp}</span>
              <span className="alert-status">Status: <strong>Active Monitoring</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Broadcast Ticker Notice */}
      <div className="alerts-broadcast-notice">
        <span className="broadcast-icon">📢</span>
        <div className="broadcast-content">
          <strong>Need Beach Safety Updates via SMS / WhatsApp?</strong>
          <p>Local beach warning sirens sound automatically whenever high wave thresholds are breached.</p>
        </div>
        <a href="#emergency" className="broadcast-link">
          Emergency Desk →
        </a>
      </div>
    </section>
  );
}

export default SafetyAlerts;
