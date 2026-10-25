import React, { useState, useEffect } from 'react';

/**
 * Emergency Page Component
 * Feature 7: Emergency contacts with direct dial buttons and immediate crisis response guides
 */
function Emergency() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback contacts list
  const defaultContacts = [
    {
      id: 1,
      name: 'Indian Coast Guard SAR',
      number: '1554',
      type: 'Toll-Free National Maritime Rescue',
      available: '24/7 Helpline',
      description: 'Primary offshore & coastal emergency search and rescue for boat distress and deep-water emergencies.'
    },
    {
      id: 2,
      name: 'Police Emergency Helpline',
      number: '100 / 112',
      type: 'National Emergency Response',
      available: '24/7 Available',
      description: 'Immediate law enforcement response, crowd control, and emergency missing person reporting.'
    },
    {
      id: 3,
      name: 'Medical Ambulance Helpline',
      number: '108',
      type: 'Paramedic & Life Support',
      available: '24/7 Ambulance Dispatch',
      description: 'Emergency medical transit equipped with oxygen, defibrillators, and drowning stabilization care.'
    },
    {
      id: 4,
      name: 'Coastal Security Police',
      number: '1093',
      type: 'Coastal Law Enforcement',
      available: '24/7 Coastal Support',
      description: 'Specialized state police force deployed along the beach coastline and fishing harbour zones.'
    },
    {
      id: 5,
      name: 'Disaster Management Control Room',
      number: '1077',
      type: 'Cyclone & Tsunami Alerts',
      available: '24/7 State Control',
      description: 'State disaster response desk for cyclonic weather, storm surges, and flood advisories.'
    }
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/emergency')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setContacts(data);
        } else {
          setContacts(defaultContacts);
        }
      })
      .catch(() => {
        setContacts(defaultContacts);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      {/* Header */}
      <section className="page-header emergency-header-banner">
        <span className="emergency-badge">🚨 Immediate Assistance Hotlines</span>
        <h1 className="page-title">Beach Emergency & Rescue Contacts</h1>
        <p className="page-description">
          In any marine crisis, every second counts. Tap any hotline button below to dial directly from your mobile device.
        </p>
      </section>

      {/* Emergency Hotlines Grid */}
      <div className="emergency-cards-grid">
        {contacts.map((item) => (
          <div key={item.id} className="emergency-card">
            <div className="emergency-card-top">
              <span className="emergency-phone-icon">📞</span>
              <div>
                <h3 className="emergency-name">{item.name}</h3>
                <span className="emergency-sub">{item.type}</span>
              </div>
            </div>

            <div className="emergency-number-display">
              <span className="hotline-number">{item.number}</span>
              <span className="hotline-badge">{item.available}</span>
            </div>

            <p className="emergency-desc">{item.description}</p>

            <a
              href={`tel:${item.number.split('/')[0].trim()}`}
              className="btn-dial-now"
            >
              📞 Call {item.number.split('/')[0].trim()} Now
            </a>
          </div>
        ))}
      </div>

      {/* What to do in an Emergency Guide */}
      <section className="emergency-guide-panel">
        <h2>What To Do If Someone Is In Distress in Water</h2>

        <div className="guide-steps-grid">
          <div className="guide-card">
            <span className="guide-num">1</span>
            <h4>Call for Help Immediately</h4>
            <p>
              Shout loudly to alert on-duty lifeguards or call <strong>1554 (Coast Guard)</strong> or <strong>108 (Ambulance)</strong>. Never keep quiet hoping they will swim out alone.
            </p>
          </div>

          <div className="guide-card">
            <span className="guide-num">2</span>
            <h4>Reach or Throw, Don’t Go</h4>
            <p>
              Unless you are a certified lifeguard, do not jump into rough surf. Throw a flotation buoy, rope, cooler, or life ring towards the victim.
            </p>
          </div>

          <div className="guide-card">
            <span className="guide-num">3</span>
            <h4>Keep Your Eyes Fixed on the Person</h4>
            <p>
              Designate one person on the beach to stand on a high sand dune, point their arm continuously at the victim's position so rescue boats can locate them quickly.
            </p>
          </div>

          <div className="guide-card">
            <span className="guide-num">4</span>
            <h4>First Aid on Sand</h4>
            <p>
              Once brought to dry sand, check for breathing. If unresponsive, immediately begin Hands-Only CPR (100–120 chest compressions per minute) until paramedics arrive.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Emergency;
