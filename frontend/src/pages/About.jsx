import React from 'react';

/**
 * About Page Component
 * Requirements:
 * - Explain the purpose of BeachSafe
 * - Mention that this is an initial prototype
 */
function About() {
  const prototypeHighlights = [
    {
      title: 'Current Review Scope',
      status: 'Completed',
      desc: 'Interactive frontend portal with responsive layout, 4 featured beach directories, searchable beach catalog, modal popups, flag guidelines, and emergency phone integration.'
    },
    {
      title: 'Phase 2 (Upcoming)',
      status: 'Planned',
      desc: 'Node.js & Express.js REST API layer for dynamic beach listings and automated weather parsing.'
    },
    {
      title: 'Phase 3 (Upcoming)',
      status: 'Planned',
      desc: 'MongoDB database persistence for storing live incident alerts, lifeguard logs, and visitor reviews.'
    },
    {
      title: 'Phase 4 (Upcoming)',
      status: 'Planned',
      desc: 'Role-based Admin Dashboard for beach patrol officers to issue instant hazard advisories.'
    }
  ];

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <section className="page-header-banner about-header-banner">
        <div className="page-header-content">
          <span className="page-badge">🌊 Project Review Prototype</span>
          <h1 className="page-title">About BeachSafe</h1>
          <p className="page-subtitle">
            An interactive beach tourism and safety information platform designed to safeguard
            visitors while showcasing coastal attractions.
          </p>
        </div>
      </section>

      <div className="section-container">
        {/* Prototype Review Status Callout */}
        <div className="prototype-status-card">
          <div className="prototype-badge-ribbon">Review Prototype Notice</div>
          <div className="prototype-card-inner">
            <span className="prototype-icon">💡</span>
            <div>
              <h3>Academic Project Prototype Notice</h3>
              <p>
                This web application is currently an <strong>initial frontend prototype</strong> prepared for the
                first/second project milestone review. All presented beach guides, safety flags, hazard bulletins,
                and helpline contacts represent functional UI/UX implementations utilizing local mock data structures.
                Backend database services and administrative consoles are slated for subsequent implementation sprints.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Purpose Grid */}
        <div className="about-purpose-grid">
          <div className="purpose-card">
            <div className="purpose-icon">🎯</div>
            <h3>Our Purpose</h3>
            <p>
              Coastal tourism brings millions of domestic and international visitors to our beaches annually.
              However, sudden high swells, unfamiliar rip currents, and lack of immediate safety information
              lead to avoidable accidents. <strong>BeachSafe</strong> addresses this by centralizing sea condition
              awareness, certified safe zones, and rapid rescue contacts in one responsive web application.
            </p>
          </div>

          <div className="purpose-card">
            <div className="purpose-icon">🛟</div>
            <h3>Safety First Philosophy</h3>
            <p>
              We believe tourism and water safety must go hand-in-hand. By educating visitors on warning flag colors,
              marking patrolled swimming boundaries, and enabling direct one-tap calling to emergency responders
              like the Coast Guard and Police, BeachSafe empowers tourists to make responsible decisions.
            </p>
          </div>
        </div>

        {/* Development Roadmap */}
        <div className="roadmap-section">
          <div className="section-header">
            <span className="section-subtitle">🚀 Architecture Roadmap</span>
            <h2 className="section-title">Prototype Review & Milestone Timeline</h2>
            <p className="section-desc">
              Structured progressive development roadmap from initial review to full production release.
            </p>
          </div>

          <div className="roadmap-grid">
            {prototypeHighlights.map((item, idx) => (
              <div key={idx} className="roadmap-card">
                <div className="roadmap-top">
                  <span className="roadmap-phase">Phase 0{idx + 1}</span>
                  <span className={`roadmap-pill ${item.status === 'Completed' ? 'pill-completed' : 'pill-planned'}`}>
                    {item.status}
                  </span>
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack Card */}
        <div className="tech-stack-card">
          <h3>Current Prototype Technology Stack</h3>
          <div className="tech-badges-grid">
            <div className="tech-badge">
              <strong>React 18</strong>
              <span>Component Architecture</span>
            </div>
            <div className="tech-badge">
              <strong>Vite 5</strong>
              <span>Fast Build & Bundling</span>
            </div>
            <div className="tech-badge">
              <strong>Modular CSS</strong>
              <span>Responsive Design</span>
            </div>
            <div className="tech-badge">
              <strong>State-driven Hash Routing</strong>
              <span>Fast SPA Page Swapping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
