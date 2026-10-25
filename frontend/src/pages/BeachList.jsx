import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

/**
 * BeachList Page Component
 * Feature 2 & 3: Shows all 6 beaches with live search and safety filters
 */
function BeachList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [beaches, setBeaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [safetyFilter, setSafetyFilter] = useState('All');

  useEffect(() => {
    fetchBeaches();
  }, []);

  const fetchBeaches = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/beaches');
      const data = await res.json();
      if (Array.isArray(data)) {
        setBeaches(data);
      }
    } catch (err) {
      console.error('Failed to load beaches from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  // Sync search input when URL query changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  // Filter beaches by search term and safety level
  const filteredBeaches = beaches.filter((beach) => {
    const matchesSearch =
      beach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beach.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beach.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSafety =
      safetyFilter === 'All' || beach.safetyLevel.toLowerCase() === safetyFilter.toLowerCase();

    return matchesSearch && matchesSafety;
  });

  return (
    <div className="page-container">
      {/* Page Header Banner */}
      <section className="page-header">
        <span className="page-badge">🏖️ Coastal Directory</span>
        <h1 className="page-title">Explore All 6 Coastal Beaches</h1>
        <p className="page-description">
          Find verified details, current water safety levels, recommended visit hours,
          and public amenities across India's famous coastal shores.
        </p>
      </section>

      {/* Search and Filter Controls */}
      <section className="filter-controls-card">
        <div className="search-box-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by beach name, location, or features..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="filter-search-input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSearchParams({});
              }}
              className="clear-search-btn"
            >
              ✕
            </button>
          )}
        </div>

        {/* Safety Filter Tabs */}
        <div className="filter-tabs">
          <span className="filter-label">Filter Safety:</span>
          {['All', 'Safe', 'Moderate', 'Caution'].map((level) => (
            <button
              key={level}
              type="button"
              className={`filter-btn ${safetyFilter === level ? 'active' : ''}`}
              onClick={() => setSafetyFilter(level)}
            >
              {level === 'Safe' ? '🟢 Safe' : level === 'Caution' ? '🔴 Caution' : level === 'Moderate' ? '🟡 Moderate' : 'All'}
            </button>
          ))}
        </div>
      </section>

      {/* Results Count */}
      <div className="results-header">
        <span>Showing <strong>{filteredBeaches.length}</strong> of {beaches.length} beaches</span>
        {searchTerm && (
          <span className="search-tag">Filter: "{searchTerm}"</span>
        )}
      </div>

      {/* Loading & Empty State Handling */}
      {loading ? (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Loading beach directory from API...</p>
        </div>
      ) : filteredBeaches.length === 0 ? (
        <div className="empty-box">
          <h3>No beaches matched your search</h3>
          <p>Try searching for "Marina", "Goa", "Kovalam", or clear filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSafetyFilter('All');
              setSearchParams({});
            }}
            className="btn-outline-primary"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        /* Beaches Cards Grid */
        <div className="beaches-grid">
          {filteredBeaches.map((beach) => (
            <div key={beach._id} className="beach-card">
              <div className="beach-card-img-wrap">
                <img src={beach.image} alt={beach.name} className="beach-card-img" />
                <span className={`safety-badge badge-${beach.safetyLevel.toLowerCase().replace(/\s+/g, '-')}`}>
                  {beach.safetyLevel === 'Safe' ? '🟢 Safe' : beach.safetyLevel === 'Caution' ? '🔴 Caution' : '🟡 Moderate'}
                </span>
              </div>
              <div className="beach-card-body">
                <h3 className="beach-card-name">{beach.name}</h3>
                <p className="beach-card-location">📍 {beach.location}</p>
                <p className="beach-card-desc">{beach.description}</p>

                <div className="beach-card-meta">
                  <small><strong>Best Visiting Time:</strong> {beach.bestTime}</small>
                </div>

                {beach.facilities && beach.facilities.length > 0 && (
                  <div className="facilities-tags">
                    {beach.facilities.slice(0, 3).map((f, i) => (
                      <span key={i} className="facility-pill">✓ {f}</span>
                    ))}
                    {beach.facilities.length > 3 && (
                      <span className="facility-pill">+{beach.facilities.length - 3} more</span>
                    )}
                  </div>
                )}

                <div className="card-actions">
                  <Link to={`/beaches/${beach._id}`} className="btn-primary-block">
                    View Beach Details & Reviews →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BeachList;
