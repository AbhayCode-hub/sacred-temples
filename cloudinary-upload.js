// Cloudinary Image Upload Handler
export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dll125uff',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'temples_gallery',
  folder: import.meta.env.VITE_CLOUDINARY_FOLDER || 'sacred-temples/gallery'
};

/**
 * Upload image to Cloudinary
 * @param {File} file - Image file to upload
 * @param {string} templePrefix - Temple photo prefix (e.g., 'temple1')
 * @returns {Promise<Object>} Upload result with secure_url
 */
export async function uploadToCloudinary(file, templePrefix = '') {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    
    // Add folder and public_id for organization
    if (templePrefix) {
      formData.append('folder', `${CLOUDINARY_CONFIG.folder}/${templePrefix}`);
      formData.append('public_id', `${templePrefix}_${Date.now()}`);
    }
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      size: data.bytes,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Upload multiple images
 * @param {FileList} files - Multiple image files
 * @param {string} templePrefix - Temple photo prefix
 * @returns {Promise<Array>} Array of upload results
 */
export async function uploadMultipleToCloudinary(files, templePrefix = '') {
  const uploadPromises = Array.from(files).map(file => 
    uploadToCloudinary(file, templePrefix)
  );
  
  return Promise.all(uploadPromises);
}

/**
 * Display upload progress
 * @param {HTMLElement} progressElement - Element to show progress
 * @param {File} file - File being uploaded
 * @param {number} progress - Progress percentage (0-100)
 */
export function showUploadProgress(progressElement, file, progress) {
  if (progressElement) {
    progressElement.innerHTML = `
      <div class="upload-progress">
        <p>${file.name}</p>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <span>${progress}%</span>
      </div>
    `;
  }
}

/**
 * Create upload input handler
 * @param {string} inputId - Input element ID
 * @param {string} templePrefix - Temple photo prefix
 * @param {Function} onSuccess - Callback on successful upload
 * @param {Function} onError - Callback on error
 */
export function setupUploadInput(inputId, templePrefix, onSuccess, onError) {
  const input = document.getElementById(inputId);
  
  if (!input) {
    console.warn(`Upload input "${inputId}" not found`);
    return;
  }
  
  input.addEventListener('change', async (event) => {
    const files = event.target.files;
    
    if (!files || files.length === 0) return;
    
    try {
      const results = await uploadMultipleToCloudinary(files, templePrefix);
      
      const successful = results.filter(r => r.success);
      const failed = results.filter(r => !r.success);
      
      if (onSuccess) {
        onSuccess(successful, failed);
      }
      
      // Reset input
      input.value = '';
    } catch (error) {
      console.error('Upload error:', error);
      if (onError) {
        onError(error);
      }
    }
  });
}

/**
 * Generate Cloudinary image URL with transformations
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Transformation options
 * @returns {string} Transformed image URL
 */
export function getTransformedImageUrl(publicId, options = {}) {
  const {
    width = 500,
    height = 500,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;
  
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/w_${width},h_${height},c_${crop},q_${quality},f_${format}/${publicId}`;
}
