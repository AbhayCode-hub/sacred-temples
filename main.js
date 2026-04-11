import './style.css'
import { templesData, galleryImages } from './temples-data.js'
import { loadHotelsForTemple, createFilterControls, attachFilterListeners, resetHotelDisplay } from './hotels-ui.js'
import { createTransportSection, initTransportSection } from './transport-ui.js'
import { initializeReviewSection } from './review-ui.js'


let currentFilter = 'all';
let searchTerm = '';
let filteredTemples = [...templesData];
let currentSelectedTemple = null;

function initializeApp() {
  renderTempleList();
  renderGallery();
  renderFeaturedHotels();
  setupEventListeners();
  setupSmoothScrolling();
}

function setupEventListeners() {
  const searchInput = document.getElementById('templeSearch');
  const filterButtons = document.querySelectorAll('.filter-btn');

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.toLowerCase();
    filterAndRenderTemples();
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.religion;
      filterAndRenderTemples();
    });
  });
}

function filterAndRenderTemples() {
  filteredTemples = templesData.filter(temple => {
    const matchesFilter = currentFilter === 'all' || temple.religion === currentFilter;
    const matchesSearch = temple.name.toLowerCase().includes(searchTerm) ||
                          temple.state.toLowerCase().includes(searchTerm) ||
                          temple.religion.toLowerCase().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  renderTempleList();
}

function renderTempleList() {
  const templeList = document.getElementById('templeList');
  const templeDetail = document.getElementById('templeDetail');

  templeDetail.style.display = 'none';

  if (filteredTemples.length === 0) {
    templeList.innerHTML = '<p class="no-results">No temples found. Try different search terms.</p>';
    return;
  }

  templeList.innerHTML = filteredTemples.map(temple => `
    <div class="temple-card" data-id="${temple.id}">
      <img src="${temple.image}" alt="${temple.name}" class="temple-card-image">
      <div class="temple-card-content">
        <span class="religion-badge ${temple.religion}">${temple.religion}</span>
        <h3 class="temple-card-title">${temple.name}</h3>
        <p class="temple-card-location">${temple.state}</p>
        <p class="temple-card-description">${temple.description}</p>
        <button class="view-details-btn" data-id="${temple.id}">View Details</button>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const templeId = parseInt(e.target.dataset.id);
      showTempleDetails(templeId);
    });
  });
}

function showTempleDetails(templeId) {
  const temple = templesData.find(t => t.id === templeId);
  if (!temple) return;

  currentSelectedTemple = temple;
  const templeList = document.getElementById('templeList');
  const templeDetail = document.getElementById('templeDetail');
  const hotelsShowcaseSection = document.getElementById('hotels');
  const gallerySection = document.getElementById('gallery');
  const searchContainer = document.querySelector('.search-container');

  templeList.style.display = 'none';
  templeDetail.style.display = 'block';
  
  // Hide search and filter container when viewing temple details
  if (searchContainer) {
    searchContainer.style.display = 'none';
  }
  
  // Hide featured hotels section when viewing temple details
  if (hotelsShowcaseSection) {
    hotelsShowcaseSection.style.display = 'none';
  }

  // Hide main gallery section when viewing temple details
  if (gallerySection) {
    gallerySection.style.display = 'none';
  }

  const mapsUrl = `https://www.google.com/maps?q=${temple.coordinates.lat},${temple.coordinates.lng}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${temple.coordinates.lat},${temple.coordinates.lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  templeDetail.innerHTML = `
    <button class="back-btn" id="backToList">← Back to List</button>
    <div class="temple-detail-content">
      <div class="temple-detail-header">
        <img src="${temple.image}" alt="${temple.name}" class="temple-detail-image">
        <div class="temple-detail-info">
          <span class="religion-badge ${temple.religion}">${temple.religion}</span>
          <h2 class="temple-detail-title">${temple.name}</h2>
          <p class="temple-detail-location">${temple.location}</p>
          <p class="temple-detail-description">${temple.description}</p>
        </div>
      </div>

      <div class="temple-detail-section">
        <h3>History</h3>
        <p>${temple.history}</p>
      </div>

      <div class="temple-detail-section">
        <h3>📍 Location & Map</h3>
        <div class="location-map-wrapper">
          <div class="location-info-card">
            <div class="location-detail-item">
              <strong>📌 Address</strong>
              <p>${temple.location}</p>
            </div>
            <div class="location-detail-item">
              <strong>🧭 Coordinates</strong>
              <p>${temple.coordinates.lat.toFixed(4)}°N, ${temple.coordinates.lng.toFixed(4)}°E</p>
            </div>
            <a href="${mapsUrl}" target="_blank" class="maps-link-btn">
              <span>📍 View on Google Maps</span>
            </a>
          </div>
          <div class="map-embed-container">
            <p class="map-loading-text">Loading map…</p>
            <iframe
              id="templeMapFrame"
              src="${embedMapUrl}"
              width="100%"
              height="400"
              style="border:0; border-radius: 8px;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>

      <div class="temple-detail-section">
        <h3>Contact Information</h3>
        <div class="contact-info-detail">
          <div class="contact-detail-item">
            <strong>📞 Phone:</strong>
            <p>${temple.contact.phone}</p>
          </div>
          <div class="contact-detail-item">
            <strong>📧 Email:</strong>
            <p>${temple.contact.email}</p>
          </div>
        </div>
      </div>

      <div class="temple-detail-section gallery-section">
        <h3>📸 Gallery</h3>
        <p class="gallery-intro">Explore beautiful photographs of this sacred temple and its surroundings.</p>
        <div id="templeGalleryGrid" class="temple-gallery-grid"></div>
      </div>
      ${createTransportSection(temple)}
      <div class="temple-detail-section hotels-section">
        <h3>🏨 Nearby Hotels</h3>
        <p class="hotel-intro">Discover comfortable hotels and lodges within walking distance or a short ride away.</p>
        <div id="hotelContainer" class="hotel-container"></div>
        <div id="hotelFilters" class="hotel-filters"></div>
      </div>
      <div class="temple-detail-section" id="reviewsSection">
        <!-- Reviews will be loaded here -->
      </div>
    </div>
  `;

  document.getElementById('backToList').addEventListener('click', () => {
    templeDetail.style.display = 'none';
    templeList.style.display = 'grid';
    
    // Show search and filter container again when returning to list
    if (searchContainer) {
      searchContainer.style.display = 'block';
    }
    
    // Show featured hotels section again when returning to list
    if (hotelsShowcaseSection) {
      hotelsShowcaseSection.style.display = 'block';
    }

    // Show main gallery section again when returning to list
    if (gallerySection) {
      gallerySection.style.display = 'block';
    }
    
    resetHotelDisplay();
  });

  // Handle map loading with fallback
  const mapFrame = document.getElementById('templeMapFrame');
  if (mapFrame) {
    mapFrame.addEventListener('load', () => {
      const loadingText = mapFrame.parentElement.querySelector('.map-loading-text');
      if (loadingText) loadingText.style.display = 'none';
    });

    mapFrame.addEventListener('error', () => {
      const loadingText = mapFrame.parentElement.querySelector('.map-loading-text');
      if (loadingText) {
        loadingText.textContent = 'Map failed to load. Try clicking "View on Google Maps" above.';
        loadingText.style.color = '#e74c3c';
      }
    });
  }

  loadHotelsSection(temple);

  initTransportSection();

  // Initialize reviews section
  const reviewsSection = document.getElementById('reviewsSection');
  if (reviewsSection) {
    initializeReviewSection(temple.id, reviewsSection);
  }

  // Scroll to top of temple detail section (not to hotels)
  templeDetail.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Load hotels section and attach listeners
 * @param {Object} temple - Temple object
 */
async function loadHotelsSection(temple) {
  const hotelContainer = document.getElementById('hotelContainer');
  
  try {
    // Load hotels
    await loadHotelsForTemple(temple);
    
    // Add filter controls after hotels are loaded
    setTimeout(() => {
      const hotelFiltersDiv = document.getElementById('hotelFilters');
      if (hotelFiltersDiv && hotelContainer && hotelContainer.querySelector('.hotels-grid')) {
        // Load filter controls for ALL religions, not just Hindu
        hotelFiltersDiv.innerHTML = createFilterControls(currentHotels);
        attachFilterListeners();
      }
    }, 500);
  } catch (error) {
    console.error('Error loading hotels section:', error);
  }

  // Load gallery images - only for this specific temple
  const templeGalleryGrid = document.getElementById('templeGalleryGrid');
  if (templeGalleryGrid && temple.galleryPhotoPrefix) {
    // Show skeleton loading first
    templeGalleryGrid.innerHTML = `
      <div class="skeleton-gallery">
        ${Array(6).fill().map(() => `
          <div class="skeleton-gallery-item">
            <div class="skeleton"></div>
          </div>
        `).join('')}
      </div>
    `;

    // Filter gallery images to only show photos for this temple
    const templePhotos = galleryImages.filter(img => 
      img.src.includes(temple.galleryPhotoPrefix)
    );
    
    if (templePhotos.length > 0) {
      // Start loading with minimum 300ms delay to show skeleton briefly
      setTimeout(() => {
        templeGalleryGrid.innerHTML = templePhotos.map(img => `
          <div class="gallery-item">
            <img 
              src="${img.src}" 
              alt="${img.alt}" 
              class="gallery-image" 
              loading="lazy"
            >
            <div class="gallery-overlay">
              <p class="gallery-title">${img.title}</p>
            </div>
          </div>
        `).join('');
        
        // Add load/error listeners to each image
        const images = templeGalleryGrid.querySelectorAll('.gallery-image');
        images.forEach(img => {
          if (img.complete) {
            // Image already loaded from cache
            img.classList.add('loaded');
          } else {
            // Wait for image to load
            img.addEventListener('load', () => {
              img.classList.add('loaded');
            });
            img.addEventListener('error', () => {
              img.classList.add('error');
            });
          }
        });
      }, 300);
    } else {
      // If no specific photos, show message after skeleton
      setTimeout(() => {
        templeGalleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 2rem;">More photos coming soon...</p>';
      }, 600);
    }
  }
}

function renderGallery() {
  const galleryGrid = document.querySelector('.gallery-grid');

  galleryGrid.innerHTML = galleryImages.map(img => `
    <div class="gallery-item">
      <img src="${img.src}" alt="${img.alt}" class="gallery-image">
      <div class="gallery-overlay">
        <p class="gallery-title">${img.title}</p>
      </div>
    </div>
  `).join('');

  // Add load listeners to gallery images
  const images = galleryGrid.querySelectorAll('.gallery-image');
  images.forEach(img => {
    if (img.complete) {
      // Image already loaded from cache
      img.classList.add('loaded');
    } else {
      // Wait for image to load
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
      img.addEventListener('error', () => {
        img.classList.add('error');
      });
    }
  });
}

function renderFeaturedHotels() {
  const featuredHotelsGrid = document.getElementById('featuredHotelsGrid');
  
  // Featured hotels - curated selection from different regions
  const featuredHotels = [
    {
      id: 1,
      name: 'Sunrise Temple Vista',
      location: 'Near Kashi Temple, Varanasi',
      rating: 4.5,
      reviews: 312,
      price: 2500,
      amenities: ['WiFi', 'AC', 'Restaurant'],
      emoji: '🏨'
    },
    {
      id: 2,
      name: 'Sacred Valley Inn',
      location: 'Kedarnath, Uttarakhand',
      rating: 4.7,
      reviews: 285,
      price: 1800,
      amenities: ['WiFi', 'Heating', 'Hot Water'],
      emoji: '⛰️'
    },
    {
      id: 3,
      name: 'Golden Temple Lodge',
      location: 'Amritsar, Punjab',
      rating: 4.6,
      reviews: 423,
      price: 2200,
      amenities: ['WiFi', 'Parking', 'Vegetarian Food'],
      emoji: '🌟'
    },
    {
      id: 4,
      name: 'Jain Heritage Hotel',
      location: 'Palitana, Gujarat',
      rating: 4.4,
      reviews: 198,
      price: 1600,
      amenities: ['WiFi', 'Vegetarian', 'AC'],
      emoji: '✨'
    },
    {
      id: 5,
      name: 'Lotus Palace Resort',
      location: 'Mathura, Uttar Pradesh',
      rating: 4.8,
      reviews: 567,
      price: 3100,
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
      emoji: '💎'
    },
    {
      id: 6,
      name: 'Mountain Serenity Retreat',
      location: 'Manali, Himachal Pradesh',
      rating: 4.5,
      reviews: 341,
      price: 2800,
      amenities: ['WiFi', 'Mountain View', 'Bonfire'],
      emoji: '🏔️'
    }
  ];

  if (!featuredHotelsGrid) return;

  featuredHotelsGrid.innerHTML = featuredHotels.map(hotel => {
    const starRating = '⭐'.repeat(Math.floor(hotel.rating)) + (hotel.rating % 1 >= 0.5 ? '✨' : '');
    return `
      <div class="featured-hotel-card">
        <div class="hotel-showcase-image">
          ${hotel.emoji}
        </div>
        <div class="hotel-showcase-content">
          <h3 class="hotel-showcase-name">${hotel.name}</h3>
          <p class="hotel-showcase-location">📍 ${hotel.location}</p>
          <div class="hotel-showcase-rating">
            <span class="hotel-showcase-stars">${starRating}</span>
            <span>${hotel.rating}</span>
            <span>(${hotel.reviews} reviews)</span>
          </div>
          <div class="hotel-showcase-amenities">
            ${hotel.amenities.map(amenity => `<span class="amenity-badge-small">${amenity}</span>`).join('')}
          </div>
          <div class="hotel-showcase-price">₹${hotel.price} /night</div>
        </div>
      </div>
    `;
  }).join('');
}

function setupSmoothScrolling() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const templeDetail = document.getElementById('templeDetail');
      
      // Special handling when viewing temple details
      if (templeDetail && templeDetail.style.display === 'block') {
        // If Hotels link is clicked, scroll to nearby hotels in temple detail
        if (targetId === '#hotels') {
          const hotelContainer = document.getElementById('hotelContainer');
          if (hotelContainer) {
            hotelContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }
        
        // If Gallery link is clicked, scroll to temple gallery in detail view
        if (targetId === '#gallery') {
          const templeGalleryGrid = document.getElementById('templeGalleryGrid');
          if (templeGalleryGrid) {
            templeGalleryGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }
      }
      
      // Default smooth scrolling for other links
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeApp);