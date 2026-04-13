# 📋 Review Approval System Setup Guide

## Overview

The review approval system has been implemented with:
- ✅ **Admin Panel UI** (`admin-panel.html`) - Manage and moderate reviews
- ✅ **Backend Functions** - Approve/reject reviews from Firestore
- ⚠️ **Security Rules** - Need to be configured in Firebase

---

## 🚀 Quick Start

### 1. Access the Admin Panel

Open this URL in your browser:
```
http://localhost:5173/admin-panel.html
```

Or when deployed:
```
https://your-domain.com/admin-panel.html
```

### 2. Features

#### Pending Reviews Tab
- View all reviews awaiting approval
- Shows reviewer name, temple, rating, and text
- **Actions:**
  - ✅ **Approve** - Makes review visible to public
  - ❌ **Reject** - Marks as rejected (hidden from public)
  - 📧 **View Email** - Verify reviewer identity

#### Approved & Rejected Tabs
- View all previously moderated reviews
- Monitor approval history
- Read-only mode (no actions available)

---

## 🔒 Firestore Security Rules Setup

### Why Security Rules Are Important

By default, any user can modify reviews. You **MUST** set security rules to:
- ✅ Allow only authenticated admins to approve reviews
- ✅ Prevent users from approving their own reviews
- ✅ Ensure data integrity

### How to Set Security Rules

1. Go to **Firebase Console** → Your Project
2. Select **Firestore Database**
3. Click **Rules** tab
4. Replace the rules with this configuration:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read approved reviews
    match /temples/{templeId}/reviews/{reviewId} {
      allow read: if resource.data.status == 'approved';
      
      // Allow anyone to create new reviews (initially pending)
      allow create: if request.auth.uid != null && 
                       request.resource.data.status == 'pending' &&
                       request.resource.data.userName != null &&
                       request.resource.data.email != null &&
                       request.resource.data.rating >= 1 &&
                       request.resource.data.rating <= 5;
      
      // Allow likes on approved reviews
      allow update: if request.auth.uid != null &&
                       resource.data.status == 'approved' &&
                       request.resource.data.diff(resource.data).affectedKeys()
                         .hasOnly(['likes', 'userLikes']);
    }
    
    // ADMIN ONLY: Allow approval/rejection of reviews
    // Add your admin UIDs to the adminUsers list below
    match /temples/{templeId}/reviews/{reviewId} {
      allow update: if (request.auth.token.email == 'your-admin-email@gmail.com' ||
                       request.auth.uid in get(/databases/$(database)/documents/config/admins).data.uids) &&
                       (request.resource.data.status in ['approved', 'rejected']);
    }
    
    // Allow reading all temple data
    match /temples/{templeId} {
      allow read;
    }
    
    // Config document for admin management
    match /config/admins {
      allow read: if request.auth.uid != null;
      allow write: if false; // Set manually in Firebase Console
    }
  }
}
```

### 2. Set Admin Email (Easier Method)

1. In Firebase Console, go to **Authentication**
2. Add your email to the auth system
3. Replace `'your-admin-email@gmail.com'` in the rules with your actual email
4. Publish the rules

### 3. Alternative: Admin List Document

For multiple admins, create a Firestore document:

**Path:** `config/admins`

**Content:**
```json
{
  "uids": ["admin1_uid", "admin2_uid", "admin3_uid"]
}
```

Get UIDs from **Firebase Authentication** → Copy User ID

---

## 📱 Usage Guide

### For Admins

1. **Navigate to Admin Panel**
   - Visit `/admin-panel.html` or the deployed URL
   - You must be logged in with Firebase (admin email)

2. **Review Pending Submissions**
   - See all pending reviews in the first tab
   - Click "View Email" to verify reviewer
   - Read the full review and see images

3. **Approve or Reject**
   - Click ✅ **Approve** to make visible to public
   - Click ❌ **Reject** if inappropriate
   - Confirmation dialog will appear

4. **Monitor Approvals**
   - Switch to "Approved" tab to see published reviews
   - Switch to "Rejected" tab to see declined reviews

### For Users

1. **Submit Review** (as before)
   - No changes needed for users
   - Reviews still created with status: 'pending'

2. **See Approval Status**
   - User sees message: "Your review is pending approval"
   - After approval: Review becomes visible

3. **View Approved Reviews**
   - Only approved reviews display
   - Can like/vote on approved reviews

---

## 🔐 Authentication Setup

### Enable Firebase Authentication

1. Go to **Firebase Console** → **Authentication**
2. Ensure **Email/Password** is enabled
3. Create admin account:
   - Email: `your-admin-email@gmail.com`
   - Password: `SecurePassword123!`

### Add Login to Admin Panel (Optional)

If you want the admin panel to have a login screen:

```javascript
// Add this to admin-panel.html inside <script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const auth = getAuth();

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Show login form
    document.body.innerHTML = `
      <div style="max-width: 400px; margin: 100px auto; text-align: center;">
        <h2>Admin Login</h2>
        <input type="email" id="email" placeholder="Admin Email">
        <input type="password" id="password" placeholder="Password">
        <button onclick="login()">Login</button>
      </div>
    `;
    
    window.login = async () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        location.reload();
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    };
  }
  // If user exists, show admin panel (current behavior)
});
```

---

## 📊 System Flow

```
1. User Submits Review
   ↓
2. Review Created (status: 'pending')
   ↓
3. Admin Panel Shows Pending Review
   ↓
4. Admin Reviews & Takes Action
   ├─ ✅ Approve (status: 'approved')
   │   └─ Review Visible to Public
   │
   └─ ❌ Reject (status: 'rejected')
       └─ Review Hidden from Public

5. Approved Reviews Display
   ├─ Sort by: Recent, Helpful, Highest Rating
   ├─ Users can like/vote
   └─ Affects rating calculations
```

---

## 🆘 Troubleshooting

### Admin Panel Shows No Reviews
- **Check:** Are there pending reviews in Firestore?
- **Check:** Are you logged in with correct Firebase user?
- **Check:** Security rules allow reading with your auth?

### Can't Approve/Reject
- **Check:** Your email matches in security rules
- **Check:** You're authenticated (Firebase logged in)
- **Check:** Security rules have admin permissions set

### Reviews Still Show as Pending After Approval
- **Check:** Wait a moment for Firestore to sync
- **Check:** Refresh the page to clear cache
- **Check:** Check browser console for errors (F12)

### Can't Access Admin Panel
- **Solution 1:** Add `admin-panel.html` to your HTTP server
- **Solution 2:** For Vite, ensure it's in `public/` folder or accessible route
- **Solution 3:** Deploy to Firebase Hosting for easy access

---

## 📈 Production Checklist

- [ ] Security rules configured in Firebase Console
- [ ] Admin email added to security rules
- [ ] Admin panel deployed (same domain as main site)
- [ ] Test approval flow in staging first
- [ ] Monitor rejected reviews to improve guidelines
- [ ] Backup admin email account

---

## 🎯 Next Steps

1. **Set Security Rules** (most important!)
2. **Create Admin Firebase Account**
3. **Test in Development**
4. **Deploy Admin Panel**
5. **Test with Real Reviews**
6. **Go Live!**

---

## 📞 Support

For Firebase issues:
- 📖 [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- 📖 [Firebase Security Rules](https://firebase.google.com/docs/rules)
- 💬 [Firebase Support](https://firebase.google.com/support)

---

**Setup Time:** ~5 minutes  
**Difficulty:** Easy to Medium  
**Maintenance:** Minimal (review approvals as needed)
