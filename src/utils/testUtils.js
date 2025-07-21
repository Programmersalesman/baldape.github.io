// Test utilities for debugging user identification and reactions

import { getUserId, clearUserId, getUserType } from './userIdentifier';
import { supabase } from '../services/supabaseClient';

// Log current user info
export const logUserInfo = () => {
  const userId = getUserId();
  const userType = getUserType();
  
  console.log('🔍 User Info:');
  console.log('  ID:', userId);
  console.log('  Type:', userType);
  console.log('  Length:', userId.length);
  
  return { userId, userType };
};

// Clear user ID and generate new one
export const resetUser = () => {
  console.log('🔄 Resetting user...');
  clearUserId();
  const newUserId = getUserId();
  console.log('✅ New user ID:', newUserId);
  return newUserId;
};

// Test database connection
export const testDatabaseConnection = async () => {
  console.log('🔌 Testing database connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error);
      return { success: false, error };
    }
    
    console.log('✅ Database connection successful');
    console.log('📊 Sample data:', data);
    
    return { success: true, data };
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return { success: false, error };
  }
};

// Test reaction insertion
export const testReactionInsert = async (testimonialId = 1) => {
  console.log('🧪 Testing reaction insertion...');
  
  const userId = getUserId();
  const testReaction = {
    testimonial_id: testimonialId,
    user_id: userId,
    reaction_type: '👍'
  };
  
  console.log('📝 Inserting test reaction:', testReaction);
  
  try {
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .insert([testReaction])
      .select()
      .single();
    
    if (error) {
      console.error('❌ Reaction insertion failed:', error);
      return { success: false, error };
    }
    
    console.log('✅ Test reaction inserted successfully:', data);
    
    // Clean up - remove the test reaction
    const { error: deleteError } = await supabase
      .from('testimonial_reactions')
      .delete()
      .eq('id', data.id);
    
    if (deleteError) {
      console.warn('⚠️ Failed to clean up test reaction:', deleteError);
    } else {
      console.log('🧹 Test reaction cleaned up');
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('❌ Test reaction insertion failed:', error);
    return { success: false, error };
  }
};

// Test reaction isolation
export const testReactionIsolation = async (testimonialId) => {
  console.log('🧪 Testing reaction isolation...');
  
  const { userId } = logUserInfo();
  
  // This would be useful for testing if we had access to the reaction service here
  console.log('📝 To test reaction isolation:');
  console.log('  1. Add a reaction to testimonial', testimonialId);
  console.log('  2. Reset user with resetUser()');
  console.log('  3. Check that the reaction is no longer selected');
  
  return userId;
};

// Get all user IDs from localStorage (for debugging)
export const getAllUserIds = () => {
  const keys = Object.keys(localStorage);
  const userKeys = keys.filter(key => key.includes('user') || key.includes('discord'));
  
  console.log('🗂️ All user-related localStorage keys:');
  userKeys.forEach(key => {
    console.log(`  ${key}:`, localStorage.getItem(key));
  });
  
  return userKeys;
}; 