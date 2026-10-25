import React from 'react';

/**
 * Hero Section Component
 * Requirements:
 * - Heading: "Explore Beaches. Stay Safe."
 * - Short description
 * - "Explore Beaches" button
 * - "Safety Information" button
 * - Attractive beach background with modern overlay
 */
function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulse-dot"></span> Official Coastal Safety & Tourism Advisory
        </div>

        <h1 className="hero-title">Explore Beaches. Stay Safe.</h1>

        <p className="hero-description">
          Discover the stunning coastal wonders of Tamil Nadu while staying protected.
          Access real-time sea conditions, lifeguard-patrolled zones, hazard warnings,
          and emergency support—all in one interactive portal.
        </p>

        <div className="hero-actions">
          <a
            href="#beaches"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('beaches');
            }}
          >
            🏖️ Explore Beaches
          </a>

          <a
            href="#safety"
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('safety');
            }}
          >
            🛡️ Safety Information
          </a>
        </div>

        {/* Quick Highlights / Ticker */}
        <div className="hero-highlights">
          <div className="highlight-item">
            <span className="highlight-icon">📍</span>
            <div>
              <strong>4 Top Beaches</strong>
              <span>Verified Profiles & Guides</span>
            </div>
          </div>
          <div className="highlight-divider"></div>
          <div className="highlight-item">
            <span className="highlight-icon">🚩</span>
            <div>
              <strong>Live Sea Status</strong>
              <span>Tide & Surf Advisories</span>
            </div>
          </div>
          <div className="highlight-divider"></div>
          <div className="highlight-item">
            <span className="highlight-icon">🛟</span>
            <div>
              <strong>Lifeguard Patrols</strong>
              <span>100% Emergency Backed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
