import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, updateDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

let currentFilter = 'pending';
let allReviews = [];

async function ensureParentDocExist() {
    try {
        const parentRef = doc(db, 'temples', '1');
        await setDoc(parentRef, {
            name: 'Temples Collection',
            initialized: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }, { merge: true });
    } catch (error) {
        console.error('Error ensuring parent doc:', error);
    }
}

async function fetchReviewsByStatus(status) {
    try {
        const temples = await getDocs(collection(db, 'temples'));
        const reviews = [];
        for (const templeDoc of temples.docs) {
            const templeId = templeDoc.id;
            const q = query(collection(db, `temples/${templeId}/reviews`), where('status', '==', status));
            const snapshot = await getDocs(q);
            snapshot.forEach(d => {
                reviews.push({
                    id: d.id,
                    templeId,
                    templeName: templeDoc.data().name || 'Unknown Temple',
                    ...d.data(),
                    timestamp: d.data().timestamp?.toDate?.() || new Date(d.data().createdAt)
                });
            });
        }
        return reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
        console.error('Error fetching reviews:', error);
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

function animateCount(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    const start = parseInt(el.textContent) || 0;
    const duration = 600;
    const startTime = performance.now();
    const update = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        el.textContent = Math.round(start + (target - start) * progress);
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
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
        <div class="review-card" style="animation-delay: ${i * 60}ms">
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
    const card = document.querySelector(`[data-review-id="${reviewId}"]`);
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

window.addEventListener('DOMContentLoaded', async () => {
    await ensureParentDocExist();
    await updateStats();
    loadReviews('pending');

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
