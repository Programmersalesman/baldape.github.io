import { log, warn, error as logError } from './logger';
// Browser-friendly test utilities for console use
// Copy and paste these functions directly into the browser console

// Test database connection
window.testDatabaseConnection = async () => {
  log('🔌 Testing database connection...');
  
  try {
    // Access supabase from the global scope
    const supabase = window.supabase || window.__SUPABASE__;
    if (!supabase) {
      logError('❌ Supabase not found in global scope');
      return { success: false, error: 'Supabase not available' };
    }
    
    // Test basic connection
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .select('count')
      .limit(1);
    
    if (error) {
      logError('❌ Database connection failed:', error);
      return { success: false, error };
    }
    
    log('✅ Database connection successful');
    log('📊 Sample data:', data);
    
    return { success: true, data };
  } catch (error) {
    logError('❌ Database test failed:', error);
    return { success: false, error };
  }
};

// Test reaction insertion
window.testReactionInsert = async (testimonialId = 1) => {
  log('🧪 Testing reaction insertion...');
  
  try {
    const supabase = window.supabase || window.__SUPABASE__;
    if (!supabase) {
      logError('❌ Supabase not found in global scope');
      return { success: false, error: 'Supabase not available' };
    }
    
    // Get user ID from localStorage
    const userId = localStorage.getItem('discord_services_user_id') || 'test_user_' + Date.now();
    
    const testReaction = {
      testimonial_id: testimonialId,
      user_id: userId,
      reaction_type: '👍'
    };
    
    log('📝 Inserting test reaction:', testReaction);
    
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .insert([testReaction])
      .select()
      .single();
    
    if (error) {
      logError('❌ Reaction insertion failed:', error);
      return { success: false, error };
    }
    
    log('✅ Test reaction inserted successfully:', data);
    
    // Clean up - remove the test reaction
    const { error: deleteError } = await supabase
      .from('testimonial_reactions')
      .delete()
      .eq('id', data.id);
    
    if (deleteError) {
      warn('⚠️ Failed to clean up test reaction:', deleteError);
    } else {
      log('🧹 Test reaction cleaned up');
    }
    
    return { success: true, data };
  } catch (error) {
    logError('❌ Test reaction insertion failed:', error);
    return { success: false, error };
  }
};

// Log user info
window.logUserInfo = () => {
  const userId = localStorage.getItem('discord_services_user_id');
  const userType = userId?.startsWith('session_') ? 'anonymous' : 'authenticated';
  
  log('🔍 User Info:');
  log('  ID:', userId);
  log('  Type:', userType);
  log('  Length:', userId?.length || 0);
  
  return { userId, userType };
};

// Reset user
window.resetUser = () => {
  log('🔄 Resetting user...');
  localStorage.removeItem('discord_services_user_id');
  const newUserId = 'session_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
  localStorage.setItem('discord_services_user_id', newUserId);
  log('✅ New user ID:', newUserId);
  return newUserId;
};

// Get all user-related localStorage keys
window.getAllUserIds = () => {
  const keys = Object.keys(localStorage);
  const userKeys = keys.filter(key => key.includes('user') || key.includes('discord'));
  
  log('🗂️ All user-related localStorage keys:');
  userKeys.forEach(key => {
    log(`  ${key}:`, localStorage.getItem(key));
  });
  
  return userKeys;
};

// Test reaction functionality
window.testReactionFlow = async () => {
  log('🧪 Testing complete reaction flow...');
  
  // Step 1: Check user ID
  const userInfo = window.logUserInfo();
  
  // Step 2: Test database connection
  const dbTest = await window.testDatabaseConnection();
  if (!dbTest.success) {
    logError('❌ Database connection failed, stopping test');
    return;
  }
  
  // Step 3: Test reaction insertion
  const insertTest = await window.testReactionInsert(1);
  if (!insertTest.success) {
    logError('❌ Reaction insertion failed');
    return;
  }
  
  log('✅ All tests passed!');
  log('💡 Now try clicking a reaction button to see if it works');
};

// Check emojis in database
window.checkEmojisInDatabase = async () => {
  log('🔍 Checking emojis in database...');
  
  try {
    const supabase = window.supabase || window.__SUPABASE__;
    if (!supabase) {
      logError('❌ Supabase not found in global scope');
      return { success: false, error: 'Supabase not available' };
    }
    
    // Get all reactions to see what emojis are stored
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .select('*')
      .limit(20);
    
    if (error) {
      logError('❌ Failed to fetch reactions:', error);
      return { success: false, error };
    }
    
    log('📊 Reactions in database:');
    data.forEach((reaction, index) => {
      log(`  ${index + 1}. ID: ${reaction.id}`);
      log(`     Testimonial: ${reaction.testimonial_id}`);
      log(`     User: ${reaction.user_id}`);
      log(`     Reaction: "${reaction.reaction_type}" (length: ${reaction.reaction_type.length})`);
      log(`     Created: ${reaction.created_at}`);
      log('');
    });
    
    // Check for unique reaction types
    const uniqueReactions = [...new Set(data.map(r => r.reaction_type))];
    log('🎯 Unique reaction types found:', uniqueReactions);
    
    return { success: true, data, uniqueReactions };
  } catch (error) {
    logError('❌ Failed to check emojis:', error);
    return { success: false, error };
  }
};

// Test reaction removal specifically
window.testReactionRemoval = async (testimonialId = 1) => {
  log('🧪 Testing reaction removal...');
  
  try {
    const supabase = window.supabase || window.__SUPABASE__;
    if (!supabase) {
      logError('❌ Supabase not found in global scope');
      return { success: false, error: 'Supabase not available' };
    }
    
    const userId = localStorage.getItem('discord_services_user_id') || 'test_user_' + Date.now();
    
    // First, add a test reaction
    const testReaction = {
      testimonial_id: testimonialId,
      user_id: userId,
      reaction_type: '🧪'
    };
    
    log('📝 Adding test reaction for removal test:', testReaction);
    
    const { data: addedReaction, error: addError } = await supabase
      .from('testimonial_reactions')
      .insert([testReaction])
      .select()
      .single();
    
    if (addError) {
      logError('❌ Failed to add test reaction:', addError);
      return { success: false, error: addError };
    }
    
    log('✅ Test reaction added:', addedReaction);
    
    // Now try to remove it
    log('🗑️ Attempting to remove test reaction...');
    
    const { data: removedData, error: removeError } = await supabase
      .from('testimonial_reactions')
      .delete()
      .eq('testimonial_id', testimonialId)
      .eq('user_id', userId)
      .eq('reaction_type', '🧪')
      .select();
    
    if (removeError) {
      logError('❌ Failed to remove test reaction:', removeError);
      return { success: false, error: removeError };
    }
    
    log('✅ Test reaction removed successfully:', removedData);
    
    // Verify it's gone
    const { data: verifyData, error: verifyError } = await supabase
      .from('testimonial_reactions')
      .select('*')
      .eq('testimonial_id', testimonialId)
      .eq('user_id', userId)
      .eq('reaction_type', '🧪');
    
    if (verifyError) {
      logError('❌ Failed to verify removal:', verifyError);
      return { success: false, error: verifyError };
    }
    
    if (verifyData.length === 0) {
      log('✅ Verification passed - reaction is gone from database');
      return { success: true, removed: removedData };
    } else {
      logError('❌ Verification failed - reaction still exists:', verifyData);
      return { success: false, error: 'Reaction still exists after removal' };
    }
    
  } catch (error) {
    logError('❌ Test reaction removal failed:', error);
    return { success: false, error };
  }
};

log('🧪 Test utilities loaded! Available functions:');
log('  testDatabaseConnection() - Test Supabase connection');
log('  testReactionInsert(testimonialId) - Test reaction insertion');
log('  testReactionRemoval(testimonialId) - Test reaction removal');
log('  logUserInfo() - Show current user info');
log('  resetUser() - Generate new user ID');
log('  getAllUserIds() - Show all localStorage keys');
log('  testReactionFlow() - Run all tests');
log('  checkEmojisInDatabase() - Check what emojis are stored'); 