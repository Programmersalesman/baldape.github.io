// Testimonial service for data persistence
const STORAGE_KEY = 'testimonials_data';
const BACKUP_KEY = 'testimonials_backup';

// Data validation
const validateTestimonial = (testimonial) => {
  const required = ['name', 'community', 'message', 'rating', 'permission'];
  const missing = required.filter(field => !testimonial[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  if (testimonial.rating < 1 || testimonial.rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  
  if (testimonial.message.length < 10) {
    throw new Error('Testimonial message must be at least 10 characters');
  }
  
  return true;
};

// Normalize testimonial data structure
const normalizeTestimonial = (testimonial) => {
  return {
    id: testimonial.id || Date.now().toString(),
    name: testimonial.name || testimonial.discordUsername || 'Anonymous',
    discordUsername: testimonial.discordUsername || testimonial.discord || null,
    community: testimonial.community,
    role: testimonial.role || 'Member',
    rating: parseInt(testimonial.rating) || 0,
    featuresLiked: testimonial.featuresLiked || testimonial.features || [],
    text: testimonial.text || testimonial.message,
    permission: testimonial.permission === 'yes' ? 'public' : 'private',
    date: testimonial.date || new Date().toISOString().slice(0, 10),
    source: testimonial.source || 'form',
    anonymous: testimonial.anonymous || 'public',
    email: testimonial.email || null,
    createdAt: testimonial.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// Load testimonials from localStorage
export const loadTestimonials = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initialize with sample data if no stored data exists
      return [];
    }
    
    const data = JSON.parse(stored);
    if (!Array.isArray(data)) {
      console.warn('Invalid testimonials data format, resetting to empty array');
      return [];
    }
    
    return data.map(normalizeTestimonial);
  } catch (error) {
    console.error('Error loading testimonials:', error);
    // Try to load from backup
    try {
      const backup = localStorage.getItem(BACKUP_KEY);
      if (backup) {
        const backupData = JSON.parse(backup);
        console.log('Loaded testimonials from backup');
        return Array.isArray(backupData) ? backupData.map(normalizeTestimonial) : [];
      }
    } catch (backupError) {
      console.error('Backup load failed:', backupError);
    }
    return [];
  }
};

// Save testimonials to localStorage
export const saveTestimonials = (testimonials) => {
  try {
    // Create backup before saving
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) {
      localStorage.setItem(BACKUP_KEY, current);
    }
    
    // Validate all testimonials before saving
    testimonials.forEach(validateTestimonial);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
    return true;
  } catch (error) {
    console.error('Error saving testimonials:', error);
    return false;
  }
};

// Add a new testimonial
export const addTestimonial = (testimonialData) => {
  try {
    const testimonials = loadTestimonials();
    const newTestimonial = normalizeTestimonial({
      ...testimonialData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
    
    validateTestimonial(newTestimonial);
    
    const updatedTestimonials = [newTestimonial, ...testimonials];
    const success = saveTestimonials(updatedTestimonials);
    
    if (success) {
      return { success: true, testimonial: newTestimonial };
    } else {
      throw new Error('Failed to save testimonial');
    }
  } catch (error) {
    console.error('Error adding testimonial:', error);
    return { success: false, error: error.message };
  }
};

// Update an existing testimonial
export const updateTestimonial = (id, updates) => {
  try {
    const testimonials = loadTestimonials();
    const index = testimonials.findIndex(t => t.id === id);
    
    if (index === -1) {
      throw new Error('Testimonial not found');
    }
    
    const updatedTestimonial = normalizeTestimonial({
      ...testimonials[index],
      ...updates,
      id, // Preserve original ID
      updatedAt: new Date().toISOString(),
    });
    
    validateTestimonial(updatedTestimonial);
    
    testimonials[index] = updatedTestimonial;
    const success = saveTestimonials(testimonials);
    
    if (success) {
      return { success: true, testimonial: updatedTestimonial };
    } else {
      throw new Error('Failed to save testimonial');
    }
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return { success: false, error: error.message };
  }
};

// Delete a testimonial
export const deleteTestimonial = (id) => {
  try {
    const testimonials = loadTestimonials();
    const filtered = testimonials.filter(t => t.id !== id);
    
    if (filtered.length === testimonials.length) {
      throw new Error('Testimonial not found');
    }
    
    const success = saveTestimonials(filtered);
    
    if (success) {
      return { success: true };
    } else {
      throw new Error('Failed to save testimonials');
    }
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return { success: false, error: error.message };
  }
};

// Get testimonials with filtering
export const getTestimonials = (filters = {}) => {
  let testimonials = loadTestimonials();
  
  // Filter by permission (public/private)
  if (filters.permission) {
    testimonials = testimonials.filter(t => t.permission === filters.permission);
  }
  
  // Filter by community
  if (filters.community) {
    testimonials = testimonials.filter(t => t.community === filters.community);
  }
  
  // Filter by rating
  if (filters.minRating) {
    testimonials = testimonials.filter(t => t.rating >= filters.minRating);
  }
  
  // Filter by date range
  if (filters.startDate) {
    testimonials = testimonials.filter(t => t.date >= filters.startDate);
  }
  
  if (filters.endDate) {
    testimonials = testimonials.filter(t => t.date <= filters.endDate);
  }
  
  // Sort testimonials
  const sortBy = filters.sortBy || 'createdAt';
  const sortOrder = filters.sortOrder || 'desc';
  
  testimonials.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (sortBy === 'date' || sortBy === 'createdAt') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
  
  return testimonials;
};

// Export testimonials data
export const exportTestimonials = () => {
  try {
    const testimonials = loadTestimonials();
    const dataStr = JSON.stringify(testimonials, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `testimonials-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    
    return { success: true };
  } catch (error) {
    console.error('Error exporting testimonials:', error);
    return { success: false, error: error.message };
  }
};

// Import testimonials data
export const importTestimonials = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected array of testimonials');
        }
        
        // Validate all testimonials
        data.forEach(validateTestimonial);
        
        // Normalize all testimonials
        const normalizedData = data.map(normalizeTestimonial);
        
        const success = saveTestimonials(normalizedData);
        
        if (success) {
          resolve({ success: true, count: normalizedData.length });
        } else {
          throw new Error('Failed to save imported testimonials');
        }
      } catch (error) {
        console.error('Error importing testimonials:', error);
        resolve({ success: false, error: error.message });
      }
    };
    
    reader.onerror = () => {
      resolve({ success: false, error: 'Failed to read file' });
    };
    
    reader.readAsText(file);
  });
};

// Clear all testimonials (with confirmation)
export const clearTestimonials = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BACKUP_KEY);
    return { success: true };
  } catch (error) {
    console.error('Error clearing testimonials:', error);
    return { success: false, error: error.message };
  }
};

// Get storage statistics
export const getStorageStats = () => {
  try {
    const testimonials = loadTestimonials();
    const storageSize = localStorage.getItem(STORAGE_KEY)?.length || 0;
    
    return {
      totalTestimonials: testimonials.length,
      storageSizeBytes: storageSize,
      storageSizeKB: (storageSize / 1024).toFixed(2),
      publicTestimonials: testimonials.filter(t => t.permission === 'public').length,
      privateTestimonials: testimonials.filter(t => t.permission === 'private').length,
      averageRating: testimonials.length > 0 
        ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(2)
        : 0,
    };
  } catch (error) {
    console.error('Error getting storage stats:', error);
    return null;
  }
}; 