import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Safety Page Component
 * Feature 5: Comprehensive Beach Safety Guidelines and Flag Meanings
 */
function Safety() {
  const flags = [
    {
      color: '🔴 Red Flag',
      title: 'High Hazard / Rough Conditions',
      meaning: 'High surf, strong undertow, or dangerous currents. Swimming is strictly prohibited.',
      statusClass: 'flag-red'
    },
    {
      color: '🟡 Yellow Flag',
      title: 'Medium Hazard / Caution',
      meaning: 'Moderate surf and currents. Weak swimmers should stay out of deep waters. Stay near lifeguards.',
      statusClass: 'flag-yellow'
    },
    {
      color: '🟢 Green Flag',
      title: 'Low Hazard / Calm Conditions',
      meaning: 'Calm water conditions. Safe for swimming between designated patrolled boundary zones.',
      statusClass: 'flag-green'
    },
    {
      color: '🔴🔴 Double Red',
      title: 'Water Closed to Public',
      meaning: 'Extreme danger due to incoming cyclone, tidal surge, or severe storm. Never enter the sea.',
      statusClass: 'flag-double-red'
    },
    {
      color: '🟣 Purple Flag',
      title: 'Marine Life Caution',
      meaning: 'Jellyfish, stingrays, or other hazardous sea creatures spotted along the coastline.',
      statusClass: 'flag-purple'
    }
  ];

  const ripSteps = [
    {
      step: '1',
      title: 'Don’t Panic',
      text: 'Rip currents do not pull you underwater—they only pull you away from shore. Stay calm and conserve your energy.'
    },
    {
      step: '2',
      title: 'Never Swim Against the Current',
      text: 'Swimming directly toward the shore will exhaust you. Fighting a 5 knot rip current is impossible for any swimmer.'
    },
    {
      step: '3',
      title: 'Swim Parallel to the Beach',
      text: 'Swim sideways, parallel to the coastline, until you escape the narrow channel of the rip current.'
    },
    {
      step: '4',
      title: 'Float & Signal for Help',
      text: 'If tired, float on your back, wave one arm high, and shout for lifeguard assistance.'
    }
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <section className="page-header">
        <span className="page-badge">🛟 Beach Safety Guide</span>
        <h1 className="page-title">Coastal Safety Guidelines & Flag Meanings</h1>
        <p className="page-description">
          Equip yourself with life-saving knowledge before stepping onto the sand.
          Understanding warning flags, rip-current escape tactics, and lifeguard instructions prevents coastal tragedies.
        </p>
      </section>

      {/* Flag System Section */}
      <section className="safety-section-block">
        <div className="block-title-row">
          <h2>🚩 Beach Warning Flags & Their Meanings</h2>
          <p className="text-muted">Always check the flag color flying at the lifeguard watchtower before entering water.</p>
        </div>

        <div className="flags-grid">
          {flags.map((flag, index) => (
            <div key={index} className={`flag-card ${flag.statusClass}`}>
              <div className="flag-badge">{flag.color}</div>
              <h3>{flag.title}</h3>
              <p>{flag.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rip Current Survival Section */}
      <section className="safety-section-block rip-current-panel">
        <div className="block-title-row">
          <h2>🌊 Rip Current Escape Guide</h2>
          <p>
            Rip currents are powerful, narrow channels of fast-moving water flowing away from shore.
            They are responsible for 80% of beach rescue operations.
          </p>
        </div>

        <div className="rip-steps-grid">
          {ripSteps.map((s) => (
            <div key={s.step} className="rip-step-card">
              <div className="step-circle">{s.step}</div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section className="safety-section-block">
        <h2 className="text-center" style={{ marginBottom: '1.5rem' }}>Essential Beach Do’s & Don’ts</h2>

        <div className="dos-donts-grid">
          {/* Do's */}
          <div className="card-do">
            <h3 className="do-heading">✅ What YOU SHOULD DO</h3>
            <ul className="safety-checklist">
              <li>Always swim within designated patrolled areas and between yellow/red flags.</li>
              <li>Supervise children closely within arm's reach at all times.</li>
              <li>Wear certified lifejackets whenever engaging in boats, jet skis, or surfing.</li>
              <li>Drink plenty of fresh water and apply SPF 50+ sunscreen every 2 hours.</li>
              <li>Save emergency helpline <strong>1554 (Coast Guard)</strong> in your phone before traveling.</li>
            </ul>
          </div>

          {/* Don'ts */}
          <div className="card-dont">
            <h3 className="dont-heading">❌ What YOU SHOULD NEVER DO</h3>
            <ul className="safety-checklist">
              <li>Never swim alone or under the influence of alcohol or medication.</li>
              <li>Never enter the sea after sunset or during thunderstorm warnings.</li>
              <li>Do not jump from sea groynes, piers, breakwater boulders, or rocky cliffs.</li>
              <li>Never ignore whistles or red flag alerts raised by beach patrol lifeguards.</li>
              <li>Do not touch unknown marine creatures, jellyfish, or sea urchins washed ashore.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Action Footer banner */}
      <section className="safety-cta-banner">
        <h3>In an emergency at sea, don’t delay!</h3>
        <p>Immediate communication saves lives. Direct links to police, ambulance, and coast guard rescue.</p>
        <div className="cta-btn-group">
          <Link to="/emergency" className="btn-primary">View Emergency Helplines →</Link>
          <Link to="/alerts" className="btn-outline-primary">Check Live Sea Alerts →</Link>
        </div>
      </section>
    </div>
  );
}

export default Safety;
