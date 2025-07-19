import React from "react";
import StarRating from "./StarRating";

function TestimonialList({ testimonials }) {
  return (
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
  );
}

export default TestimonialList; 