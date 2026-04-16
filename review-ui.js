// Review System - UI & Rendering
import { 
  submitReview, 
  fetchReviews, 
  getReviewCount, 
  getAverageRating,
  getRatingDistribution,
  toggleLikeReview
} from './review-handler.js';

/**
 * Generate star rating HTML
 */
function createStarRating(rating, interactive = false, onRate = null) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    const filled = i <= rating ? 'filled' : '';
    const clickHandler = interactive && onRate ? `onclick="event.stopPropagation(); ${onRate}(${i})"` : '';
    stars += `
      <span class="star ${filled}" ${clickHandler} style="${interactive ? 'cursor: pointer;' : ''}">
        ★
      </span>
    `;
  }
  return `<div class="star-rating ${interactive ? 'interactive' : ''}">${stars}</div>`;
}

/**
 * Format date for display
 */
function formatDate(date) {
  if (!date) return 'Recently';
  
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return then.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

/**
 * Create review form HTML
 */
function createReviewForm(templeId) {
  return `
    <form id="reviewForm" class="review-form" data-temple-id="${templeId}">
      <h3 class="form-title">Share Your Experience</h3>
      
      <div class="form-group">
        <label for="reviewName">Your Name *</label>
        <input 
          type="text" 
          id="reviewName" 
          name="name" 
          placeholder="Enter your name" 
          required 
          minlength="2"
          maxlength="50"
          autocomplete="name"
        >
      </div>

      <div class="form-group">
        <label for="reviewEmail">Email Address *</label>
        <input 
          type="email" 
          id="reviewEmail" 
          name="email" 
          placeholder="your.email@example.com" 
          required
          autocomplete="email"
        >
        <small class="help-text">For verification only, never shared publicly</small>
      </div>

      <div class="form-group">
        <label for="reviewRating">Rating *</label>
        <div class="rating-selector">
          <input 
            type="hidden" 
            id="reviewRating" 
            name="rating" 
            value="5" 
            required
          >
          <div class="star-rating interactive" id="ratingStars">
            ${[1, 2, 3, 4, 5].map(i => 
              `<span class="star filled" data-rating="${i}">★</span>`
            ).join('')}
          </div>
          <span class="rating-text">Very Good</span>
        </div>
      </div>

      <div class="form-group">
        <label for="reviewText">Review *</label>
        <textarea 
          id="reviewText" 
          name="text" 
          placeholder="Share your experience at this temple... (minimum 10 characters)" 
          required 
          minlength="10"
          maxlength="5000"
          rows="5"
          autocomplete="off"
        ></textarea>
        <small class="help-text"><span id="charCount">0</span>/5000 characters</small>
      </div>

      <div class="form-group">
        <label for="reviewImages">Upload Images (Optional - Max 3 images, 5MB each)</label>
        <div class="image-upload">
          <input 
            type="file" 
            id="reviewImages" 
            name="images" 
            accept="image/jpeg,image/png,image/webp" 
            multiple
            style="display: none;"
          >
          <div class="upload-area" onclick="document.getElementById('reviewImages').click()" style="cursor: pointer;">
            <p class="upload-icon">📷</p>
            <p class="upload-text">📱 Tap to select images</p>
            <small>JPG, PNG, WebP • Max 5MB each</small>
          </div>
          <div id="imagePreview" class="image-preview"></div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" id="submitBtn">
          <span>Submit Review</span>
        </button>
        <button type="reset" class="btn btn-secondary">Clear</button>
      </div>

      <div id="formMessage" class="form-message" style="display: none;"></div>
    </form>
  `;
}

/**
 * Create review card HTML
 */
function createReviewCard(review, templeId) {
  const ratingText = ['Poor', 'Average', 'Good', 'Very Good', 'Excellent'][review.rating - 1];
  
  return `
    <div class="review-card" data-review-id="${review.id}">
      <div class="review-header">
        <div class="reviewer-info">
          <div class="reviewer-avatar">${review.userName.charAt(0).toUpperCase()}</div>
          <div class="reviewer-details">
            <h4 class="reviewer-name">${review.userName}</h4>
            <p class="review-date">${formatDate(review.timestamp)}</p>
          </div>
        </div>
        <div class="review-rating">
          ${createStarRating(review.rating)}
          <span class="rating-label">${ratingText}</span>
        </div>
      </div>

      <p class="review-text">${review.text}</p>

      ${review.images && review.images.length > 0 ? `
        <div class="review-images">
          ${review.images.map(img => `
            <div class="review-image-item">
              <img 
                src="${img.url}" 
                alt="Review image" 
                loading="lazy"
                onclick="this.closest('.review-images').classList.toggle('expanded')"
              >
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="review-actions">
        <button class="btn-action like-btn" data-review-id="${review.id}" data-temple-id="${templeId}">
          <span class="like-icon">👍</span>
          <span class="like-count">${review.likes || 0}</span>
          <span class="like-text">Helpful</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Create rating summary widget
 */
async function createRatingSummary(templeId) {
  const avgRating = await getAverageRating(templeId);
  const reviewCount = await getReviewCount(templeId);
  const distribution = await getRatingDistribution(templeId);

  return `
    <div class="rating-summary">
      <div class="summary-main">
        <h3 class="summary-title">Customer Reviews</h3>
        <div class="summary-stats">
          <div class="summary-rating">
            <span class="average-rating">${avgRating}</span>
            <div class="summary-stars">
              ${createStarRating(Math.round(avgRating))}
            </div>
            <p class="review-count">${reviewCount} review${reviewCount !== 1 ? 's' : ''}</p>
          </div>

          <div class="summary-distribution">
            ${[5, 4, 3, 2, 1].map(rating => {
              const count = distribution[rating] || 0;
              const percentage = reviewCount > 0 ? Math.round((count / reviewCount) * 100) : 0;
              return `
                <div class="distribution-row">
                  <span class="distribution-label">${rating} ★</span>
                  <div class="distribution-bar">
                    <div class="distribution-fill" style="width: ${percentage}%"></div>
                  </div>
                  <span class="distribution-count">${count}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize review section in temple details
 */
export async function initializeReviewSection(templeId, containerElement) {
  try {
    // Create rating summary
    const summary = await createRatingSummary(templeId);
    
    // Create form and reviews list
    const html = `
      ${summary}
      <div id="reviewsContainer">
        ${createReviewForm(templeId)}
        <div id="reviewsList" class="reviews-list"></div>
        <div id="loadMoreContainer" style="text-align: center; margin: 2rem 0;"></div>
      </div>
    `;

    containerElement.innerHTML = html;

    // Setup form handlers
    setupReviewForm(templeId);

    // Load initial reviews
    await loadMoreReviews(templeId);

  } catch (error) {
    console.error('Error initializing review section:', error);
  }
}

/**
 * Setup review form event listeners
 */
function setupReviewForm(templeId) {
  const form = document.getElementById('reviewForm');
  if (!form) return;

  // Rating selector
  const ratingStars = document.getElementById('ratingStars');
  const ratingInput = document.getElementById('reviewRating');
  const ratingText = document.querySelector('.rating-text');

  const ratingLabels = ['Poor', 'Average', 'Good', 'Very Good', 'Excellent'];

  ratingStars.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
      const rating = star.dataset.rating;
      ratingInput.value = rating;
      ratingText.textContent = ratingLabels[rating - 1];

      ratingStars.querySelectorAll('.star').forEach((s, index) => {
        if (index < rating) {
          s.classList.add('filled');
        } else {
          s.classList.remove('filled');
        }
      });
    });

    star.addEventListener('mouseover', () => {
      const rating = star.dataset.rating;
      ratingStars.querySelectorAll('.star').forEach((s, index) => {
        if (index < rating) {
          s.style.opacity = '1';
        } else {
          s.style.opacity = '0.3';
        }
      });
    });
  });

  ratingStars.addEventListener('mouseout', () => {
    ratingStars.querySelectorAll('.star').forEach(s => {
      s.style.opacity = '1';
    });
  });

  // Character count
  const textarea = document.getElementById('reviewText');
  textarea.addEventListener('input', () => {
    document.getElementById('charCount').textContent = textarea.value.length;
  });

  // Image upload preview
  const imageInput = document.getElementById('reviewImages');
  const imagePreview = document.getElementById('imagePreview');

  imageInput.addEventListener('change', () => {
    if (imageInput.files.length > 3) {
      alert('Maximum 3 images allowed');
      imageInput.value = '';
      imagePreview.innerHTML = '';
      return;
    }

    imagePreview.innerHTML = '';
    Array.from(imageInput.files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const div = document.createElement('div');
        div.className = 'preview-item';
        div.innerHTML = `
          <div class="preview-image-wrapper">
            <img src="${e.target.result}" alt="Preview">
            <button type="button" class="remove-btn" data-index="${index}">✕</button>
          </div>
          <small>${file.name}</small>
        `;
        imagePreview.appendChild(div);
      };
      reader.readAsDataURL(file);
    });
  });

  // Drag and drop
  const uploadArea = document.querySelector('.upload-area');
  if (uploadArea) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
      uploadArea.addEventListener(eventName, () => {
        uploadArea.style.backgroundColor = '#f0f0f0';
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      uploadArea.addEventListener(eventName, () => {
        uploadArea.style.backgroundColor = '#transparent';
      });
    });

    uploadArea.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      imageInput.files = files;
      imageInput.dispatchEvent(new Event('change'));
    });
  }

  // Form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';

    try {
      const reviewData = {
        userName: document.getElementById('reviewName').value,
        email: document.getElementById('reviewEmail').value,
        rating: parseInt(document.getElementById('reviewRating').value),
        text: document.getElementById('reviewText').value
      };

      const imageFiles = Array.from(imageInput.files);

      const result = await submitReview(templeId, reviewData, imageFiles);

      if (result.success) {
        formMessage.style.display = 'block';
        formMessage.className = 'form-message success';
        formMessage.textContent = result.message;
        form.reset();
        imagePreview.innerHTML = '';
        document.getElementById('charCount').textContent = '0';
      } else {
        formMessage.style.display = 'block';
        formMessage.className = 'form-message error';
        formMessage.textContent = result.error || 'Failed to submit review';
      }
    } catch (error) {
      formMessage.style.display = 'block';
      formMessage.className = 'form-message error';
      formMessage.textContent = error.message;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Submit Review</span>';
    }
  });
}

/**
 * Load more reviews
 */
async function loadMoreReviews(templeId, sortBy = 'helpful') {
  const reviewsList = document.getElementById('reviewsList');
  const loadMoreContainer = document.getElementById('loadMoreContainer');

  try {
    const reviews = await fetchReviews(templeId, sortBy, 5);

    if (reviews.length === 0 && reviewsList.innerHTML === '') {
      reviewsList.innerHTML = `
        <div class="no-reviews">
          <p>No approved reviews yet. Be the first to review this temple!</p>
        </div>
      `;
      loadMoreContainer.innerHTML = '';
      return;
    }

    reviewsList.innerHTML = reviews.map(review => createReviewCard(review, templeId)).join('');

    // Setup like buttons
    setupLikeButtons(templeId);

    // Show load more button if there are more reviews
    if (reviews.length >= 5) {
      loadMoreContainer.innerHTML = `
        <button class="btn btn-secondary" onclick="loadMoreReviews('${templeId}')">
          Load More Reviews
        </button>
      `;
    } else {
      loadMoreContainer.innerHTML = '';
    }

  } catch (error) {
    console.error('Error loading reviews:', error);
    reviewsList.innerHTML = `<p class="error-message">Failed to load reviews</p>`;
  }
}

/**
 * Setup like button functionality
 */
function setupLikeButtons(templeId) {
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const reviewId = btn.dataset.reviewId;
      const userId = `user_${new Date().getTime()}`; // Simple user ID

      const result = await toggleLikeReview(templeId, reviewId, userId);
      
      if (result.success) {
        btn.classList.toggle('liked');
        // Note: Actual like count update would require real-time listeners
      }
    });
  });
}

// Make loadMoreReviews globally accessible
window.loadMoreReviews = loadMoreReviews;
