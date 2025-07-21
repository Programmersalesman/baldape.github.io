// User identification utility for non-logged-in users
// Uses browser fingerprinting and localStorage to create persistent user IDs

// Generate a simple session-based identifier
const generateSessionId = () => {
  // Use a simpler approach: timestamp + random
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  
  return `session_${timestamp}_${random}`;
};

// Get or create a unique user ID
export const getUserId = () => {
  const storageKey = 'discord_services_user_id';
  
  // Check if we already have a user ID
  let userId = localStorage.getItem(storageKey);
  
  if (!userId) {
    // Generate a new session ID
    userId = generateSessionId();
    
    // Store it for future use
    localStorage.setItem(storageKey, userId);
    
    console.log('🆔 Generated new session ID:', userId);
  }
  
  return userId;
};

// Check if user ID exists
export const hasUserId = () => {
  return !!localStorage.getItem('discord_services_user_id');
};

// Clear user ID (for testing or logout)
export const clearUserId = () => {
  localStorage.removeItem('discord_services_user_id');
  console.log('🗑️ Cleared user ID');
};

// Get user type (for debugging)
export const getUserType = () => {
  const userId = getUserId();
  if (userId.startsWith('session_')) {
    return 'anonymous';
  }
  return 'authenticated';
}; 