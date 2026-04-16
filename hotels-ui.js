/**
 * Hotel UI Component Module
 * Handles rendering and interaction for hotel cards
 */

import { 
  getHotelsNearTemple, 
  filterHotelsByPrice, 
  filterHotelsByRating, 
  sortHotels 
} from './hotels-api.js';

// State management
let currentHotels = [];
let currentPage = 1;
let hotelsPerPage = 6;
let currentFilters = {
  priceRange: [0, 5000],
  minRating: 0,
  sortBy: 'price'
};

/**
 * Load and display hotels for a selected temple
 * @param {Object} temple - Temple object with coordinates and details
 */
export async function loadHotelsForTemple(temple) {
  const hotelContainer = document.getElementById('hotelContainer');
  const loadingSpinner = document.getElementById('hotelLoadingSpinner');

  if (!hotelContainer) {
    console.error('Hotel container not found in DOM');
    return;
  }

  // Show loading state
  showLoadingState(hotelContainer);

  try {
    // Fetch hotels from API
    const hotels = await getHotelsNearTemple(
      temple.id,
      temple.coordinates.lat,
      temple.coordinates.lng,
      temple.religion
    );

    if (!hotels || hotels.length === 0) {
      showNoResultsMessage(hotelContainer);
      return;
    }

    // Store and display hotels
    currentHotels = hotels;
    currentPage = 1;
    applyFiltersAndRender();

    // Scroll to hotel section - COMMENTED OUT to prevent auto-scroll
    // setTimeout(() => {
    //   hotelContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }, 300);

  } catch (error) {
    console.error('Error loading hotels:', error);
    showErrorMessage(hotelContainer, error.message);
  }
}

/**
 * Render hotels with current filters applied
 */
function applyFiltersAndRender() {
  let filtered = [...currentHotels];

  // Apply price filter
  filtered = filterHotelsByPrice(filtered, currentFilters.priceRange[0], currentFilters.priceRange[1]);

  // Apply rating filter
  filtered = filterHotelsByRating(filtered, currentFilters.minRating);

  // Apply sorting
  filtered = sortHotels(filtered, currentFilters.sortBy, 'asc');

  // Render paginated results
  renderHotels(filtered);
}

/**
 * Render hotel cards to the DOM
 * @param {Array} hotels - Array of hotel objects to render
 */
function renderHotels(hotels) {
  const hotelContainer = document.getElementById('hotelContainer');
  
  if (!hotels || hotels.length === 0) {
    hotelContainer.innerHTML = '<p class="no-hotels-message">No hotels match your criteria. Try adjusting filters.</p>';
    return;
  }

  // Calculate pagination
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);
  const startIndex = (currentPage - 1) * hotelsPerPage;
  const endIndex = startIndex + hotelsPerPage;
  const paginatedHotels = hotels.slice(startIndex, endIndex);

  // Render hotel cards
  const hotelCardsHTML = paginatedHotels.map(hotel => createHotelCard(hotel)).join('');
  
  hotelContainer.innerHTML = `
    <div class="hotels-grid">
      ${hotelCardsHTML}
    </div>
    ${totalPages > 1 ? createPaginationControls(totalPages) : ''}
  `;

  // Attach event listeners
  attachHotelCardListeners();
  if (totalPages > 1) {
    attachPaginationListeners(totalPages);
  }
}

/**
 * Create HTML for a single hotel card
 * @param {Object} hotel - Hotel object
 * @returns {string} HTML string for hotel card
 */
function createHotelCard(hotel) {
  const stars = createStarRating(hotel.rating);
  const amenitiesHTML = hotel.amenities
    .slice(0, 3)
    .map(amenity => `<span class="amenity-badge">${amenity}</span>`)
    .join('');

  return `
    <div class="hotel-card clickable-card" data-hotel-id="${hotel.id}">
      <div class="hotel-card-image-container">
        <img src="${hotel.image || 'https://images.unsplash.com/photo-1631049307038-da0ec36d9c58?w=400&h=300&fit=crop'}" alt="${hotel.name}" class="hotel-card-image" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'">
        <div class="hotel-distance-badge">${hotel.distance} km away</div>
        <div class="hotel-click-overlay">Click to view details</div>
      </div>
      
      <div class="hotel-card-content">
        <h3 class="hotel-card-title">${hotel.name}</h3>
        
        <div class="hotel-rating-section">
          <div class="hotel-stars">${stars}</div>
          <span class="hotel-rating-number">${hotel.rating}</span>
          <span class="hotel-rating-count">(${hotel.ratingCount} reviews)</span>
        </div>
        
        <p class="hotel-address">
          <span class="address-icon">📍</span>
          ${hotel.address}
        </p>
        
        <div class="hotel-amenities">
          ${amenitiesHTML}
          ${hotel.amenities.length > 3 ? `<span class="amenity-more">+${hotel.amenities.length - 3} more</span>` : ''}
        </div>
        
        <div class="hotel-price-section">
          <div class="hotel-price">
            <span class="price-currency">${hotel.currency}</span>
            <span class="price-amount">${hotel.price}</span>
            <span class="price-period">/night</span>
          </div>
        </div>
        
        <div class="hotel-actions">
          <a href="#" class="hotel-map-btn quick-action">
            <span class="btn-icon">📍</span> Location
          </a>
          <a href="${hotel.bookingUrl}" target="_blank" class="hotel-book-btn quick-action">
            <span class="btn-icon">📅</span> Book Now
          </a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Create star rating HTML
 * @param {number} rating - Rating value (0-5)
 * @returns {string} Star HTML
 */
function createStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let stars = '⭐'.repeat(fullStars);
  if (hasHalfStar) stars += '⭐';
  stars += '☆'.repeat(Math.max(0, emptyStars));

  return stars;
}

/**
 * Create pagination controls HTML
 * @param {number} totalPages - Total number of pages
 * @returns {string} HTML string for pagination
 */
function createPaginationControls(totalPages) {
  let paginationHTML = '<div class="hotel-pagination">';
  
  // Previous button
  paginationHTML += `
    <button class="pagination-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''}>
      ← Previous
    </button>
  `;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      paginationHTML += `
        <button class="pagination-btn page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
          ${i}
        </button>
      `;
    } else if (i === 2 && currentPage > 3) {
      paginationHTML += '<span class="pagination-dots">...</span>';
    }
  }

  // Next button
  paginationHTML += `
    <button class="pagination-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''}>
      Next →
    </button>
  `;

  paginationHTML += '</div>';
  return paginationHTML;
}

/**
 * Create hotel filter controls HTML
 * @param {Array} hotels - Current hotels array
 * @returns {string} HTML string for filter controls
 */
export function createFilterControls(hotels) {
  if (!hotels || hotels.length === 0) return '';

  const prices = hotels.map(h => h.price).sort((a, b) => a - b);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return `
    <div class="hotel-filters-section">
      <div class="filters-container">
        
        <div class="filter-group">
          <label for="priceRange" class="filter-label">Price Range (₹)</label>
          <div class="price-range-inputs">
            <input type="number" id="minPrice" class="price-input" value="${currentFilters.priceRange[0]}" min="${minPrice}">
            <span class="price-separator">to</span>
            <input type="number" id="maxPrice" class="price-input" value="${currentFilters.priceRange[1]}" max="${maxPrice}">
          </div>
        </div>

        <div class="filter-group">
          <label for="minRating" class="filter-label">Minimum Rating</label>
          <select id="minRating" class="filter-select">
            <option value="0">All Ratings</option>
            <option value="3">3+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="sortBy" class="filter-label">Sort By</label>
          <select id="sortBy" class="filter-select">
            <option value="price">Price (Low to High)</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="distance">Distance (Closest)</option>
          </select>
        </div>

        <button id="applyFiltersBtn" class="apply-filters-btn">Apply Filters</button>
        <button id="resetFiltersBtn" class="reset-filters-btn">Reset</button>
      </div>
    </div>
  `;
}

/**
 * Show detailed hotel information in a modal
 * @param {Object} hotel - Hotel object with all details
 */
export function showHotelDetails(hotel) {
  const hotelContainer = document.getElementById('hotelContainer');
  const hotelFilters = document.getElementById('hotelFilters');
  
  if (!hotelContainer) return;

  // Hide filters when viewing hotel details
  if (hotelFilters) {
    hotelFilters.style.display = 'none';
  }

  // Generate proper Google Maps URLs with coordinates
  const mapsUrl = hotel.coordinates 
    ? `https://www.google.com/maps?q=${hotel.coordinates.lat},${hotel.coordinates.lng}` 
    : `https://www.google.com/maps/search/${encodeURIComponent(hotel.address)}`;
  
  const bookingUrl = `https://www.google.com/maps/search/hotels+near+${hotel.coordinates.lat},${hotel.coordinates.lng}`;

  hotelContainer.innerHTML = `
    <button class="hotel-back-btn" id="hotelBackBtn">← Back to Hotels</button>
    <div class="hotel-detail-content">
      <div class="hotel-detail-header">
        <img src="${hotel.image || 'https://images.unsplash.com/photo-1631049307038-da0ec36d9c58?w=600&h=400&fit=crop'}" 
             alt="${hotel.name}" 
             class="hotel-detail-image"
             onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop'">
        <div class="hotel-detail-overlay">
          <h2 class="hotel-detail-title">${hotel.name}</h2>
          <div class="hotel-detail-rating">
            <span class="hotel-stars">${createStarRating(hotel.rating)}</span>
            <span class="hotel-rating-number">${hotel.rating}</span>
            <span class="hotel-review-count">(${hotel.ratingCount} reviews)</span>
          </div>
        </div>
      </div>

      <div class="hotel-detail-section">
        <h3>📍 Location Information</h3>
        <div class="location-details">
          <div class="location-detail-item">
            <strong>Address</strong>
            <p>${hotel.address}</p>
          </div>
          <div class="location-detail-item">
            <strong>Distance</strong>
            <p>${hotel.distance} km away</p>
          </div>
          ${hotel.coordinates ? `
            <div class="location-detail-item">
              <strong>Coordinates</strong>
              <p>${hotel.coordinates.lat.toFixed(4)}°N, ${hotel.coordinates.lng.toFixed(4)}°E</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="hotel-detail-section">
        <h3>💰 Price Information</h3>
        <div class="price-details">
          <div class="price-large">
            <span class="price-currency">${hotel.currency}</span>
            <span class="price-amount">${hotel.price}</span>
            <span class="price-period">/night</span>
          </div>
        </div>
      </div>

      <div class="hotel-detail-section">
        <h3>🎯 Amenities</h3>
        <div class="amenities-list">
          ${hotel.amenities.map(amenity => `<div class="amenity-item">✓ ${amenity}</div>`).join('')}
        </div>
      </div>

      <div class="hotel-detail-actions">
        <a href="${mapsUrl}" target="_blank" class="hotel-action-btn maps-btn">
          📍 View Location on Map
        </a>
        <a href="${bookingUrl}" target="_blank" class="hotel-action-btn booking-btn">
          📅 Find Hotels Nearby
        </a>
      </div>
    </div>
  `;

  // Add back button listener
  document.getElementById('hotelBackBtn').addEventListener('click', () => {
    applyFiltersAndRender();
    if (hotelFilters) {
      hotelFilters.style.display = 'block';
    }
  });

  // Scroll to hotel detail
  hotelContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Attach event listeners to hotel cards
 */
function attachHotelCardListeners() {
  const hotelCards = document.querySelectorAll('.hotel-card');
  
  hotelCards.forEach(card => {
    // Click handler to show hotel details
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking on the booking link or location btn
      if (e.target.closest('.hotel-book-btn')) return;
      
      const hotelId = parseInt(card.dataset.hotelId);
      const hotel = currentHotels.find(h => h.id === hotelId);
      if (hotel) {
        showHotelDetails(hotel);
      }
    });

    // Handle location button click to show details
    const locationBtn = card.querySelector('.quick-action:first-child');
    if (locationBtn) {
      locationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const hotelId = parseInt(card.dataset.hotelId);
        const hotel = currentHotels.find(h => h.id === hotelId);
        if (hotel) {
          showHotelDetails(hotel);
        }
      });
    }
    
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Attach event listeners to pagination controls
 * @param {number} totalPages - Total number of pages
 */
function attachPaginationListeners(totalPages) {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const pageButtons = document.querySelectorAll('.page-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        applyFiltersAndRender();
        smoothScroll();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        applyFiltersAndRender();
        smoothScroll();
      }
    });
  }

  pageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentPage = parseInt(btn.dataset.page);
      applyFiltersAndRender();
      smoothScroll();
    });
  });
}

/**
 * Attach filter control event listeners
 */
export function attachFilterListeners() {
  const applyBtn = document.getElementById('applyFiltersBtn');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const minRatingSelect = document.getElementById('minRating');
  const sortBySelect = document.getElementById('sortBy');

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      currentFilters.priceRange = [
        parseInt(minPriceInput.value) || 0,
        parseInt(maxPriceInput.value) || 5000
      ];
      currentFilters.minRating = parseFloat(minRatingSelect.value) || 0;
      currentFilters.sortBy = sortBySelect.value || 'price';
      currentPage = 1;
      applyFiltersAndRender();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFilters = {
        priceRange: [0, 5000],
        minRating: 0,
        sortBy: 'price'
      };
      if (minPriceInput) minPriceInput.value = 0;
      if (maxPriceInput) maxPriceInput.value = 5000;
      if (minRatingSelect) minRatingSelect.value = 0;
      if (sortBySelect) sortBySelect.value = 'price';
      currentPage = 1;
      applyFiltersAndRender();
    });
  }
}

/**
 * Show loading state in container
 * @param {HTMLElement} container - Container element
 */
function showLoadingState(container) {
  container.innerHTML = `
    <div class="skeleton-hotels">
      ${Array(6).fill().map(() => `
        <div class="skeleton-hotel-card">
          <div class="skeleton-hotel-image skeleton"></div>
          <div class="skeleton-hotel-content">
            <div class="skeleton-hotel-title skeleton"></div>
            <div class="skeleton-hotel-text skeleton"></div>
            <div class="skeleton-hotel-text skeleton"></div>
            <div class="skeleton-hotel-text skeleton"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Show error message
 * @param {HTMLElement} container - Container element
 * @param {string} message - Error message
 */
function showErrorMessage(container, message) {
  container.innerHTML = `
    <div class="error-message">
      <span class="error-icon">⚠️</span>
      <p>Unable to load hotels: ${message}</p>
      <p class="error-hint">Please try again or contact support.</p>
    </div>
  `;
}

/**
 * Show no results message
 * @param {HTMLElement} container - Container element
 */
function showNoResultsMessage(container) {
  container.innerHTML = `
    <div class="no-results-message">
      <span class="no-results-icon">🏨</span>
      <p>No hotels found near this temple.</p>
      <p class="no-results-hint">Try selecting a different temple or try again later.</p>
    </div>
  `;
}

/**
 * Smooth scroll to hotels section
 */
function smoothScroll() {
  const hotelContainer = document.getElementById('hotelContainer');
  if (hotelContainer) {
    hotelContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Reset hotel display state
 */
export function resetHotelDisplay() {
  currentHotels = [];
  currentPage = 1;
  currentFilters = {
    priceRange: [0, 5000],
    minRating: 0,
    sortBy: 'price'
  };
}
