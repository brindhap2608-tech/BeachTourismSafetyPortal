import React, { useState } from 'react';
import { BEACHES_DATA, SAFETY_ALERTS_DATA } from '../data/beachData';

/**
 * AdminDashboard Page Component (Frontend-Only Prototype)
 * Requirements:
 * - Admin Dashboard page accessible after Admin Login
 * - Beach safety status controller
 * - Active alert broadcast management
 * - Incident log viewer
 * - Lifeguard patrol overview
 * - Logout & portal return navigation
 * - No backend, API or MongoDB yet
 */
function AdminDashboard({ navigateTo }) {
  // Local state for beach safety flags controller
  const [beachesStatus, setBeachesStatus] = useState(
    BEACHES_DATA.map((b) => ({
      id: b.id,
      name: b.name,
      location: b.location,
      currentFlag: b.statusType === 'safe' ? 'green' : 'yellow',
      swimmingAllowed: b.swimmingAllowed,
      lifeguardsOnDuty: b.lifeguardOnDuty
    }))
  );

  // Local state for alerts
  const [alertsList, setAlertsList] = useState(SAFETY_ALERTS_DATA);

  // New alert form inputs
  const [targetBeach, setTargetBeach] = useState('Marina Beach');
  const [alertType, setAlertType] = useState('High Waves');
  const [alertSeverity, setAlertSeverity] = useState('High Warning');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertDirective, setAlertDirective] = useState('');

  // Incident reports
  const [incidents, setIncidents] = useState([
    {
      id: 'INC-2026-041',
      time: '14:20 PM Today',
      beach: "Elliot's Beach (Tower 2)",
      type: 'Rip Current Assist',
      severity: 'Medium',
      status: 'Resolved',
      officer: 'Patrol Officer K. Ramesh',
      notes: 'Two teenagers assisted back to knee-depth safe zone safely.'
    },
    {
      id: 'INC-2026-040',
      time: '11:45 AM Today',
      beach: 'Marina Beach (Promenade)',
      type: 'Lost Child Reunited',
      severity: 'Low',
      status: 'Resolved',
      officer: 'Lifeguard Supervisor V. Priya',
      notes: '7-year-old child returned to family via Tower 1 announcement booth.'
    },
    {
      id: 'INC-2026-039',
      time: '09:15 AM Today',
      beach: 'Kovalam Bay (Surf Zone)',
      type: 'First Aid - Coral Scraping',
      severity: 'Minor',
      status: 'Resolved',
      officer: 'Medic Unit 3',
      notes: 'Cleaned and dressed minor foot abrasion for local surfer.'
    }
  ]);

  const [toastMessage, setToastMessage] = useState(null);

  // Trigger feedback toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Change flag status for a beach
  const handleFlagChange = (beachId, newFlag) => {
    setBeachesStatus((prev) =>
      prev.map((b) => {
        if (b.id === beachId) {
          return {
            ...b,
            currentFlag: newFlag,
            swimmingAllowed: newFlag === 'green'
          };
        }
        return b;
      })
    );
    showToast(`Updated safety flag for ${beachId} to ${newFlag.toUpperCase()}.`);
  };

  // Toggle swimming permission
  const handleToggleSwimming = (beachId) => {
    setBeachesStatus((prev) =>
      prev.map((b) => {
        if (b.id === beachId) {
          const nextState = !b.swimmingAllowed;
          return { ...b, swimmingAllowed: nextState };
        }
        return b;
      })
    );
    showToast(`Updated swimming permissions.`);
  };

  // Add a new broadcast alert
  const handleBroadcastAlert = (e) => {
    e.preventDefault();
    if (!alertMessage.trim()) {
      showToast('Please provide an advisory message before broadcasting.');
      return;
    }

    const newAlert = {
      id: `alert-${Date.now()}`,
      type: alertType,
      severity: alertSeverity,
      severityClass:
        alertSeverity === 'High Warning'
          ? 'alert-danger'
          : alertSeverity === 'Active Advisory'
          ? 'alert-warning'
          : 'alert-info',
      icon:
        alertType === 'High Waves'
          ? '🌊'
          : alertType === 'Strong Currents'
          ? '🌀'
          : '⛈️',
      timestamp: 'Just Now (Broadcasted by Admin)',
      location: targetBeach,
      message: alertMessage,
      advisory: alertDirective || 'Exercise caution and listen to active patrols.'
    };

    setAlertsList([newAlert, ...alertsList]);
    setAlertMessage('');
    setAlertDirective('');
    showToast(`Broadcasted new "${alertType}" advisory for ${targetBeach}!`);
  };

  // Dismiss an alert
  const handleDismissAlert = (id) => {
    setAlertsList(alertsList.filter((a) => a.id !== id));
    showToast('Hazard alert cleared from live broadcast queue.');
  };

  // Logout handler
  const handleLogout = () => {
    if (navigateTo) {
      navigateTo('admin-login');
    } else {
      window.location.hash = 'admin-login';
    }
  };

  return (
    <div className="page-wrapper admin-dashboard-wrapper">
      {/* Top Notification Toast */}
      {toastMessage && (
        <div className="admin-toast-banner">
          <span className="toast-icon">⚡</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dashboard Top Header Bar */}
      <header className="dashboard-header-bar">
        <div className="dashboard-header-inner">
          <div className="dashboard-brand-info">
            <span className="dash-shield">🛡️</span>
            <div>
              <div className="dash-badge">COASTAL DEFENSE & TOURISM CONTROL</div>
              <h1 className="dash-title">BeachSafe Admin Desk</h1>
            </div>
          </div>

          <div className="dashboard-user-actions">
            <div className="officer-profile-pill">
              <span className="officer-avatar">👮</span>
              <div>
                <strong>Chief Officer R. Natarajan</strong>
                <span>Command HQ - Chennai Marine</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-view-portal"
              onClick={() => {
                if (navigateTo) navigateTo('home');
                else window.location.hash = 'home';
              }}
              title="Return to Public Portal"
            >
              🌐 Public Portal
            </button>

            <button
              type="button"
              className="btn btn-admin-logout"
              onClick={handleLogout}
              title="Sign Out of Admin Console"
            >
              Sign Out 🚪
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <div className="dashboard-container">
        {/* Prototype Review Status Banner */}
        <div className="dashboard-review-notice">
          <span className="dash-notice-icon">📋</span>
          <div>
            <strong>Administrator Control Console (Prototype Review Release)</strong>
            <p>
              This dashboard provides client-side administrative controls for dispatching beach safety alerts,
              adjusting warning flag conditions, and managing emergency incidents. Future sprints will sync this state
              with MongoDB via Node.js REST APIs.
            </p>
          </div>
        </div>

        {/* Quick Metric Cards Grid */}
        <div className="dash-metrics-grid">
          <div className="dash-metric-card">
            <div className="metric-icon-wrap bg-blue-tint">🏖️</div>
            <div>
              <span className="metric-number">4</span>
              <span className="metric-label">Monitored Beaches</span>
              <span className="metric-trend text-success">● 100% Online Coverage</span>
            </div>
          </div>

          <div className="dash-metric-card">
            <div className="metric-icon-wrap bg-amber-tint">⚠️</div>
            <div>
              <span className="metric-number">{alertsList.length}</span>
              <span className="metric-label">Active Hazard Bulletins</span>
              <span className="metric-trend text-caution">Broadcast Live</span>
            </div>
          </div>

          <div className="dash-metric-card">
            <div className="metric-icon-wrap bg-green-tint">🛟</div>
            <div>
              <span className="metric-number">18</span>
              <span className="metric-label">Lifeguards on Active Patrol</span>
              <span className="metric-trend text-success">Shift A • All Towers Manned</span>
            </div>
          </div>

          <div className="dash-metric-card">
            <div className="metric-icon-wrap bg-red-tint">🚨</div>
            <div>
              <span className="metric-number">0</span>
              <span className="metric-label">Critical SOS Unresolved</span>
              <span className="metric-trend text-success">● Normal Operation</span>
            </div>
          </div>
        </div>

        {/* Dashboard 2-Column Core Sections */}
        <div className="dash-content-grid">
          {/* Column 1: Live Beach Safety Flags Controller */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <span className="card-tag">FIELD CONTROLLER</span>
                <h2 className="dash-card-title">Live Beach Safety Flags & Status</h2>
              </div>
              <span className="status-live-dot">● SYNCED</span>
            </div>

            <p className="dash-card-desc">
              Change the official warning flag for each monitored beach. Updated flags reflect in visitor safety feeds.
            </p>

            <div className="dash-beaches-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Beach</th>
                    <th>Current Flag</th>
                    <th>Swimming</th>
                    <th>Patrol</th>
                    <th>Set Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {beachesStatus.map((beach) => (
                    <tr key={beach.id}>
                      <td>
                        <strong>{beach.name}</strong>
                        <div className="sub-loc">{beach.location}</div>
                      </td>
                      <td>
                        <span
                          className={`flag-indicator flag-dot-${beach.currentFlag}`}
                        >
                          {beach.currentFlag === 'green' && '🟢 Green (Safe)'}
                          {beach.currentFlag === 'yellow' && '🟡 Yellow (Caution)'}
                          {beach.currentFlag === 'red' && '🔴 Red (Danger)'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={`btn-toggle-badge ${
                            beach.swimmingAllowed ? 'badge-allowed' : 'badge-barred'
                          }`}
                          onClick={() => handleToggleSwimming(beach.id)}
                          title="Click to toggle swimming permission"
                        >
                          {beach.swimmingAllowed ? '✓ Permitted' : '✕ Barred'}
                        </button>
                      </td>
                      <td>
                        <span className="patrol-badge">Manned (Tower 1-4)</span>
                      </td>
                      <td>
                        <div className="flag-select-group">
                          <button
                            type="button"
                            className={`flag-btn-mini btn-green ${
                              beach.currentFlag === 'green' ? 'active-flag' : ''
                            }`}
                            onClick={() => handleFlagChange(beach.id, 'green')}
                            title="Set Green Flag (Safe)"
                          >
                            🟩
                          </button>
                          <button
                            type="button"
                            className={`flag-btn-mini btn-yellow ${
                              beach.currentFlag === 'yellow' ? 'active-flag' : ''
                            }`}
                            onClick={() => handleFlagChange(beach.id, 'yellow')}
                            title="Set Yellow Flag (Caution)"
                          >
                            🟨
                          </button>
                          <button
                            type="button"
                            className={`flag-btn-mini btn-red ${
                              beach.currentFlag === 'red' ? 'active-flag' : ''
                            }`}
                            onClick={() => handleFlagChange(beach.id, 'red')}
                            title="Set Red Flag (Danger)"
                          >
                            🟥
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column 2: Hazard Alert Broadcaster Form */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <span className="card-tag">BROADCAST TRANSMITTER</span>
                <h2 className="dash-card-title">Dispatch Hazard Warning</h2>
              </div>
            </div>

            <p className="dash-card-desc">
              Issue instant hazard bulletins to the public portal for storm surges, swell alerts, or rip currents.
            </p>

            <form className="dash-form" onSubmit={handleBroadcastAlert}>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Target Shoreline</label>
                  <select
                    className="form-input"
                    value={targetBeach}
                    onChange={(e) => setTargetBeach(e.target.value)}
                  >
                    <option value="Marina Beach">Marina Beach (Chennai)</option>
                    <option value="Elliot's Beach">Elliot's Beach (Besant Nagar)</option>
                    <option value="Mahabalipuram Beach">Mahabalipuram Beach</option>
                    <option value="Kovalam Beach">Kovalam Beach (Covelong)</option>
                    <option value="All Coastal Corridors">All Monitored Beaches</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Hazard Category</label>
                  <select
                    className="form-input"
                    value={alertType}
                    onChange={(e) => setAlertType(e.target.value)}
                  >
                    <option value="High Waves">🌊 High Waves / Swell Surge</option>
                    <option value="Strong Currents">🌀 Strong Rip Currents</option>
                    <option value="Weather Warning">⛈️ Severe Weather Squall</option>
                    <option value="Marine Life Advisory">🟪 Jellyfish Advisory</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Advisory Severity</label>
                <div className="severity-radio-group">
                  {['High Warning', 'Active Advisory', 'Precautionary Alert'].map((sev) => (
                    <label key={sev} className="severity-label">
                      <input
                        type="radio"
                        name="severity"
                        value={sev}
                        checked={alertSeverity === sev}
                        onChange={(e) => setAlertSeverity(e.target.value)}
                      />
                      <span>{sev}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Alert Broadcast Message</label>
                <textarea
                  rows="2"
                  className="form-input form-textarea"
                  placeholder="e.g. Swells reaching 3.0m recorded near breakwaters. Bathers must remain on sand."
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Public Safety Directive</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Do not enter waist-deep waters. Keep behind yellow cones."
                  value={alertDirective}
                  onChange={(e) => setAlertDirective(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-broadcast-alert">
                📢 Dispatch Live Broadcast Now
              </button>
            </form>
          </div>
        </div>

        {/* Active Broadcasts Queue */}
        <div className="dash-card full-width-dash-card">
          <div className="dash-card-header">
            <div>
              <span className="card-tag">BROADCAST QUEUE</span>
              <h2 className="dash-card-title">Currently Broadcasted Hazard Bulletins ({alertsList.length})</h2>
            </div>
          </div>

          <div className="dash-broadcast-items-grid">
            {alertsList.map((alert) => (
              <div key={alert.id} className={`dash-alert-badge-box ${alert.severityClass}`}>
                <div className="dash-alert-top">
                  <div className="dash-alert-meta">
                    <span className="dash-alert-icon">{alert.icon}</span>
                    <div>
                      <strong>{alert.type}</strong>
                      <span>📍 {alert.location}</span>
                    </div>
                  </div>
                  <span className="dash-sev-pill">{alert.severity}</span>
                </div>

                <p className="dash-alert-txt">{alert.message}</p>

                <div className="dash-alert-footer">
                  <span className="dash-timestamp">⏱️ {alert.timestamp}</span>
                  <button
                    type="button"
                    className="btn-dismiss-alert"
                    onClick={() => handleDismissAlert(alert.id)}
                    title="Clear this alert from public portal"
                  >
                    Clear Bulletin ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Recent Incident Logs */}
        <div className="dash-card full-width-dash-card">
          <div className="dash-card-header">
            <div>
              <span className="card-tag">LOGBOOK & DISPATCH</span>
              <h2 className="dash-card-title">Today's Beach Incident Logs</h2>
            </div>
            <span className="log-counter">3 Recorded Today</span>
          </div>

          <div className="dash-beaches-table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Incident ID</th>
                  <th>Timestamp</th>
                  <th>Location</th>
                  <th>Type & Severity</th>
                  <th>Duty Responder</th>
                  <th>Notes</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((inc) => (
                  <tr key={inc.id}>
                    <td>
                      <code>{inc.id}</code>
                    </td>
                    <td>{inc.time}</td>
                    <td>
                      <strong>{inc.beach}</strong>
                    </td>
                    <td>
                      <span className="incident-type-tag">{inc.type}</span>
                      <span className="incident-sev-badge">{inc.severity}</span>
                    </td>
                    <td>{inc.officer}</td>
                    <td className="incident-notes">{inc.notes}</td>
                    <td>
                      <span className="badge-resolved">✓ {inc.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
