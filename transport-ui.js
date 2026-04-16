/**
 * Transport/How to Reach UI Component
 * Renders transport information for each temple
 */

/**
 * Create the transport section HTML
 * @param {Object} temple - Temple object with transport data
 * @returns {string} HTML string for transport section
 */
export function createTransportSection(temple) {
  if (!temple.transport) {
    // Return default "How to Reach" section for temples without specific transport data
    return `
      <div class="temple-detail-section transport-section">
        <h3>🚌 How to Reach</h3>
        <p class="section-intro">Located at coordinates: ${temple.coordinates.lat.toFixed(4)}°N, ${temple.coordinates.lng.toFixed(4)}°E</p>
        
        <div class="default-directions">
          <div class="directions-info">
            <h4>Get Directions</h4>
            <p>Use the map location or click below to get turn-by-turn directions using your preferred navigation app.</p>
          </div>
          
          <div class="directions-buttons">
            <a href="https://www.google.com/maps/search/?api=1&query=${temple.coordinates.lat},${temple.coordinates.lng}" 
               target="_blank" class="directions-btn google-maps">
              📍 Google Maps
            </a>
            <a href="https://www.google.com/maps/dir//${temple.coordinates.lat},${temple.coordinates.lng}" 
               target="_blank" class="directions-btn google-directions">
              🚗 Get Directions
            </a>
          </div>
          
          <div class="location-details">
            <p><strong>📍 Location:</strong> ${temple.location}</p>
            <p><strong>📞 Contact:</strong> ${temple.contact.phone}</p>
            <p><strong>📧 Email:</strong> ${temple.contact.email}</p>
          </div>
        </div>
      </div>
    `;
  }

  const { transport } = temple;
  
  return `
    <div class="temple-detail-section transport-section">
      <h3>🚌 How to Reach</h3>
      <p class="section-intro">Multiple transport options available to reach this sacred temple</p>
      
      <!-- Recommended Route Card -->
      ${transport.recommendedRoute ? createRecommendedRouteCard(transport.recommendedRoute) : ''}
      
      <!-- Transport Options Tabs -->
      <div class="transport-tabs">
        <div class="tab-buttons">
          <button class="tab-btn active" data-tab="bus">🚌 Bus</button>
          <button class="tab-btn" data-tab="railway">🚂 Railway</button>
          <button class="tab-btn" data-tab="airport">✈️ Flight</button>
          <button class="tab-btn" data-tab="local">🚗 Local</button>
        </div>
        
        <!-- Bus Tab -->
        <div class="tab-content active" id="bus-tab">
          ${createBusCard(transport.bus)}
        </div>
        
        <!-- Railway Tab -->
        <div class="tab-content" id="railway-tab">
          ${createRailwayCard(transport.railway)}
        </div>
        
        <!-- Airport Tab -->
        <div class="tab-content" id="airport-tab">
          ${createAirportCard(transport.airport)}
        </div>
        
        <!-- Local Transport Tab -->
        <div class="tab-content" id="local-tab">
          ${createLocalTransportCard(transport.localTransport)}
        </div>
      </div>
      
      <!-- Google Maps Get Directions -->
      <div class="get-directions">
        <a href="https://www.google.com/maps/search/?api=1&query=${temple.coordinates.lat},${temple.coordinates.lng}" 
           target="_blank" class="directions-btn">
          📍 View on Google Maps
        </a>
      </div>
    </div>
  `;
}

/**
 * Create recommended route card
 */
function createRecommendedRouteCard(route) {
  return `
    <div class="recommended-route-card">
      <div class="route-header">
        <span class="recommended-badge">⭐ Recommended</span>
        <h4>${route.title}</h4>
      </div>
      <p class="route-description">${route.description}</p>
      
      <div class="route-details">
        <div class="detail-item">
          <span class="detail-label">⏱️ Estimated Time:</span>
          <span class="detail-value">${route.totalEstimatedTime}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">💰 Estimated Cost:</span>
          <span class="detail-value">${route.totalCost}</span>
        </div>
      </div>
      
      <div class="advantages">
        <p class="advantages-title">Why this route?</p>
        <ul>
          ${route.advantages.map(adv => `<li>✓ ${adv}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

/**
 * Create bus card
 */
function createBusCard(busInfo) {
  return `
    <div class="transport-card bus-card">
      <h4 class="card-title">🚌 Bus Transport</h4>
      
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Nearest Bus Stop:</span>
          <span class="value">${busInfo.nearestBusStop}</span>
          <span class="distance">${busInfo.busStopDistance} away</span>
        </div>
        
        <div class="info-item">
          <span class="label">Main Bus Stand:</span>
          <span class="value">${busInfo.busStandDistance}</span>
          <span class="distance">~${busInfo.estimatedBusTime}</span>
        </div>
      </div>
      
      <div class="routes-section">
        <h5>Major Bus Routes</h5>
        <div class="routes-list">
          ${busInfo.majorRoutes.map(route => `
            <div class="route-item">
              <span class="route-number">Route ${route.number}</span>
              <span class="route-operator">${route.operatedBy}</span>
              <span class="route-frequency">Every ${route.frequency}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <button class="book-btn" onclick="window.open('https://www.redbus.in', '_blank')">
        🎫 Book Bus Ticket
      </button>
    </div>
  `;
}

/**
 * Create railway card
 */
function createRailwayCard(railwayInfo) {
  return `
    <div class="transport-card railway-card">
      <h4 class="card-title">🚂 Railway Station</h4>
      
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Nearest Station:</span>
          <span class="value">${railwayInfo.nearestStation}</span>
          <span class="distance">${railwayInfo.distance} away</span>
        </div>
        
        <div class="info-item">
          <span class="label">From Station to Temple:</span>
          <span class="value">${railwayInfo.estimatedTime}</span>
          <span class="distance">${railwayInfo.ticketApproximately}</span>
        </div>
      </div>
      
      <div class="trains-section">
        <h5>Major Trains Stopping Here</h5>
        <div class="trains-list">
          ${railwayInfo.majorTrains.map(train => `
            <div class="train-item">
              <div class="train-name">${train.name}</div>
              <div class="train-route">${train.from} → ${train.to}</div>
              <div class="train-time">⏰ ${train.stopTime}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <button class="book-btn" onclick="window.open('https://www.irctc.co.in', '_blank')">
        🎫 Check Train Schedule (IRCTC)
      </button>
    </div>
  `;
}

/**
 * Create airport card
 */
function createAirportCard(airportInfo) {
  return `
    <div class="transport-card airport-card">
      <h4 class="card-title">✈️ Nearest Airport</h4>
      
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Airport Name:</span>
          <span class="value">${airportInfo.nearestAirport}</span>
          <span class="distance">${airportInfo.distance} away</span>
        </div>
        
        <div class="info-item">
          <span class="label">Travel Time:</span>
          <span class="value">${airportInfo.estimatedTime}</span>
          <span class="distance">By taxi: ${airportInfo.taxiApproximate}</span>
        </div>
      </div>
      
      ${airportInfo.terminals ? `
        <div class="terminals-section">
          <h5>Terminals</h5>
          <div class="terminals-list">
            ${airportInfo.terminals.map(term => `<span class="terminal">${term}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      
      <button class="book-btn" onclick="window.open('https://www.skyscanner.co.in', '_blank')">
        ✈️ Book Flights
      </button>
    </div>
  `;
}

/**
 * Create local transport card
 */
function createLocalTransportCard(localTransports) {
  return `
    <div class="transport-card local-card">
      <h4 class="card-title">🚗 Local Transport Options</h4>
      
      <div class="local-options">
        ${localTransports.map(transport => `
          <div class="transport-option">
            <div class="option-header">
              <h5>${transport.type}</h5>
              <span class="option-cost">₹ ${transport.cost}</span>
            </div>
            <div class="option-details">
              <p><strong>From:</strong> ${transport.from || 'Various points'}</p>
              <p><strong>Distance:</strong> ${transport.distance}</p>
              ${transport.availability ? `<p><strong>Availability:</strong> ${transport.availability}</p>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="local-tips">
        <h5>💡 Local Transport Tips</h5>
        <ul>
          <li>Auto rickshaws are abundant and affordable for short distances</li>
          <li>Pre-book taxis or use Uber/Ola for long journeys</li>
          <li>Bike rentals are great for exploring the area</li>
          <li>Always negotiate auto fares or use meter</li>
        </ul>
      </div>
    </div>
  `;
}

/**
 * Attach tab functionality
 */
export function attachTransportTabListeners() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(`${tabName}-tab`).classList.add('active');
    });
  });
}

/**
 * Initialize transport section
 */
export function initTransportSection() {
  attachTransportTabListeners();
}