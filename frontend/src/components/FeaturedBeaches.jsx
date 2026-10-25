import React, { useState } from 'react';
import { BEACHES_DATA } from '../data/beachData';
import BeachModal from './BeachModal';

/**
 * FeaturedBeaches Component
 * Displays interactive cards for:
 * - Marina Beach
 * - Elliot's Beach
 * - Mahabalipuram Beach
 * - Kovalam Beach
 *
 * Each card includes: Image, Beach name, Location, Short description,
 * Safety status, and a View Details button opening a comprehensive modal.
 */
function FeaturedBeaches() {
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Filter beaches based on tab selection
  const filteredBeaches = BEACHES_DATA.filter((beach) => {
    if (filterType === 'safe') return beach.statusType === 'safe';
    if (filterType === 'caution') return beach.statusType === 'caution';
    return true;
  });

  return (
    <section id="beaches" className="section-container">
      <div className="section-header">
        <span className="section-subtitle">🌊 Coastal Destinations</span>
        <h2 className="section-title">Featured Beaches</h2>
        <p className="section-desc">
          Explore iconic beaches along the coastline. Review current safety advisories,
          monitored zones, and on-ground facilities before heading out.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-bar">
        <button
          className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
        >
          All Beaches ({BEACHES_DATA.length})
        </button>
        <button
          className={`filter-btn ${filterType === 'safe' ? 'active' : ''}`}
          onClick={() => setFilterType('safe')}
        >
          🟢 Safe Zones
        </button>
        <button
          className={`filter-btn ${filterType === 'caution' ? 'active' : ''}`}
          onClick={() => setFilterType('caution')}
        >
          🟡 Caution / Swell Zones
        </button>
      </div>

      {/* Beach Cards Grid */}
      <div className="beaches-grid">
        {filteredBeaches.map((beach) => (
          <div key={beach.id} className="beach-card">
            {/* Image Header with Safety Status Pill */}
            <div className="beach-card-image-wrap">
              <img
                src={beach.image}
                alt={beach.name}
                className="beach-card-img"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <span className={`status-badge status-${beach.statusType}`}>
                {beach.badgeText}
              </span>
            </div>

            {/* Card Content */}
            <div className="beach-card-body">
              <div className="beach-card-location">
                <span>📍</span> {beach.location}
              </div>

              <h3 className="beach-card-name">{beach.name}</h3>

              <p className="beach-card-desc">{beach.shortDescription}</p>

              {/* Safety Status Callout */}
              <div className={`beach-safety-status-box status-box-${beach.statusType}`}>
                <span className="status-indicator-dot"></span>
                <div>
                  <div className="status-label">Current Sea Safety:</div>
                  <strong className="status-text">{beach.safetyStatus}</strong>
                </div>
              </div>

              {/* Card Footer with View Details Button */}
              <div className="beach-card-footer">
                <button
                  className="btn btn-card-details"
                  onClick={() => setSelectedBeach(beach)}
                  aria-label={`View details for ${beach.name}`}
                >
                  View Details & Guide <span>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Beach Details Modal */}
      {selectedBeach && (
        <BeachModal
          beach={selectedBeach}
          onClose={() => setSelectedBeach(null)}
        />
      )}
    </section>
  );
}

export default FeaturedBeaches;
