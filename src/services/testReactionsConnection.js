import { supabase } from './supabaseClient';
import { 
  addReaction, 
  getTestimonialReactions, 
  getUserReactions,
  getTestimonialsReactions,
  REACTION_TYPES 
} from './supabaseReactionService';

// Test function to verify reactions functionality
export const testReactionsConnection = async () => {
  console.log('🧪 Testing Reactions Database Connection...');
  
  try {
    // Test 1: Check if testimonial_reactions table exists
    console.log('📋 Test 1: Checking table existence...');
    const { data: tableCheck, error: tableError } = await supabase
      .from('testimonial_reactions')
      .select('count(*)')
      .limit(1);
    
    if (tableError) {
      console.error('❌ Table check failed:', tableError);
      return { success: false, error: 'Table does not exist or access denied' };
    }
    
    console.log('✅ Table exists and is accessible');
    
    // Test 2: Try to get existing testimonials to test with
    console.log('📋 Test 2: Getting existing testimonials...');
    const { data: testimonials, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('id')
      .limit(1);
    
    if (testimonialsError || !testimonials || testimonials.length === 0) {
      console.log('⚠️ No testimonials found, creating test data...');
      // Create a test testimonial if none exist
      const { data: testTestimonial, error: createError } = await supabase
        .from('testimonials')
        .insert({
          name: 'Test User',
          text: 'This is a test testimonial for reactions testing',
          rating: 5,
          community: 'test'
        })
        .select()
        .single();
      
      if (createError) {
        console.error('❌ Failed to create test testimonial:', createError);
        return { success: false, error: 'Cannot create test data' };
      }
      
      console.log('✅ Created test testimonial:', testTestimonial.id);
      return { success: true, testimonialId: testTestimonial.id };
    }
    
    const testTestimonialId = testimonials[0].id;
    console.log('✅ Found testimonial to test with:', testTestimonialId);
    
    // Test 3: Add a reaction
    console.log('📋 Test 3: Adding a reaction...');
    const addResult = await addReaction(testTestimonialId, REACTION_TYPES.HELPFUL);
    if (!addResult.success) {
      console.error('❌ Failed to add reaction:', addResult.error);
      return { success: false, error: addResult.error };
    }
    console.log('✅ Reaction added successfully');
    
    // Test 4: Get reactions for the testimonial
    console.log('📋 Test 4: Getting reactions...');
    const getResult = await getTestimonialReactions(testTestimonialId);
    if (!getResult.success) {
      console.error('❌ Failed to get reactions:', getResult.error);
      return { success: false, error: getResult.error };
    }
    console.log('✅ Reactions retrieved:', getResult.counts);
    
    // Test 5: Get user's reactions
    console.log('📋 Test 5: Getting user reactions...');
    const userResult = await getUserReactions(testTestimonialId);
    if (!userResult.success) {
      console.error('❌ Failed to get user reactions:', userResult.error);
      return { success: false, error: userResult.error };
    }
    console.log('✅ User reactions retrieved:', userResult.reactionTypes);
    
    // Test 6: Update reaction
    console.log('📋 Test 6: Updating reaction...');
    const updateResult = await addReaction(testTestimonialId, REACTION_TYPES.LOVE);
    if (!updateResult.success) {
      console.error('❌ Failed to update reaction:', updateResult.error);
      return { success: false, error: updateResult.error };
    }
    console.log('✅ Reaction updated successfully');
    
    // Test 7: Get multiple testimonials reactions
    console.log('📋 Test 7: Getting multiple testimonials reactions...');
    const multiResult = await getTestimonialsReactions([testTestimonialId]);
    if (!multiResult.success) {
      console.error('❌ Failed to get multiple reactions:', multiResult.error);
      return { success: false, error: multiResult.error };
    }
    console.log('✅ Multiple reactions retrieved:', multiResult.counts);
    
    // Test 8: Remove reaction
    console.log('📋 Test 8: Removing reaction...');
    const removeResult = await removeReaction(testTestimonialId);
    if (!removeResult.success) {
      console.error('❌ Failed to remove reaction:', removeResult.error);
      return { success: false, error: removeResult.error };
    }
    console.log('✅ Reaction removed successfully');
    
    console.log('🎉 All tests passed! Reactions system is working correctly.');
    return { 
      success: true, 
      testimonialId: testTestimonialId,
      message: 'All reaction tests passed successfully'
    };
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return { success: false, error: error.message };
  }
};

// Function to run the test from browser console
if (typeof window !== 'undefined') {
  window.testReactionsConnection = testReactionsConnection;
  console.log('🧪 Reactions test function available as window.testReactionsConnection()');
} 