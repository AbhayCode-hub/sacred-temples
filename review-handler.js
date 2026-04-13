// Review System - Firebase Integration
import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  updateDoc,
  doc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import { uploadToCloudinary } from './cloudinary-upload.js';

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate review text
 */
export function isValidReview(text) {
  return text && text.trim().length >= 10 && text.trim().length <= 5000;
}

/**
 * Submit a new review with images
 */
export async function submitReview(templeId, reviewData, imageFiles = []) {
  try {
    // Validate inputs
    if (!reviewData.userName || reviewData.userName.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }

    if (!isValidEmail(reviewData.email)) {
      throw new Error('Please enter a valid email address');
    }

    if (!isValidReview(reviewData.text)) {
      throw new Error('Review must be between 10 and 5000 characters');
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    if (imageFiles.length > 3) {
      throw new Error('Maximum 3 images allowed per review');
    }

    // Upload images to Cloudinary
    const imageUrls = [];
    for (const file of imageFiles) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error(`Image "${file.name}" is too large (max 5MB)`);
      }

      const result = await uploadToCloudinary(file, `reviews/temple${templeId}`);
      if (result.success) {
        imageUrls.push({
          url: result.url,
          publicId: result.publicId,
          uploadedAt: new Date().toISOString()
        });
      } else {
        throw new Error(`Failed to upload image: ${file.name}`);
      }
    }

    // Add review to Firestore
    const reviewsCollection = collection(db, `temples/${templeId}/reviews`);
    
    const reviewDoc = await addDoc(reviewsCollection, {
      userName: reviewData.userName.trim(),
      email: reviewData.email.trim(),
      rating: parseInt(reviewData.rating),
      text: reviewData.text.trim(),
      images: imageUrls,
      timestamp: Timestamp.now(),
      status: 'pending', // Awaiting admin approval
      likes: 0,
      userLikes: [], // Track which users liked this review
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    console.log('✅ Review submitted successfully:', reviewDoc.id);
    return {
      success: true,
      reviewId: reviewDoc.id,
      message: 'Thank you! Your review is pending approval and will appear soon.'
    };
  } catch (error) {
    console.error('❌ Error submitting review:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Fetch approved reviews for a temple
 */
export async function fetchReviews(templeId, sortBy = 'helpful', pageSize = 5) {
  try {
    const reviewsCollection = collection(db, `temples/${templeId}/reviews`);
    
    // Build query with filters
    let q;
    if (sortBy === 'helpful') {
      q = query(
        reviewsCollection,
        where('status', '==', 'approved'),
        orderBy('likes', 'desc'),
        orderBy('timestamp', 'desc'),
        limit(pageSize)
      );
    } else if (sortBy === 'newest') {
      q = query(
        reviewsCollection,
        where('status', '==', 'approved'),
        orderBy('timestamp', 'desc'),
        limit(pageSize)
      );
    } else if (sortBy === 'highest') {
      q = query(
        reviewsCollection,
        where('status', '==', 'approved'),
        orderBy('rating', 'desc'),
        orderBy('timestamp', 'desc'),
        limit(pageSize)
      );
    }

    const snapshot = await getDocs(q);
    const reviews = [];

    snapshot.forEach(doc => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().createdAt)
      });
    });

    return reviews;
  } catch (error) {
    console.error('❌ Error fetching reviews:', error);
    return [];
  }
}

/**
 * Get count of approved reviews
 */
export async function getReviewCount(templeId) {
  try {
    const reviewsCollection = collection(db, `temples/${templeId}/reviews`);
    const q = query(reviewsCollection, where('status', '==', 'approved'));
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('Error getting review count:', error);
    return 0;
  }
}

/**
 * Get average rating for a temple
 */
export async function getAverageRating(templeId) {
  try {
    const reviewsCollection = collection(db, `temples/${templeId}/reviews`);
    const q = query(reviewsCollection, where('status', '==', 'approved'));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return 0;

    let totalRating = 0;
    snapshot.forEach(doc => {
      totalRating += doc.data().rating || 0;
    });

    return (totalRating / snapshot.size).toFixed(1);
  } catch (error) {
    console.error('Error getting average rating:', error);
    return 0;
  }
}

/**
 * Like/unlike a review
 */
export async function toggleLikeReview(templeId, reviewId, userId) {
  try {
    const reviewRef = doc(db, `temples/${templeId}/reviews`, reviewId);
    const reviewSnap = await getDocs(collection(db, `temples/${templeId}/reviews`));
    
    let review = null;
    reviewSnap.forEach(doc => {
      if (doc.id === reviewId) {
        review = { id: doc.id, ...doc.data() };
      }
    });

    if (!review) {
      throw new Error('Review not found');
    }

    const userLikes = review.userLikes || [];
    const hasLiked = userLikes.includes(userId);

    if (hasLiked) {
      // Unlike
      await updateDoc(reviewRef, {
        likes: Math.max(0, (review.likes || 0) - 1),
        userLikes: userLikes.filter(id => id !== userId)
      });
    } else {
      // Like
      await updateDoc(reviewRef, {
        likes: (review.likes || 0) + 1,
        userLikes: [...userLikes, userId]
      });
    }

    return { success: true, liked: !hasLiked };
  } catch (error) {
    console.error('Error liking review:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get rating distribution for a temple
 */
export async function getRatingDistribution(templeId) {
  try {
    const reviewsCollection = collection(db, `temples/${templeId}/reviews`);
    const q = query(reviewsCollection, where('status', '==', 'approved'));
    const snapshot = await getDocs(q);

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    snapshot.forEach(doc => {
      const rating = doc.data().rating || 0;
      if (distribution.hasOwnProperty(rating)) {
        distribution[rating]++;
      }
    });

    return distribution;
  } catch (error) {
    console.error('Error getting rating distribution:', error);
    return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  }
}

/**
 * Fetch pending reviews for admin approval
 */
export async function fetchPendingReviews() {
  try {
    const temples = await getDocs(collection(db, 'temples'));
    const pendingReviews = [];

    for (const templeDoc of temples.docs) {
      const templeId = templeDoc.id;
      const reviewsCollection = collection(db, `temples/${templeId}/reviews`);
      const q = query(reviewsCollection, where('status', '==', 'pending'));
      const snapshot = await getDocs(q);

      snapshot.forEach(doc => {
        pendingReviews.push({
          id: doc.id,
          templeId: templeId,
          templeName: templeDoc.data().name || 'Unknown Temple',
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().createdAt)
        });
      });
    }

    // Sort by newest first
    return pendingReviews.sort((a, b) => {
      const dateA = new Date(a.timestamp || a.createdAt);
      const dateB = new Date(b.timestamp || b.createdAt);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('❌ Error fetching pending reviews:', error);
    return [];
  }
}

/**
 * Approve a review
 */
export async function approveReview(templeId, reviewId) {
  try {
    const reviewRef = doc(db, `temples/${templeId}/reviews`, reviewId);
    await updateDoc(reviewRef, {
      status: 'approved',
      updatedAt: new Date().toISOString()
    });
    console.log('✅ Review approved:', reviewId);
    return { success: true, message: 'Review approved successfully!' };
  } catch (error) {
    console.error('❌ Error approving review:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Reject/delete a review
 */
export async function rejectReview(templeId, reviewId) {
  try {
    const reviewRef = doc(db, `temples/${templeId}/reviews`, reviewId);
    await updateDoc(reviewRef, {
      status: 'rejected',
      updatedAt: new Date().toISOString()
    });
    console.log('✅ Review rejected:', reviewId);
    return { success: true, message: 'Review rejected successfully!' };
  } catch (error) {
    console.error('❌ Error rejecting review:', error);
    return { success: false, error: error.message };
  }
}
