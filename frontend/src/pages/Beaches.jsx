import React, { useState } from 'react';
import { BEACHES_DATA } from '../data/beachData';
import BeachModal from '../components/BeachModal';

/**
 * Beaches Page Component
 * Requirements:
 * - Title: "Explore Our Beaches"
 * - Search bar (filters beaches by name and location)
 * - 4 beach cards: Marina Beach, Elliot's Beach, Mahabalipuram Beach, Kovalam Beach
 * - Show image, location, safety status, short description
 * - View Details button using existing BeachModal
 */
function Beaches() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeBeachModal, setActiveBeachModal] = useState(null);

  // Filter beaches by search term and safety category
  const filteredBeaches = BEACHES_DATA.filter((beach) => {
    const matchesSearch =
      beach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beach.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beach.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'safe') return beach.statusType === 'safe';
    if (selectedFilter === 'caution') return beach.statusType === 'caution';

    return true;
  });

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <section className="page-header-banner">
        <div className="page-header-content">
          <span className="page-badge">🏖️ Coastal Directory</span>
          <h1 className="page-title">Explore Our Beaches</h1>
          <p className="page-subtitle">
            Find current sea conditions, safety statuses, lifeguard patrol timings,
            and key visitor facilities across Tamil Nadu's most popular shores.
          </p>

          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by beach name or location (e.g. Marina, Besant Nagar)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search beaches"
            />
            {searchTerm && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="section-container">
        {/* Filter Pills and Counter */}
        <div className="page-controls-bar">
          <div className="filter-bar">
            <button
              className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All Beaches ({BEACHES_DATA.length})
            </button>
            <button
              className={`filter-btn ${selectedFilter === 'safe' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('safe')}
            >
              🟢 Safe Zones
            </button>
            <button
              className={`filter-btn ${selectedFilter === 'caution' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('caution')}
            >
              🟡 Caution / Swell Zones
            </button>
          </div>

          <div className="results-counter">
            Showing <strong>{filteredBeaches.length}</strong> of {BEACHES_DATA.length} beaches
          </div>
        </div>

        {/* Beaches Grid */}
        {filteredBeaches.length > 0 ? (
          <div className="beaches-grid">
            {filteredBeaches.map((beach) => (
              <div key={beach.id} className="beach-card">
                {/* Image and Status Badge */}
                <div className="beach-card-image-wrap">
                  <img
                    src={beach.image}
                    alt={beach.name}
                    className="beach-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <span className={`status-badge status-${beach.statusType}`}>
                    {beach.badgeText}
                  </span>
                </div>

                {/* Beach Content */}
                <div className="beach-card-body">
                  <div className="beach-card-location">
                    <span>📍</span> {beach.location}
                  </div>

                  <h2 className="beach-card-name">{beach.name}</h2>

                  <p className="beach-card-desc">{beach.shortDescription}</p>

                  {/* Safety Status Pill Box */}
                  <div className={`beach-safety-status-box status-box-${beach.statusType}`}>
                    <span className="status-indicator-dot"></span>
                    <div>
                      <div className="status-label">Safety Status:</div>
                      <strong className="status-text">{beach.safetyStatus}</strong>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="beach-card-footer">
                    <button
                      className="btn btn-card-details"
                      onClick={() => setActiveBeachModal(beach)}
                      aria-label={`View details for ${beach.name}`}
                    >
                      View Details & Guide <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results-box">
            <span className="no-results-icon">🌊</span>
            <h3>No Beaches Found</h3>
            <p>We could not find any beaches matching "{searchTerm}". Try a different keyword.</p>
            <button className="btn btn-primary" onClick={() => setSearchTerm('')}>
              Reset Search
            </button>
          </div>
        )}
      </div>

      {/* Reusable Beach Details Modal */}
      {activeBeachModal && (
        <BeachModal
          beach={activeBeachModal}
          onClose={() => setActiveBeachModal(null)}
        />
      )}
    </div>
  );
}

export default Beaches;
