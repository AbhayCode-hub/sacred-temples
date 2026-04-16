import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
    getFirestore,
    collection,
    collectionGroup,   // ← KEY FIX: query across all 'reviews' subcollections
    getDocs,
    query,
    where,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBtToGx-c7ELLhXXBg_F9K0YGKLsc-JObE",
    authDomain: "sacred-temples.firebaseapp.com",
    projectId: "sacred-temples",
    storageBucket: "sacred-temples.firebasestorage.app",
    messagingSenderId: "756850869278",
    appId: "1:756850869278:web:656eb42906c888ad309a0f",
    measurementId: "G-YMBPSQ532K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentFilter = 'pending';
let allReviews = [];
let isAuthenticated = false;

// ─────────────────────────────────────────────────────────────────────────────
// FIX 1: Use collectionGroup('reviews') instead of iterating temple documents.
//
// The old approach called getDocs(collection(db, 'temples')) and looped over
// results. But Firestore does NOT return "ghost" documents — documents that
// have subcollections but no fields of their own. Those show the warning:
//   "This document does not exist, it will not appear in queries or snapshots."
//
// collectionGroup('reviews') queries ALL subcollections named 'reviews' across
// the entire database, regardless of whether parent documents exist.
//
// NOTE: collectionGroup queries require a Firestore index.
// If you see a "requires an index" error in the console, click the link in the
// error message to create it automatically in the Firebase Console, OR go to:
//   Firebase Console → Firestore → Indexes → Composite → Add index
//   Collection group: reviews | Field: status (Ascending) | Query scope: Collection group
// ─────────────────────────────────────────────────────────────────────────────
async function fetchReviewsByStatus(status) {
    try {
        const q = query(
            collectionGroup(db, 'reviews'),
            where('status', '==', status)
        );
        const snapshot = await getDocs(q);
        const reviews = [];

        for (const d of snapshot.docs) {
            // d.ref.parent.parent is the temple document reference
            const templeRef = d.ref.parent.parent;
            let templeName = 'Unknown Temple';

            try {
                const templeSnap = await getDocs(
                    query(collection(db, 'temples'), where('__name__', '==', templeRef.id))
                );
                if (!templeSnap.empty) {
                    templeName = templeSnap.docs[0].data().name || `Temple ${templeRef.id}`;
                }
            } catch (_) {
                // Temple doc may not exist — use fallback name
                templeName = `Temple ${templeRef.id}`;
            }

            reviews.push({
                id: d.id,
                templeId: templeRef.id,
                templeName,
                ...d.data(),
                timestamp: d.data().timestamp?.toDate?.() || new Date(d.data().createdAt)
            });
        }

        return reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
        console.error('Error fetching reviews:', error);
        // If error mentions "requires an index", a composite index must be created.
        // Check the Firebase Console link in the error for a one-click fix.
        return [];
    }
}

async function updateReviewStatus(templeId, reviewId, status) {
    try {
        await updateDoc(doc(db, `temples/${templeId}/reviews`, reviewId), {
            status,
            updatedAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function escapeHtml(text) {
    if (!text) return '';
    return String(text).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}

function formatDate(date) {
    if (!date) return 'Recently';
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function starHTML(rating) {
    return Array.from({ length: 5 }, (_, i) =>
        `<span class="star ${i < rating ? 'filled' : ''}">★</span>`
    ).join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// FIX 2: The HTML has duplicate IDs (pendingCount, approvedCount, rejectedCount)
// — one set in the sidebar tabs, one in the stats row. getElementById() only
// finds the FIRST match, so one set never updates.
//
// This helper updates ALL elements that share a given id using querySelectorAll.
// ─────────────────────────────────────────────────────────────────────────────
function animateCount(id, target) {
    const elements = document.querySelectorAll(`#${id}`);
    if (!elements.length) return;
    const start = parseInt(elements[0].textContent) || 0;
    const duration = 600;
    const startTime = performance.now();
    const update = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const value = Math.round(start + (target - start) * progress);
        elements.forEach(el => el.textContent = value);
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

async function updateStats() {
    const [pending, approved, rejected] = await Promise.all([
        fetchReviewsByStatus('pending'),
        fetchReviewsByStatus('approved'),
        fetchReviewsByStatus('rejected')
    ]);
    animateCount('pendingCount', pending.length);
    animateCount('approvedCount', approved.length);
    animateCount('rejectedCount', rejected.length);
    animateCount('totalCount', pending.length + approved.length + rejected.length);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast-${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3500);
}

function displayReviews(reviews) {
    const content = document.getElementById('reviewsContent');
    const countEl = document.getElementById('resultCount');
    if (countEl) countEl.textContent = `${reviews.length} review${reviews.length !== 1 ? 's' : ''}`;

    if (reviews.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">◉</div>
                <h3>No ${currentFilter} reviews</h3>
                <p>Nothing to moderate here.</p>
            </div>`;
        return;
    }

    content.innerHTML = reviews.map((review, i) => `
        <div class="review-card" data-review-id="${review.id}" style="animation-delay: ${i * 60}ms">
            <div class="review-card-header">
                <div class="reviewer-avatar">${review.userName ? review.userName.charAt(0).toUpperCase() : '?'}</div>
                <div class="reviewer-meta">
                    <div class="reviewer-name">${escapeHtml(review.userName)}</div>
                    <div class="reviewer-temple">🛕 ${escapeHtml(review.templeName)}</div>
                </div>
                <div class="review-right">
                    <div class="stars-row">${starHTML(review.rating)}</div>
                    <div class="review-time">${formatDate(review.timestamp)}</div>
                </div>
            </div>

            <div class="review-body">
                <p class="review-text">"${escapeHtml((review.text || '').substring(0, 280))}${review.text && review.text.length > 280 ? '…' : ''}"</p>
            </div>

            ${review.images && review.images.length > 0 ? `
                <div class="review-images">
                    ${review.images.map(img => `
                        <img src="${escapeHtml(img.url)}" alt="Review image" class="review-thumb"
                             onclick="openImageModal('${escapeHtml(img.url)}')" loading="lazy">
                    `).join('')}
                </div>
            ` : ''}

            <div class="review-card-footer">
                <button class="action-btn email-btn" onclick="showEmailModal('${escapeHtml(review.email)}')">
                    <span>✉</span> Email
                </button>
                ${currentFilter === 'pending' ? `
                    <button class="action-btn approve-btn" onclick="handleApprove('${review.templeId}', '${review.id}')">
                        <span>✓</span> Approve
                    </button>
                    <button class="action-btn reject-btn" onclick="handleReject('${review.templeId}', '${review.id}')">
                        <span>✕</span> Reject
                    </button>
                ` : `
                    <span class="status-pill status-${review.status}">${review.status}</span>
                `}
            </div>
        </div>
    `).join('');
}

window.loadReviews = async function (filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    const content = document.getElementById('reviewsContent');
    content.innerHTML = `
        <div class="loading-state">
            <div class="loader"></div>
            <p>Loading ${filter} reviews…</p>
        </div>`;

    allReviews = await fetchReviewsByStatus(filter);
    displayReviews(allReviews);
};

window.handleApprove = async function (templeId, reviewId) {
    if (!isAuthenticated) {
        showToast('Please log in to approve reviews', 'error');
        return;
    }
    const result = await updateReviewStatus(templeId, reviewId, 'approved');
    if (result.success) {
        showToast('Review approved ✓', 'success');
        updateStats();
        loadReviews(currentFilter);
    } else {
        showToast('Error: ' + result.error, 'error');
    }
};

window.handleReject = async function (templeId, reviewId) {
    if (!isAuthenticated) {
        showToast('Please log in to reject reviews', 'error');
        return;
    }
    const result = await updateReviewStatus(templeId, reviewId, 'rejected');
    if (result.success) {
        showToast('Review rejected', 'warning');
        updateStats();
        loadReviews(currentFilter);
    } else {
        showToast('Error: ' + result.error, 'error');
    }
};

window.showEmailModal = function (email) {
    document.getElementById('modalEmailText').textContent = email;
    document.getElementById('emailModal').classList.add('active');
};

window.closeEmailModal = function () {
    document.getElementById('emailModal').classList.remove('active');
};

window.openImageModal = function (url) {
    document.getElementById('modalImage').src = url;
    document.getElementById('imageModal').classList.add('active');
};

window.closeImageModal = function () {
    document.getElementById('imageModal').classList.remove('active');
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTICATION
// ─────────────────────────────────────────────────────────────────────────────
window.handleLogin = async function () {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        showToast('Please enter email and password', 'error');
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        showToast('Logged in successfully!', 'success');
        // Auth state change listener will handle the rest
    } catch (error) {
        console.error('Login error:', error);
        if (error.code === 'auth/user-not-found') {
            showToast('User not found', 'error');
        } else if (error.code === 'auth/wrong-password') {
            showToast('Wrong password', 'error');
        } else if (error.code === 'auth/invalid-email') {
            showToast('Invalid email format', 'error');
        } else {
            showToast('Login failed: ' + error.message, 'error');
        }
    }
};

window.handleLogout = async function () {
    try {
        await signOut(auth);
        isAuthenticated = false;
        showToast('Logged out', 'success');
        showLoginScreen();
    } catch (error) {
        showToast('Logout failed', 'error');
    }
};

function showLoginScreen() {
    const content = document.getElementById('reviewsContent');
    content.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; min-height: 400px;">
            <div style="background: #f9f9f9; padding: 40px; border-radius: 8px; text-align: center; max-width: 300px;">
                <h2 style="color: #333; margin-bottom: 20px;">Admin Login</h2>
                <input
                    id="loginEmail"
                    type="email"
                    placeholder="Email"
                    style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
                />
                <input
                    id="loginPassword"
                    type="password"
                    placeholder="Password"
                    style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
                />
                <button
                    onclick="handleLogin()"
                    style="width: 100%; padding: 10px; background: #667eea; color: white; border: none; border-radius: 5px; font-weight: 600; cursor: pointer; font-size: 14px;"
                >
                    Login
                </button>
            </div>
        </div>
    `;
}

function showAdminPanel() {
    // Reload the panel content
    updateStats();
    loadReviews('pending');
}

window.addEventListener('DOMContentLoaded', async () => {
    // Check authentication state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is authenticated
            isAuthenticated = true;
            showAdminPanel();
            
            // Show logout button in header if available
            const headerLogout = document.querySelector('[data-logout-btn]');
            if (headerLogout) {
                headerLogout.style.display = 'block';
            }
        } else {
            // User is not authenticated
            isAuthenticated = false;
            showLoginScreen();
        }
    });

    document.querySelectorAll('.filter-tab').forEach(btn => {
        btn.addEventListener('click', () => loadReviews(btn.dataset.filter));
    });

    window.addEventListener('click', (e) => {
        const emailModal = document.getElementById('emailModal');
        const imageModal = document.getElementById('imageModal');
        if (e.target === emailModal) emailModal.classList.remove('active');
        if (e.target === imageModal) imageModal.classList.remove('active');
    });
});