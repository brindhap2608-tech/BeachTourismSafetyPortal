import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * BeachDetails Page Component
 * Feature 4 & 8: Complete beach details, amenities, safety notes, reviews, and new review form
 */
function BeachDetails() {
  const { id } = useParams();

  const [beach, setBeach] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // New review form states
  const [authorName, setAuthorName] = useState(() => {
    const saved = localStorage.getItem('beachUser');
    if (saved) {
      try {
        return JSON.parse(saved).name || '';
      } catch (e) {
        return '';
      }
    }
    return '';
  });
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBeachAndReviews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const fetchBeachAndReviews = async () => {
    try {
      setLoading(true);
      // Fetch single beach details
      const beachRes = await fetch(`http://localhost:5000/api/beaches/${id}`);
      const beachData = await beachRes.json();
      setBeach(beachData);

      // Fetch reviews for this beach
      const reviewRes = await fetch(`http://localhost:5000/api/reviews/${id}`);
      const reviewData = await reviewRes.json();
      if (Array.isArray(reviewData)) {
        setReviews(reviewData);
      }
    } catch (err) {
      console.error('Error fetching beach details or reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      setSubmitError('Please enter your name and comment.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError('');
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          beachId: id,
          userName: authorName.trim(),
          rating: Number(rating),
          comment: comment.trim()
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess('Thank you! Your review was successfully submitted.');
        setComment('');
        // Add new review to existing list immediately
        setReviews((prev) => [data.review, ...prev]);
        setTimeout(() => setSubmitSuccess(''), 4000);
      } else {
        setSubmitError(data.message || 'Failed to submit review.');
      }
    } catch (err) {
      setSubmitError('Network error while posting review.');
    } finally {
      setSubmitting(false);
    }
  };

  // Compute average rating
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
      : '5.0';

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Loading beach details & reviews...</p>
        </div>
      </div>
    );
  }

  if (!beach) {
    return (
      <div className="page-container">
        <div className="empty-box">
          <h2>Beach Not Found</h2>
          <p>We could not find details for the requested beach.</p>
          <Link to="/beaches" className="btn-primary">← Back to Beaches</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Breadcrumb / Back button */}
      <div className="breadcrumb-nav">
        <Link to="/beaches" className="back-link">← Back to All Beaches</Link>
        <span>/</span>
        <span className="current-crumb">{beach.name}</span>
      </div>

      {/* Main Beach Hero Card */}
      <div className="beach-detail-hero-card">
        <div className="detail-image-box">
          <img src={beach.image} alt={beach.name} className="detail-img" />
          <span className={`detail-safety-badge badge-${beach.safetyLevel.toLowerCase().replace(/\s+/g, '-')}`}>
            Safety Rating: {beach.safetyLevel}
          </span>
        </div>

        <div className="detail-info-box">
          <h1 className="detail-title">{beach.name}</h1>
          <p className="detail-location">📍 {beach.location}</p>

          <div className="detail-rating-pill">
            <span className="star-icon">⭐</span>
            <strong>{avgRating} / 5.0</strong>
            <span className="reviews-count">({reviews.length} reviews)</span>
          </div>

          <p className="detail-description">{beach.description}</p>

          <div className="detail-meta-group">
            <div className="meta-item">
              <span className="meta-icon">🕒</span>
              <div>
                <strong>Recommended Visiting Time</strong>
                <p>{beach.bestTime || 'Morning 6:00 AM - 9:00 AM & Evening 4:30 PM - 7:00 PM'}</p>
              </div>
            </div>

            <div className="meta-item">
              <span className="meta-icon">🛟</span>
              <div>
                <strong>Lifeguard Patrol & Safety Status</strong>
                <p>
                  {beach.safetyLevel === 'Safe'
                    ? 'Designated safe swimming zone with active lifeguard watch.'
                    : beach.safetyLevel === 'Caution'
                    ? 'High undertow currents. Swimming prohibited in deep waters.'
                    : 'Moderate wave activity. Stay within boundary flags.'}
                </p>
              </div>
            </div>
          </div>

          {/* Facilities Checklist */}
          {beach.facilities && beach.facilities.length > 0 && (
            <div className="detail-facilities">
              <h3>Available Amenities & Facilities:</h3>
              <div className="facilities-tags">
                {beach.facilities.map((fac, idx) => (
                  <span key={idx} className="facility-pill">✓ {fac}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Emergency & Safety Reminder Box */}
      <div className="beach-safety-advisory-box">
        <div className="advisory-icon">⚠️</div>
        <div className="advisory-text">
          <h4>Beachgoer Safety Advisory</h4>
          <p>
            Always observe colored flags posted on the sand. Never swim alone or enter water after sunset.
            For water rescue emergency, call <strong>Coast Guard at 1554</strong> or <strong>Ambulance at 108</strong>.
          </p>
        </div>
        <Link to="/safety" className="btn-advisory-guidelines">Full Guidelines →</Link>
      </div>

      {/* REVIEWS & RATINGS SECTION */}
      <section className="reviews-section">
        <div className="reviews-header">
          <div>
            <h2>Tourist Reviews & Experiences ({reviews.length})</h2>
            <p className="text-muted">Real feedback from visitors and safety evaluations.</p>
          </div>
          <div className="reviews-score-summary">
            <span className="score-number">{avgRating}</span>
            <div className="score-stars">{'★'.repeat(Math.round(Number(avgRating)))}</div>
            <small>Average Rating</small>
          </div>
        </div>

        <div className="reviews-layout-grid">
          {/* Reviews List */}
          <div className="reviews-list-col">
            {reviews.length === 0 ? (
              <div className="no-reviews-card">
                <p>No reviews yet for this beach. Be the first tourist to share your experience!</p>
              </div>
            ) : (
              reviews.map((rev, index) => (
                <div key={rev._id || index} className="review-card">
                  <div className="review-card-top">
                    <div className="reviewer-info">
                      <span className="avatar-circle">
                        {rev.userName ? rev.userName.charAt(0).toUpperCase() : 'U'}
                      </span>
                      <div>
                        <strong>{rev.userName}</strong>
                        <span className="review-date">
                          {rev.date ? new Date(rev.date).toLocaleDateString() : 'Verified Tourist'}
                        </span>
                      </div>
                    </div>
                    <div className="review-stars-badge">
                      {'★'.repeat(rev.rating || 5)}{'☆'.repeat(5 - (rev.rating || 5))}
                    </div>
                  </div>
                  <p className="review-text">"{rev.comment}"</p>
                </div>
              ))
            )}
          </div>

          {/* Add Review Form */}
          <div className="add-review-col">
            <div className="add-review-card">
              <h3>Write a Review</h3>
              <p className="text-muted">Share your visit experience and beach safety observations.</p>

              {submitSuccess && (
                <div className="alert-box alert-success">{submitSuccess}</div>
              )}
              {submitError && (
                <div className="alert-box alert-error">{submitError}</div>
              )}

              <form onSubmit={handleReviewSubmit} className="review-form">
                <div className="form-group">
                  <label>Your Name / Tourist Handle</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Safety & Visit Rating (1 to 5 Stars)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="form-control"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 - Excellent & Very Safe</option>
                    <option value={4}>⭐⭐⭐⭐ 4 - Good & Well Maintained</option>
                    <option value={3}>⭐⭐⭐ 3 - Average (Exercise Caution)</option>
                    <option value={2}>⭐⭐ 2 - Poor (High Waves / Dirty)</option>
                    <option value={1}>⭐ 1 - Hazardous / Do Not Swim</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Experience / Observations</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell other tourists about wave conditions, lifeguards, parking, and crowds..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary-block"
                >
                  {submitting ? 'Submitting...' : 'Post Tourist Review'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BeachDetails;
