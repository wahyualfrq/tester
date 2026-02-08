/**
 * Utility to optimize Cloudinary URLs
 * @param {string} url - Original Cloudinary URL
 * @param {object} options - Transformation options
 * @param {number} options.width - Request width
 * @param {number} options.height - Request height
 * @param {string} options.crop - Crop mode (default: fill)
 * @param {number} options.quality - Quality (default: auto)
 * @param {string} options.format - Format (default: auto)
 */
export const optimizeImage = (url, { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;

  // Cloudinary URL format: https://res.cloudinary.com/[cloud_name]/image/upload/[transformations]/[version]/[public_id].[format]
  const baseUrl = url.split('/upload/')[0] + '/upload/';
  const restOfUrl = url.split('/upload/')[1];

  const transforms = [];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  if (quality) transforms.push(`q_${quality}`);
  if (format) transforms.push(`f_${format}`);
  transforms.push('g_auto'); // Smart gravity

  return `${baseUrl}${transforms.join(',')}/${restOfUrl}`;
};
