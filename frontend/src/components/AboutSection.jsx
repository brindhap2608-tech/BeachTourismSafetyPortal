import React from 'react';

/**
 * AboutSection Component
 * Provides an introduction to the Interactive Beach Tourism & Safety Portal,
 * its core mission, coverage, and tourist commitment.
 */
function AboutSection() {
  const portalStats = [
    { value: '4+', label: 'Prime Coastal Beaches' },
    { value: '24/7', label: 'Emergency Support' },
    { value: '100%', label: 'Lifeguard Patrolled' },
    { value: 'Live', label: 'Real-time Surf Advisories' }
  ];

  return (
    <section id="about" className="section-container about-section">
      <div className="about-grid">
        <div className="about-text-content">
          <span className="section-subtitle">🌊 About The Portal</span>
          <h2 className="section-title">Promoting Safe & Responsible Beach Tourism</h2>
          <p className="about-paragraph">
            The <strong>Interactive Beach Tourism & Safety Information Portal</strong> was
            created to bridge the gap between scenic coastal leisure and proactive water safety.
            Thousands of tourists visit our shores every week; having immediate access to verified sea conditions,
            tide advisories, and lifeguard services saves lives.
          </p>
          <p className="about-paragraph">
            Whether you are planning a sunrise jog at Marina Beach, a cultural day trip to Mahabalipuram,
            or surfing lessons at Kovalam, our platform delivers transparent, up-to-date beach status
            and life-saving guidelines right at your fingertips.
          </p>

          <div className="about-features-list">
            <div className="about-feature-item">
              <span className="check-icon">✓</span>
              <span>Accurate wave height and sea safety condition tags</span>
            </div>
            <div className="about-feature-item">
              <span className="check-icon">✓</span>
              <span>Instant one-tap emergency calling to coastal rescue units</span>
            </div>
            <div className="about-feature-item">
              <span className="check-icon">✓</span>
              <span>Essential safety guidance on rip currents, tides, and weather</span>
            </div>
          </div>
        </div>

        <div className="about-stats-card">
          <h3>Coastal Safety at a Glance</h3>
          <p className="stats-intro">Monitoring and safeguarding coastal visitors year-round.</p>

          <div className="stats-metrics-grid">
            {portalStats.map((stat, idx) => (
              <div key={idx} className="metric-box">
                <span className="metric-value">{stat.value}</span>
                <span className="metric-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="about-helpline-box">
            <span>Need Assistance at the Beach?</span>
            <strong>Call Toll-Free Marine Helpline: 1093</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
