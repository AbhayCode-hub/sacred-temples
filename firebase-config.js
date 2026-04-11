// Firebase Configuration
// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your web app's Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBtToGx-c7ELLhXXBg_F9K0YGKLsc-JObE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sacred-temples.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sacred-temples",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sacred-temples.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "756850869278",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:756850869278:web:656eb42906c888ad309a0f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-YMBPSQ532K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
