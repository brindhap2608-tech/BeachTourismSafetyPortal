import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Home Page Component
 * Feature 1: Landing page with search bar, live system status, featured beaches, and alerts preview
 */
function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [apiStatus, setApiStatus] = useState({
    loading: true,
    connected: false,
    message: '',
    dbStatus: ''
  });
  const [featuredBeaches, setFeaturedBeaches] = useState([]);
  const [latestAlert, setLatestAlert] = useState(null);

  useEffect(() => {
    // 1. Fetch Backend & Database status
    fetch('http://localhost:5000/api/status')
      .then((res) => res.json())
      .then((data) => {
        setApiStatus({
          loading: false,
          connected: true,
          message: data.message,
          dbStatus: data.database ? data.database.status : 'Connected'
        });
      })
      .catch(() => {
        setApiStatus({
          loading: false,
          connected: false,
          message: 'Backend server not detected (run "npm run dev" in backend folder)',
          dbStatus: 'Disconnected'
        });
      });

    // 2. Fetch Featured Beaches (top 3)
    fetch('http://localhost:5000/api/beaches')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFeaturedBeaches(data.slice(0, 3));
        }
      })
      .catch((err) => console.log('Error fetching beaches:', err));

    // 3. Fetch Latest Safety Alert
    fetch('http://localhost:5000/api/alerts')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLatestAlert(data[0]);
        }
      })
      .catch((err) => console.log('Error fetching alerts:', err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/beaches?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/beaches');
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">🌊 Official Coastal Safety & Tourism Guide</span>
          <h1 className="hero-title">Discover Beautiful Shores, Stay Safe By The Sea</h1>
          <p className="hero-subtitle">
            Real-time sea hazard alerts, verified safety guidelines, emergency contacts,
            and complete travel information for India’s finest beaches.
          </p>

          {/* Interactive Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hero-search-form">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search beach name or location (e.g. Marina, Goa, Kovalam)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-search-input"
            />
            <button type="submit" className="hero-search-btn">
              Search Beaches
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="quick-tags">
            <span>Popular:</span>
            <button type="button" onClick={() => navigate('/beaches?q=Marina')}>Marina Beach</button>
            <button type="button" onClick={() => navigate('/beaches?q=Goa')}>Goa Baga</button>
            <button type="button" onClick={() => navigate('/beaches?q=Kovalam')}>Kovalam</button>
            <button type="button" onClick={() => navigate('/beaches?q=Pondicherry')}>Pondicherry</button>
          </div>
        </div>
      </section>

      {/* Live System Health Banner */}
      <section className="status-banner">
        <div className="status-item">
          <strong>Backend API: </strong>
          {apiStatus.loading ? (
            <span className="badge badge-info">Checking...</span>
          ) : (
            <span className={`badge ${apiStatus.connected ? 'badge-safe' : 'badge-danger'}`}>
              {apiStatus.connected ? '● Online (Port 5000)' : '○ Offline'}
            </span>
          )}
        </div>
        <div className="status-item">
          <strong>MongoDB Database: </strong>
          <span className={`badge ${apiStatus.dbStatus === 'Connected' ? 'badge-safe' : 'badge-warning'}`}>
            {apiStatus.dbStatus || 'In-Memory Fallback Active'}
          </span>
        </div>
        <div className="status-item hotline-quick">
          <strong>🚨 Immediate Emergency: </strong>
          <a href="tel:1554" className="emergency-pill">Coast Guard: 1554</a>
          <a href="tel:108" className="emergency-pill">Ambulance: 108</a>
        </div>
      </section>

      {/* Active Alert Notification (if available) */}
      {latestAlert && (
        <section className="alert-strip">
          <div className="alert-strip-content">
            <span className="alert-icon">⚠️</span>
            <div>
              <strong>LATEST SAFETY ALERT [{latestAlert.type}] at {latestAlert.beachName}:</strong>{' '}
              <span>{latestAlert.message}</span>
            </div>
            <Link to="/alerts" className="btn-alert-link">View All Alerts →</Link>
          </div>
        </section>
      )}

      {/* Featured Beaches Section */}
      <section className="section-block">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Featured Coastal Destinations</h2>
            <p className="section-subtitle">Explore verified beaches with live safety levels and visitor facilities.</p>
          </div>
          <Link to="/beaches" className="btn-outline-primary">
            View All 6 Beaches →
          </Link>
        </div>

        <div className="beaches-grid">
          {featuredBeaches.map((beach) => (
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
                <p className="beach-card-desc">{beach.description.substring(0, 110)}...</p>
                <div className="beach-card-meta">
                  <small>🕒 {beach.bestTime}</small>
                </div>
                <div className="card-actions">
                  <Link to={`/beaches/${beach._id}`} className="btn-primary-sm">
                    View Details & Reviews →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portal 3 Pillars Highlights */}
      <section className="section-block bg-light-panel">
        <h2 className="section-title text-center">Comprehensive Beach Safety & Tourism In One Portal</h2>
        <div className="highlights-grid">
          <div className="highlight-card">
            <span className="highlight-icon">🏖️</span>
            <h3>Detailed Beach Info</h3>
            <p>Know timings, facilities, sand conditions, and the best visiting hours before heading out.</p>
            <Link to="/beaches" className="card-link">Explore Beaches →</Link>
          </div>
          <div className="highlight-card">
            <span className="highlight-icon">🚩</span>
            <h3>Safety Guidelines</h3>
            <p>Learn beach flag warning meanings, rip-current escape rules, and lifeguard instructions.</p>
            <Link to="/safety" className="card-link">Read Guidelines →</Link>
          </div>
          <div className="highlight-card">
            <span className="highlight-icon">🚨</span>
            <h3>Emergency Assistance</h3>
            <p>One-touch access to Coast Guard 1554, Police 100/112, and Marine Ambulance 108 hotlines.</p>
            <Link to="/emergency" className="card-link">Emergency Help →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
