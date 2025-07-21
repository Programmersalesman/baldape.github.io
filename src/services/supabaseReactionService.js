import { supabase, handleSupabaseError } from './supabaseClient'
import { getUserId } from '../utils/userIdentifier'
import { log, warn, error as logError } from '../utils/logger';

// Reaction types: key->emoji map
export const REACTION_TYPES = {
  LIKE: { key: 'like', emoji: '👍' },
  LOVE: { key: 'love', emoji: '❤️' },
  HAHA: { key: 'haha', emoji: '😂' },
  YAY: { key: 'yay', emoji: '🎉' },
  WOW: { key: 'wow', emoji: '😮' },
  SAD: { key: 'sad', emoji: '😢' },
  ANGRY: { key: 'angry', emoji: '😠' }
};

// Helper to get emoji from key
export const getEmojiForKey = (key) => {
  const entry = Object.values(REACTION_TYPES).find(r => r.key === key);
  return entry ? entry.emoji : key;
};

// Add a reaction to a testimonial (uses key)
export const addReaction = async (testimonialId, reactionKey, userId = null) => {
  try {
    const currentUserId = userId || getUserId();
    log('➕ Adding reaction:', { testimonialId, reactionKey, currentUserId });
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .insert([{
        testimonial_id: testimonialId,
        user_id: currentUserId,
        reaction_type: reactionKey
      }])
      .select()
      .single()
    if (error) { logError('❌ Supabase error adding reaction:', error); throw error; }
    log('✅ Reaction added successfully:', data);
    return { success: true, reaction: data }
  } catch (error) {
    logError('Error adding reaction:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Remove a reaction from a testimonial (uses key)
export const removeReaction = async (testimonialId, reactionKey, userId = null) => {
  try {
    const currentUserId = userId || getUserId();
    log('🗑️ Removing reaction:', { testimonialId, reactionKey, currentUserId });
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .delete()
      .eq('testimonial_id', testimonialId)
      .eq('user_id', currentUserId)
      .eq('reaction_type', reactionKey)
      .select()
    if (error) { logError('❌ Supabase error removing reaction:', error); throw error; }
    log('✅ Reaction removed successfully:', data);
    return { success: true, removedCount: data?.length || 0 }
  } catch (error) {
    logError('Error removing reaction:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Get reaction counts for a testimonial (alias for getReactionCounts)
export const getTestimonialReactions = async (testimonialId) => {
  return await getReactionCounts(testimonialId)
}

// Get reaction counts for multiple testimonials
export const getTestimonialsReactions = async (testimonialIds) => {
  try {
    const { data, error } = await supabase
      .from('testimonial_reaction_counts')
      .select('*')
      .in('testimonial_id', testimonialIds)
    
    if (error) throw error
    
    // Group by testimonial_id
    const reactionsMap = {};
    data.forEach(reaction => {
      if (!reactionsMap[reaction.testimonial_id]) {
        reactionsMap[reaction.testimonial_id] = {};
      }
      reactionsMap[reaction.testimonial_id][reaction.reaction_type] = reaction.count;
    });
    
    return { success: true, reactions: reactionsMap }
  } catch (error) {
    logError('Error getting testimonials reactions:', error)
    return { success: false, error: handleSupabaseError(error), reactions: {} }
  }
}

// Get reaction counts for a testimonial
export const getReactionCounts = async (testimonialId) => {
  try {
    const { data, error } = await supabase
      .from('testimonial_reaction_counts')
      .select('*')
      .eq('testimonial_id', testimonialId)
    
    if (error) throw error
    
    return { success: true, counts: data || [] }
  } catch (error) {
    logError('Error getting reaction counts:', error)
    return { success: false, error: handleSupabaseError(error), counts: [] }
  }
}

// Get reaction summary for a testimonial (with user's reactions)
export const getReactionSummary = async (testimonialId, userId = 'anonymous') => {
  try {
    const { data, error } = await supabase
      .rpc('get_testimonial_reaction_summary', { testimonial_id: testimonialId })
    
    if (error) throw error
    
    return { success: true, summary: data || [] }
  } catch (error) {
    logError('Error getting reaction summary:', error)
    return { success: false, error: handleSupabaseError(error), summary: [] }
  }
}

// Get user's reactions for a testimonial (returns keys)
export const getUserReactions = async (testimonialId, userId = null) => {
  try {
    const currentUserId = userId || getUserId();
    const { data, error } = await supabase
      .from('testimonial_reactions')
      .select('reaction_type')
      .eq('testimonial_id', testimonialId)
      .eq('user_id', currentUserId)
    if (error) throw error
    return { success: true, reactions: data.map(r => r.reaction_type) || [] }
  } catch (error) {
    logError('Error getting user reactions:', error)
    return { success: false, error: handleSupabaseError(error), reactions: [] }
  }
}

// Toggle a reaction (add if not exists, remove if exists) (uses key)
export const toggleReaction = async (testimonialId, reactionKey, userId = null) => {
  try {
    const currentUserId = userId || getUserId();
    log('🔄 Toggling reaction:', { testimonialId, reactionKey, currentUserId });
    const { data: existingReaction, error: checkError } = await supabase
      .from('testimonial_reactions')
      .select('id')
      .eq('testimonial_id', testimonialId)
      .eq('user_id', currentUserId)
      .eq('reaction_type', reactionKey)
      .single()
    if (checkError && checkError.code !== 'PGRST116') { logError('❌ Error checking existing reaction:', checkError); throw checkError; }
    log('🔍 Existing reaction found:', existingReaction);
    if (existingReaction) {
      log('🗑️ Removing existing reaction');
      return await removeReaction(testimonialId, reactionKey, currentUserId)
    } else {
      log('➕ Adding new reaction');
      return await addReaction(testimonialId, reactionKey, currentUserId)
    }
  } catch (error) {
    logError('Error toggling reaction:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Get all reaction types available
export const getReactionTypes = () => {
  return Object.values(REACTION_TYPES).map(r => r.key);
}

// Subscribe to reaction updates
export const subscribeToReactions = (testimonialId, callback) => {
  return supabase
    .channel(`reactions_${testimonialId}`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'testimonial_reactions',
        filter: `testimonial_id=eq.${testimonialId}`
      }, 
      callback
    )
    .subscribe()
}

// Get reaction statistics across all testimonials
export const getReactionStats = async () => {
  try {
    const { data, error } = await supabase
      .from('testimonial_reaction_counts')
      .select('*')
    
    if (error) throw error
    
    const stats = data.reduce((acc, reaction) => {
      acc[reaction.reaction_type] = (acc[reaction.reaction_type] || 0) + reaction.count
      return acc
    }, {})
    
    return { success: true, stats }
  } catch (error) {
    logError('Error getting reaction stats:', error)
    return { success: false, error: handleSupabaseError(error), stats: {} }
  }
} 