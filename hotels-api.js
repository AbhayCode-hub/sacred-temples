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
 * Temple-specific hotel data with real locations
 * Each temple ID maps to actual hotels nearby
 */
const hotelsByTemple = {
  1: [ // Shri Bade Baba Digambar Jain Temple - Madhya Pradesh (23.5937, 78.9629)
    {
      id: 101,
      name: 'Vidisha Heritage Hotel',
      rating: 4.5,
      ratingCount: 312,
      price: 2500,
      currency: 'INR',
      address: 'Vidisha City Center, Madhya Pradesh',
      coordinates: { lat: 23.581, lng: 78.971 },
      distance: 1.2,
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking', 'Gym'],
      image: hotelImages[0]
    },
    {
      id: 102,
      name: 'Jain Darshan Inn',
      rating: 4.2,
      ratingCount: 245,
      price: 1800,
      currency: 'INR',
      address: 'Near Vidisha Railway Station',
      coordinates: { lat: 23.595, lng: 78.945 },
      distance: 2.5,
      amenities: ['WiFi', 'Restaurant', 'AC'],
      image: hotelImages[1]
    },
    {
      id: 103,
      name: 'Shanti Bhavan Lodge',
      rating: 4.0,
      ratingCount: 189,
      price: 1200,
      currency: 'INR',
      address: 'Main Road, Vidisha',
      coordinates: { lat: 23.575, lng: 78.980 },
      distance: 3.1,
      amenities: ['WiFi', 'AC', 'Vegetarian Food'],
      image: hotelImages[2]
    },
    {
      id: 104,
      name: 'Destiny Hotel',
      rating: 4.6,
      ratingCount: 456,
      price: 3500,
      currency: 'INR',
      address: 'Premium Location, Vidisha',
      coordinates: { lat: 23.590, lng: 78.975 },
      distance: 0.8,
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking', 'Gym', 'Pool'],
      image: hotelImages[3]
    }
  ],
  2: [ // Mangi Tungi Jain Temple - Maharashtra (20.7833, 74.4333)
    {
      id: 201,
      name: 'Nashik Pilgrimage Hotel',
      rating: 4.3,
      ratingCount: 298,
      price: 2200,
      currency: 'INR',
      address: 'Nashik City, Maharashtra',
      coordinates: { lat: 20.805, lng: 74.455 },
      distance: 1.5,
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking'],
      image: hotelImages[0]
    },
    {
      id: 202,
      name: 'Mangi Valley Resort',
      rating: 4.4,
      ratingCount: 267,
      price: 2700,
      currency: 'INR',
      address: 'Near Mangi Tungi, Nashik',
      coordinates: { lat: 20.780, lng: 74.430 },
      distance: 0.6,
      amenities: ['WiFi', 'AC', 'Vegetarian Food', 'Meditation Room'],
      image: hotelImages[1]
    },
    {
      id: 203,
      name: 'Sacred Journey Inn',
      rating: 4.1,
      ratingCount: 215,
      price: 1700,
      currency: 'INR',
      address: 'Nashik Bazaar',
      coordinates: { lat: 20.815, lng: 74.445 },
      distance: 2.2,
      amenities: ['WiFi', 'Restaurant', 'AC'],
      image: hotelImages[2]
    }
  ],
  3: [ // Thirukoshtyar Hanuman Temple - Tamil Nadu
    {
      id: 301,
      name: 'Coimbatore Pilgrims Hotel',
      rating: 4.4,
      ratingCount: 320,
      price: 2400,
      currency: 'INR',
      address: 'Coimbatore City Center',
      coordinates: { lat: 11.0026, lng: 76.7151 },
      distance: 1.8,
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking'],
      image: hotelImages[0]
    },
    {
      id: 302,
      name: 'Thiruk Temple Lodge',
      rating: 4.2,
      ratingCount: 189,
      price: 1600,
      currency: 'INR',
      address: 'Near Thirukoshtyar Temple',
      coordinates: { lat: 11.0105, lng: 76.7212 },
      distance: 0.5,
      amenities: ['WiFi', 'AC', 'Vegetarian Food'],
      image: hotelImages[1]
    }
  ],
  4: [ // Veerbhadra Temple - Karnataka
    {
      id: 401,
      name: 'Hampi Heritage Resort',
      rating: 4.5,
      ratingCount: 350,
      price: 3000,
      currency: 'INR',
      address: 'Hampi, Karnataka',
      coordinates: { lat: 15.3350, lng: 76.4795 },
      distance: 1.2,
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking', 'Pool'],
      image: hotelImages[0]
    },
    {
      id: 402,
      name: 'Veerbhadra Guest House',
      rating: 4.3,
      ratingCount: 245,
      price: 1800,
      currency: 'INR',
      address: 'Hosapete, Hampi',
      coordinates: { lat: 15.3460, lng: 76.4520 },
      distance: 2.5,
      amenities: ['WiFi', 'AC', 'Restaurant'],
      image: hotelImages[2]
    }
  ],
  5: [ // Muktagiri Jain Temple - Madhya Pradesh (21.8667, 77.9333)
    {
      id: 501,
      name: 'Betul Valley Hotel',
      rating: 4.2,
      ratingCount: 198,
      price: 1600,
      currency: 'INR',
      address: 'Betul City Center, Madhya Pradesh',
      coordinates: { lat: 21.9117, lng: 77.6097 },
      distance: 3.5,
      amenities: ['WiFi', 'AC', 'Restaurant'],
      image: hotelImages[1]
    }
  ],
  6: [ // Chilkur Balaji Temple - Telangana (17.3333, 78.3667)
    {
      id: 601,
      name: 'Hyderabad Visa Inn',
      rating: 4.4,
      ratingCount: 267,
      price: 2800,
      currency: 'INR',
      address: 'Madhapur, Hyderabad',
      coordinates: { lat: 17.3844, lng: 78.3582 },
      distance: 1.8,
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking'],
      image: hotelImages[0]
    },
    {
      id: 602,
      name: 'Balaji Darshan Lodge',
      rating: 4.1,
      ratingCount: 156,
      price: 1500,
      currency: 'INR',
      address: 'Near Chilkur Temple, Hyderabad',
      coordinates: { lat: 17.3333, lng: 78.3667 },
      distance: 0.5,
      amenities: ['WiFi', 'AC', 'Vegetarian Food'],
      image: hotelImages[2]
    }
  ],
  7: [ // Maa Tara Tarini Temple - Odisha (19.2833, 84.8667)
    {
      id: 701,
      name: 'Ganjam Shakti Hotel',
      rating: 4.2,
      ratingCount: 189,
      price: 1700,
      currency: 'INR',
      address: 'Berhampur, Odisha',
      coordinates: { lat: 19.3150, lng: 84.7939 },
      distance: 2.1,
      amenities: ['WiFi', 'AC', 'Restaurant'],
      image: hotelImages[1]
    }
  ],
  8: [ // Shree Stambheshwar Mahadev Temple - Gujarat (21.6167, 72.6167)
    {
      id: 801,
      name: 'Tidal Waters Resort',
      rating: 4.3,
      ratingCount: 220,
      price: 2200,
      currency: 'INR',
      address: 'Kavi Kamboi, Gujarat',
      coordinates: { lat: 21.6167, lng: 72.6167 },
      distance: 0.2,
      amenities: ['WiFi', 'AC', 'Restaurant', 'Beach View'],
      image: hotelImages[3]
    }
  ],
  9: [ // Maa Kamakhya Temple - Assam (26.1667, 91.7000)
    {
      id: 901,
      name: 'Guwahati Divine Hotel',
      rating: 4.4,
      ratingCount: 298,
      price: 2400,
      currency: 'INR',
      address: 'Nilachal Hill Area, Guwahati',
      coordinates: { lat: 26.1667, lng: 91.7000 },
      distance: 0.5,
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking'],
      image: hotelImages[0]
    }
  ],
  10: [ // Kaal Bhairav Temple - Madhya Pradesh (23.1765, 75.7885)
    {
      id: 1001,
      name: 'Ujjain Bhairav Inn',
      rating: 4.3,
      ratingCount: 215,
      price: 1800,
      currency: 'INR',
      address: 'Ujjain City Center, Madhya Pradesh',
      coordinates: { lat: 23.1765, lng: 75.7885 },
      distance: 0.3,
      amenities: ['WiFi', 'AC', 'Restaurant'],
      image: hotelImages[1]
    }
  ],
  11: [ // Dandeshwar Temple - Tamil Nadu (11.1271, 78.6569)
    {
      id: 1101,
      name: 'Tamil Nadu Heritage Hotel',
      rating: 4.2,
      ratingCount: 176,
      price: 1600,
      currency: 'INR',
      address: 'Ranipet, Tamil Nadu',
      coordinates: { lat: 12.9352, lng: 79.3244 },
      distance: 2.8,
      amenities: ['WiFi', 'AC', 'Vegetarian Food'],
      image: hotelImages[2]
    }
  ],
  12: [ // Bateshwar Temple Complex - Madhya Pradesh (26.0833, 78.3333)
    {
      id: 1201,
      name: 'Gwalior Ancient Hotel',
      rating: 4.5,
      ratingCount: 340,
      price: 2600,
      currency: 'INR',
      address: 'Gwalior City, Madhya Pradesh',
      coordinates: { lat: 26.2183, lng: 78.1667 },
      distance: 1.5,
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking'],
      image: hotelImages[0]
    },
    {
      id: 1202,
      name: 'Chambal Valley Resort',
      rating: 4.2,
      ratingCount: 198,
      price: 1800,
      currency: 'INR',
      address: 'Near Bateshwar Temple',
      coordinates: { lat: 26.0833, lng: 78.3333 },
      distance: 0.8,
      amenities: ['WiFi', 'AC', 'Restaurant'],
      image: hotelImages[1]
    }
  ],
  13: [ // Gurdwara Mehdiana Sahib - Punjab (30.7833, 75.4667)
    {
      id: 1301,
      name: 'Jagraon Khalsa Hotel',
      rating: 4.3,
      ratingCount: 267,
      price: 1900,
      currency: 'INR',
      address: 'Jagraon, Punjab',
      coordinates: { lat: 30.7833, lng: 75.4667 },
      distance: 0.5,
      amenities: ['WiFi', 'AC', 'Vegetarian Food', 'Langar Facility'],
      image: hotelImages[1]
    }
  ],
  14: [ // Gurdwara Bhatha Sahib - Punjab (30.8333, 76.5833)
    {
      id: 1401,
      name: 'Rupnagar Faith Hotel',
      rating: 4.2,
      ratingCount: 145,
      price: 1700,
      currency: 'INR',
      address: 'Rupnagar, Punjab',
      coordinates: { lat: 30.8333, lng: 76.5833 },
      distance: 0.6,
      amenities: ['WiFi', 'AC', 'Vegetarian Food'],
      image: hotelImages[2]
    }
  ],
  15: [ // Gurdwara Yahiyaganj - Uttar Pradesh (26.8467, 80.9462)
    {
      id: 1501,
      name: 'Lucknow Sikh House',
      rating: 4.1,
      ratingCount: 178,
      price: 1500,
      currency: 'INR',
      address: 'Lucknow City Center, Uttar Pradesh',
      coordinates: { lat: 26.8467, lng: 80.9462 },
      distance: 0.4,
      amenities: ['WiFi', 'AC', 'Vegetarian Food', 'Langar'],
      image: hotelImages[2]
    }
  ],
  16: [ // Gurdwara Sri Guru Tegh Bahadur Sahib - Assam (26.0167, 89.9833)
    {
      id: 1601,
      name: 'Dhubri Guru Inn',
      rating: 4.0,
      ratingCount: 134,
      price: 1400,
      currency: 'INR',
      address: 'Dhubri, Assam',
      coordinates: { lat: 26.0167, lng: 89.9833 },
      distance: 0.3,
      amenities: ['WiFi', 'AC', 'Vegetarian Food'],
      image: hotelImages[1]
    }
  ],
  17: [ // Gurdwara Akali Dal Gharib Nawaz - Maharashtra (19.0760, 72.8777)
    {
      id: 1701,
      name: 'Mumbai Khalsa Lodge',
      rating: 4.2,
      ratingCount: 289,
      price: 2500,
      currency: 'INR',
      address: 'Mumbai City Center, Maharashtra',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      distance: 1.2,
      amenities: ['WiFi', 'AC', 'Vegetarian Food', 'Parking'],
      image: hotelImages[0]
    }
  ],
  18: [ // Jamali Kamali Mosque and Tomb - Delhi (28.5167, 77.1833)
    {
      id: 1801,
      name: 'Mehrauli Heritage Hotel',
      rating: 4.4,
      ratingCount: 312,
      price: 2800,
      currency: 'INR',
      address: 'Mehrauli, Delhi',
      coordinates: { lat: 28.5167, lng: 77.1833 },
      distance: 0.2,
      amenities: ['WiFi', 'AC', 'Restaurant', 'Parking'],
      image: hotelImages[3]
    },
    {
      id: 1802,
      name: 'Delhi Islamic Inn',
      rating: 4.1,
      ratingCount: 189,
      price: 1800,
      currency: 'INR',
      address: 'Mehrauli Area, Delhi',
      coordinates: { lat: 28.5200, lng: 77.1800 },
      distance: 0.8,
      amenities: ['WiFi', 'AC', 'Halal Food'],
      image: hotelImages[1]
    }
  ],
  19: [ // Yellow Mosque - West Bengal (24.1833, 88.2667)
    {
      id: 1901,
      name: 'Murshidabad Yellow Inn',
      rating: 4.0,
      ratingCount: 123,
      price: 1300,
      currency: 'INR',
      address: 'Murshidabad, West Bengal',
      coordinates: { lat: 24.1833, lng: 88.2667 },
      distance: 0.5,
      amenities: ['WiFi', 'AC', 'Halal Restaurant'],
      image: hotelImages[2]
    }
  ],
  20: [ // Mohidden Mosque - Lakshadweep (10.5667, 72.6367)
    {
      id: 2001,
      name: 'Kavaratti Island Resort',
      rating: 4.6,
      ratingCount: 267,
      price: 3500,
      currency: 'INR',
      address: 'Kavaratti Island, Lakshadweep',
      coordinates: { lat: 10.5667, lng: 72.6367 },
      distance: 0.2,
      amenities: ['WiFi', 'AC', 'Beach Restaurant', 'Water Sports'],
      image: hotelImages[0]
    }
  ],
  21: [ // Najibabad Mosque - Uttar Pradesh (29.6167, 78.3333)
    {
      id: 2101,
      name: 'Najibabad Faith Hotel',
      rating: 4.1,
      ratingCount: 145,
      price: 1500,
      currency: 'INR',
      address: 'Najibabad, Uttar Pradesh',
      coordinates: { lat: 29.6167, lng: 78.3333 },
      distance: 0.3,
      amenities: ['WiFi', 'AC', 'Halal Food'],
      image: hotelImages[2]
    }
  ],
  22: [ // Gurudwara Nanakmatta Sahib - Uttarakhand (28.9409799, 79.8156667)
    {
      id: 2201,
      name: 'Nanak Sagar Hotel',
      rating: 4.3,
      ratingCount: 234,
      price: 2000,
      currency: 'INR',
      address: 'Udham Singh Nagar, Uttarakhand',
      coordinates: { lat: 28.9409799, lng: 79.8156667 },
      distance: 0.4,
      amenities: ['WiFi', 'AC', 'Vegetarian Food', 'Langar'],
      image: hotelImages[1]
    }
  ],
  23: [ // Hastinapur Jain Temple - Uttar Pradesh (29.161389, 78.006556)
    {
      id: 2301,
      name: 'Hastinapur Sacred Inn',
      rating: 4.2,
      ratingCount: 198,
      price: 1600,
      currency: 'INR',
      address: 'Hastinapur, Uttar Pradesh',
      coordinates: { lat: 29.161389, lng: 78.006556 },
      distance: 0.2,
      amenities: ['WiFi', 'AC', 'Vegetarian Food', 'Meditation Room'],
      image: hotelImages[2]
    }
  ],
  24: [ // Sonagiriji Jain Temple - Madhya Pradesh (25.72, 78.38)
    {
      id: 2401,
      name: 'Sonagiri Pilgrimage Hotel',
      rating: 4.4,
      ratingCount: 267,
      price: 2200,
      currency: 'INR',
      address: 'Sonagiri, Datia District, Madhya Pradesh',
      coordinates: { lat: 25.72, lng: 78.38 },
      distance: 0.3,
      amenities: ['WiFi', 'AC', 'Vegetarian Food', 'Meditation Room'],
      image: hotelImages[0]
    },
    {
      id: 2402,
      name: 'White Temple Resort',
      rating: 4.3,
      ratingCount: 189,
      price: 1800,
      currency: 'INR',
      address: 'Near Sonagiri Jain Temple',
      coordinates: { lat: 25.7200, lng: 78.3800 },
      distance: 0.5,
      amenities: ['WiFi', 'AC', 'Vegetarian Food'],
      image: hotelImages[1]
    }
  ]
};

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
    
    // If API fails or returns empty, use temple-specific mock data
    if (!hotels || hotels.length === 0) {
      hotels = getMockHotels(templeId, religion);
    }

    // Cache the results
    hotelCache.set(cacheKey, {
      data: hotels,
      timestamp: Date.now()
    });

    return hotels;
  } catch (error) {
    console.warn('Error fetching hotels, using mock data:', error);
    return getMockHotels(templeId, religion);
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
  // Reasonable bounding box with timeout - format: (south,west,north,east)
  const south = latitude - 0.045;
  const west = longitude - 0.045;
  const north = latitude + 0.045;
  const east = longitude + 0.045;
  
  const query = `[out:json][timeout:30];(node["tourism"="hotel"](${south},${west},${north},${east});node["tourism"="guest_house"](${south},${west},${north},${east});node["tourism"="hostel"](${south},${west},${north},${east}););out center;`;

  // Fallback servers in case primary fails
  const servers = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
  ];

  let response;
  let lastError;

  for (const server of servers) {
    try {
      response = await fetch(server, {
        method: 'POST',
        body: `data=${encodeURIComponent(query)}`,
      });

      if (response.ok) {
        break; // Success, exit loop
      }
    } catch (error) {
      lastError = error;
      continue; // Try next server
    }
  }

  if (!response || !response.ok) {
    throw new Error(`Overpass API request failed: ${lastError?.message || 'No response'}`);
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
  // Simplified query without bbox directive - it's redundant with node filters
  const south = latitude - 0.04;
  const west = longitude - 0.04;
  const north = latitude + 0.04;
  const east = longitude + 0.04;
  
  const query = `[out:json][timeout:30];(node["tourism"="hotel"](${south},${west},${north},${east});way["tourism"="hotel"](${south},${west},${north},${east}););out geom;`;

  // Fallback servers in case primary fails
  const servers = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
  ];

  let response;
  let lastError;

  for (const server of servers) {
    try {
      response = await fetch(server, {
        method: 'POST',
        body: `data=${encodeURIComponent(query)}`,
      });

      if (response.ok) {
        break; // Success, exit loop
      }
    } catch (error) {
      lastError = error;
      continue; // Try next server
    }
  }

  if (!response || !response.ok) {
    throw new Error(`OSM API request failed: ${lastError?.message || 'No response'}`);
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
function getMockHotels(templeId, religion = 'hindu') {
  // First check if we have temple-specific hotels
  if (hotelsByTemple[templeId] && hotelsByTemple[templeId].length > 0) {
    return hotelsByTemple[templeId];
  }
  
  // Fall back to religion-based hotels if no temple-specific data
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
