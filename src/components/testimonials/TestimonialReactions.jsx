import React, { useState, useEffect } from "react";
import { 
  addReaction, 
  getTestimonialReactions, 
  getUserReactions,
  toggleReaction,
  REACTION_TYPES,
  getEmojiForKey
} from "../../services/supabaseReactionService";
import { getUserId } from "../../utils/userIdentifier";
import { log, warn, error as logError } from '../../utils/logger';
import styles from '../../styles/components/TestimonialReactions.module.css';

const reactions = [
  { key: REACTION_TYPES.LIKE.key, label: "Like", color: "linear-gradient(135deg, #43b581, #3ca374)" },
  { key: REACTION_TYPES.LOVE.key, label: "Love", color: "linear-gradient(135deg, #f04747, #d84040)" },
  { key: REACTION_TYPES.HAHA.key, label: "Haha", color: "linear-gradient(135deg, #f59e0b, #d97706)" },
  { key: REACTION_TYPES.YAY.key, label: "Yay", color: "linear-gradient(135deg, #5865f2, #4752c4)" },
  { key: REACTION_TYPES.WOW.key, label: "Wow", color: "linear-gradient(135deg, #747f8d, #5f6b7a)" },
  { key: REACTION_TYPES.SAD.key, label: "Sad", color: "linear-gradient(135deg, #faa61a, #f59e0b)" },
  { key: REACTION_TYPES.ANGRY.key, label: "Angry", color: "linear-gradient(135deg, #f5533d, #d84040)" }
];

function TestimonialReactions({ testimonialId, onReaction }) {
  // Safety check - don't render if testimonialId is invalid
  if (!testimonialId || (typeof testimonialId !== 'number' && typeof testimonialId !== 'string')) {
    warn('TestimonialReactions: Invalid testimonialId:', testimonialId);
    return null;
  }

  const [selectedReactions, setSelectedReactions] = useState([]); // keys
  const [reactionCounts, setReactionCounts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load reactions on component mount
  useEffect(() => {
    const loadReactions = async () => {
      if (!testimonialId) return;
      setError(null);
      const currentUserId = getUserId();
      log('🆔 Current user ID:', currentUserId);
      log('🔄 Loading reactions for testimonial:', testimonialId);
      try {
        // Get reaction counts for this testimonial
        const countsResult = await getTestimonialReactions(testimonialId);
        log('📊 Counts result:', countsResult);
        if (countsResult.success && countsResult.counts) {
          const countsMap = {};
          countsResult.counts.forEach(count => {
            if (count && count.reaction_type && typeof count.count === 'number') {
              countsMap[count.reaction_type] = count.count;
            }
          });
          setReactionCounts(countsMap);
        } else if (!countsResult.success) {
          logError('Failed to load reaction counts:', countsResult.error);
          setError('Failed to load reactions');
        }
        // Get user's reactions for this testimonial (returns keys)
        const userResult = await getUserReactions(testimonialId);
        log('👤 User reactions result:', userResult);
        if (userResult.success && userResult.reactions) {
          log('✅ Setting selected reactions:', userResult.reactions);
          setSelectedReactions(userResult.reactions.filter(r => r && typeof r === 'string'));
        } else if (!userResult.success) {
          logError('Failed to load user reactions:', userResult.error);
          setError('Failed to load user reactions');
        }
      } catch (error) {
        logError('Error loading reactions:', error);
        setError('Error loading reactions');
        setReactionCounts({});
        setSelectedReactions([]);
      }
    };
    loadReactions();
  }, [testimonialId]);

  const handleReaction = async (reaction) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await toggleReaction(testimonialId, reaction.key);
      if (result.success) {
        const isSelected = selectedReactions.includes(reaction.key);
        if (isSelected) {
          // Remove reaction
          const newSelected = selectedReactions.filter(r => r !== reaction.key);
          setSelectedReactions(newSelected);
          setReactionCounts(prev => ({
            ...prev,
            [reaction.key]: Math.max(0, (prev[reaction.key] || 0) - 1)
          }));
          onReaction?.(testimonialId, reaction.key, 'remove');
        } else {
          // Add reaction
          const newSelected = [...selectedReactions, reaction.key];
          setSelectedReactions(newSelected);
          setReactionCounts(prev => ({
            ...prev,
            [reaction.key]: (prev[reaction.key] || 0) + 1
          }));
          onReaction?.(testimonialId, reaction.key, 'add');
        }
      } else {
        logError('Reaction toggle failed:', result.error);
        setError('Failed to update reaction');
      }
    } catch (error) {
      logError('Error handling reaction:', error);
      setError('Error updating reaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.reactionsContainer}>
      <div className={styles.reactionsLabel}>Was this helpful?</div>
      {error && (
        <div className={styles.errorMessage} style={{ color: 'red', fontSize: '12px', marginBottom: '8px' }}>
          {error}
        </div>
      )}
      <div className={styles.reactionsList}>
        {reactions.map((reaction) => {
          const isSelected = selectedReactions.includes(reaction.key);
          return (
            <button
              key={reaction.key}
              className={`${styles.reactionButton} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleReaction(reaction)}
              disabled={isLoading}
              title={reaction.label}
              style={{ '--reaction-color': reaction.color }}
            >
              <span className={styles.reactionEmoji}>{getEmojiForKey(reaction.key)}</span>
              <span className={styles.reactionCount}>{reactionCounts[reaction.key] > 0 ? reactionCounts[reaction.key] : '\u00A0'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TestimonialReactions; 