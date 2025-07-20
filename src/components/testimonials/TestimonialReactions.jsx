import React, { useState, useEffect } from "react";
import { 
  addReaction, 
  getTestimonialReactions, 
  getUserReactions,
  REACTION_TYPES 
} from "../../services/supabaseReactionService";
import styles from "./TestimonialReactions.module.css";

const reactions = [
  { emoji: REACTION_TYPES.HELPFUL, label: "Helpful", color: "#43b581" },
  { emoji: REACTION_TYPES.LOVE, label: "Love it", color: "#f04747" },
  { emoji: REACTION_TYPES.FIRE, label: "Fire", color: "#f59e0b" },
  { emoji: REACTION_TYPES.PERFECT, label: "Perfect", color: "#5865f2" },
  { emoji: REACTION_TYPES.NOT_HELPFUL, label: "Not helpful", color: "#747f8d" },
  { emoji: REACTION_TYPES.HMM, label: "Hmm", color: "#faa61a" }
];

function TestimonialReactions({ testimonialId, onReaction }) {
  const [selectedReactions, setSelectedReactions] = useState([]);
  const [reactionCounts, setReactionCounts] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Load reactions on component mount
  useEffect(() => {
    const loadReactions = async () => {
      // console.log('🔄 Loading reactions for testimonial:', testimonialId);
      try {
        // Get reaction counts for this testimonial
        const countsResult = await getTestimonialReactions(testimonialId);
        // console.log('📊 Counts result:', countsResult);
        if (countsResult.success) {
          setReactionCounts(countsResult.counts);
        }

        // Get user's reactions for this testimonial
        const userResult = await getUserReactions(testimonialId);
        // console.log('👤 User reactions result:', userResult);
        if (userResult.success) {
          // console.log('✅ Setting selected reactions:', userResult.reactionTypes);
          setSelectedReactions(userResult.reactionTypes);
        }
      } catch (error) {
        console.error('Error loading reactions:', error);
      }
    };

    if (testimonialId) {
      loadReactions();
    }
  }, [testimonialId]);

  const handleReaction = async (reaction) => {
    if (isLoading) return;
    
    // console.log('🎯 Handling reaction:', reaction.emoji, 'Current selected:', selectedReactions);
    
    setIsLoading(true);
    
    try {
      const result = await addReaction(testimonialId, reaction.emoji);
      // console.log('📝 Reaction result:', result);
      
      if (result.success) {
        if (result.action === 'added') {
          // Add reaction
          const newSelected = [...selectedReactions, reaction.emoji];
          // console.log('➕ Adding reaction, new selected:', newSelected);
          setSelectedReactions(newSelected);
          setReactionCounts(prev => ({
            ...prev,
            [reaction.emoji]: (prev[reaction.emoji] || 0) + 1
          }));
          onReaction?.(testimonialId, reaction.emoji, 'add');
        } else {
          // Remove reaction
          const newSelected = selectedReactions.filter(r => r !== reaction.emoji);
          // console.log('➖ Removing reaction, new selected:', newSelected);
          setSelectedReactions(newSelected);
          setReactionCounts(prev => ({
            ...prev,
            [reaction.emoji]: Math.max(0, (prev[reaction.emoji] || 0) - 1)
          }));
          onReaction?.(testimonialId, reaction.emoji, 'remove');
        }
      }
    } catch (error) {
      console.error('Error handling reaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.reactionsContainer}>
      <div className={styles.reactionsLabel}>Was this helpful?</div>
      <div className={styles.reactionsList}>
        {reactions.map((reaction) => (
          <button
            key={reaction.emoji}
            className={`${styles.reactionButton} ${
              selectedReactions.includes(reaction.emoji) ? styles.selected : ''
            } ${isLoading ? styles.loading : ''}`}
            onClick={() => handleReaction(reaction)}
            style={{
              '--reaction-color': reaction.color
            }}
            title={reaction.label}
            disabled={isLoading}
          >
            <span className={styles.reactionEmoji}>{reaction.emoji}</span>
            {reactionCounts[reaction.emoji] > 0 && (
              <span className={styles.reactionCount}>
                {reactionCounts[reaction.emoji]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TestimonialReactions; 