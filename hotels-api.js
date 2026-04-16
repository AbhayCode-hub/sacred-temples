/**
 * Hotel Discovery API Module
 * Provides hotel search functionality near temples with caching and error handling
 */

// Cache for storing hotel results to reduce API calls
const hotelCache = new Map();
const CACHE_DURATION = 3600000; // 1 hour in milliseconds
const HOTEL_SEARCH_RADIUS = 5; // Search radius in km

/**
 * Array of optimized hotel images
 * Using a consolidated set of professional hotel images to improve performance
 * and create visual consistency across the app
 */
const hotelImages = [
  'https://images.unsplash.com/photo-1631049307038-da0ec36d9c58?w=400&h=300&fit=crop', // Luxury hotel
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', // Modern room
  'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop', // Bedroom
  'https://images.unsplash.com/photo-1611892473755-a03007aaf413?w=400&h=300&fit=crop'  // Pool area
];

/**
 * Get a random hotel image
 * @returns {string} URL of a random hotel image
 */
function getRandomHotelImage() {
  return hotelImages[Math.floor(Math.random() * hotelImages.length)];
}

// Cache for storing hotel results to reduce API calls

/**
 * Mock hotel data for testing and demo purposes
 * Replace with actual API calls in production
 */
const mockHotels = {
  'hindu': [
    {
      id: 1,
      name: 'Sunrise Temple Vista',
      rating: 4.5,
      ratingCount: 312,
      price: 2500,
      currency: 'INR',
      address: 'Near Sacred Temple',
      distance: 0.8,
      image: 'https://images.unsplash.com/photo-1631049307038-da0ec36d9c58?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 2,
      name: 'Spiritual Rest Hotel',
      rating: 4.2,
      ratingCount: 245,
      price: 1800,
      currency: 'INR',
      address: 'Temple Bazaar',
      distance: 1.2,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'Restaurant', 'Laundry'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 3,
      name: 'Divine Comfort Inn',
      rating: 4.0,
      ratingCount: 189,
      price: 1200,
      currency: 'INR',
      address: 'Main Road',
      distance: 2.1,
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Parking'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 4,
      name: 'Pilgrimage Palace',
      rating: 4.6,
      ratingCount: 456,
      price: 3500,
      currency: 'INR',
      address: 'Premium Location',
      distance: 3.2,
      image: 'https://images.unsplash.com/photo-1611892473755-a03007aaf413?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking', 'Gym', 'Pool'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 5,
      name: 'Eternal Bliss Hotel',
      rating: 4.3,
      ratingCount: 203,
      price: 2000,
      currency: 'INR',
      address: 'Sacred Valley',
      distance: 0.5,
      image: 'https://images.unsplash.com/photo-1512453108303-dcf24dc40e13?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Restaurant', 'Meditation Room'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 6,
      name: 'Vishnu Vihar Resort',
      rating: 4.7,
      ratingCount: 534,
      price: 4200,
      currency: 'INR',
      address: 'Temple Hill',
      distance: 1.8,
      image: 'https://images.unsplash.com/photo-1571896349842-ec77baa2e206?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking', 'Pool', 'Yoga'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 7,
      name: 'Mandir Motel',
      rating: 3.9,
      ratingCount: 167,
      price: 900,
      currency: 'INR',
      address: 'City Center',
      distance: 2.4,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'Restaurant'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 8,
      name: 'Temple Garden Hotel',
      rating: 4.4,
      ratingCount: 298,
      price: 2300,
      currency: 'INR',
      address: 'Green Valley',
      distance: 1.6,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Garden', 'Restaurant', 'Parking'],
      bookingUrl: '#',
      mapsUrl: '#'
    }
  ],
  'jain': [
    {
      id: 9,
      name: 'Jain Seva Lodge',
      rating: 4.3,
      ratingCount: 198,
      price: 1500,
      currency: 'INR',
      address: 'Near Jain Temple',
      distance: 0.6,
      image: 'https://images.unsplash.com/photo-1559666126-84f89ffc0b65?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'Restaurant', 'AC'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 10,
      name: 'Heritage Dharma Inn',
      rating: 4.4,
      ratingCount: 267,
      price: 2200,
      currency: 'INR',
      address: 'Temple District',
      distance: 1.5,
      image: 'https://images.unsplash.com/photo-1542314503-37143f3c69f7?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'Restaurant', 'Parking', 'AC'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 11,
      name: 'Ahimsa House',
      rating: 4.2,
      ratingCount: 215,
      price: 1700,
      currency: 'INR',
      address: 'Peaceful Lane',
      distance: 1.1,
      image: 'https://images.unsplash.com/photo-1631049307038-da0ec36d9c58?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'Vegetarian Food', 'AC', 'Meditation Room'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 12,
      name: 'Tirthankara Resort',
      rating: 4.6,
      ratingCount: 389,
      price: 3000,
      currency: 'INR',
      address: 'Premium Area',
      distance: 2.3,
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking', 'Pool', 'Yoga Room'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 13,
      name: 'Pure Jain Hotel',
      rating: 4.1,
      ratingCount: 176,
      price: 1300,
      currency: 'INR',
      address: 'Economy Area',
      distance: 2.8,
      image: 'https://images.unsplash.com/photo-1512453108303-dcf24dc40e13?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'Vegetarian Food'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 14,
      name: 'Karma Inn',
      rating: 4.5,
      ratingCount: 321,
      price: 2100,
      currency: 'INR',
      address: 'Spiritual Zone',
      distance: 0.9,
      image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Restaurant', 'Meditation Hall'],
      bookingUrl: '#',
      mapsUrl: '#'
    }
  ],
  'sikh': [
    {
      id: 15,
      name: 'Langar House Hotel',
      rating: 4.1,
      ratingCount: 156,
      price: 1300,
      currency: 'INR',
      address: 'Gurdwara Lane',
      distance: 1.0,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'Restaurant'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 16,
      name: 'Golden Khalsa Inn',
      rating: 4.4,
      ratingCount: 234,
      price: 1800,
      currency: 'INR',
      address: 'Holy City',
      distance: 0.7,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 17,
      name: 'Sikh Faith Hotel',
      rating: 4.2,
      ratingCount: 189,
      price: 1500,
      currency: 'INR',
      address: 'Gurdwara Road',
      distance: 1.3,
      image: 'https://images.unsplash.com/photo-1631049307038-da0ec36d9c58?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'Restaurant', 'AC', 'Langar Facility'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 18,
      name: 'Seva Bhavan Resort',
      rating: 4.6,
      ratingCount: 412,
      price: 2800,
      currency: 'INR',
      address: 'Spiritual Quarter',
      distance: 1.9,
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking', 'Prayer Hall', 'Parking'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 19,
      name: 'Guru Nanak Lodge',
      rating: 4.3,
      ratingCount: 207,
      price: 1650,
      currency: 'INR',
      address: 'Pilgrim Street',
      distance: 0.8,
      image: 'https://images.unsplash.com/photo-1512453108303-dcf24dc40e13?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'Vegetarian Food', 'AC', 'Langar Facility'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 20,
      name: 'Harmandir Inn',
      rating: 4.0,
      ratingCount: 145,
      price: 1200,
      currency: 'INR',
      address: 'Main Bazaar',
      distance: 2.1,
      image: 'https://images.unsplash.com/photo-1611892473755-a03007aaf413?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'Restaurant', 'Parking'],
      bookingUrl: '#',
      mapsUrl: '#'
    }
  ],
  'islam': [
    {
      id: 21,
      name: 'Mosque View Hotel',
      rating: 3.9,
      ratingCount: 124,
      price: 1100,
      currency: 'INR',
      address: 'Islamic Quarter',
      distance: 1.3,
      image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Restaurant'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 22,
      name: 'Dar Al-Peace Hotel',
      rating: 4.3,
      ratingCount: 198,
      price: 1600,
      currency: 'INR',
      address: 'Faith Street',
      distance: 0.9,
      image: 'https://images.unsplash.com/photo-1631049307038-da0ec36d9c58?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Halal Restaurant', 'Prayer Room'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 23,
      name: 'Islamic Heritage Inn',
      rating: 4.2,
      ratingCount: 167,
      price: 1400,
      currency: 'INR',
      address: 'Old City',
      distance: 1.7,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Halal Food', 'Parking'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 24,
      name: 'Al-Hana Resort',
      rating: 4.5,
      ratingCount: 289,
      price: 2400,
      currency: 'INR',
      address: 'Peaceful Area',
      distance: 2.2,
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking', 'Prayer Hall', 'Pool'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 25,
      name: 'Salaam House',
      rating: 4.4,
      ratingCount: 214,
      price: 1750,
      currency: 'INR',
      address: 'Harmony Lane',
      distance: 1.1,
      image: 'https://images.unsplash.com/photo-1512453108303-dcf24dc40e13?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Halal Restaurant', 'Parking', 'Ablution Area'],
      bookingUrl: '#',
      mapsUrl: '#'
    },
    {
      id: 26,
      name: 'Qadr Inn',
      rating: 4.1,
      ratingCount: 156,
      price: 1300,
      currency: 'INR',
      address: 'City Center',
      distance: 2.4,
      image: 'https://images.unsplash.com/photo-1611892473755-a03007aaf413?w=400&h=300&fit=crop',
      amenities: ['WiFi', 'AC', 'Halal Food', 'Prayer Time Alerts'],
      bookingUrl: '#',
      mapsUrl: '#'
    }
  ]
};

/**
 * Get cached hotels or fetch new ones
 * @param {string} templeId - Temple ID
 * @param {number} latitude - Temple latitude
 * @param {number} longitude - Temple longitude
 * @param {string} religion - Temple religion for mock data selection
 * @returns {Promise<Array>} Array of hotel objects
 */
export async function getHotelsNearTemple(templeId, latitude, longitude, religion = 'hindu') {
  const cacheKey = `temple_${templeId}`;
  
  // Check cache first
  if (hotelCache.has(cacheKey)) {
    const cached = hotelCache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('Returning cached hotels for temple:', templeId);
      return cached.data;
    }
  }

  try {
    // Try to fetch real data from APIs
    let hotels = await fetchHotelsFromApis(latitude, longitude);
    
    // If API fails or returns empty, use mock data
    if (!hotels || hotels.length === 0) {
      hotels = getMockHotels(religion);
    }

    // Cache the results
    hotelCache.set(cacheKey, {
      data: hotels,
      timestamp: Date.now()
    });

    return hotels;
  } catch (error) {
    console.warn('Error fetching hotels, using mock data:', error);
    return getMockHotels(religion);
  }
}

/**
 * Attempt to fetch hotels from multiple APIs
 * @param {number} latitude - Temple latitude
 * @param {number} longitude - Temple longitude
 * @returns {Promise<Array>} Array of hotel objects
 */
async function fetchHotelsFromApis(latitude, longitude) {
  try {
    // Try Overpass API first (free, no authentication needed)
    const overpassHotels = await fetchFromOverpassAPI(latitude, longitude);
    if (overpassHotels && overpassHotels.length > 0) {
      return overpassHotels;
    }
  } catch (error) {
    console.warn('Overpass API error:', error);
  }

  try {
    // Try OpenStreetMap Nominatim API
    const osmHotels = await fetchFromOSM(latitude, longitude);
    if (osmHotels && osmHotels.length > 0) {
      return osmHotels;
    }
  } catch (error) {
    console.warn('OSM API error:', error);
  }

  // If all APIs fail, return empty array (will use mock data)
  return [];
}

/**
 * Fetch hotels using Overpass API
 * @param {number} latitude - Temple latitude
 * @param {number} longitude - Temple longitude
 * @returns {Promise<Array>} Array of hotel objects
 */
async function fetchFromOverpassAPI(latitude, longitude) {
  const radius = HOTEL_SEARCH_RADIUS * 1000; // Convert km to meters
  const query = `
    [out:json];
    (
      node["tourism"="hotel"](${latitude - 0.05},${longitude - 0.05},${latitude + 0.05},${longitude + 0.05});
      node["tourism"="guest_house"](${latitude - 0.05},${longitude - 0.05},${latitude + 0.05},${longitude + 0.05});
      node["tourism"="hostel"](${latitude - 0.05},${longitude - 0.05},${latitude + 0.05},${longitude + 0.05});
    );
    out center;
  `;

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!response.ok) {
    throw new Error('Overpass API request failed');
  }

  const data = await response.json();
  
  return data.elements
    .slice(0, 10)
    .map((element, index) => ({
      id: element.id,
      name: element.tags?.name || `Hotel ${index + 1}`,
      rating: Math.floor(Math.random() * 5) + 3.5, // Mock rating
      ratingCount: Math.floor(Math.random() * 500) + 50,
      price: Math.floor(Math.random() * 3000) + 800,
      currency: 'INR',
      address: element.tags?.addr || 'Address not available',
      distance: (Math.random() * 4 + 0.5).toFixed(1),
      image: getRandomHotelImage(), // Use varied hotel images
      amenities: getRandomAmenities(),
      bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(element.tags?.name || 'Hotel')}`,
      mapsUrl: `https://www.google.com/maps?q=${element.lat},${element.lon}`
    }));
}

/**
 * Fetch hotels using OpenStreetMap data
 * @param {number} latitude - Temple latitude
 * @param {number} longitude - Temple longitude
 * @returns {Promise<Array>} Array of hotel objects
 */
async function fetchFromOSM(latitude, longitude) {
  const query = `
    [bbox=${longitude - 0.05},${latitude - 0.05},${longitude + 0.05},${latitude + 0.05}];
    (
      node["tourism"="hotel"];
      way["tourism"="hotel"];
    );
    out geom;
  `;

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!response.ok) {
    throw new Error('OSM API request failed');
  }

  const data = await response.json();
  
  return data.elements
    .slice(0, 10)
    .map((element, index) => ({
      id: element.id,
      name: element.tags?.name || `Hotel ${index + 1}`,
      rating: (Math.random() * 2 + 3.5).toFixed(1),
      ratingCount: Math.floor(Math.random() * 500) + 50,
      price: Math.floor(Math.random() * 3000) + 800,
      currency: 'INR',
      address: element.tags?.addr || 'Address not available',
      distance: (Math.random() * 4 + 0.5).toFixed(1),
      image: getRandomHotelImage(), // Use varied hotel images
      amenities: getRandomAmenities(),
      bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(element.tags?.name || 'Hotel')}`,
      mapsUrl: `https://www.google.com/maps?q=${element.lat},${element.lon}`
    }));
}

/**
 * Get mock hotels based on religion
 * @param {string} religion - Temple religion
 * @returns {Array} Array of hotel objects
 */
function getMockHotels(religion) {
  const religionKey = religion.toLowerCase();
  return mockHotels[religionKey] || mockHotels.hindu;
}

/**
 * Get random amenities for hotels
 * @returns {Array} Array of amenity strings
 */
function getRandomAmenities() {
  const allAmenities = ['WiFi', 'AC', 'Restaurant', 'Parking', 'Gym', 'Pool', 'Spa', 'Room Service', 'Laundry'];
  const shuffled = allAmenities.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 5) + 2);
}

/**
 * Filter hotels by price range
 * @param {Array} hotels - Array of hotel objects
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Array} Filtered hotels array
 */
export function filterHotelsByPrice(hotels, minPrice, maxPrice) {
  return hotels.filter(hotel => hotel.price >= minPrice && hotel.price <= maxPrice);
}

/**
 * Filter hotels by rating
 * @param {Array} hotels - Array of hotel objects
 * @param {number} minRating - Minimum rating
 * @returns {Array} Filtered hotels array
 */
export function filterHotelsByRating(hotels, minRating) {
  return hotels.filter(hotel => hotel.rating >= minRating);
}

/**
 * Sort hotels by property
 * @param {Array} hotels - Array of hotel objects
 * @param {string} property - Property to sort by (price, rating, distance)
 * @param {string} order - Sort order (asc, desc)
 * @returns {Array} Sorted hotels array
 */
export function sortHotels(hotels, property = 'price', order = 'asc') {
  const sorted = [...hotels].sort((a, b) => {
    let aValue = a[property];
    let bValue = b[property];

    if (typeof aValue === 'string') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }

    return order === 'asc' ? aValue - bValue : bValue - aValue;
  });

  return sorted;
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in kilometers
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Clear hotel cache
 */
export function clearHotelCache() {
  hotelCache.clear();
  console.log('Hotel cache cleared');
}

/**
 * Get cache statistics
 * @returns {Object} Cache statistics
 */
export function getCacheStats() {
  return {
    cacheSize: hotelCache.size,
    entries: Array.from(hotelCache.keys())
  };
}
