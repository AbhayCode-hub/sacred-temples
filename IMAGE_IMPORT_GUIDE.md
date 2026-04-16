# 🖼️ Image Import Guide for Temples

This guide explains how to easily add and manage images for each temple in your Sacred Temples project.

## Quick Overview

The image system is now **organized by temple prefix**, making it much easier to manage gallery photos. Instead of manually editing a large `galleryImages` array, you simply:

1. **Add images** to the `photos/` folder
2. **Update the `templeGalleries` object** in `temples-data.js`
3. **Done!** The gallery images are auto-generated

---

## How It Works

### Step 1: Add Your Photos to `photos/` Folder

Place temple images in: `sacred-temples/photos/`

**Naming Convention:** Use the temple's prefix followed by a number
- Example for Bade Baba temple (prefix `kp`): `kp1.jpg`, `kp2.jpg`, `kp5.jpg`, etc.
- Example for Mangi Tungi (prefix `mt`): `mt1.jpg`, `mt2.jpg`, etc.
- Example for Sonagiri (prefix `sng`): `sng1.jpg`, `sng10.jpg`, etc.

---

### Step 2: Update `temples-data.js`

Open `sacred-temples/temples-data.js` and locate the `templeGalleries` object at the top.

#### Example: Adding Images for Bade Baba Temple (prefix: `kp`)

```javascript
export const templeGalleries = {
  kp: [
    { filename: "kp4.jpg", alt: "Jain Temple Architecture", title: "Intricate Jain Temple Carvings" },
    { filename: "kp3.jpeg", alt: "Hilltop Temple", title: "Temples in the Hills" },
    { filename: "kp11.jpg", alt: "Hilltop view of Temple", title: "Bade Baba Jain Mandir" },
    // ✅ Add your new images here!
    { filename: "kp12.jpg", alt: "Temple Bell", title: "Sacred Temple Bell" },
    { filename: "kp13.jpg", alt: "Temple Courtyard", title: "Beautiful Courtyard" },
  ],
  // ... other temples
};
```

---

## Adding Images - Step by Step Example

### Scenario: Adding 3 new photos to Sonagiri Temple

1. **Prepare your files:**
   - Take 3 photos of the Sonagiri temple
   - Save them as: `sng11.jpg`, `sng12.jpg`, `sng13.jpg`
   - Move them to: `sacred-temples/photos/`

2. **Update `temples-data.js`:**
   ```javascript
   sng: [
     { filename: "sng4.jpg", alt: "Sonagiri Temple", title: "Sonagiri Jain Temple" },
     { filename: "sng1.jpg", alt: "Temple Complex", title: "Temple Complex View" },
     // ... existing images ...
     { filename: "sng10.jpg", alt: "Temple Site", title: "Site View" },
     // ✅ Add new images
     { filename: "sng11.jpg", alt: "Main Shrine", title: "Beautiful Main Shrine" },
     { filename: "sng12.jpg", alt: "Temple Detail", title: "Intricate Stone Work" },
     { filename: "sng13.jpg", alt: "Evening View", title: "Temple at Sunset" },
   ],
   ```

3. **Done!** The images automatically appear in the gallery

---

## Temple Prefixes Reference

Here are all the temple gallery prefixes currently in use:

| Temple Name | Prefix | Files |
|---|---|---|
| Bade Baba Jain Temple | `kp` | kp1, kp3, kp4, kp9, kp11 |
| Mangi Tungi Jain Temple | `mt` | mt1, mt4, mt6 |
| Girnar Jain Temples | `gp` | gp1, gp3, gp4, gp6 |
| Hastagiri Jain Temple | `pj` | pj |
| Muktagiri Jain Temple | `mg` | mg2 |
| Chilkur Balaji Temple | `br` | br1, br4 |
| Maa Tara Tarini Temple | `mt` | (shares with Mangi Tungi) |
| Shree Stambheshwar Temple | `ssmt` | ssmt, ssmt1 |
| Maa Kamakhya Temple | `makt` | makt |
| Kaal Bhairav Temple | `kbt` | kbt |
| Hastinapur Jain Temple | `hp` | hp1, hp3-hp10 |
| Sonagiri Jain Temple | `sng` | sng1-sng10 |
| Gurdwara/Mosque/Others | `g`, `ms`, `nm`, `khaj` | Various |

---

## What Gets Auto-Generated?

The `generateGalleryImages()` function automatically:
- ✅ Creates unique IDs for each image
- ✅ Constructs full file paths (`photos/filename`)
- ✅ Organizes images by temple prefix
- ✅ Maintains alt text and titles for accessibility

**Before (Manual):**
```javascript
export const galleryImages = [
  { id: 1, src: "photos/kp4.jpg", alt: "...", title: "..." },
  { id: 2, src: "photos/mt1.jpg", alt: "...", title: "..." },
  // ... 20+ more entries to maintain manually
];
```

**After (Automatic):**
```javascript
export const templeGalleries = {
  kp: [
    { filename: "kp4.jpg", alt: "...", title: "..." },
  ],
  mt: [
    { filename: "mt1.jpg", alt: "...", title: "..." },
  ],
  // ... much cleaner!
};

export const galleryImages = generateGalleryImages(); // ✨ Auto-generated!
```

---

## Tips & Best Practices

### 📸 Image Quality
- Use high-quality images (optimized for web, ~2-5MB)
- Recommended dimensions: 1200x800px or similar aspect ratio
- Formats: `.jpg`, `.jpeg`, `.png` (WebP for future optimization)

### 🏷️ Naming Consistency
- Always use lowercase for filenames: `kp1.jpg` not `KP1.jpg`
- Use sequential numbers: `sng1.jpg`, `sng2.jpg`, not random numbers
- Include numbers even if you only have one image: `br1.jpg` not `br.jpg`

### 📝 Alt Text & Titles
- **Alt text:** Brief, descriptive, SEO-friendly
  - ✅ Good: `"Jain Temple Architecture"`
  - ❌ Bad: `"Image"` or `"photo123"`
- **Title:** What visitors see when they hover/read gallery
  - ✅ Good: `"Intricate Jain Temple Carvings"`
  - ❌ Bad: `"pic"`

### 🔄 Updating Existing Temples
Want to change a temple's gallery? Just edit the array:
```javascript
// Before
kp: [
  { filename: "kp4.jpg", alt: "Old description", title: "Old title" },
],

// After
kp: [
  { filename: "kp4.jpg", alt: "Updated description", title: "New title" },
],
```

---

## Common Use Cases

### ➕ Add a New Temple
1. Create a new temple object in `templesData` with a `galleryPhotoPrefix` (e.g., `"xyz"`)
2. Add a new entry in `templeGalleries`:
   ```javascript
   xyz: [
     { filename: "xyz1.jpg", alt: "Photo description", title: "Gallery title" },
   ],
   ```
3. Upload photos with prefix `xyz` to `photos/` folder

### 🗑️ Remove an Image
Simply delete the line from `templeGalleries`:
```javascript
// Before
sng: [
  { filename: "sng1.jpg", alt: "...", title: "..." },
  { filename: "sng2.jpg", alt: "...", title: "..." },  // ← Delete this line
  { filename: "sng3.jpg", alt: "...", title: "..." },
],

// After
sng: [
  { filename: "sng1.jpg", alt: "...", title: "..." },
  { filename: "sng3.jpg", alt: "...", title: "..." },
],
```

### 📋 Batch Upload Multiple Images
1. Save all photos with the correct prefix: `temple_prefix1.jpg`, `temple_prefix2.jpg`, etc.
2. Add all entries to the appropriate array in `templeGalleries`
3. Run the project - all images appear instantly!

---

## Troubleshooting

**Q: Images aren't showing in the gallery**
- A: Check that the prefix in `templeGalleries` matches the temple's `galleryPhotoPrefix` in `templesData`
- A: Verify the filename is spelled correctly and the file exists in `photos/`

**Q: Can I use different naming for images?**
- A: Yes! The naming is flexible - just update the filename in `templeGalleries`
  ```javascript
  { filename: "bade-baba-main-temple.jpg", alt: "...", title: "..." } // Works fine!
  ```

**Q: How do I reorder images in the gallery?**
- A: Simply reorder the entries in the `templeGalleries` array

---

## Summary

| Task | Before | After |
|---|---|---|
| Add 5 images to a temple | Edit `galleryImages` array (25 lines of code) | Add 5 lines to `templeGalleries` |
| Update image description | Find and edit in `galleryImages` array | Edit in `templeGalleries` |
| Reorganize gallery | Manually renumber all IDs | Just reorder the array |
| Add new temple with images | ~30 lines of code in 2 places | ~5 lines in 1 place |

**Result:** 🎉 Much simpler, faster, and less error-prone image management!

