import React, { useState } from "react";
import Modal from "../components/Modal";
import TestimonialForm from "../components/TestimonialForm";
import TestimonialAnalytics from "../components/TestimonialAnalytics";
import TestimonialList from "../components/TestimonialList";
import TestimonialWordCloud from "../components/TestimonialWordCloud";
import testimonialsData from "../testimonialsData";

function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState(testimonialsData);

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
        <TestimonialWordCloud testimonials={testimonials} />

        {/* Sorting & Filtering Controls */}
        <section className="testimonials-controls" style={{ background: "#23272a", borderRadius: 14, padding: 20, marginBottom: 36, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ color: "#a3e3ff", fontWeight: 600, fontSize: "1.1em" }}>Sort & Filter</div>
          <div style={{ color: "#b9bbbe" }}><i>(Controls coming soon: sort by rating, date, filter by community, etc.)</i></div>
        </section>

        {/* Analytics Bar (Star Overview) */}
        <TestimonialAnalytics testimonials={testimonials} />

        {/* Scrolling Review Box */}
        <TestimonialList testimonials={testimonials} />
      </div>
    </section>
  );
}

export default Testimonials;
