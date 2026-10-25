import React, { useEffect } from 'react';

/**
 * BeachModal Component
 * Interactive modal that displays comprehensive details when the user
 * clicks "View Details" on any beach card.
 */
function BeachModal({ beach, onClose }) {
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!beach) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <span className="modal-location">📍 {beach.location}</span>
            <h2 className="modal-title">{beach.name}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close details">
            ✕
          </button>
        </div>

        {/* Modal Image */}
        <div className="modal-image-wrapper">
          <img
            src={beach.image}
            alt={beach.name}
            className="modal-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="modal-status-pill">
            {beach.badgeText}
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-section">
            <h3>Overview</h3>
            <p>{beach.shortDescription}</p>
          </div>

          <div className="modal-grid-info">
            <div className="info-block">
              <span className="info-label">🕒 Visiting Hours</span>
              <span className="info-value">{beach.timings}</span>
            </div>
            <div className="info-block">
              <span className="info-label">🌅 Best Time to Visit</span>
              <span className="info-value">{beach.bestTimeToVisit}</span>
            </div>
            <div className="info-block">
              <span className="info-label">🏊 Swimming Status</span>
              <span className={`info-value ${beach.swimmingAllowed ? 'text-success' : 'text-danger'}`}>
                {beach.swimmingAllowed ? 'Permitted in designated zones' : 'Restricted / Deep waters strictly barred'}
              </span>
            </div>
            <div className="info-block">
              <span className="info-label">🛟 Lifeguard Coverage</span>
              <span className="info-value">
                {beach.lifeguardOnDuty ? 'Active Lifeguards on Duty' : 'Periodic Patrol Only'}
              </span>
            </div>
          </div>

          {/* Safety Notice Box */}
          <div className="modal-safety-notice">
            <div className="notice-icon">🛡️</div>
            <div>
              <strong>Safety Advisory for {beach.name}</strong>
              <p>{beach.safetyNotice}</p>
            </div>
          </div>

          {/* Facilities */}
          <div className="modal-section">
            <h3>Available Facilities</h3>
            <div className="facilities-tags">
              {beach.facilities.map((facility, index) => (
                <span key={index} className="facility-tag">
                  ✓ {facility}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <a href="tel:112" className="btn btn-sos">
            🚨 Call Lifeguard Station (112)
          </a>
          <button className="btn btn-outline" onClick={onClose}>
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}

export default BeachModal;
