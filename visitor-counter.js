// Visitor Counter using Firebase Firestore
import { db } from './firebase-config.js';
import { 
  doc, 
  getDoc, 
  updateDoc, 
  setDoc, 
  increment 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const COUNTER_DOC = 'stats/visitor_count';
const CACHE_DURATION = 30000; // Cache for 30 seconds

let cachedCount = null;
let lastFetchTime = 0;

/**
 * Increment visitor count and return updated count
 */
export async function incrementVisitorCount() {
  try {
    const docRef = doc(db, COUNTER_DOC);
    
    // Get current doc
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Document exists, increment
      await updateDoc(docRef, {
        count: increment(1),
        lastUpdated: new Date().toISOString(),
        lastIP: await getClientIP()
      });
    } else {
      // Create new document
      await setDoc(docRef, {
        count: 1,
        lastUpdated: new Date().toISOString(),
        lastIP: await getClientIP()
      });
    }
    
    // Clear cache to force fresh fetch
    cachedCount = null;
    lastFetchTime = 0;
    
    return getVisitorCount();
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return null;
  }
}

/**
 * Get current visitor count from Firestore
 */
export async function getVisitorCount() {
  try {
    const now = Date.now();
    
    // Return cached count if still valid
    if (cachedCount !== null && (now - lastFetchTime) < CACHE_DURATION) {
      return cachedCount;
    }
    
    const docRef = doc(db, COUNTER_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      cachedCount = docSnap.data().count || 0;
      lastFetchTime = now;
      return cachedCount;
    }
    
    return 0;
  } catch (error) {
    console.error('Error getting visitor count:', error);
    return null;
  }
}

/**
 * Display visitor count in the footer
 */
export async function displayVisitorCount(elementId = 'visitor-count') {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }
  
  // Show loading state
  element.textContent = 'Loading...';
  element.style.opacity = '0.6';
  
  try {
    console.log('🔄 Initializing visitor counter...');
    
    // Test Firebase connection
    const docRef = doc(db, COUNTER_DOC);
    console.log('✅ Firebase initialized');
    console.log('📍 Counter path:', COUNTER_DOC);
    
    // Increment count on page load
    console.log('📝 Incrementing visitor count...');
    await incrementVisitorCount();
    console.log('✅ Count incremented');
    
    // Get and display count
    const count = await getVisitorCount();
    console.log('📊 Current count:', count);
    
    if (count !== null && count > 0) {
      element.textContent = `Total Visitors: ${formatNumber(count)}`;
      element.style.opacity = '1';
      console.log('✅ Visitor counter displayed successfully');
      
      // Add animation
      element.style.transition = 'opacity 0.3s ease-in-out';
    } else {
      element.textContent = 'No visitor data yet';
      element.style.opacity = '0.7';
      console.warn('⚠️ Count is null or 0:', count);
    }
  } catch (error) {
    console.error('❌ Error displaying visitor count:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    element.textContent = `Visitor count unavailable (${error.code || 'unknown error'})`;
    element.style.opacity = '0.5';
    element.style.fontSize = '0.9rem';
  }
}

/**
 * Format number with commas (e.g., 1,234)
 */
function formatNumber(num) {
  if (num === null) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get client IP (for tracking - optional)
 */
async function getClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json', { timeout: 2000 });
    const data = await response.json();
    return data.ip || 'unknown';
  } catch (error) {
    return 'unknown';
  }
}

// Auto-initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    displayVisitorCount();
  });
} else {
  displayVisitorCount();
}
