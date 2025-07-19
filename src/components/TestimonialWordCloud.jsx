import React from "react";

function TestimonialWordCloud({ testimonials }) {
  // --- Word Cloud/Tags helpers ---
  const allFeatures = testimonials.flatMap(t => t.featuresLiked || []);
  const featureCounts = allFeatures.reduce((acc, f) => { acc[f] = (acc[f] || 0) + 1; return acc; }, {});
  const sortedFeatures = Object.entries(featureCounts).sort((a, b) => b[1] - a[1]);

  return (
    <section className="testimonials-wordcloud-tags" style={{ display: "flex", gap: 32, marginBottom: 36, flexWrap: "wrap" }}>
      {/* Word Cloud Placeholder */}
      <div style={{ flex: 2, minWidth: 260, background: "#23272a", borderRadius: 14, padding: 24, textAlign: "center" }}>
        <h3 style={{ color: "#a3e3ff", marginBottom: 12 }}>Most Common Words</h3>
        <div style={{ color: "#b9bbbe", fontSize: "1.1em" }}><i>(Word cloud visualization coming soon)</i></div>
      </div>
      {/* Feature Tags */}
      <div style={{ flex: 1, minWidth: 180, background: "#23272a", borderRadius: 14, padding: 24, textAlign: "center" }}>
        <h3 style={{ color: "#a3e3ff", marginBottom: 12 }}>Popular Features</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {sortedFeatures.map(([tag, count]) => (
            <span key={tag} style={{ background: "#5865F2", color: "#fff", borderRadius: 8, padding: "4px 12px", fontSize: "0.98em", margin: 2, cursor: "pointer" }}>{tag} <span style={{ color: "#b9bbbe", fontWeight: 400, marginLeft: 4 }}>({count})</span></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialWordCloud; 