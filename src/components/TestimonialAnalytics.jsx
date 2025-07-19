import React from "react";

// Analytics helpers
const getAverageRating = (data) => {
  if (!data.length) return 0;
  return (
    data.reduce((sum, t) => sum + (t.rating || 0), 0) / data.length
  ).toFixed(2);
};

const getRatingDistribution = (data) => {
  const dist = [0, 0, 0, 0, 0];
  data.forEach((t) => {
    if (t.rating >= 1 && t.rating <= 5) dist[t.rating - 1]++;
  });
  return dist;
};

function TestimonialAnalytics({ testimonials }) {
  const avgRating = getAverageRating(testimonials);
  const ratingDist = getRatingDistribution(testimonials);

  return (
    <section className="testimonials-analytics-bar" style={{ display: "flex", gap: 32, justifyContent: "space-between", alignItems: "center", background: "#23272a", borderRadius: 16, padding: "2rem 2.5rem", marginBottom: 36, flexWrap: "wrap" }}>
      {/* Average Rating */}
      <div style={{ flex: 1, minWidth: 180, textAlign: "center" }}>
        <div style={{ fontSize: "2.7rem", fontWeight: 700, color: "#fbbf24" }}>{avgRating}</div>
        <div style={{ color: "#a3e3ff", fontWeight: 600, fontSize: "1.1em" }}>Average Rating</div>
        <div style={{ fontSize: "1.5em", color: "#fbbf24" }}>{"★".repeat(Math.round(avgRating))}<span style={{ color: "#444" }}>{"★".repeat(5 - Math.round(avgRating))}</span></div>
      </div>
      {/* Total Reviews */}
      <div style={{ flex: 1, minWidth: 180, textAlign: "center" }}>
        <div style={{ fontSize: "2.7rem", fontWeight: 700, color: "#43b581" }}>{testimonials.length}</div>
        <div style={{ color: "#a3e3ff", fontWeight: 600, fontSize: "1.1em" }}>Total Reviews</div>
      </div>
      {/* Rating Distribution */}
      <div style={{ flex: 2, minWidth: 260 }}>
        <div style={{ color: "#a3e3ff", fontWeight: 600, marginBottom: 8 }}>Rating Distribution</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {ratingDist.map((count, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#fbbf24", fontSize: "1.1em", width: 24 }}>{5 - i}★</span>
              <div style={{ background: "#2c2f33", borderRadius: 6, height: 16, flex: 1, marginRight: 8 }}>
                <div style={{ background: "#5865F2", height: 16, borderRadius: 6, width: `${(count / testimonials.length) * 100 || 2}%`, minWidth: 2 }}></div>
              </div>
              <span style={{ color: "#b9bbbe", width: 32 }}>{count}</span>
            </div>
          )).reverse()}
        </div>
      </div>
    </section>
  );
}

export default TestimonialAnalytics; 