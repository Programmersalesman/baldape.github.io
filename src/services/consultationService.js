// Consultation service for data persistence
const STORAGE_KEY = 'consultations_data';
const BACKUP_KEY = 'consultations_backup';

// Data validation
const validateConsultation = (consultation) => {
  const required = ['name', 'email', 'community', 'services', 'goals', 'timeline', 'budget'];
  const missing = required.filter(field => !consultation[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  if (consultation.email && !consultation.email.includes('@')) {
    throw new Error('Invalid email address');
  }
  
  if (consultation.goals.length < 10) {
    throw new Error('Goals description must be at least 10 characters');
  }
  
  if (!Array.isArray(consultation.services) || consultation.services.length === 0) {
    throw new Error('At least one service must be selected');
  }
  
  return true;
};

// Normalize consultation data structure
const normalizeConsultation = (consultation) => {
  return {
    id: consultation.id || Date.now().toString(),
    name: consultation.name,
    email: consultation.email,
    discord: consultation.discord || null,
    community: consultation.community,
    memberCount: consultation.memberCount || 'Unknown',
    services: consultation.services || [],
    goals: consultation.goals,
    challenges: consultation.challenges || '',
    timeline: consultation.timeline,
    budget: consultation.budget,
    preferredTime: consultation.preferredTime || 'flexible',
    additionalInfo: consultation.additionalInfo || '',
    status: consultation.status || 'pending',
    date: consultation.date || new Date().toISOString().slice(0, 10),
    source: consultation.source || 'form',
    createdAt: consultation.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// Load consultations from localStorage
export const loadConsultations = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    
    const data = JSON.parse(stored);
    if (!Array.isArray(data)) {
      console.warn('Invalid consultations data format, resetting to empty array');
      return [];
    }
    
    return data.map(normalizeConsultation);
  } catch (error) {
    console.error('Error loading consultations:', error);
    // Try to load from backup
    try {
      const backup = localStorage.getItem(BACKUP_KEY);
      if (backup) {
        const backupData = JSON.parse(backup);
        console.log('Loaded consultations from backup');
        return Array.isArray(backupData) ? backupData.map(normalizeConsultation) : [];
      }
    } catch (backupError) {
      console.error('Backup load failed:', backupError);
    }
    return [];
  }
};

// Save consultations to localStorage
export const saveConsultations = (consultations) => {
  try {
    // Create backup before saving
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) {
      localStorage.setItem(BACKUP_KEY, current);
    }
    
    // Validate all consultations before saving
    consultations.forEach(validateConsultation);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consultations));
    return true;
  } catch (error) {
    console.error('Error saving consultations:', error);
    return false;
  }
};

// Add a new consultation
export const addConsultation = (consultationData) => {
  try {
    const consultations = loadConsultations();
    const newConsultation = normalizeConsultation({
      ...consultationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
    
    validateConsultation(newConsultation);
    
    const updatedConsultations = [newConsultation, ...consultations];
    const success = saveConsultations(updatedConsultations);
    
    if (success) {
      return { success: true, consultation: newConsultation };
    } else {
      throw new Error('Failed to save consultation');
    }
  } catch (error) {
    console.error('Error adding consultation:', error);
    return { success: false, error: error.message };
  }
};

// Update an existing consultation
export const updateConsultation = (id, updates) => {
  try {
    const consultations = loadConsultations();
    const index = consultations.findIndex(c => c.id === id);
    
    if (index === -1) {
      throw new Error('Consultation not found');
    }
    
    const updatedConsultation = normalizeConsultation({
      ...consultations[index],
      ...updates,
      id, // Preserve original ID
      updatedAt: new Date().toISOString(),
    });
    
    validateConsultation(updatedConsultation);
    
    consultations[index] = updatedConsultation;
    const success = saveConsultations(consultations);
    
    if (success) {
      return { success: true, consultation: updatedConsultation };
    } else {
      throw new Error('Failed to save consultation');
    }
  } catch (error) {
    console.error('Error updating consultation:', error);
    return { success: false, error: error.message };
  }
};

// Delete a consultation
export const deleteConsultation = (id) => {
  try {
    const consultations = loadConsultations();
    const filtered = consultations.filter(c => c.id !== id);
    
    if (filtered.length === consultations.length) {
      throw new Error('Consultation not found');
    }
    
    const success = saveConsultations(filtered);
    
    if (success) {
      return { success: true };
    } else {
      throw new Error('Failed to save consultations');
    }
  } catch (error) {
    console.error('Error deleting consultation:', error);
    return { success: false, error: error.message };
  }
};

// Get consultations with filtering
export const getConsultations = (filters = {}) => {
  let consultations = loadConsultations();
  
  // Filter by status
  if (filters.status) {
    consultations = consultations.filter(c => c.status === filters.status);
  }
  
  // Filter by community
  if (filters.community) {
    consultations = consultations.filter(c => c.community === filters.community);
  }
  
  // Filter by services
  if (filters.services && Array.isArray(filters.services)) {
    consultations = consultations.filter(c => 
      filters.services.some(service => c.services.includes(service))
    );
  }
  
  // Filter by date range
  if (filters.startDate) {
    consultations = consultations.filter(c => c.date >= filters.startDate);
  }
  
  if (filters.endDate) {
    consultations = consultations.filter(c => c.date <= filters.endDate);
  }
  
  // Sort consultations
  const sortBy = filters.sortBy || 'createdAt';
  const sortOrder = filters.sortOrder || 'desc';
  
  consultations.sort((a, b) => {
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
  
  return consultations;
};

// Export consultations data
export const exportConsultations = () => {
  try {
    const consultations = loadConsultations();
    const dataStr = JSON.stringify(consultations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `consultations-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    
    return { success: true };
  } catch (error) {
    console.error('Error exporting consultations:', error);
    return { success: false, error: error.message };
  }
};

// Import consultations data
export const importConsultations = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected array of consultations');
        }
        
        // Validate all consultations
        data.forEach(validateConsultation);
        
        // Normalize all consultations
        const normalizedData = data.map(normalizeConsultation);
        
        const success = saveConsultations(normalizedData);
        
        if (success) {
          resolve({ success: true, count: normalizedData.length });
        } else {
          throw new Error('Failed to save imported consultations');
        }
      } catch (error) {
        console.error('Error importing consultations:', error);
        resolve({ success: false, error: error.message });
      }
    };
    
    reader.onerror = () => {
      resolve({ success: false, error: 'Failed to read file' });
    };
    
    reader.readAsText(file);
  });
};

// Clear all consultations (with confirmation)
export const clearConsultations = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BACKUP_KEY);
    return { success: true };
  } catch (error) {
    console.error('Error clearing consultations:', error);
    return { success: false, error: error.message };
  }
};

// Get storage statistics
export const getStorageStats = () => {
  try {
    const consultations = loadConsultations();
    const storageSize = localStorage.getItem(STORAGE_KEY)?.length || 0;
    
    return {
      totalConsultations: consultations.length,
      storageSizeBytes: storageSize,
      storageSizeKB: (storageSize / 1024).toFixed(2),
      pendingConsultations: consultations.filter(c => c.status === 'pending').length,
      completedConsultations: consultations.filter(c => c.status === 'completed').length,
      averageBudget: consultations.length > 0 
        ? consultations.reduce((sum, c) => {
            const budget = parseInt(c.budget?.split('-')[0]) || 0;
            return sum + budget;
          }, 0) / consultations.length
        : 0,
    };
  } catch (error) {
    console.error('Error getting storage stats:', error);
    return null;
  }
}; 