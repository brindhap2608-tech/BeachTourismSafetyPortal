import React, { useState } from 'react';
import { BEACHES_DATA, SAMPLE_REVIEWS_DATA } from '../data/beachData';

/**
 * Reviews Page Component (Frontend-Only Prototype)
 * Requirements:
 * - Beach selection
 * - 1–5 star rating
 * - Review text box
 * - Submit Review button
 * - Display 4–5 sample reviews
 * - Average rating calculation & display
 * - User-friendly cards
 * - Sample/static data only
 * - Responsive layout
 */
function Reviews() {
  const [reviewsList, setReviewsList] = useState(SAMPLE_REVIEWS_DATA);
  const [selectedBeachFilter, setSelectedBeachFilter] = useState('all');

  // Form State
  const [reviewerName, setReviewerName] = useState('');
  const [selectedBeach, setSelectedBeach] = useState('marina-beach');
  const [starRating, setStarRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [visitType, setVisitType] = useState('Family Outing');
  const [formFeedback, setFormFeedback] = useState(null);

  // Filter reviews
  const filteredReviews = reviewsList.filter((review) => {
    if (selectedBeachFilter === 'all') return true;
    return review.beachId === selectedBeachFilter;
  });

  // Calculate Average Rating
  const averageRating =
    reviewsList.length > 0
      ? (
          reviewsList.reduce((acc, curr) => acc + curr.rating, 0) /
          reviewsList.length
        ).toFixed(1)
      : '5.0';

  // Handle Review Submission
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!reviewerName.trim() || !reviewComment.trim()) {
      setFormFeedback({
        type: 'error',
        message: 'Please provide both your name and review comments.'
      });
      return;
    }

    const beachObj = BEACHES_DATA.find((b) => b.id === selectedBeach);

    const newReview = {
      id: `rev-${Date.now()}`,
      userName: reviewerName.trim(),
      beachName: beachObj ? beachObj.name : 'Coastal Beach',
      beachId: selectedBeach,
      rating: starRating,
      date: 'Just now',
      visitType: visitType,
      comment: reviewComment.trim(),
      helpfulCount: 0
    };

    setReviewsList([newReview, ...reviewsList]);
    setReviewerName('');
    setReviewComment('');
    setStarRating(5);
    setFormFeedback({
      type: 'success',
      message: `Thank you, ${newReview.userName}! Your review for ${newReview.beachName} has been submitted (Demo Mode).`
    });

    setTimeout(() => {
      setFormFeedback(null);
    }, 4500);
  };

  // Upvote helpful counter
  const handleLikeReview = (reviewId) => {
    setReviewsList((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
      )
    );
  };

  // Helper to render star icons
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`star-icon ${i < rating ? 'star-filled' : 'star-empty'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="page-wrapper reviews-page-wrapper">
      {/* Page Header */}
      <section className="page-header-banner reviews-header-banner">
        <div className="page-header-content">
          <span className="page-badge">⭐ Community Feedback</span>
          <h1 className="page-title">Visitor Reviews & Ratings</h1>
          <p className="page-subtitle">
            Read real tourist experiences, cleanliness ratings, and lifeguard safety feedback
            across our monitored coastlines. Share your own beach experience!
          </p>
        </div>
      </section>

      <div className="section-container">
        {/* Rating Overview & Stats Bar */}
        <div className="reviews-summary-card">
          <div className="rating-score-box">
            <span className="rating-number">{averageRating}</span>
            <div className="rating-stars-overall">
              {renderStars(Math.round(Number(averageRating)))}
            </div>
            <span className="rating-count-text">
              Based on {reviewsList.length} verified visitor ratings
            </span>
          </div>

          <div className="rating-breakdown-box">
            <div className="breakdown-row">
              <span>Safety & Patrols</span>
              <div className="breakdown-bar">
                <div className="bar-fill" style={{ width: '96%' }}></div>
              </div>
              <span>4.9 / 5</span>
            </div>
            <div className="breakdown-row">
              <span>Beach Cleanliness</span>
              <div className="breakdown-bar">
                <div className="bar-fill" style={{ width: '88%' }}></div>
              </div>
              <span>4.5 / 5</span>
            </div>
            <div className="breakdown-row">
              <span>Family Friendliness</span>
              <div className="breakdown-bar">
                <div className="bar-fill" style={{ width: '92%' }}></div>
              </div>
              <span>4.7 / 5</span>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout: Review Form + Reviews List */}
        <div className="reviews-main-grid">
          {/* Column 1: Submit Review Form */}
          <div className="review-form-card">
            <div className="form-card-header">
              <span className="card-tag">SHARE YOUR EXPERIENCE</span>
              <h2 className="form-card-title">Write a Beach Review</h2>
              <p className="form-card-desc">
                Help other tourists by sharing current sand conditions, safety flag visibility, and amenities.
              </p>
            </div>

            {/* Notification alert */}
            {formFeedback && (
              <div className={`login-feedback feedback-${formFeedback.type}`}>
                <span>{formFeedback.message}</span>
                <button
                  type="button"
                  className="feedback-dismiss"
                  onClick={() => setFormFeedback(null)}
                >
                  ✕
                </button>
              </div>
            )}

            <form className="review-form" onSubmit={handleSubmitReview}>
              {/* Reviewer Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="reviewerName">
                  Your Name / Alias
                </label>
                <div className="input-group">
                  <span className="input-icon">👤</span>
                  <input
                    id="reviewerName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Priya Sharma"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Beach Selection Dropdown */}
              <div className="form-group">
                <label className="form-label" htmlFor="beachSelect">
                  Select Beach Visited
                </label>
                <select
                  id="beachSelect"
                  className="form-input review-select"
                  value={selectedBeach}
                  onChange={(e) => setSelectedBeach(e.target.value)}
                >
                  {BEACHES_DATA.map((beach) => (
                    <option key={beach.id} value={beach.id}>
                      {beach.name} ({beach.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Trip Purpose */}
              <div className="form-group">
                <label className="form-label" htmlFor="visitType">
                  Purpose of Visit
                </label>
                <select
                  id="visitType"
                  className="form-input review-select"
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value)}
                >
                  <option value="Family Outing">Family Outing with Children</option>
                  <option value="Morning Jog & Walking">Morning Jog / Coastal Walk</option>
                  <option value="Surfing & Sports">Surfing & Water Sports</option>
                  <option value="Heritage Tourism">Heritage & Photography</option>
                  <option value="Weekend Getaway">Weekend Leisure Getaway</option>
                </select>
              </div>

              {/* 1–5 Star Rating Selector */}
              <div className="form-group">
                <label className="form-label">
                  Overall Rating: <strong>{starRating} of 5 Stars</strong>
                </label>
                <div className="interactive-star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-select-btn ${
                        star <= (hoverRating || starRating)
                          ? 'star-active'
                          : 'star-inactive'
                      }`}
                      onClick={() => setStarRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${star} star`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-desc-badge">
                    {starRating === 5 && '🌟 Excellent Experience'}
                    {starRating === 4 && '👍 Very Good & Safe'}
                    {starRating === 3 && '👌 Average / Normal'}
                    {starRating === 2 && '⚠️ Needs Better Patrols'}
                    {starRating === 1 && '🚫 Poor / Hazard Concerns'}
                  </span>
                </div>
              </div>

              {/* Review Text Box */}
              <div className="form-group">
                <label className="form-label" htmlFor="reviewText">
                  Your Detailed Review
                </label>
                <textarea
                  id="reviewText"
                  rows="4"
                  className="form-input review-textarea"
                  placeholder="Share details about wave conditions, lifeguards on duty, parking, cleanliness, and facilities..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-submit-review">
                ⭐ Post Beach Review
              </button>
            </form>
          </div>

          {/* Column 2: Reviews Display List */}
          <div className="reviews-list-column">
            {/* Filter Tabs */}
            <div className="reviews-filter-header">
              <div>
                <span className="card-tag">VISITOR TESTIMONIALS</span>
                <h2 className="reviews-list-title">Recent Tourist Reviews</h2>
              </div>

              {/* Beach Filter Dropdown/Pills */}
              <div className="review-beach-filters">
                <button
                  type="button"
                  className={`review-filter-pill ${
                    selectedBeachFilter === 'all' ? 'pill-active' : ''
                  }`}
                  onClick={() => setSelectedBeachFilter('all')}
                >
                  All ({reviewsList.length})
                </button>
                {BEACHES_DATA.map((beach) => (
                  <button
                    key={beach.id}
                    type="button"
                    className={`review-filter-pill ${
                      selectedBeachFilter === beach.id ? 'pill-active' : ''
                    }`}
                    onClick={() => setSelectedBeachFilter(beach.id)}
                  >
                    {beach.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews Cards List */}
            <div className="reviews-cards-stack">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((rev) => (
                  <div key={rev.id} className="review-card">
                    <div className="review-card-top">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          {rev.userName.charAt(0)}
                        </div>
                        <div>
                          <strong className="reviewer-name">
                            {rev.userName}
                          </strong>
                          <div className="review-meta">
                            <span className="review-beach-tag">
                              📍 {rev.beachName}
                            </span>
                            <span className="review-date">• {rev.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="review-rating-stars">
                        {renderStars(rev.rating)}
                      </div>
                    </div>

                    <div className="review-visit-badge">
                      <span>Trip: {rev.visitType}</span>
                    </div>

                    <p className="review-comment-body">"{rev.comment}"</p>

                    <div className="review-card-footer">
                      <span className="verified-badge">
                        ✓ Verified Visitor Review
                      </span>

                      <button
                        type="button"
                        className="btn-helpful"
                        onClick={() => handleLikeReview(rev.id)}
                        title="Mark as helpful"
                      >
                        👍 Helpful ({rev.helpfulCount})
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reviews-box">
                  <span className="no-reviews-icon">🏖️</span>
                  <h3>No Reviews for this Beach Yet</h3>
                  <p>Be the first visitor to share safety and visit details using the form!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
