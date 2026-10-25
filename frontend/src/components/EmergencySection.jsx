import React from 'react';
import { EMERGENCY_CONTACTS_DATA } from '../data/beachData';

/**
 * EmergencySection Component
 * Requirements:
 * - Important emergency contacts
 * - Direct click-to-dial links
 * - 24/7 availability indications
 * - Quick emergency rescue action guidance
 */
function EmergencySection() {
  const rescueSteps = [
    {
      step: '01',
      title: 'Alert Lifeguards Instantly',
      desc: 'Shout or signal towards the nearest lifeguard watchtower, or dial 112 / 1093.'
    },
    {
      step: '02',
      title: 'Throw Flotation Aid',
      desc: 'Toss a lifebuoy, foam cooler, or rope if accessible. Never jump in alone without flotation gear.'
    },
    {
      step: '03',
      title: 'If Caught in Rip Current',
      desc: 'Do not fight the current. Remain calm, conserve energy, float on your back, and swim parallel to shore.'
    },
    {
      step: '04',
      title: 'Raise One Arm for Help',
      desc: 'Tread water and raise one arm straight up to signal beach patrols that you require rescue.'
    }
  ];

  return (
    <section id="emergency" className="section-container emergency-section">
      <div className="section-header emergency-header">
        <span className="emergency-badge-top">🚨 24/7 Emergency Helplines</span>
        <h2 className="section-title">Coastal Emergency Contacts</h2>
        <p className="section-desc">
          Save these critical coastal helpline numbers on your phone before visiting any beach.
          Direct line operators are available around the clock.
        </p>
      </div>

      {/* Emergency Contacts Cards Grid */}
      <div className="emergency-grid">
        {EMERGENCY_CONTACTS_DATA.map((contact) => (
          <div key={contact.id} className="emergency-card">
            <div className="emergency-card-top">
              <span className="emergency-agency">{contact.name}</span>
              <span className="emergency-status-badge">{contact.available}</span>
            </div>

            <p className="emergency-desc">{contact.description}</p>

            <a
              href={`tel:${contact.number.replace(/\s+/g, '')}`}
              className="emergency-dial-btn"
              title={`Call ${contact.name}`}
            >
              <span className="dial-icon">📞</span>
              <span className="dial-number">{contact.number}</span>
              <span className="dial-label">{contact.tollFree ? 'Toll-Free Dial' : 'Direct Line'}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Immediate Rescue Protocol Box */}
      <div className="rescue-guide-card">
        <div className="rescue-guide-header">
          <span className="rescue-guide-icon">🆘</span>
          <div>
            <h3>What to Do in a Water Emergency?</h3>
            <p>Remember the 4-step coastal rescue protocol to protect yourself and others.</p>
          </div>
        </div>

        <div className="rescue-steps-grid">
          {rescueSteps.map((item, index) => (
            <div key={index} className="rescue-step-item">
              <span className="step-number">{item.step}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EmergencySection;
