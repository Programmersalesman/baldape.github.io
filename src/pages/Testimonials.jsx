import React, { useState } from "react";
import Modal from "../components/Modal";
import TestimonialForm from "../components/TestimonialForm";
import testimonialsData from "../testimonialsData";

function StarRating({ value, onChange, readOnly }) {
  return (
    <div className="star-rating" style={{ fontSize: '1.3em', display: 'flex', flexDirection: 'row', gap: '0.15em', cursor: readOnly ? 'default' : 'pointer', marginBottom: 0 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ color: value >= star ? '#ffd700' : '#444', transition: 'color 0.2s' }}
          onClick={readOnly ? undefined : () => onChange(value === star ? 0 : star)}
          role={readOnly ? undefined : "button"}
          aria-label={readOnly ? undefined : `Rate ${star} star${star > 1 ? 's' : ''}`}
          tabIndex={readOnly ? undefined : 0}
        >
          ★
        </span>
      ))}
    </div>
  );
}

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

function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState(testimonialsData);

  const avgRating = getAverageRating(testimonials);
  const ratingDist = getRatingDistribution(testimonials);

  // --- Word Cloud/Tags helpers ---
  const allFeatures = testimonials.flatMap(t => t.featuresLiked || []);
  const featureCounts = allFeatures.reduce((acc, f) => { acc[f] = (acc[f] || 0) + 1; return acc; }, {});
  const sortedFeatures = Object.entries(featureCounts).sort((a, b) => b[1] - a[1]);

  // Add new testimonial to the top of the list
  const handleTestimonialSubmit = (data) => {
    setTestimonials(prev => [
      {
        ...data,
        id: Date.now().toString(),
        featuresLiked: data.features || [],
        text: data.message,
        permission: data.permission === "yes" ? "public" : "private",
      },
      ...prev,
    ]);
  };

  // --- Scrolling Review Box ---
  return (
    <section className="section testimonials-section" style={{ minHeight: "100vh", background: "#181a20" }}>
      {/* Hero Content - in a .container, above the main content container */}
      <div className="container" style={{ maxWidth: 1200, margin: "2.5rem auto 2.5rem auto" }}>
        <div
          className="testimonials-hero-bar"
          style={{
            background: "linear-gradient(90deg, #23272a 60%, #5865F2 100%)",
            borderRadius: 20,
            padding: "2.2rem 2.5rem 1.5rem 2.5rem",
            boxShadow: "0 2px 16px #0003",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2
            className="section-header"
            style={{ fontSize: "2.5rem", color: "#a3e3ff", marginBottom: 8 }}
          >
            Testimonials & Reviews
          </h2>
          <div style={{ color: "#b9bbbe", fontSize: "1.2em", marginBottom: 18 }}>
            Real feedback from communities and clients. Discover what makes our service stand out.
          </div>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              background: "linear-gradient(90deg, #5865F2 60%, #43b581 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1em",
              border: "none",
              borderRadius: 10,
              padding: "0.7em 2.1em",
              boxShadow: "0 2px 8px #0002",
              cursor: "pointer",
              transition: "background 0.2s, box-shadow 0.2s",
              marginTop: 4,
            }}
          >
            Leave a Testimonial
          </button>
        </div>
      </div>

      {/* Modal for testimonial submission */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <TestimonialForm onSubmit={handleTestimonialSubmit} onClose={() => setModalOpen(false)} />
      </Modal>

      {/* Main Content: Word Cloud, Sorting/Filtering, Analytics, and Scrolling Review Box */}
      <div className="container" style={{ maxWidth: 1100, margin: "0 auto", marginTop: 0 }}>
        {/* Word Cloud & Feature Tags */}
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

        {/* Sorting & Filtering Controls */}
        <section className="testimonials-controls" style={{ background: "#23272a", borderRadius: 14, padding: 20, marginBottom: 36, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ color: "#a3e3ff", fontWeight: 600, fontSize: "1.1em" }}>Sort & Filter</div>
          <div style={{ color: "#b9bbbe" }}><i>(Controls coming soon: sort by rating, date, filter by community, etc.)</i></div>
        </section>

        {/* Analytics Bar (Star Overview) */}
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

        {/* Scrolling Review Box */}
        <section
          className="testimonials-scroll-box"
          style={{
            background: "#23272a",
            borderRadius: 18,
            boxShadow: "0 2px 16px #0003",
            padding: "2.2rem 2.5rem 2.2rem 2.5rem",
            margin: "2.5rem 0 3.5rem 0",
            maxHeight: 520,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                borderBottom: "1.5px solid #36393f",
                paddingBottom: 24,
                marginBottom: 0,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                background: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 2 }}>
                <StarRating value={t.rating} readOnly />
                <span style={{ color: "#a3e3ff", fontWeight: 600, fontSize: "1.08em" }}>{t.name === "Anonymous" || t.permission === "anonymous" ? "Anonymous" : t.name}</span>
                <span style={{ color: "#aaa", fontSize: "0.98em" }}>{t.community}</span>
                <span style={{ color: "#43b581", fontSize: "0.98em" }}>{t.featuresLiked && t.featuresLiked.join(", ")}</span>
                <span style={{ color: "#888", fontSize: "0.93em", marginLeft: "auto" }}>{t.date}</span>
              </div>
              <div style={{ color: "#b9bbbe", fontSize: "1.13em", lineHeight: 1.6 }}>{t.text}</div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}

export default Testimonials;
