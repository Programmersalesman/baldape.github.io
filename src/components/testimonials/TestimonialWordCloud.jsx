import React from "react";
import styles from "./TestimonialWordCloud.module.css";

function TestimonialWordCloud({ testimonials, onFeatureClick, selectedFeature }) {
  // --- Word Cloud/Tags helpers ---
  const allFeatures = testimonials.flatMap(t => t.features_liked || t.featuresLiked || []);
  const featureCounts = allFeatures.reduce((acc, f) => { acc[f] = (acc[f] || 0) + 1; return acc; }, {});
  // Only show features with 2 or more selections
  const sortedFeatures = Object.entries(featureCounts)
    .filter(([tag, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1]);

  // Extract common words from testimonials
  const commonWords = testimonials.flatMap(t => {
    const text = (t.text || t.message || '').toLowerCase();
    return text.split(/\s+/)
      .filter(word => word.length > 3 && !['the', 'and', 'for', 'with', 'this', 'that', 'have', 'been', 'they', 'from', 'were', 'very', 'much', 'good', 'great', 'nice', 'like', 'love', 'best', 'amazing', 'awesome', 'excellent', 'outstanding', 'fantastic', 'wonderful', 'perfect', 'incredible', 'unbelievable', 'exceptional', 'remarkable', 'extraordinary', 'phenomenal', 'magnificent', 'splendid', 'brilliant', 'superb', 'outstanding', 'excellent', 'amazing', 'awesome', 'fantastic', 'wonderful', 'perfect', 'incredible', 'unbelievable', 'exceptional', 'remarkable', 'extraordinary', 'phenomenal', 'magnificent', 'splendid', 'brilliant', 'superb'].includes(word))
      .map(word => word.replace(/[^\w]/g, ''));
  });
  
  const wordCounts = commonWords.reduce((acc, word) => {
    if (word.length > 3) {
      acc[word] = (acc[word] || 0) + 1;
    }
    return acc;
  }, {});
  
  const topWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .filter(([word, count]) => count > 1);

  // Generate random positions for a more cloud-like appearance
  const generateCloudPosition = (index, total, count, maxCount) => {
    // Calculate frequency-based radius - more common words closer to center
    const frequencyRatio = count / maxCount;
    const baseRadius = 20 + (1 - frequencyRatio) * 80; // 20px for most common, up to 100px for least common
    
    // Create a more organic cloud shape with multiple layers
    const layer = Math.floor(Math.random() * 3); // 0, 1, or 2 layers
    const radius = baseRadius + layer * 15 + Math.random() * 20; // Add some randomness within the frequency-based range
    
    const angle = (index / total) * 2 * Math.PI + (Math.random() - 0.5) * 1.2; // More random angle
    const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 20; // Reduced random X offset
    const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 20; // Reduced random Y offset
    const rotation = (Math.random() - 0.5) * 45; // Random rotation between -22.5 and 22.5 degrees
    const animationDelay = Math.random() * 2; // Random animation delay
    return { x, y, rotation, animationDelay };
  };

  return (
    <section className={styles.wordCloudContainer}>
      {/* Word Cloud */}
      <div className={styles.wordCloudCard}>
        <h3 className={styles.wordCloudTitle}>Most Common Words</h3>
        <div className={styles.wordCloudContent}>
          {topWords.map(([word, count], index) => {
            const fontSize = Math.max(0.9, Math.min(2.5, 1.2 + (count / Math.max(...topWords.map(([, c]) => c))) * 1.3));
            const opacity = 0.6 + (count / Math.max(...topWords.map(([, c]) => c))) * 0.4;
            const position = generateCloudPosition(index, topWords.length, count, Math.max(...topWords.map(([, c]) => c)));
            
            return (
              <span 
                key={word} 
                className={styles.wordTag}
                style={{ 
                  padding: `${Math.max(4, fontSize * 3)}px ${Math.max(8, fontSize * 6)}px`, 
                  fontSize: `${fontSize}em`,
                  background: `rgba(88, 101, 242, ${opacity})`,
                  boxShadow: `0 2px ${fontSize * 4}px rgba(88, 101, 242, ${opacity * 0.3})`,
                  border: `1px solid rgba(88, 101, 242, ${opacity * 0.5})`,
                  transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
                  position: 'relative',
                  zIndex: Math.floor(opacity * 10),
                  '--index': index,
                  '--rotation': `${position.rotation}deg`,
                  '--animation-delay': `${position.animationDelay}s`
                }}
                title={`"${word}" appears ${count} times`}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
      
      {/* Feature Tags */}
      <div className={styles.featureTagsCard}>
        <h3 className={styles.featureTagsTitle}>Popular Features</h3>
        <div className={styles.featureTagsContent}>
          <span 
            className={`${styles.featureTag} ${!selectedFeature ? styles.activeFeatureTag : ''}`}
            onClick={() => onFeatureClick && onFeatureClick(null)}
            title="Show all testimonials"
          >
            All Features
          </span>
          {sortedFeatures.map(([tag, count]) => (
            <span 
              key={tag} 
              className={`${styles.featureTag} ${selectedFeature === tag ? styles.activeFeatureTag : ''}`}
              onClick={() => onFeatureClick && onFeatureClick(tag)}
              title={`Click to filter by ${tag} (${count} testimonials)`}
            >
              {tag} <span className={styles.featureTagCount}>({count})</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialWordCloud; 