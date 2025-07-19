/**
 * Calculate form completion percentage based on required fields
 * @param {Object} fields - Form fields object
 * @param {Array} requiredFields - Array of required field names
 * @param {Object} fieldValidators - Custom validation functions for specific fields
 * @returns {number} - Percentage complete (0-100)
 */
export const calculateFormProgress = (fields, requiredFields, fieldValidators = {}) => {
  let completedCount = 0;
  
  requiredFields.forEach(field => {
    const validator = fieldValidators[field];
    
    if (validator) {
      // Use custom validator if provided
      if (validator(fields[field])) {
        completedCount++;
      }
    } else {
      // Default validation logic
      const value = fields[field];
      
      if (Array.isArray(value)) {
        // For array fields (like checkboxes)
        if (value && value.length > 0) {
          completedCount++;
        }
      } else if (typeof value === 'string') {
        // For string fields
        if (value && value.trim().length > 0) {
          completedCount++;
        }
      } else if (value !== null && value !== undefined && value !== '') {
        // For other field types
        completedCount++;
      }
    }
  });
  
  return Math.round((completedCount / requiredFields.length) * 100);
};

/**
 * Common field validators for different form types
 */
export const fieldValidators = {
  // Email validation
  email: (value) => {
    return value && value.trim().length > 0 && value.includes('@');
  },
  
  // Rating validation (for testimonial forms)
  rating: (value) => {
    return value && value > 0;
  },
  
  // Permission validation (for testimonial forms)
  permission: (value) => {
    return value && value === 'yes';
  }
}; 