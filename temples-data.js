export const templesData = [
  {
    id: 1,
    name: "Shri Bade Baba Digambar Jain Temple",
    religion: "jain",
    state: "Madhya Pradesh",
    location: "Madhya Pradesh, India",
    coordinates: { lat: 23.5937, lng: 78.9629 },
    description: "A revered Digambar Jain temple known for its spiritual significance and architectural beauty.",
    history: "This ancient Jain temple stands as a testament to the rich Jain heritage of Madhya Pradesh. The temple is dedicated to the Jain Tirthankaras and features beautiful marble work. It has been a center of Jain worship and meditation for centuries, attracting devotees seeking spiritual enlightenment. The temple's peaceful atmosphere and traditional architecture make it an important pilgrimage site for Jain followers.",
    contact: {
      phone: "+91 98765 11111",
      email: "badebaba.temple@jain.in"
    },
    image: "photos/kp1.jpg",
    galleryPhotoPrefix: "kp",
    transport: {
      bus: {
        nearestBusStop: "Jain Temple Bus Stop",
        busStopDistance: "0.3 km",
        majorRoutes: [
          { number: "42", operatedBy: "MP Roadways", frequency: "Every 20 mins" },
          { number: "108", operatedBy: "MP Roadways", frequency: "Every 30 mins" },
          { number: "A5", operatedBy: "Private Transport", frequency: "Every 45 mins" }
        ],
        busStandDistance: "2.5 km",
        estimatedBusTime: "5-10 minutes"
      },
      railway: {
        nearestStation: "Vidisha Railway Station",
        distance: "22 km",
        estimatedTime: "30-40 minutes by auto",
        majorTrains: [
          { name: "Bhopal Express", from: "Delhi", to: "Bhopal", stopTime: "10:15" },
          { name: "Local 205", from: "Vidisha", to: "City Center", stopTime: "14:20" },
          { name: "Intercity 308", from: "Mumbai", to: "Delhi", stopTime: "06:30" }
        ],
        ticketApproximately: "₹100-200"
      },
      airport: {
        nearestAirport: "Bhopal International Airport",
        distance: "60 km",
        estimatedTime: "1.5 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹1000-1400"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Temple Area", distance: "5 km", cost: "₹60-100" },
        { type: "Taxi/Uber", from: "Bus Stand", distance: "22 km", cost: "₹250-350" },
        { type: "Bike Rental", availability: "Available in town", cost: "₹200-400/day" },
        { type: "Car Rental", availability: "At city center", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train + Auto Rickshaw",
        description: "Take Bhopal Express to Vidisha station, then auto to temple. Most economical and comfortable.",
        advantages: [
          "Cost-effective solution",
          "Regular trains available throughout the day",
          "Easy local auto transport available",
          "Scenic route"
        ],
        totalEstimatedTime: "2-3 hours",
        totalCost: "₹100-200 (train) + ₹60-100 (auto)"
      }
    }
  },
  {
    id: 2,
    name: "Mangi Tungi Jain Temple",
    religion: "jain",
    state: "Maharashtra",
    location: "Nashik District, Maharashtra, India",
    coordinates: { lat: 20.7833, lng: 74.4333 },
    description: "Twin-peaked mountain housing 108 ancient Jain temples, a major pilgrimage site.",
    history: "Mangi Tungi is one of the most sacred pilgrimage sites for Jains, featuring twin peaks that rise majestically above the landscape. The site houses 108 ancient temples dedicated to various Jain Tirthankaras. According to Jain tradition, many Tirthankaras attained moksha here. The temples showcase exquisite stone carvings and are reached after climbing hundreds of steps. The spiritual energy and panoramic views make this a transformative pilgrimage experience.",
    contact: {
      phone: "+91 98765 22222",
      email: "mangitungi@jaintemple.org"
    },
    image: "photos/mt6.jpg",
    galleryPhotoPrefix: "mt",
    transport: {
      bus: {
        nearestBusStop: "Mangi Tungi Main Stop",
        busStopDistance: "0.5 km",
        majorRoutes: [
          { number: "20", operatedBy: "MSRTC", frequency: "Every 15 mins" },
          { number: "22", operatedBy: "MSRTC", frequency: "Every 20 mins" },
          { number: "P45", operatedBy: "Private", frequency: "Every 30 mins" }
        ],
        busStandDistance: "1.8 km",
        estimatedBusTime: "10-15 minutes"
      },
      railway: {
        nearestStation: "Nashik Road Railway Station",
        distance: "35 km",
        estimatedTime: "45-50 minutes by taxi",
        majorTrains: [
          { name: "Devgiri Express", from: "Mumbai", to: "Aurangabad", stopTime: "09:45" },
          { name: "Nashik Local", from: "Nashik", to: "Manmad", stopTime: "11:30" }
        ],
        ticketApproximately: "₹200-350"
      },
      airport: {
        nearestAirport: "Aurangabad Airport",
        distance: "120 km",
        estimatedTime: "3 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹1800-2200"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Bus Stand", distance: "2 km", cost: "₹50-80" },
        { type: "Shared Taxi", from: "Main Road", distance: "35 km", cost: "₹150-200" },
        { type: "Bike Rental", availability: "Multiple shops", cost: "₹250-450/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Bus from Nashik",
        description: "Direct MSRTC bus from Nashik city to Mangi Tungi. Most convenient option for pilgrims.",
        advantages: [
          "Frequent buses available",
          "Very cheap fares",
          "Direct route to temple",
          "No hassle of transfers"
        ],
        totalEstimatedTime: "1.5-2 hours",
        totalCost: "₹100-150 (bus)"
      }
    }
  },
  {
    id: 3,
    name: "Girnar Jain Temples",
    religion: "jain",
    state: "Gujarat",
    location: "Junagadh, Gujarat, India",
    coordinates: { lat: 21.5222, lng: 70.5347 },
    description: "Sacred mountain with ancient Jain temples requiring a climb of 10,000 steps.",
    history: "Mount Girnar is one of the oldest pilgrimage sites in India, with Jain temples dating back to the 12th century. The main temple complex is dedicated to Neminath, the 22nd Tirthankara. The journey involves climbing approximately 10,000 steps, making it both a physical and spiritual challenge. The temples feature intricate marble carvings and offer breathtaking views of the surrounding landscape. This sacred mountain has been a center of Jain devotion for over 800 years.",
    contact: {
      phone: "+91 98765 33333",
      email: "girnar.temples@jain.in"
    },
    image: "photos/gp3.jpg",
    galleryPhotoPrefix: "gp",
    transport: {
      bus: {
        nearestBusStop: "Girnar Main Bus Stop",
        busStopDistance: "1 km",
        majorRoutes: [
          { number: "10", operatedBy: "Gujarat ST", frequency: "Every 20 mins" },
          { number: "12", operatedBy: "Gujarat ST", frequency: "Every 25 mins" },
          { number: "G8", operatedBy: "Private", frequency: "Every 40 mins" }
        ],
        busStandDistance: "3 km",
        estimatedBusTime: "10-15 minutes"
      },
      railway: {
        nearestStation: "Junagadh Railway Station",
        distance: "10 km",
        estimatedTime: "20-25 minutes by auto",
        majorTrains: [
          { name: "Somnath Express", from: "Ahmedabad", to: "Somnath", stopTime: "14:15" },
          { name: "Junagadh Passenger", from: "Rajkot", to: "Junagadh", stopTime: "10:45" }
        ],
        ticketApproximately: "₹50-150"
      },
      airport: {
        nearestAirport: "Rajkot International Airport",
        distance: "85 km",
        estimatedTime: "2 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹1200-1600"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Junagadh Station", distance: "10 km", cost: "₹120-150" },
        { type: "Taxi/Cab", from: "Any location", distance: "Flexible", cost: "₹300-500" },
        { type: "Bike Rental", availability: "At railway station", cost: "₹250-400/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train + Auto to Temple Base",
        description: "Take train to Junagadh, then auto to temple base. Short climb of 10,000 steps.",
        advantages: [
          "Affordable train journey",
          "Regular auto service",
          "Spiritual experience of the climb",
          "Best views of the region"
        ],
        totalEstimatedTime: "2-3 hours total",
        totalCost: "₹50-150 (train) + ₹120-150 (auto)"
      }
    }
  },
  {
    id: 4,
    name: "Hastagiri Jain Temple",
    religion: "jain",
    state: "Gujarat",
    location: "Palitana,Gujarat, India",
    coordinates: { lat: 21.4288, lng: 71.7422 },
    description: "Historic hilltop Jain temple known for its serene environment and religious significance.",
    history: "Hastagiri, meaning 'Elephant Hill', is an ancient Jain pilgrimage center with a rich history spanning several centuries. The temple complex features beautiful idols and traditional Jain architecture. It has been a place of meditation and spiritual practice for Jain monks and devotees. The hill offers a peaceful retreat from urban life, with well-maintained paths and facilities for pilgrims. The temple's annual festivals attract thousands of devotees.",
    contact: {
      phone: "+91 98765 44444",
      email: "hastagiri@jaintemple.org"
    },
    image: "photos/pj.jpeg",
    galleryPhotoPrefix: "pj",
    transport: {
      bus: {
        nearestBusStop: "Palitana City Bus Stop",
        busStopDistance: "2 km",
        majorRoutes: [
          { number: "5", operatedBy: "Gujarat ST", frequency: "Every 25 mins" },
          { number: "7", operatedBy: "Gujarat ST", frequency: "Every 30 mins" },
          { number: "P12", operatedBy: "Private", frequency: "Every 45 mins" }
        ],
        busStandDistance: "2 km",
        estimatedBusTime: "5-8 minutes"
      },
      railway: {
        nearestStation: "Palitana Railway Station",
        distance: "5 km",
        estimatedTime: "15-20 minutes by auto",
        majorTrains: [
          { name: "Palitana Express", from: "Ahmedabad", to: "Palitana", stopTime: "11:00" },
          { name: "Local 456", from: "Bhavnagar", to: "Palitana", stopTime: "13:45" }
        ],
        ticketApproximately: "₹40-100"
      },
      airport: {
        nearestAirport: "Bhavnagar Airport",
        distance: "50 km",
        estimatedTime: "1.5 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹800-1200"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Railway Station", distance: "5 km", cost: "₹60-80" },
        { type: "Shared Auto", from: "Bus Stand", distance: "2 km", cost: "₹20-30" },
        { type: "Walking", from: "City Center", distance: "2 km", cost: "FREE" }
      ],
      recommendedRoute: {
        title: "Best Option: Train from Ahmedabad + Auto",
        description: "Palitana Express is most direct and affordable route. City is very accessible.",
        advantages: [
          "Very short distances involved",
          "Cheap local transport",
          "Can be completed in one day trip",
          "Multiple options available"
        ],
        totalEstimatedTime: "2-3 hours",
        totalCost: "₹40-100 (train) + ₹60-80 (auto)"
      }
    }
  },
  {
    id: 5,
    name: "Muktagiri Jain Temple",
    religion: "jain",
    state: "Madhya Pradesh",
    location: "Betul District, Madhya Pradesh, India",
    coordinates: { lat: 21.8667, lng: 77.9333 },
    description: "One of the most important Jain pilgrimage sites with 52 temples on a sacred hill.",
    history: "Muktagiri, meaning 'Mountain of Liberation', is believed to be the place where many Jain monks have attained moksha. The site features 52 temples spread across the hill, with the main temple dedicated to Bhagwan Neminath. Dating back several centuries, these temples showcase traditional Jain architecture with intricate carvings. The climb to the top involves 3,500 steps and is considered a journey of spiritual purification. The peaceful environment and ancient temples make Muktagiri a significant destination for Jain pilgrims.",
    contact: {
      phone: "+91 98765 55555",
      email: "muktagiri.temple@jain.in"
    },
    image: "photos/mg2.jpg",
    galleryPhotoPrefix: "mg",
    transport: {
      bus: {
        nearestBusStop: "Muktagiri Bus Stand",
        busStopDistance: "0.2 km",
        majorRoutes: [
          { number: "35", operatedBy: "MP Roadways", frequency: "Every 30 mins" },
          { number: "45", operatedBy: "MP Roadways", frequency: "Every 40 mins" }
        ],
        busStandDistance: "0.5 km",
        estimatedBusTime: "5 minutes"
      },
      railway: {
        nearestStation: "Betul Railway Station",
        distance: "25 km",
        estimatedTime: "35-40 minutes by auto",
        majorTrains: [
          { name: "Central Express", from: "Mumbai", to: "Indore", stopTime: "09:30" },
          { name: "Local 205", from: "Betul", to: "Mundi", stopTime: "14:15" }
        ],
        ticketApproximately: "₹80-180"
      },
      airport: {
        nearestAirport: "Indore International Airport",
        distance: "100 km",
        estimatedTime: "2.5 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹1400-1800"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Betul Station", distance: "25 km", cost: "₹200-300" },
        { type: "Shared Jeep", from: "Betul Market", distance: "25 km", cost: "₹100-150" },
        { type: "Walking/Trekking", from: "Temple Base", distance: "3500 steps", cost: "FREE" }
      ],
      recommendedRoute: {
        title: "Best Option: Bus from Betul + Shared Jeep",
        description: "Most economical and popular route among pilgrims. 3500 steps to climb.",
        advantages: [
          "Most pilgrims use this route",
          "Very affordable",
          "Spiritual climb with beautiful views",
          "Good local support system"
        ],
        totalEstimatedTime: "2.5-3.5 hours",
        totalCost: "₹80-180 (train) + ₹100-150 (jeep)"
      }
    }
  },
  {
    id: 6,
    name: "Chilkur Balaji Temple",
    religion: "hindu",
    state: "Telangana",
    location: "Hyderabad, Telangana, India",
    coordinates: { lat: 17.3333, lng: 78.3667 },
    description: "Known as 'Visa Balaji Temple', famous for granting devotees' wishes, especially for visa approvals.",
    history: "Built during the time of the Vijayanagara Empire, Chilkur Balaji Temple is approximately 500 years old. The temple is unique as it doesn't accept any donations and doesn't have a hundi. It gained popularity as the 'Visa Balaji Temple' because devotees believe that worshipping here helps in obtaining visas. The tradition involves walking 108 times around the temple after the wish is fulfilled. The temple maintains its ancient customs and is surrounded by a serene lake, creating a peaceful atmosphere for devotees.",
    contact: {
      phone: "+91 98765 66666",
      email: "chilkurbalaji@hindu.in"
    },
    image: "photos/chb.jpeg",
    galleryPhotoPrefix: "br",
    transport: {
      bus: {
        nearestBusStop: "Chilkur Temple Bus Stop",
        busStopDistance: "0.2 km",
        majorRoutes: [
          { number: "555", operatedBy: "TSRTC", frequency: "Every 15 mins" },
          { number: "556", operatedBy: "TSRTC", frequency: "Every 20 mins" },
          { number: "668", operatedBy: "TSRTC", frequency: "Every 30 mins" }
        ],
        busStandDistance: "15 km",
        estimatedBusTime: "25-35 minutes"
      },
      railway: {
        nearestStation: "Hyderabad Central Railway Station",
        distance: "25 km",
        estimatedTime: "45-60 minutes by taxi",
        majorTrains: [
          { name: "Shatabdi Express", from: "Delhi", to: "Hyderabad", stopTime: "09:30" },
          { name: "Rajdhani Express", from: "Delhi", to: "Hyderabad", stopTime: "16:15" },
          { name: "Golconda Express", from: "Mumbai", to: "Hyderabad", stopTime: "08:00" }
        ],
        ticketApproximately: "₹150-300"
      },
      airport: {
        nearestAirport: "Rajiv Gandhi International Airport, Hyderabad",
        distance: "30 km",
        estimatedTime: "1 hour by taxi",
        terminals: ["Terminal 1", "Terminal 2"],
        taxiApproximate: "₹600-800"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Temple Area", distance: "2 km", cost: "₹40-60" },
        { type: "Taxi/Uber", from: "RGIA Airport", distance: "30 km", cost: "₹600-800" },
        { type: "Metro", from: "Hyderabad Metro", distance: "5 km", cost: "₹10-25" },
        { type: "Car Rental", availability: "At city center", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Taxi/Uber from Airport or City",
        description: "Direct taxi from Hyderabad airport or city center. Easy navigation with good road connectivity.",
        advantages: [
          "Quick and convenient access",
          "Good road connectivity",
          "Affordable taxi services available",
          "Airport has direct routes to temple"
        ],
        totalEstimatedTime: "45 minutes - 1 hour",
        totalCost: "₹600-800 (from airport) or ₹200-300 (from city center)"
      }
    }
  },
  {
    id: 7,
    name: "Maa Tara Tarini Temple",
    religion: "hindu",
    state: "Odisha",
    location: "Ganjam District, Odisha, India",
    coordinates: { lat: 19.2833, lng: 84.8667 },
    description: "One of the oldest Shakti Peethas, dedicated to the twin goddesses Tara and Tarini.",
    history: "Maa Tara Tarini Temple is one of the four major ancient Shakti Peethas in India, with origins dating back thousands of years. According to legend, the breasts of Goddess Sati fell here, making it a powerful Shakti Peeth. The temple sits atop Kumari Hill and offers panoramic views of the Rushikulya River. The twin deities are worshipped as manifestations of Adi Shakti. The temple has been renovated several times but maintains its spiritual essence. It attracts devotees from across India who come seeking the blessings of the divine mother.",
    contact: {
      phone: "+91 98765 77777",
      email: "taratarini@temple.org"
    },
    image: "photos/MAt.jpg",
    galleryPhotoPrefix: "mt",
    transport: {
      bus: {
        nearestBusStop: "Berhampur Bus Stand",
        busStopDistance: "12 km",
        majorRoutes: [
          { number: "110", operatedBy: "Odisha State Roadways", frequency: "Every 30 mins" },
          { number: "112", operatedBy: "Odisha State Roadways", frequency: "Every 45 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 60 mins" }
        ],
        busStandDistance: "12 km",
        estimatedBusTime: "20-30 minutes"
      },
      railway: {
        nearestStation: "Berhampur Railway Station",
        distance: "15 km",
        estimatedTime: "30-40 minutes by taxi",
        majorTrains: [
          { name: "Howrah-Chennai Exp", from: "Kolkata", to: "Chennai", stopTime: "11:20" },
          { name: "Coromandel Express", from: "Delhi", to: "Chennai", stopTime: "14:35" },
          { name: "East Coast Express", from: "Kolkata", to: "Visakhapatnam", stopTime: "09:15" }
        ],
        ticketApproximately: "₹100-200"
      },
      airport: {
        nearestAirport: "Bhubaneswar International Airport",
        distance: "100 km",
        estimatedTime: "2 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹1500-2000"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Temple Area", distance: "12 km", cost: "₹150-200" },
        { type: "Taxi/Uber", from: "Berhampur Station", distance: "15 km", cost: "₹300-400" },
        { type: "Shared Jeep", from: "Bus Stand", distance: "12 km", cost: "₹50-80" },
        { type: "Car Rental", availability: "At Berhampur", cost: "₹1000-1500/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train to Berhampur + Local Transport",
        description: "Take train to Berhampur, then taxi/shared jeep to temple. Most economical route.",
        advantages: [
          "Good railway connectivity",
          "Affordable local transport available",
          "Scenic route through Odisha",
          "Well-established pilgrimage route"
        ],
        totalEstimatedTime: "2-3 hours",
        totalCost: "₹100-200 (train) + ₹150-200 (taxi)"
      }
    }
  },
  {
    id: 8,
    name: "Shree Stambheshwar Mahadev Temple",
    religion: "hindu",
    state: "Gujarat",
    location: "Kavi Kamboi, Gujarat, India",
    coordinates: { lat: 21.6167, lng: 72.6167 },
    description: "A unique temple that disappears under water during high tide and reappears during low tide.",
    history: "Stambheshwar Mahadev Temple is an extraordinary temple dedicated to Lord Shiva, located on the shores of the Arabian Sea. The temple's most remarkable feature is that it gets submerged during high tide and is accessible only during low tide, making it visible for only a few hours each day. Built centuries ago, the temple represents the eternal nature of Shiva, who remains constant despite the changing tides. The phenomenon attracts both devotees and tourists who time their visits to witness this natural spectacle. The temple's unique location and the spiritual experience of watching it emerge from the waters make it truly special.",
    contact: {
      phone: "+91 98765 88888",
      email: "stambheshwar@mahadev.in"
    },
    image: "photos/ssmt.jpeg",
    transport: {
      bus: {
        nearestBusStop: "Kavi Kamboi Bus Stop",
        busStopDistance: "1 km",
        majorRoutes: [
          { number: "101", operatedBy: "Gujarat State Roadways", frequency: "Every 40 mins" },
          { number: "102", operatedBy: "Gujarat State Roadways", frequency: "Every 60 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 90 mins" }
        ],
        busStandDistance: "8 km",
        estimatedBusTime: "15-20 minutes"
      },
      railway: {
        nearestStation: "Ankleshwar Railway Station",
        distance: "18 km",
        estimatedTime: "30-45 minutes by taxi",
        majorTrains: [
          { name: "Mandovi Express", from: "Delhi", to: "Goa", stopTime: "07:00" },
          { name: "Gujarat Express", from: "Mumbai", to: "Ahmedabad", stopTime: "06:30" },
          { name: "Somnath Express", from: "Mumbai", to: "Somnath", stopTime: "18:00" }
        ],
        ticketApproximately: "₹80-150"
      },
      airport: {
        nearestAirport: "Surat International Airport",
        distance: "45 km",
        estimatedTime: "1 hour by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹800-1200"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Temple Area", distance: "8 km", cost: "₹80-120" },
        { type: "Taxi/Uber", from: "Surat Airport", distance: "45 km", cost: "₹800-1200" },
        { type: "Bike Rental", availability: "Available in town", cost: "₹200-300/day" },
        { type: "Car Rental", availability: "At Ankleshwar", cost: "₹900-1300/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train to Ankleshwar + Taxi",
        description: "Train to Ankleshwar station, then taxi to Stambheshwar. Good connectivity and affordable.",
        advantages: [
          "Good railway connectivity from Mumbai/Ahmedabad",
          "Scenic coastal route",
          "Affordable transportation",
          "Easy access to tidal timings information"
        ],
        totalEstimatedTime: "2-3 hours",
        totalCost: "₹80-150 (train) + ₹200-300 (taxi)"
      }
    }
  },
  {
    id: 9,
    name: "Maa Kamakhya Temple",
    religion: "hindu",
    state: "Assam",
    location: "Guwahati, Assam, India",
    coordinates: { lat: 26.1667, lng: 91.7000 },
    description: "One of the most sacred Shakti Peethas, famous for Tantric practices and the Ambubachi Mela.",
    history: "Maa Kamakhya Temple, situated atop Nilachal Hill, is one of the oldest and most revered Shakti Peethas in India, dating back to the 8th-9th century. The temple is dedicated to Goddess Kamakhya, representing the mother goddess in her creative and nurturing aspect. Unlike most temples, there is no idol here; instead, a natural underground spring keeps a sculptured stone moist. The temple is famous for the annual Ambubachi Mela, celebrating the goddess's menstruation cycle. The temple complex showcases unique Assamese architecture and is an important center for Tantric worship.",
    contact: {
      phone: "+91 98765 99999",
      email: "kamakhya@shakti.org"
    },
    image: "photos/makt.png",
    galleryPhotoPrefix: "makt",
    transport: {
      bus: {
        nearestBusStop: "Kamakhya Temple Bus Stop",
        busStopDistance: "0.5 km",
        majorRoutes: [
          { number: "7", operatedBy: "Assam State Transport", frequency: "Every 15 mins" },
          { number: "9", operatedBy: "Assam State Transport", frequency: "Every 20 mins" },
          { number: "15", operatedBy: "ASTC", frequency: "Every 25 mins" }
        ],
        busStandDistance: "3 km",
        estimatedBusTime: "10-15 minutes"
      },
      railway: {
        nearestStation: "Guwahati Railway Station",
        distance: "8 km",
        estimatedTime: "20-30 minutes by taxi",
        majorTrains: [
          { name: "Rajdhani Express", from: "Delhi", to: "Guwahati", stopTime: "10:30" },
          { name: "Brahmaputra Express", from: "Delhi", to: "Guwahati", stopTime: "06:15" },
          { name: "Northeast Express", from: "Kolkata", to: "Guwahati", stopTime: "18:45" }
        ],
        ticketApproximately: "₹200-400"
      },
      airport: {
        nearestAirport: "Lokpriya Gopinath Bordoloi International Airport, Guwahati",
        distance: "22 km",
        estimatedTime: "45-60 minutes by taxi",
        terminals: ["Terminal 1"],
        taxiApproximate: "₹600-900"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Temple Area", distance: "3 km", cost: "₹50-80" },
        { type: "Taxi/Uber", from: "Railway Station", distance: "8 km", cost: "₹200-300" },
        { type: "Metro", from: "Guwahati Metro", distance: "2 km", cost: "₹10-20" },
        { type: "Car Rental", availability: "At city center", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Flights/Train to Guwahati + Local Metro/Bus",
        description: "Fly or train to Guwahati, then use metro or local buses. Very convenient and quick.",
        advantages: [
          "Excellent railway and air connectivity",
          "Metro available for quick access",
          "Close to city center",
          "Multiple transport options"
        ],
        totalEstimatedTime: "45 minutes - 1 hour",
        totalCost: "₹200-400 (train) + ₹50-80 (auto) or ₹600-900 (taxi from airport)"
      }
    }
  },
  {
    id: 10,
    name: "Kaal Bhairav Temple",
    religion: "hindu",
    state: "Madhya Pradesh",
    location: "Ujjain, Madhya Pradesh, India",
    coordinates: { lat: 23.1765, lng: 75.7885 },
    description: "Unique temple where alcohol is offered to the deity Kaal Bhairav.",
    history: "The Kaal Bhairav Temple in Ujjain is an ancient shrine dedicated to Kaal Bhairav, a fierce manifestation of Lord Shiva who is considered the guardian deity of the city. What makes this temple extraordinary is the unique ritual where devotees offer alcohol to the deity, which is believed to be consumed by Bhairav himself. The temple dates back several centuries and holds significant importance in Hindu Tantra tradition. Kaal Bhairav is worshipped as the deity of time and destruction of evil. The temple attracts devotees seeking protection and blessings for overcoming obstacles.",
    contact: {
      phone: "+91 98765 10001",
      email: "kaalbhairav@ujjain.in"
    },
    image: "photos/kbt.jpg",
    galleryPhotoPrefix: "kbt",
    transport: {
      bus: {
        nearestBusStop: "Ujjain Bus Stop",
        busStopDistance: "1 km",
        majorRoutes: [
          { number: "101", operatedBy: "Madhya Pradesh Roadways", frequency: "Every 20 mins" },
          { number: "102", operatedBy: "Madhya Pradesh Roadways", frequency: "Every 30 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 45 mins" }
        ],
        busStandDistance: "3 km",
        estimatedBusTime: "8-15 minutes"
      },
      railway: {
        nearestStation: "Ujjain Railway Station",
        distance: "8 km",
        estimatedTime: "15-20 minutes by auto",
        majorTrains: [
          { name: "Ujjayini Express", from: "Delhi", to: "Ujjain", stopTime: "07:00" },
          { name: "Shatabdi Express", from: "Delhi", to: "Indore", stopTime: "16:00" },
          { name: "Awantika Express", from: "Mumbai", to: "Indore", stopTime: "13:30" }
        ],
        ticketApproximately: "₹150-250"
      },
      airport: {
        nearestAirport: "Indore International Airport",
        distance: "55 km",
        estimatedTime: "1.5 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹900-1200"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Temple Area", distance: "3 km", cost: "₹50-80" },
        { type: "Taxi/Uber", from: "Indore Airport", distance: "55 km", cost: "₹900-1200" },
        { type: "Bike Rental", availability: "Available in town", cost: "₹150-250/day" },
        { type: "Car Rental", availability: "At Ujjain", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train to Ujjain + Auto Rickshaw",
        description: "Direct train from major cities to Ujjain, then auto to temple. Very convenient.",
        advantages: [
          "Excellent railway connectivity",
          "Affordable local transport",
          "Famous pilgrimage destination with frequent trains",
          "Ujjain Mahakal temple nearby makes it a pilgrimage circuit"
        ],
        totalEstimatedTime: "1.5-2 hours",
        totalCost: "₹150-250 (train) + ₹50-80 (auto)"
      }
    }
  },
  {
    id: 11,
    name: "Dandeshwar Temple",
    religion: "hindu",
    state: "Tamil Nadu",
    location: "Tamil Nadu, India",
    coordinates: { lat: 11.1271, lng: 78.6569 },
    description: "Ancient Shiva temple known for its architectural beauty and historical significance.",
    history: "Dandeshwar Temple is an ancient temple dedicated to Lord Shiva, featuring traditional Dravidian architecture. The temple showcases intricate stone carvings and sculptures that represent the artistic excellence of ancient Tamil craftsmen. The temple has been a place of worship for centuries and holds special significance during Shivaratri and other Hindu festivals. The sanctum houses a beautiful Shiva lingam, and the temple complex includes shrines for other deities as well. The peaceful atmosphere and historical architecture make it a valuable heritage site.",
    contact: {
      phone: "+91 98765 10002",
      email: "dandeshwar@temple.org"
    },
    image: "photos/dt.jpeg",
    transport: {
      bus: {
        nearestBusStop: "Dandeshwar Temple Bus Stop",
        busStopDistance: "1 km",
        majorRoutes: [
          { number: "201", operatedBy: "Tamil Nadu State Transport", frequency: "Every 30 mins" },
          { number: "202", operatedBy: "Tamil Nadu State Transport", frequency: "Every 45 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 60 mins" }
        ],
        busStandDistance: "15 km",
        estimatedBusTime: "30-45 minutes"
      },
      railway: {
        nearestStation: "Tiruppur Railway Station",
        distance: "18 km",
        estimatedTime: "40-50 minutes by taxi",
        majorTrains: [
          { name: "Coromandel Express", from: "Delhi", to: "Chennai", stopTime: "14:35" },
          { name: "Chennai Express", from: "Mumbai", to: "Chennai", stopTime: "15:00" },
          { name: "Nilgiri Express", from: "Chennai", to: "Ooty", stopTime: "07:30" }
        ],
        ticketApproximately: "₹100-200"
      },
      airport: {
        nearestAirport: "Coimbatore International Airport",
        distance: "45 km",
        estimatedTime: "1.5 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹700-1000"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Temple Area", distance: "15 km", cost: "₹200-250" },
        { type: "Taxi/Uber", from: "Coimbatore Airport", distance: "45 km", cost: "₹700-1000" },
        { type: "Shared Jeep", from: "Bus Stand", distance: "15 km", cost: "₹80-120" },
        { type: "Car Rental", availability: "At Tiruppur", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Flight to Coimbatore + Taxi or Bus",
        description: "Fly to Coimbatore, then taxi or bus to temple. Quick access from airport.",
        advantages: [
          "Good flight connectivity from major cities",
          "Well-connected by road network",
          "Multiple transport options available",
          "Scenic Tamil Nadu route"
        ],
        totalEstimatedTime: "2-3 hours",
        totalCost: "₹700-1000 (taxi from airport) or ₹100-200 (train) + ₹200-250 (auto)"
      }
    }
  },
  {
    id: 12,
    name: "Bateshwar Temple Complex",
    religion: "hindu",
    state: "Madhya Pradesh",
    location: "Gwalior, Madhya Pradesh, India",
    coordinates: { lat: 26.0833, lng: 78.3333 },
    description: "Group of over 200 ancient temples dedicated to Shiva, dating back to the 8th-10th century.",
    history: "The Bateshwar Temple Complex is a remarkable archaeological site consisting of over 200 temples dedicated to Lord Shiva, built between the 8th and 10th centuries during the Gurjara-Pratihara dynasty. These sandstone temples showcase the architectural brilliance of medieval India. Many temples were submerged and damaged over centuries but have been carefully restored. The temples feature intricate carvings depicting various Hindu deities and mythological scenes. The complex stands along the Chambal River, creating a serene and spiritual atmosphere. It represents one of the most significant temple clusters in North India.",
    contact: {
      phone: "+91 98765 10003",
      email: "bateshwar@gwalior.org"
    },
    image: "photos/btc.jpg",
    transport: {
      bus: {
        nearestBusStop: "Bateshwar Bus Stop",
        busStopDistance: "2 km",
        majorRoutes: [
          { number: "51", operatedBy: "Madhya Pradesh Roadways", frequency: "Every 30 mins" },
          { number: "52", operatedBy: "Madhya Pradesh Roadways", frequency: "Every 45 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 60 mins" }
        ],
        busStandDistance: "8 km",
        estimatedBusTime: "15-25 minutes"
      },
      railway: {
        nearestStation: "Gwalior Railway Station",
        distance: "25 km",
        estimatedTime: "40-50 minutes by taxi",
        majorTrains: [
          { name: "Shatabdi Express", from: "Delhi", to: "Gwalior", stopTime: "08:30" },
          { name: "Tamil Nadu Express", from: "Delhi", to: "Chennai", stopTime: "16:40" },
          { name: "Taj Express", from: "Agra", to: "Delhi", stopTime: "12:15" }
        ],
        ticketApproximately: "₹100-200"
      },
      airport: {
        nearestAirport: "Gwalior Airport",
        distance: "15 km",
        estimatedTime: "30-40 minutes by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹300-500"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Temple Area", distance: "8 km", cost: "₹80-120" },
        { type: "Taxi/Uber", from: "Gwalior Station", distance: "25 km", cost: "₹400-600" },
        { type: "Bike Rental", availability: "Available in town", cost: "₹200-300/day" },
        { type: "Car Rental", availability: "At Gwalior", cost: "₹900-1300/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train to Gwalior + Taxi",
        description: "Take train to Gwalior, then taxi to Bateshwar temple complex. Direct and economical.",
        advantages: [
          "Excellent train connectivity from Delhi/Agra",
          "Close to Gwalior city",
          "Affordable local transport",
          "Can combine with Gwalior Fort visit"
        ],
        totalEstimatedTime: "2-3 hours",
        totalCost: "₹100-200 (train) + ₹80-120 (auto)"
      }
    }
  },
  {
    id: 13,
    name: "Gurdwara Mehdiana Sahib",
    religion: "sikh",
    state: "Punjab",
    location: "Near Jagraon, Ludhiana District, Punjab, India",
    coordinates: { lat: 30.7833, lng: 75.4667 },
    description: "Historic Gurdwara marking a significant event in Sikh history.",
    history: "Gurdwara Mehdiana Sahib holds a special place in Sikh history as it commemorates Guru Gobind Singh Ji's visit to this area. The Gurdwara was built to honor the Guru's teachings and his message of equality and devotion. The site has been a place of worship for centuries, with the current structure featuring traditional Sikh architecture including a beautiful dome and marble work. The Gurdwara hosts langar daily, feeding thousands of visitors regardless of their background. It serves as an important pilgrimage site for Sikhs and promotes the values of service, equality, and devotion.",
    contact: {
      phone: "+91 98765 10004",
      email: "mehdiana@gurdwara.org"
    },
    image: "photos/GMS.jpg",
    transport: {
      bus: {
        nearestBusStop: "Mehdiana Gurdwara Bus Stop",
        busStopDistance: "1 km",
        majorRoutes: [
          { number: "502", operatedBy: "Punjab State Transport", frequency: "Every 20 mins" },
          { number: "503", operatedBy: "Punjab State Transport", frequency: "Every 30 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 45 mins" }
        ],
        busStandDistance: "5 km",
        estimatedBusTime: "10-15 minutes"
      },
      railway: {
        nearestStation: "Jagraon Railway Station",
        distance: "3 km",
        estimatedTime: "8-12 minutes by auto",
        majorTrains: [
          { name: "Punjab Mail", from: "Delhi", to: "Amritsar", stopTime: "14:20" },
          { name: "Malwa Express", from: "Delhi", to: "Bathinda", stopTime: "20:35" },
          { name: "Shatabdi Express", from: "Delhi", to: "Amritsar", stopTime: "08:00" }
        ],
        ticketApproximately: "₹80-150"
      },
      airport: {
        nearestAirport: "Chandigarh International Airport",
        distance: "80 km",
        estimatedTime: "2 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹1000-1300"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Station", distance: "3 km", cost: "₹30-50" },
        { type: "Taxi/Uber", from: "Ludhiana City", distance: "15 km", cost: "₹250-350" },
        { type: "Bike Rental", availability: "Available in town", cost: "₹150-200/day" },
        { type: "Car Rental", availability: "At Ludhiana", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train to Jagraon + Auto Rickshaw",
        description: "Direct train from Delhi/Amritsar to Jagraon, then auto to Gurdwara. Very convenient.",
        advantages: [
          "Excellent railway connectivity from North India",
          "Very close to railway station",
          "Affordable auto transport",
          "Frequent pilgrims make it easy to find shared transport"
        ],
        totalEstimatedTime: "1-2 hours",
        totalCost: "₹80-150 (train) + ₹30-50 (auto)"
      }
    }
  },
  {
    id: 14,
    name: "Gurdwara Bhatha Sahib",
    religion: "sikh",
    state: "Punjab",
    location: "Kotla Nihang Khan, near Rupnagar/Chandigarh, Punjab, India",
    coordinates: { lat: 30.8333, lng: 76.5833 },
    description: "Sacred Gurdwara associated with Guru Gobind Singh Ji's travels.",
    history: "Gurdwara Bhatha Sahib is a historic shrine associated with Guru Gobind Singh Ji's journey through Punjab. The Gurdwara marks the site where the Guru stayed and blessed the local community. Built with traditional Sikh architectural elements, it features a serene sarovar and beautiful prayer halls. The Gurdwara maintains the spirit of Sikh traditions through regular prayers, kirtan, and community service. It stands as a testament to the Guru's teachings of courage, faith, and compassion. The peaceful environment and spiritual atmosphere make it an important stop for pilgrims.",
    contact: {
      phone: "+91 98765 10005",
      email: "bhatha@gurdwara.org"
    },
    image: "photos/Gbs.jpg",
    transport: {
      bus: {
        nearestBusStop: "Bhatha Sahib Bus Stop",
        busStopDistance: "2 km",
        majorRoutes: [
          { number: "301", operatedBy: "Punjab State Transport", frequency: "Every 25 mins" },
          { number: "302", operatedBy: "Punjab State Transport", frequency: "Every 40 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 60 mins" }
        ],
        busStandDistance: "8 km",
        estimatedBusTime: "15-25 minutes"
      },
      railway: {
        nearestStation: "Rupnagar Railway Station",
        distance: "12 km",
        estimatedTime: "25-35 minutes by taxi",
        majorTrains: [
          { name: "Shatabdi Express", from: "Delhi", to: "Amritsar", stopTime: "08:00" },
          { name: "Punjab Mail", from: "Delhi", to: "Amritsar", stopTime: "14:20" },
          { name: "Local Trains", from: "Chandigarh", to: "Nangal Dam", stopTime: "06:00" }
        ],
        ticketApproximately: "₹100-150"
      },
      airport: {
        nearestAirport: "Chandigarh International Airport",
        distance: "40 km",
        estimatedTime: "1 hour by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹600-800"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Station", distance: "12 km", cost: "₹100-150" },
        { type: "Taxi/Uber", from: "Chandigarh Airport", distance: "40 km", cost: "₹600-800" },
        { type: "Bike Rental", availability: "Available in town", cost: "₹150-200/day" },
        { type: "Car Rental", availability: "At Rupnagar/Chandigarh", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train to Rupnagar + Taxi",
        description: "Train to Rupnagar, then taxi to Gurdwara. Close to Chandigarh.",
        advantages: [
          "Good railway connectivity from Delhi",
          "Close to Chandigarh city",
          "Affordable local transport",
          "Beautiful Sutlej River area"
        ],
        totalEstimatedTime: "2-3 hours",
        totalCost: "₹100-150 (train) + ₹100-150 (auto)"
      }
    }
  },
  {
    id: 15,
    name: "Gurdwara Yahiyaganj",
    religion: "sikh",
    state: "Uttar Pradesh",
    location: "Lucknow, Uttar Pradesh, India",
    coordinates: { lat: 26.8467, lng: 80.9462 },
    description: "Important Sikh shrine in Lucknow with historical significance.",
    history: "Gurdwara Yahiyaganj in Lucknow is a significant Sikh place of worship that reflects the strong Sikh presence in Uttar Pradesh. The Gurdwara serves the local Sikh community and visitors, maintaining the traditions of Sikhism in the heart of Lucknow. It features a spacious prayer hall where Guru Granth Sahib is enshrined with great reverence. The Gurdwara runs community services including langar and educational programs. Its location in Lucknow makes it an important center for Sikh religious and cultural activities in the region.",
    contact: {
      phone: "+91 98765 10006",
      email: "yahiyaganj@gurdwara.org"
    },
    image: "photos/GY.jpeg",
    transport: {
      bus: {
        nearestBusStop: "Yahiyaganj Bus Stop",
        busStopDistance: "1 km",
        majorRoutes: [
          { number: "15", operatedBy: "Lucknow Transport", frequency: "Every 15 mins" },
          { number: "21", operatedBy: "Lucknow Transport", frequency: "Every 20 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 30 mins" }
        ],
        busStandDistance: "3 km",
        estimatedBusTime: "8-12 minutes"
      },
      railway: {
        nearestStation: "Lucknow Central Railway Station",
        distance: "8 km",
        estimatedTime: "20-30 minutes by taxi",
        majorTrains: [
          { name: "Shatabdi Express", from: "Delhi", to: "Lucknow", stopTime: "14:40" },
          { name: "Rajdhani Express", from: "Delhi", to: "Kolkata", stopTime: "21:00" },
          { name: "Gomti Express", from: "Kolkata", to: "Lucknow", stopTime: "09:35" }
        ],
        ticketApproximately: "₹200-350"
      },
      airport: {
        nearestAirport: "Lucknow Amausi Airport",
        distance: "15 km",
        estimatedTime: "30-45 minutes by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹400-600"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "City Center", distance: "3 km", cost: "₹40-60" },
        { type: "Taxi/Uber", from: "Airport", distance: "15 km", cost: "₹400-600" },
        { type: "Bus", from: "City Center", distance: "3 km", cost: "₹10-15" },
        { type: "Car Rental", availability: "At city center", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Flight/Train to Lucknow + Local Transport",
        description: "Fly or train to Lucknow, then use local buses or taxi. Centrally located.",
        advantages: [
          "Flight and train connectivity from major cities",
          "Located in city center",
          "Excellent local transport network",
          "Near Bara Imambara and other heritage sites"
        ],
        totalEstimatedTime: "1-1.5 hours",
        totalCost: "₹200-350 (train) + ₹40-60 (auto) or ₹400-600 (taxi from airport)"
      }
    }
  },
  {
    id: 16,
    name: "Gurdwara Sri Guru Tegh Bahadur Sahib",
    religion: "sikh",
    state: "Assam",
    location: "Dhubri, Assam, India",
    coordinates: { lat: 26.0167, lng: 89.9833 },
    description: "Historic Gurdwara commemorating Guru Tegh Bahadur Ji's visit to Assam.",
    history: "Gurdwara Sri Guru Tegh Bahadur Sahib in Dhubri marks the visit of the ninth Sikh Guru to Assam during his travels across India. Guru Tegh Bahadur Ji came here to spread the message of Sikhism and established this sacred site. The Gurdwara stands as a symbol of the Guru's sacrifice and dedication to protecting religious freedom. It features traditional Sikh architecture and is an important pilgrimage site for Sikhs in the Northeast. The Gurdwara plays a vital role in preserving Sikh heritage in Assam and serves the local community with devotion.",
    contact: {
      phone: "+91 98765 10007",
      email: "dhubri@gurdwara.org"
    },
    image: "photos/gsgtbs.jpg",
    transport: {
      bus: {
        nearestBusStop: "Dhubri Bus Stand",
        busStopDistance: "2 km",
        majorRoutes: [
          { number: "5", operatedBy: "Assam State Transport", frequency: "Every 40 mins" },
          { number: "8", operatedBy: "Assam State Transport", frequency: "Every 60 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 90 mins" }
        ],
        busStandDistance: "2 km",
        estimatedBusTime: "5-10 minutes"
      },
      railway: {
        nearestStation: "Dhubri Railway Station",
        distance: "3 km",
        estimatedTime: "8-12 minutes by auto",
        majorTrains: [
          { name: "Northeast Express", from: "Kolkata", to: "Guwahati", stopTime: "18:45" },
          { name: "Brahmaputra Express", from: "Delhi", to: "Guwahati", stopTime: "06:15" },
          { name: "Local Trains", from: "New Jalpaiguri", to: "Guwahati", stopTime: "10:00" }
        ],
        ticketApproximately: "₹150-250"
      },
      airport: {
        nearestAirport: "Lokpriya Gopinath Bordoloi International Airport, Guwahati",
        distance: "230 km",
        estimatedTime: "5-6 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹2000-2500"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Bus Stand", distance: "2 km", cost: "₹30-50" },
        { type: "Taxi/Uber", from: "Guwahati", distance: "230 km", cost: "₹2000-2500" },
        { type: "Shared Jeep", from: "Bus Stand", distance: "2 km", cost: "₹20-30" },
        { type: "Car Rental", availability: "At Dhubri", cost: "₹1000-1500/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train to Dhubri + Auto Rickshaw",
        description: "Direct train to Dhubri station. Gurdwara is very close to station.",
        advantages: [
          "Train station right next to Gurdwara",
          "Affordable auto transport",
          "Good railway connectivity from Northeast India",
          "Beautiful location on Brahmaputra river"
        ],
        totalEstimatedTime: "1-2 hours",
        totalCost: "₹150-250 (train) + ₹30-50 (auto)"
      }
    }
  },
  {
    id: 17,
    name: "Gurdwara Akali Dal Gharib Nawaz",
    religion: "sikh",
    state: "Maharashtra",
    location: "Mumbai, Maharashtra, India",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    description: "Prominent Gurdwara serving the Sikh community in Mumbai.",
    history: "Gurdwara Akali Dal Gharib Nawaz is a well-known Sikh shrine in Mumbai that has been serving the community for decades. The Gurdwara provides spiritual guidance and community services to Sikhs living in the metropolitan area. It features modern facilities while maintaining traditional Sikh values and practices. The Gurdwara is known for its langar service that feeds thousands daily, embodying the Sikh principle of selfless service. Regular prayers, kirtan, and religious ceremonies are held here, making it a center of Sikh religious and cultural life in Mumbai.",
    contact: {
      phone: "+91 98765 10008",
      email: "mumbai@gurdwara.org"
    },
    image: "photos/GADGN.jpg",
    transport: {
      bus: {
        nearestBusStop: "Akali Dal Gurdwara Bus Stop",
        busStopDistance: "0.5 km",
        majorRoutes: [
          { number: "200", operatedBy: "Mumbai Transport", frequency: "Every 10 mins" },
          { number: "201", operatedBy: "Mumbai Transport", frequency: "Every 15 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 20 mins" }
        ],
        busStandDistance: "2 km",
        estimatedBusTime: "5-10 minutes"
      },
      railway: {
        nearestStation: "Mumbai Central Railway Station",
        distance: "12 km",
        estimatedTime: "30-40 minutes by metro",
        majorTrains: [
          { name: "Rajdhani Express", from: "Delhi", to: "Mumbai", stopTime: "07:20" },
          { name: "Shatabdi Express", from: "Delhi", to: "Mumbai", stopTime: "16:00" },
          { name: "Western Railways", from: "Various Cities", to: "Mumbai", stopTime: "Varies" }
        ],
        ticketApproximately: "₹300-600"
      },
      airport: {
        nearestAirport: "Indira Gandhi International Airport/Mumbai International Airport",
        distance: "15 km",
        estimatedTime: "45 minutes by taxi",
        terminals: ["Multiple Terminals"],
        taxiApproximate: "₹500-800"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "City Center", distance: "5 km", cost: "₹60-100" },
        { type: "Taxi/Uber", from: "Airport", distance: "15 km", cost: "₹500-800" },
        { type: "Metro", from: "Mumbai Metro", distance: "2 km", cost: "₹10-20" },
        { type: "Bus", from: "City Center", distance: "5 km", cost: "₹10-15" }
      ],
      recommendedRoute: {
        title: "Best Option: Flight/Train to Mumbai + Metro/Taxi",
        description: "Fly to Mumbai, use metro or taxi. Very convenient metro access in Mumbai.",
        advantages: [
          "Excellent flight and train connectivity",
          "Located in central Mumbai",
          "Metro and bus network available",
          "Multiple accommodation options nearby"
        ],
        totalEstimatedTime: "45 minutes - 1 hour",
        totalCost: "₹300-600 (train) + ₹60-100 (auto) or ₹500-800 (taxi from airport)"
      }
    }
  },
  {
    id: 18,
    name: "Jamali Kamali Mosque and Tomb",
    religion: "islam",
    state: "Delhi",
    location: "Mehrauli, Delhi, India",
    coordinates: { lat: 28.5167, lng: 77.1833 },
    description: "Historic mosque and tomb complex from the Mughal era with beautiful architecture.",
    history: "The Jamali Kamali Mosque and Tomb complex dates back to the 16th century during the Mughal period. It houses the tomb of Jamali, a Sufi saint and court poet during the reign of several Mughal emperors. The name Kamali refers to his close companion, buried in the same chamber. The mosque features beautiful Islamic architecture with intricate calligraphy, colorful tiles, and ornate decorations. The complex is known for its serene atmosphere and historical significance. The painted ceiling inside the tomb is particularly noteworthy, displaying Persian artistic influence.",
    contact: {
      phone: "+91 98765 10009",
      email: "jamalikamali@heritage.in"
    },
    image: "photos/jkm.jpg",
    transport: {
      bus: {
        nearestBusStop: "Mehrauli Bus Stop",
        busStopDistance: "1 km",
        majorRoutes: [
          { number: "505", operatedBy: "Delhi Transport", frequency: "Every 15 mins" },
          { number: "506", operatedBy: "Delhi Transport", frequency: "Every 20 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 30 mins" }
        ],
        busStandDistance: "2 km",
        estimatedBusTime: "5-10 minutes"
      },
      railway: {
        nearestStation: "Delhi Central Railway Station / New Delhi Station",
        distance: "20 km",
        estimatedTime: "45-60 minutes by metro",
        majorTrains: [
          { name: "Rajdhani Express", from: "Delhi", to: "Mumbai", stopTime: "07:20" },
          { name: "Shatabdi Express", from: "Delhi", to: "Agra", stopTime: "08:00" },
          { name: "Multiple Trains", from: "All Major Cities", to: "Delhi", stopTime: "Varies" }
        ],
        ticketApproximately: "₹10-20 (Metro)"
      },
      airport: {
        nearestAirport: "Indira Gandhi International Airport, Delhi",
        distance: "25 km",
        estimatedTime: "45 minutes by taxi",
        terminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
        taxiApproximate: "₹400-600"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Mehrauli", distance: "1 km", cost: "₹30-50" },
        { type: "Taxi/Uber", from: "Airport", distance: "25 km", cost: "₹400-600" },
        { type: "Metro", from: "Delhi Metro", distance: "5 km", cost: "₹10-20" },
        { type: "Car Rental", availability: "At airport/city", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Flight to Delhi + Metro/Taxi",
        description: "Fly to Delhi, then use metro or taxi to Mehrauli. Very convenient.",
        advantages: [
          "Excellent flight connectivity from all major cities",
          "Good metro and road connectivity",
          "Historical monument in UNESCO protected area",
          "Walking distance to other Mehrauli monuments"
        ],
        totalEstimatedTime: "1.5-2 hours",
        totalCost: "₹10-20 (metro) + ₹30-50 (auto) or ₹400-600 (taxi from airport)"
      }
    }
  },
  {
    id: 19,
    name: "Yellow Mosque",
    religion: "islam",
    state: "West Bengal",
    location: "Murshidabad, West Bengal, India",
    coordinates: { lat: 24.1833, lng: 88.2667 },
    description: "Unique yellow-colored mosque built in Bengali architectural style.",
    history: "The Yellow Mosque, also known as Khushbagh Mosque, is a distinctive structure built during the Nawabi period of Bengal. Its unique yellow color and Bengali architectural elements make it stand out among Islamic structures in India. The mosque was commissioned by the Nawabs of Bengal and served as a place of worship for the royal court. The architecture blends traditional Islamic design with local Bengali influences, creating a unique style. The mosque features beautiful minarets and a prayer hall with intricate designs. It remains an important historical monument representing Bengal's Islamic heritage.",
    contact: {
      phone: "+91 98765 10010",
      email: "yellowmosque@murshidabad.org"
    },
    image: "photos/ym.jpg",
    transport: {
      bus: {
        nearestBusStop: "Murshidabad Bus Stand",
        busStopDistance: "1 km",
        majorRoutes: [
          { number: "5", operatedBy: "West Bengal Transport", frequency: "Every 30 mins" },
          { number: "8", operatedBy: "West Bengal Transport", frequency: "Every 45 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 60 mins" }
        ],
        busStandDistance: "1 km",
        estimatedBusTime: "5-10 minutes"
      },
      railway: {
        nearestStation: "Murshidabad Railway Station",
        distance: "5 km",
        estimatedTime: "12-18 minutes by auto",
        majorTrains: [
          { name: "Howrah-Delhi Express", from: "Kolkata", to: "Delhi", stopTime: "06:00" },
          { name: "Sealdah-Malda Line", from: "Kolkata", to: "Malda", stopTime: "06:30" },
          { name: "Local Trains", from: "Kolkata", to: "Murshidabad", stopTime: "Varies" }
        ],
        ticketApproximately: "₹80-150"
      },
      airport: {
        nearestAirport: "Netaji Subhas Chandra Bose International Airport, Kolkata",
        distance: "90 km",
        estimatedTime: "2-2.5 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹900-1200"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Bus Stand", distance: "1 km", cost: "₹25-40" },
        { type: "Taxi/Uber", from: "Kolkata Airport", distance: "90 km", cost: "₹900-1200" },
        { type: "Shared Jeep", from: "Bus Stand", distance: "5 km", cost: "₹50-80" },
        { type: "Car Rental", availability: "At Murshidabad", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train from Kolkata + Auto Rickshaw",
        description: "Train from Kolkata to Murshidabad, then auto to mosque. Most budget-friendly.",
        advantages: [
          "Good railway connectivity from Kolkata",
          "Affordable train tickets",
          "Historic city with multiple monuments",
          "Stay options available in Murshidabad"
        ],
        totalEstimatedTime: "2-3 hours",
        totalCost: "₹80-150 (train) + ₹25-40 (auto)"
      }
    }
  },
  {
    id: 20,
    name: "Mohidden Mosque",
    religion: "islam",
    state: "Lakshadweep",
    location: "Kavaratti Island, Lakshadweep, India",
    coordinates: { lat: 10.5667, lng: 72.6367 },
    description: "Beautiful mosque on Kavaratti Island known for its ornate wooden carvings.",
    history: "Mohidden Mosque is one of the most beautiful mosques in Lakshadweep, located on Kavaratti Island. The mosque is famous for its intricate wooden carvings and traditional Islamic architecture adapted to the island environment. Built several centuries ago, it has been the spiritual center for the Muslim community of the islands. The mosque's interior features elaborate woodwork with detailed patterns and calligraphy. The peaceful island setting adds to the spiritual atmosphere of the mosque. It stands as a testament to the Islamic heritage of Lakshadweep and continues to serve as an important place of worship.",
    contact: {
      phone: "+91 98765 10011",
      email: "mohidden@lakshadweep.org"
    },
    image: "photos/mm.jpeg",
    transport: {
      bus: {
        nearestBusStop: "Kavaratti Island",
        busStopDistance: "0.5 km",
        majorRoutes: [
          { number: "Local Shuttle", operatedBy: "Island Transport", frequency: "Every 30 mins" },
          { number: "Shared Jeep", operatedBy: "Private Transport", frequency: "Every 45 mins" }
        ],
        busStandDistance: "0.5 km",
        estimatedBusTime: "5 minutes"
      },
      railway: {
        nearestStation: "No Railway - Island Location",
        distance: "N/A",
        estimatedTime: "N/A",
        majorTrains: [],
        ticketApproximately: "N/A"
      },
      airport: {
        nearestAirport: "Agatti Airport, Lakshadweep",
        distance: "90 km",
        estimatedTime: "4-5 hours by ferry/speedboat",
        terminals: ["Main Terminal"],
        taxiApproximate: "N/A"
      },
      localTransport: [
        { type: "Ferry/Boat", from: "Agatti Island", distance: "90 km", cost: "₹150-300" },
        { type: "Speedboat", from: "Agatti Island", distance: "90 km", cost: "₹500-700" },
        { type: "Shared Jeep", from: "Island Center", distance: "0.5 km", cost: "₹20-30" },
        { type: "Walk", from: "Island Center", distance: "0.5 km", cost: "Free" }
      ],
      recommendedRoute: {
        title: "Best Option: Flight to Agatti + Ferry to Kavaratti",
        description: "Fly to Agatti, then ferry or speedboat to Kavaratti island.",
        advantages: [
          "Island destination with unique charm",
          "Regular ferry services available",
          "Pristine island environment",
          "Direct flights from major cities to Agatti"
        ],
        totalEstimatedTime: "8-10 hours",
        totalCost: "₹2000-3000 (flight) + ₹150-700 (ferry/speedboat)"
      }
    }
  },
  {
    id: 21,
    name: "Najibabad Mosque",
    religion: "islam",
    state: "Uttar Pradesh",
    location: "Najibabad, Uttar Pradesh, India",
    coordinates: { lat: 29.6167, lng: 78.3333 },
    description: "Historic mosque with significant architectural and cultural importance.",
    history: "Najibabad Mosque is a historic Islamic shrine built during the period of Islamic rule in North India. The mosque features traditional Mughal architectural elements including domes, arches, and decorative minarets. It has served as a center of Islamic learning and worship for centuries. The mosque's design reflects the synthesis of Persian and Indian architectural styles. The complex includes a courtyard for congregational prayers and facilities for religious education. The mosque plays an important role in the religious and social life of the local Muslim community and stands as a symbol of the region's Islamic heritage.",
    contact: {
      phone: "+91 98765 10012",
      email: "najibabad@mosque.org"
    },
    image: "photos/nm.jpg",
    transport: {
      bus: {
        nearestBusStop: "Najibabad Bus Stand",
        busStopDistance: "1 km",
        majorRoutes: [
          { number: "101", operatedBy: "Uttar Pradesh Roadways", frequency: "Every 20 mins" },
          { number: "102", operatedBy: "Uttar Pradesh Roadways", frequency: "Every 30 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 45 mins" }
        ],
        busStandDistance: "1 km",
        estimatedBusTime: "5-10 minutes"
      },
      railway: {
        nearestStation: "Najibabad Railway Station",
        distance: "2 km",
        estimatedTime: "5-8 minutes by auto",
        majorTrains: [
          { name: "Delhi-Meerut Line", from: "Delhi", to: "Meerut", stopTime: "Various" },
          { name: "Local Trains", from: "Delhi", to: "Najibabad", stopTime: "Various" },
          { name: "Express Trains", from: "Delhi", to: "Saharanpur", stopTime: "Various" }
        ],
        ticketApproximately: "₹50-100"
      },
      airport: {
        nearestAirport: "Indira Gandhi International Airport, Delhi",
        distance: "100 km",
        estimatedTime: "2-2.5 hours by taxi",
        terminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
        taxiApproximate: "₹1000-1400"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Bus Stand", distance: "1 km", cost: "₹20-30" },
        { type: "Taxi/Uber", from: "Delhi Airport", distance: "100 km", cost: "₹1000-1400" },
        { type: "Local Buses", from: "Bus Stand", distance: "1 km", cost: "₹5-10" },
        { type: "Car Rental", availability: "At Najibabad", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train from Delhi + Auto Rickshaw",
        description: "Local train from Delhi to Najibabad, then short auto ride to mosque.",
        advantages: [
          "Close to Delhi (100 km)",
          "Good railway connectivity",
          "Affordable transportation",
          "Historic Islamic architecture"
        ],
        totalEstimatedTime: "2-3 hours",
        totalCost: "₹50-100 (train) + ₹20-30 (auto)"
      }
    }
  },
  {
    id: 22,
    name: "Gurudwara Nanakmatta Sahib ",
    religion: "sikh",
    state: "Uttar Pradesh",
    location: " Nanakmatta town, Udham Singh Nagar district, Uttarakhand, India",
    coordinates: { lat: 28.9409799, lng: 79.8156667 },
    description: "This is one of the rare places where Guru Nanak Dev Ji had a long spiritual dialogue with Yogis.",
    history: "Gurudwara Nanakmatta Sahib is one of the most important Sikh historical sites associated with Guru Nanak Dev Ji’s first Udasi (spiritual journey). It is located near Nanak Sagar, in district Udham Singh Nagar, Uttarakhand, Indiaa. The Gurudwara marks the place where Guru Nanak Dev Ji meditated and preached his teachings. The site has a serene environment, surrounded by lush greenery and the Nanak Sagar reservoir. The Gurudwara complex includes a main prayer hall, langar hall, and accommodations for pilgrims. It attracts thousands of devotees annually who come to pay their respects and seek spiritual solace. The Gurudwara stands as a testament to Guru Nanak Dev Ji's teachings of equality, devotion, and service.",
    contact: {
      phone: "+91-5948-241525 +91-5948-241244",
      email: "gpc@nanakmattasahib.com"
    },
    image: "photos/nmg.jpg",
    transport: {
      bus: {
        nearestBusStop: "Nanakmatta Bus Stop",
        busStopDistance: "1 km",
        majorRoutes: [
          { number: "12", operatedBy: "Uttarakhand Transport", frequency: "Every 30 mins" },
          { number: "15", operatedBy: "Uttarakhand Transport", frequency: "Every 45 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 60 mins" }
        ],
        busStandDistance: "3 km",
        estimatedBusTime: "8-15 minutes"
      },
      railway: {
        nearestStation: "Khatima Railway Station / Nanakmatta Railway Station",
        distance: "8 km",
        estimatedTime: "20-30 minutes by auto",
        majorTrains: [
          { name: "Shatabdi Express", from: "Delhi", to: "Kathgodam", stopTime: "11:40" },
          { name: "Ranikhet Express", from: "Delhi", to: "Kathgodam", stopTime: "14:30" },
          { name: "Local Trains", from: "Delhi", to: "Khatima", stopTime: "Various" }
        ],
        ticketApproximately: "₹100-200"
      },
      airport: {
        nearestAirport: "Pantnagar Airport, Uttarakhand",
        distance: "65 km",
        estimatedTime: "1.5-2 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹800-1200"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Bus Stop", distance: "1 km", cost: "₹30-50" },
        { type: "Taxi/Uber", from: "Pantnagar Airport", distance: "65 km", cost: "₹800-1200" },
        { type: "Shared Jeep", from: "Bus Stand", distance: "3 km", cost: "₹50-80" },
        { type: "Car Rental", availability: "At Nanakmatta", cost: "₹900-1300/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train to Khatima/Nanakmatta + Auto Rickshaw",
        description: "Train to Khatima or Nanakmatta station, then short auto to Gurudwara.",
        advantages: [
          "Good railway connectivity from Delhi",
          "Scenic location near Nanak Sagar reservoir",
          "Gurdwara has good accommodation facilities",
          "Affordable local transport"
        ],
        totalEstimatedTime: "2-3 hours",
        totalCost: "₹100-200 (train) + ₹30-50 (auto)"
      }
    }
  },
  {
    id: 23,
    name: "Hastinapur jain temple",
    religion: "jain",
    state: "Uttar Pradesh",
    location: "Hastinapur, Uttar Pradesh 250404, India",
    coordinates: { lat:  29.161389, lng: 78.006556},
    description: "The Shri Digambar Jain Prachin Bada Mandir, located in Hastinapur, Uttar Pradesh, is the most ancient and significant Jain temple complex in the area, serving as the central hub for Digambar Jain pilgrims.",
    history: "Hastinapur holds immense religious significance in Jainism as the birthplace of three Tirthankaras: Shantinath, Kunthunath, and Aranath. The Shri Digambar Jain Prachin Bada Mandir is the most prominent temple in Hastinapur, known for its ancient architecture and intricate carvings. The temple complex includes several smaller shrines dedicated to various Tirthankaras and is a center for Jain worship and pilgrimage. The serene environment and spiritual ambiance make it a revered destination for Jain devotees from across India.",
    contact: {
      phone: "manager:- mukesh jain (09412551909)",
      email: "jaintirthtourism@gmail.com "
    },
    image: "photos/hp8.jpg",
    galleryPhotoPrefix: "hp",
    transport: {
      bus: {
        nearestBusStop: "Hastinapur Bus Stand",
        busStopDistance: "2 km",
        majorRoutes: [
          { number: "50", operatedBy: "Uttar Pradesh Roadways", frequency: "Every 20 mins" },
          { number: "51", operatedBy: "Uttar Pradesh Roadways", frequency: "Every 30 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 45 mins" }
        ],
        busStandDistance: "2 km",
        estimatedBusTime: "5-10 minutes"
      },
      railway: {
        nearestStation: "Hastinapur Railway Station",
        distance: "3 km",
        estimatedTime: "8-12 minutes by auto",
        majorTrains: [
          { name: "Shatabdi Express", from: "Delhi", to: "Ghaziabad", stopTime: "08:20" },
          { name: "Local Trains", from: "Delhi", to: "Meerut", stopTime: "Various" },
          { name: "Intercity Trains", from: "Delhi", to: "Hastinapur", stopTime: "Various" }
        ],
        ticketApproximately: "₹40-80"
      },
      airport: {
        nearestAirport: "Indira Gandhi International Airport, Delhi",
        distance: "100 km",
        estimatedTime: "2-2.5 hours by taxi",
        terminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
        taxiApproximate: "₹1000-1400"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Station", distance: "3 km", cost: "₹40-60" },
        { type: "Taxi/Uber", from: "Delhi Airport", distance: "100 km", cost: "₹1000-1400" },
        { type: "Shared Jeep", from: "Bus Stand", distance: "2 km", cost: "₹30-50" },
        { type: "Car Rental", availability: "At Hastinapur", cost: "₹800-1200/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train from Delhi + Auto Rickshaw",
        description: "Direct train to Hastinapur from Delhi, then short auto ride to temple.",
        advantages: [
          "Close to Delhi (100 km)",
          "Direct train connectivity",
          "Important Jain pilgrimage site",
          "Affordable transportation"
        ],
        totalEstimatedTime: "1.5-2 hours",
        totalCost: "₹40-80 (train) + ₹40-60 (auto)"
      }
    }
  },
  {
    id: 24,
    name: "sonagiriji jain temple",
    religion: "jain",
    state: "Madhya Pradesh",
    location: "Sonagiri (Sinawal), Datia District, Madhya Pradesh, India, 475685. It is approximately 70 km from Gwalior and 15 km from Datia town.",
    coordinates: { lat:   25.72, lng: 78.38},
    description: "The Sonagiri Jain Temple is a major pilgrimage site in Datia, Madhya Pradesh, known for its complex of over 100 striking white Jain temples perched on a hill",
    history: "Sonagiri is a significant Jain pilgrimage site in Madhya Pradesh, India, near Datia, notable for its large number of temples on a hill. It is considered a holy place where many ascetics have attained liberation, and it features 77 temples on the hill and 26–31 in the village below. The temples are dedicated to various Tirthankaras, with the main temple housing an idol of Rishabhanatha. The site is known for its serene atmosphere and beautiful architecture, attracting Jain devotees from across the country. The annual fair during Mahavir Jayanti is a major event, drawing thousands of pilgrims.",
    contact: {
      phone: "+91-8827417276 or +91-8602363166",
      email: "kahannagarsonagir@gmail.com "
    },
    image: "photos/sng4.jpg",
    galleryPhotoPrefix: "sng",
    transport: {
      bus: {
        nearestBusStop: "Sonagiri Bus Stop",
        busStopDistance: "1 km",
        majorRoutes: [
          { number: "60", operatedBy: "Madhya Pradesh Roadways", frequency: "Every 30 mins" },
          { number: "61", operatedBy: "Madhya Pradesh Roadways", frequency: "Every 45 mins" },
          { number: "Private", operatedBy: "Private Transport", frequency: "Every 60 mins" }
        ],
        busStandDistance: "8 km",
        estimatedBusTime: "15-20 minutes"
      },
      railway: {
        nearestStation: "Datia Railway Station",
        distance: "15 km",
        estimatedTime: "30-40 minutes by taxi",
        majorTrains: [
          { name: "Shatabdi Express", from: "Delhi", to: "Gwalior", stopTime: "08:30" },
          { name: "Tamil Nadu Express", from: "Delhi", to: "Chennai", stopTime: "16:40" },
          { name: "Express Trains", from: "Delhi", to: "Datia", stopTime: "Various" }
        ],
        ticketApproximately: "₹80-150"
      },
      airport: {
        nearestAirport: "Gwalior Airport",
        distance: "40 km",
        estimatedTime: "1.5 hours by taxi",
        terminals: ["Main Terminal"],
        taxiApproximate: "₹600-800"
      },
      localTransport: [
        { type: "Auto Rickshaw", from: "Datia Station", distance: "15 km", cost: "₹150-200" },
        { type: "Taxi/Uber", from: "Gwalior Airport", distance: "40 km", cost: "₹600-800" },
        { type: "Shared Jeep", from: "Bus Stand", distance: "8 km", cost: "₹80-100" },
        { type: "Car Rental", availability: "At Datia/Gwalior", cost: "₹900-1300/day" }
      ],
      recommendedRoute: {
        title: "Best Option: Train to Datia + Taxi",
        description: "Train from Delhi to Datia, then taxi to Sonagiri temple complex.",
        advantages: [
          "Good train connectivity from Delhi/Agra",
          "Major Jain pilgrimage site",
          "Scenic hill location",
          "Can combine with Gwalior Fort nearby"
        ],
        totalEstimatedTime: "2-3 hours",
        totalCost: "₹80-150 (train) + ₹150-200 (taxi)"
      }
    }
  }
];

// Gallery images organized by temple prefix - makes it easier to add images
export const templeGalleries = {
  kp: [
    { filename: "kp4.jpg", alt: "Jain Temple Architecture", title: "Intricate Jain Temple Carvings" },
    { filename: "kp3.jpeg", alt: "Hilltop Temple", title: "Temples in the Hills" },
    { filename: "kp11.jpg", alt: "Hilltop view of Temple", title: "Bade Baba Jain Mandir" },
    { filename: "kp9.jpg", alt: "Amazing Temple", title: "Kundalpur" },
    { filename: "kp1.jpg", alt: "Temple Exterior", title: "Bade Baba Temple View" }
  ],
  mt: [
    { filename: "mt1.jpg", alt: "Mountain Temple View", title: "Temples on Sacred Mountains" },
    { filename: "mt4.jpeg", alt: "Mountain Peak", title: "Mangi Tungi Peak" },
    { filename: "mt6.jpg", alt: "Twin Mountains", title: "Twin Sacred Peaks" }
  ],
  br: [
    { filename: "br1.jpg", alt: "Hindu Temple Structure", title: "Traditional Hindu Architecture" },
    { filename: "br4.jpg", alt: "Temple Complex", title: "Historic Temple Complex" }
  ],
  gt: [
    { filename: "gt.jpg", alt: "Temple at Sunrise", title: "Golden Hour at Sacred Sites" }
  ],
  gp: [
    { filename: "gp3.jpg", alt: "Mountain Temple", title: "Girnar Temple Views" },
    { filename: "gp1.jpg", alt: "Temple Stairs", title: "Ancient Temple Steps" },
    { filename: "gp4.jpg", alt: "Temple Architecture", title: "Girnar Temple Design" },
    { filename: "gp6.jpg", alt: "Summit View", title: "Temple Summit Views" }
  ],
  pj: [
    { filename: "pj.jpeg", alt: "Hilltop Temple", title: "Hastagiri Temple" }
  ],
  mg: [
    { filename: "mg2.jpg", alt: "Temple on Hill", title: "Muktagiri Hill Temple" }
  ],
  ssmt: [
    { filename: "ssmt.jpeg", alt: "Coastal Temple", title: "Temples by the Sea" },
    { filename: "ssmt1.jpg", alt: "Tidal Temple", title: "Submerged Temple View" }
  ],
  makt: [
    { filename: "makt.png", alt: "Shakti Peeth", title: "Kamakhya Temple" }
  ],
  kbt: [
    { filename: "kbt.jpg", alt: "Kaal Bhairav Temple", title: "Ancient Bhairav Shrine" },
    { filename: "kbt2.png", alt: "Kaal Bhairav Temple View", title: "Temple Photography" }
  ],
  hp: [
    { filename: "hp8.jpg", alt: "Jain Temple Complex", title: "Hastinapur Temple" },
    { filename: "hp1.jpg", alt: "Temple Structure", title: "Ancient Jain Temple" },
    { filename: "hp3.jpg", alt: "Temple Details", title: "Intricate Carvings" },
    { filename: "hp4.jpg", alt: "Temple Courtyard", title: "Temple Complex" },
    { filename: "hp5.jpeg", alt: "Temple Entrance", title: "Main Temple Gate" },
    { filename: "hp6.jpg", alt: "Temple Dome", title: "Architectural Dome" },
    { filename: "hp7.jpg", alt: "Temple Interior", title: "Sacred Interior" },
    { filename: "hp9.jpg", alt: "Temple Art", title: "Artistic Elements" },
    { filename: "hp10.jpg", alt: "Temple View", title: "Overall View" }
  ],
  sng: [
    { filename: "sng4.jpg", alt: "Sonagiri Temple", title: "Sonagiri Jain Temple" },
    { filename: "sng1.jpg", alt: "Temple Complex", title: "Temple Complex View" },
    { filename: "sng2.jpg", alt: "Sacred Mountain", title: "Temple Mountain" },
    { filename: "sng3.jpg", alt: "Temple Architecture", title: "Temple Design" },
    { filename: "sng5.jpg", alt: "Temple Steps", title: "Temple Stairway" },
    { filename: "sng6.jpg", alt: "Temple Details", title: "Architectural Details" },
    { filename: "sng7.jpg", alt: "Temple Dome", title: "Temple Dome" },
    { filename: "sng8.jpg", alt: "Temple Stairs", title: "Sacred Stairway" },
    { filename: "sng9.jpg", alt: "Temple View", title: "Temple Overview" },
    { filename: "sng10.jpg", alt: "Temple Site", title: "Site View" }
  ],
  g: [
    { filename: "g.jpg", alt: "Gurdwara Architecture", title: "Sikh Gurdwara Design" }
  ],
  ms: [
    { filename: "ms.jpg", alt: "Mosque Structure", title: "Islamic Architectural Beauty" }
  ],
  khaj: [
    { filename: "khaj.jpg", alt: "Ancient Temple Ruins", title: "Preserved Ancient Temples" }
  ],
  nm: [
    { filename: "nm.jpg", alt: "Historic Mosque", title: "Najibabad Mosque" },
    { filename: "nmg.jpg", alt: "Gurudwara View", title: "Nanakmatta Gurudwara" }
  ]
};

// Helper function: Generates gallery images array from templeGalleries
function generateGalleryImages() {
  let id = 1;
  const allImages = [];
  
  for (const prefix in templeGalleries) {
    const photos = templeGalleries[prefix];
    photos.forEach(photo => {
      allImages.push({
        id: id++,
        src: `photos/${photo.filename}`,
        alt: photo.alt,
        title: photo.title
      });
    });
  }
  
  return allImages;
}

export const galleryImages = generateGalleryImages();
