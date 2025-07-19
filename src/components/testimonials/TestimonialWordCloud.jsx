import React from "react";
import styles from "./TestimonialWordCloud.module.css";

function TestimonialWordCloud({ testimonials }) {
  // --- Word Cloud/Tags helpers ---
  const allFeatures = testimonials.flatMap(t => t.features_liked || t.featuresLiked || []);
  const featureCounts = allFeatures.reduce((acc, f) => { acc[f] = (acc[f] || 0) + 1; return acc; }, {});
  const sortedFeatures = Object.entries(featureCounts).sort((a, b) => b[1] - a[1]);

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

  return (
    <section className={styles.wordCloudContainer}>
      {/* Word Cloud */}
      <div className={styles.wordCloudCard}>
        <h3 className={styles.wordCloudTitle}>Most Common Words</h3>
        <div className={styles.wordCloudContent}>
          {topWords.map(([word, count], index) => {
            const fontSize = Math.max(0.9, Math.min(2.5, 1.2 + (count / Math.max(...topWords.map(([, c]) => c))) * 1.3));
            const opacity = 0.6 + (count / Math.max(...topWords.map(([, c]) => c))) * 0.4;
            return (
              <span 
                key={word} 
                className={styles.wordTag}
                style={{ 
                  padding: `${Math.max(4, fontSize * 3)}px ${Math.max(8, fontSize * 6)}px`, 
                  fontSize: `${fontSize}em`,
                  background: `rgba(88, 101, 242, ${opacity})`,
                  boxShadow: `0 2px ${fontSize * 4}px rgba(88, 101, 242, ${opacity * 0.3})`,
                  border: `1px solid rgba(88, 101, 242, ${opacity * 0.5})`
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
          {sortedFeatures.map(([tag, count]) => (
            <span 
              key={tag} 
              className={styles.featureTag}
              title={`${count} testimonials mention ${tag}`}
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