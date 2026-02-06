/**
 * Get the full image URL
 * If the image path starts with /assets/, prepend the backend URL
 * If it's already a full URL, return it as is
 * @param {string} imagePath - The image path from the database
 * @returns {string} - The full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL (starts with http:// or https://), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with /assets/, prepend the backend URL
  if (imagePath.startsWith('/assets/')) {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    // Remove /api from the end to get the base URL
    const baseUrl = apiUrl.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  }
  
  // If it starts with /, it's a root path, prepend backend URL
  if (imagePath.startsWith('/')) {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    const baseUrl = apiUrl.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  }
  
  // Otherwise return as is (might be a relative path)
  return imagePath;
};

