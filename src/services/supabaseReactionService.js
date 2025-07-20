import { supabase } from './supabaseClient';

// Reaction types
export const REACTION_TYPES = {
  HELPFUL: '👍',
  LOVE: '❤️',
  FIRE: '🔥',
  PERFECT: '💯',
  NOT_HELPFUL: '👎',
  HMM: '🤔'
};

// Add a reaction to a testimonial
export const addReaction = async (testimonialId, reactionType, userId = null) => {
  try {
    // console.log('📝 Adding reaction:', { testimonialId, reactionType, userId });
    
    // Check if user already has this specific reaction
    const { data: existingReactions, error: checkError } = await supabase
      .from('testimonial_reactions')
      .select('*')
      .eq('testimonial_id', testimonialId)
      .eq('user_id', userId || 'anonymous')
      .eq('reaction_type', reactionType);

    if (checkError) {
      console.error('❌ Error checking existing reactions:', checkError);
      return { success: false, error: checkError.message };
    }

    if (existingReactions && existingReactions.length > 0) {
      // User already has this reaction, remove it (toggle off)
      const { data, error } = await supabase
        .from('testimonial_reactions')
        .delete()
        .eq('testimonial_id', testimonialId)
        .eq('user_id', userId || 'anonymous')
        .eq('reaction_type', reactionType)
        .select();

      if (error) {
        console.error('❌ Error removing reaction:', error);
        return { success: false, error: error.message };
      }

      // console.log('✅ Reaction removed (toggled off):', data);
      return { success: true, reaction: data[0], action: 'removed' };
    } else {
      // Create new reaction
      const { data, error } = await supabase
        .from('testimonial_reactions')
        .insert({
          testimonial_id: testimonialId,
          user_id: userId || 'anonymous',
          reaction_type: reactionType,
          created_at: new Date().toISOString()
        })
        .select();

      if (error) {
        console.error('❌ Error creating reaction:', error);
        return { success: false, error: error.message };
      }

      // console.log('✅ Reaction created:', data[0]);
      return { success: true, reaction: data[0], action: 'added' };
    }
  } catch (error) {
    console.error('❌ Error in addReaction:', error);
    return { success: false, error: error.message };
  }
};

// Remove a reaction from a testimonial
export const removeReaction = async (testimonialId, userId = null) => {
  try {
    // console.log('🗑️ Removing reaction:', { testimonialId, userId });
    
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .delete()
      .eq('testimonial_id', testimonialId)
      .eq('user_id', userId || 'anonymous')
      .select();

    if (error) {
      console.error('❌ Error removing reaction:', error);
      return { success: false, error: error.message };
    }

    // console.log('✅ Reaction removed:', data);
    return { success: true, removed: data };
  } catch (error) {
    console.error('❌ Error in removeReaction:', error);
    return { success: false, error: error.message };
  }
};

// Get reactions for a testimonial
export const getTestimonialReactions = async (testimonialId) => {
  try {
    // console.log('📊 Getting reactions for testimonial:', testimonialId);
    
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .select('*')
      .eq('testimonial_id', testimonialId);

    if (error) {
      console.error('❌ Error getting reactions:', error);
      return { success: false, error: error.message };
    }

    // Group reactions by type and count them
    const reactionCounts = data.reduce((acc, reaction) => {
      acc[reaction.reaction_type] = (acc[reaction.reaction_type] || 0) + 1;
      return acc;
    }, {});

    // console.log('✅ Reactions retrieved:', reactionCounts);
    return { success: true, reactions: data, counts: reactionCounts };
  } catch (error) {
    console.error('❌ Error in getTestimonialReactions:', error);
    return { success: false, error: error.message };
  }
};

// Get user's reactions for a testimonial
export const getUserReactions = async (testimonialId, userId = null) => {
  try {
    // console.log('👤 Getting user reactions:', { testimonialId, userId });
    
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .select('*')
      .eq('testimonial_id', testimonialId)
      .eq('user_id', userId || 'anonymous');

    if (error) {
      console.error('❌ Error getting user reactions:', error);
      return { success: false, error: error.message };
    }

    // Return array of reaction types
    const reactionTypes = data.map(reaction => reaction.reaction_type);
    // console.log('✅ User reactions:', reactionTypes);
    return { success: true, reactions: data, reactionTypes };
  } catch (error) {
    console.error('❌ Error in getUserReactions:', error);
    return { success: false, error: error.message };
  }
};

// Get all reactions for multiple testimonials
export const getTestimonialsReactions = async (testimonialIds) => {
  try {
    // console.log('📊 Getting reactions for testimonials:', testimonialIds);
    
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .select('*')
      .in('testimonial_id', testimonialIds);

    if (error) {
      console.error('❌ Error getting testimonials reactions:', error);
      return { success: false, error: error.message };
    }

    // Group by testimonial ID
    const reactionsByTestimonial = data.reduce((acc, reaction) => {
      if (!acc[reaction.testimonial_id]) {
        acc[reaction.testimonial_id] = [];
      }
      acc[reaction.testimonial_id].push(reaction);
      return acc;
    }, {});

    // Calculate counts for each testimonial
    const countsByTestimonial = {};
    Object.keys(reactionsByTestimonial).forEach(testimonialId => {
      countsByTestimonial[testimonialId] = reactionsByTestimonial[testimonialId].reduce((acc, reaction) => {
        acc[reaction.reaction_type] = (acc[reaction.reaction_type] || 0) + 1;
        return acc;
      }, {});
    });

    // console.log('✅ Testimonials reactions retrieved:', countsByTestimonial);
    return { 
      success: true, 
      reactions: reactionsByTestimonial, 
      counts: countsByTestimonial 
    };
  } catch (error) {
    console.error('❌ Error in getTestimonialsReactions:', error);
    return { success: false, error: error.message };
  }
};

// Subscribe to reaction changes
export const subscribeToReactions = (callback) => {
  const subscription = supabase
    .channel('testimonial_reactions_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'testimonial_reactions'
      },
      (payload) => {
        // console.log('🔄 Reaction change received:', payload);
        callback(payload);
      }
    )
    .subscribe();

  return subscription;
}; 