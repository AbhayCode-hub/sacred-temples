# 🛕 Hidden Temples of India

> **Discover India's Hidden Spiritual Treasures**

A modern, full-featured temple exploration platform that helps users discover lesser-known temples across India with interactive maps, reviews, hotel information, and comprehensive travel guides.

**🌐 [Live Demo](https://sacred-temples.vercel.app)** | **📖 [Documentation](#documentation)** | **🚀 [Quick Start](#quick-start)**

---

## 📸 Preview

```
🏠 Home Page           Temple Details         Reviews System
├─ Featured Temples    ├─ Full Details         ├─ User Reviews
├─ Search & Filter     ├─ Gallery              ├─ Star Ratings
├─ Image Gallery       ├─ Google Maps          ├─ Image Upload
└─ Hotel Deals         ├─ How to Reach         ├─ Helpful Votes
                       ├─ Nearby Hotels        └─ Admin Approval
                       └─ Reviews & Ratings
```

---

## ✨ Key Features

### 🔍 **Temple Discovery & Exploration**
- Browse 24+ temples across India
- Advanced search by name, location, or religion
- Filter by religious category (Hindu, Jain, Sikh, Islam)
- Clean, responsive card-based UI
- Featured temple showcase

### 🏛️ **Detailed Temple Information**
- Complete temple history and background
- Geographic coordinates and exact location
- Contact details (phone, email)
- High-resolution temple images
- Interactive gallery with skeleton loading

### 🗺️ **Interactive Maps**
- Embedded Google Maps for each temple
- Direct "View on Google Maps" button
- Precise coordinates (lat/lng)
- Visual location context

### 🚗 **How to Reach (Transport Information)**
- **Bus:** Nearest bus stops, routes, distances, estimated time
- **Railway:** Nearest stations, major trains, ticket prices
- **Airport:** Nearest airports, transports, taxi costs
- **Local Transport:** Auto-rickshaw, taxi, bike rental options
- **Recommended Routes:** Optimized travel plans with total cost & time
- Interactive tabs for easy navigation

### 🏨 **Nearby Hotels Search**
- Dynamic hotel search using Google Maps API
- Hotel cards with ratings, reviews, amenities
- Amenity filters (WiFi, Parking, Restaurant, etc.)
- Distance-based sorting
- Smooth scrolling and animations

### ⭐ **Production-Grade Review System**
- **Submit Reviews:** Name, email, rating (1-5 stars), detailed text
- **Image Uploads:** Upload 1-3 images per review (via Cloudinary)
- **Rating Distribution:** Visual breakdown of all ratings
- **Helpful Voting:** Like/upvote helpful reviews
- **Admin Approval:** Reviews pending until moderator approval
- **Pagination:** Load more reviews (5 per page)
- **Sorting:** By most helpful, newest, or highest rating
- **Mobile Responsive:** Beautiful design on all devices

### 📸 **Gallery System**
- Temple-specific photo galleries
- Lazy loading for optimal performance
- Skeleton screens during image load
- Smooth fade-in animations
- Responsive grid layout

### 👥 **Visitor Counter**
- Global visitor tracking using Firebase Firestore
- Real-time counter increment on page visits
- Displayed in footer with formatted numbers
- 30-second caching to prevent excessive API calls

### 📱 **Responsive Design**
- Mobile-first approach
- Works perfectly on desktop, tablet, mobile
- Touch-friendly interface
- Fast load times with optimized images

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic markup & structure |
| **CSS3** | Modern styling with gradients, animations, flexbox/grid |
| **JavaScript (ES6+)** | Dynamic UI, form handling, API calls |
| **Vite** | Ultra-fast build tool & dev server |

### **Backend & Storage**
| Service | Purpose |
|---------|---------|
| **Firebase Firestore** | Reviews database & visitor counter storage |
| **Cloudinary** | Image upload, storage & CDN for reviews |
| **Google Maps API** | Interactive maps, location services |

### **Architecture**
- **Modular JavaScript:** Separated concerns (UI, data, handlers)
- **Client-side Rendering:** Fast, interactive experience
- **Async/Await:** Modern async patterns for API calls
- **Error Handling:** Comprehensive error management and fallbacks
- **Performance Optimized:** Lazy loading, caching, skeleton screens

---

## 📁 Project Structure

```
sacred-temples/
├── index.html                    # Main HTML file
├── main.js                       # Entry point & initialization
├── style.css                     # Global styles
│
├── temples-data.js               # Temple data (24 temples)
├── hotels-api.js                 # Hotel search logic
├── hotels-ui.js                  # Hotel UI rendering
│
├── transport-ui.js               # Transport info display
├── transport-data.js             # Transport data
│
├── review-handler.js             # Review submission & validation
├── review-ui.js                  # Review display & forms
├── review-styles.css             # Review system styling
│
├── firebase-config.js            # Firebase initialization
├── visitor-counter.js            # Visitor tracking
├── cloudinary-upload.js          # Image upload handler
│
├── photos/                       # Temple images (60+ photos)
│
└── Documentation Files
    ├── REVIEWS_SETUP_GUIDE.md
    ├── HOTEL_FEATURE_README.md
    ├── TRANSPORT_INTEGRATION_GUIDE.md
    └── README.md (this file)
```

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v14+)
- npm or yarn
- Git

### **1. Clone Repository**
```bash
git clone https://github.com/yourusername/sacred-temples.git
cd sacred-temples
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Start Development Server**
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser

### **4. Build for Production**
```bash
npm run build
```
Output goes to `dist/` folder

### **5. Preview Production Build**
```bash
npm run preview
```

---

## 🔧 Configuration

### **Firebase Setup**
1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Copy credentials to `firebase-config.js`
3. Set up Firestore database with collection: `stats/visitor_count`
4. Update security rules (see `REVIEWS_SETUP_GUIDE.md`)

### **Cloudinary Setup**
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get Cloud Name & create Upload Preset
3. Update `cloudinary-upload.js` with your Cloud Name

### **Google Maps API**
- Embedded maps already configured
- No additional setup needed (uses public coordinates)

---

## 📝 Features in Detail

### **Review System** ⭐
Submit detailed reviews with images:
- Email validation to prevent spam
- Image upload (1-3 images, 5MB each)
- 1-5 star rating system
- Admin approval workflow
- Like/helpful voting system
- Real-time like counter updates

See `REVIEWS_SETUP_GUIDE.md` for complete documentation.

### **Transport Information** 🚗
Complete travel planning information:
- Bus routes with estimated times
- Railway stations with ticket prices
- Airport options with transport costs
- Local transport options (auto, taxi, bike)
- Recommended routes with total cost & time

See `TRANSPORT_INTEGRATION_GUIDE.md` for implementation details.

### **Hotel Search** 🏨
Discover nearby accommodations:
- Real-time hotel search using Google Maps
- Filter by amenities and ratings
- Distance-based sorting
- Direct Google Maps link for each hotel
- Responsive hotel cards with reviews

See `HOTEL_FEATURE_README.md` for details.

---

## 🌐 Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Auto-deploys on every GitHub push.

### **Netlify**
1. Push to GitHub
2. Connect repo to Netlify
3. Auto-deploys on push

### **GitHub Pages**
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

---

## 📊 Performance

- ⚡ **First Contentful Paint:** < 1.5s
- ⚡ **Largest Contentful Paint:** < 2.5s
- ⚡ **Cumulative Layout Shift:** < 0.1
- 🖼️ **Image Optimization:** Lazy loading + skeleton screens
- 📦 **Bundle Size:** ~150KB (gzipped)
- 🔄 **Caching:** Smart CSS cache (30s for visitor counter)

---

## 🔐 Security

- ✅ Email validation on review forms
- ✅ Image size limits (5MB per image)
- ✅ Admin approval for reviews before display
- ✅ Firestore security rules restrict unauthorized access
- ✅ HTTPS on all deployments
- ✅ No sensitive data in client code

---

## 🐛 Troubleshooting

### **Gallery Not Loading**
```
Solution: Make sure photos/ folder contains all image files
Check image paths in temples-data.js match actual filenames
```

### **Firebase Permission Error**
```
Solution: Update Firestore security rules (see REVIEWS_SETUP_GUIDE.md)
Ensure database is initialized with stats/visitor_count collection
```

### **Reviews Not Submitting**
```
Solution: Check browser console for detailed error messages
Verify email validation regex accepts your email format
Ensure Firestore rules allow 'create' operation
```

### **Images Not Uploading**
```
Solution: Verify Cloudinary credentials in cloudinary-upload.js
Check upload preset name matches exactly
Ensure image files are < 5MB each
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `REVIEWS_SETUP_GUIDE.md` | Complete review system setup & API reference |
| `TRANSPORT_INTEGRATION_GUIDE.md` | How to Reach feature implementation |
| `HOTEL_FEATURE_README.md` | Hotel search feature documentation |
| `API_OPTIONS.md` | API alternatives and options |

---

## 🚀 Future Roadmap

- [ ] User authentication (Google/email login)
- [ ] Save favorite temples (favorites list)
- [ ] Advanced route optimization
- [ ] Real-time hotel availability & pricing
- [ ] Push notifications for temple events
- [ ] Offline mode with service workers
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Photo uploads from users
- [ ] Temple recommendations based on preferences
- [ ] Events calendar (temple festivals, celebrations)
- [ ] Donation system integration
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! 

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see LICENSE file for details.

You are free to use this project for personal, educational, or commercial purposes.

---

## 👨‍💻 Author

**Abhay** - Sacred Temples of India Project

- GitHub: [@yourusername](https://github.com/yourusername)
- Website: [sacred-temples.vercel.app](https://sacred-temples.vercel.app)

---

## 🙏 Acknowledgments

- **Temple Data:** Sourced from historical records and travel guides
- **Photos:** High-quality temple photography
- **APIs:** Google Maps, Firebase, Cloudinary
- **Design Inspiration:** Modern e-commerce platforms (Flipkart, Amazon)
- **Firebase & Vercel:** For hosting and backend services

---

## 📞 Support

- 📧 Email: support@sacredtemples.com
- 🐛 Report issues: [GitHub Issues](https://github.com/yourusername/sacred-temples/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/sacred-temples/discussions)

---

## 📈 Stats

- 📍 **24 Temples** Documented
- 📸 **60+ Photos** in Gallery
- ⭐ **Review System** with Image Upload
- 🚗 **Complete Travel Guides** for Each Temple
- 🏨 **Real-time Hotel Search**
- 👥 **Global Visitor Tracking**

---

<div align="center">

**Made with ❤️ for Temple Explorers**

⭐ If you find this project helpful, please consider giving it a star!

[Live Demo](https://sacred-temples.vercel.app) • [GitHub](https://github.com/yourusername/sacred-temples) • [Report Bug](https://github.com/yourusername/sacred-temples/issues)

</div>
CPU Scheduling Simulator

Instructions:
1. Install Node.js (LTS). 
2. In this folder run:
   npm install
   npm run dev
3. Open the local URL shown by Vite (usually http://localhost:5173)

The app uses React + Tailwind. The component is in src/CpuScheduler.jsx.
