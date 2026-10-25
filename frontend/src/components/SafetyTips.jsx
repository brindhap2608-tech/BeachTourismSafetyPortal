import React from 'react';
import { SAFETY_TIPS_DATA } from '../data/beachData';

/**
 * SafetyTips Component
 * Requirements:
 * - Follow lifeguard instructions
 * - Check sea conditions
 * - Avoid restricted swimming areas
 * - Stay hydrated and use sun protection
 */
function SafetyTips() {
  const flagMeanings = [
    {
      flag: '🟩',
      title: 'Green Flag',
      meaning: 'Calm conditions. Safe for swimming within designated patrolled areas.'
    },
    {
      flag: '🟨',
      title: 'Yellow Flag',
      meaning: 'Moderate surf or currents. Exercise caution, especially with young children.'
    },
    {
      flag: '🟥',
      title: 'Red Flag',
      meaning: 'High hazard! Rough surf or strong rip currents. Water entry strictly forbidden.'
    },
    {
      flag: '🟪',
      title: 'Purple Flag',
      meaning: 'Marine pests advisory. Presence of jellyfish, stingrays, or other marine life.'
    }
  ];

  return (
    <section id="safety" className="section-container safety-section">
      <div className="section-header">
        <span className="section-subtitle">🛡️ Essential Guidelines</span>
        <h2 className="section-title">Beach Safety Tips</h2>
        <p className="section-desc">
          Ensure a fun and hazard-free coastal trip by memorizing these core ocean safety rules
          recommended by international maritime lifeguards.
        </p>
      </div>

      {/* Safety Tips Cards Grid */}
      <div className="safety-grid">
        {SAFETY_TIPS_DATA.map((tip) => (
          <div key={tip.id} className="safety-card">
            <div className="safety-card-top">
              <span className="safety-icon-bubble">{tip.icon}</span>
              <span className="safety-badge">{tip.actionBadge}</span>
            </div>
            <h3 className="safety-card-title">{tip.title}</h3>
            <p className="safety-card-desc">{tip.description}</p>
          </div>
        ))}
      </div>

      {/* Beach Flag Guide Callout */}
      <div className="flag-guide-container">
        <div className="flag-guide-header">
          <span className="flag-guide-icon">🚩</span>
          <div>
            <h3>Official Coastal Warning Flag System</h3>
            <p>Know what the beach patrol flags mean before stepping into the ocean.</p>
          </div>
        </div>

        <div className="flag-guide-grid">
          {flagMeanings.map((item, index) => (
            <div key={index} className="flag-item">
              <div className="flag-icon">{item.flag}</div>
              <div className="flag-text">
                <strong>{item.title}</strong>
                <p>{item.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SafetyTips;
