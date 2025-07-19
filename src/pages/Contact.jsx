import React, { useState } from "react";
import Modal from "../components/Modal";
import TestimonialForm from "../components/TestimonialForm";
import ConsultationForm from "../components/ConsultationForm";
import HeroSection from "../components/HeroSection";

function Contact() {
  const [openModal, setOpenModal] = useState(null); // 'consultation' | 'testimonial' | null

  const handleTestimonialSubmit = (testimonialData) => {
    // Handle testimonial submission
    console.log('Testimonial submitted:', testimonialData);
    // Here you would typically send the data to your backend or API
    // For now, we'll just log it and close the modal after a delay
    setTimeout(() => {
      setOpenModal(null);
    }, 2000);
  };

  const handleConsultationSubmit = (consultationData) => {
    // Handle consultation submission
    console.log('Consultation submitted:', consultationData);
    // Here you would typically send the data to your backend or API
    // For now, we'll just log it and close the modal after a delay
    setTimeout(() => {
      setOpenModal(null);
    }, 2000);
  };

  return (
    <div>
      <HeroSection 
        title="Contact"
        subtitle="Get in touch to discuss your Discord server needs or request a consultation."
      />

      {/* Contact Info Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-header">Contact Information</h2>
          <div className="faq-grid">
            <div className="frosted-card" style={{ textAlign: "center", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📧</div>
              <h3 style={{ fontWeight: 700, fontSize: "1.2em", marginBottom: 4 }}>Email</h3>
              <div style={{ color: "#444", fontSize: "1.05em" }}>baldape@example.com</div>
            </div>
            <div className="frosted-card" style={{ textAlign: "center", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
              <h3 style={{ fontWeight: 700, fontSize: "1.2em", marginBottom: 4 }}>Discord</h3>
              <div style={{ color: "#444", fontSize: "1.05em" }}>BaldApe#1234</div>
            </div>
            <div className="frosted-card" style={{ textAlign: "center", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🌐</div>
              <h3 style={{ fontWeight: 700, fontSize: "1.2em", marginBottom: 4 }}>Website</h3>
              <div style={{ color: "#444", fontSize: "1.05em" }}>www.baldapeservices.com</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-header">Get in Touch</h2>
          <div className="faq-grid">
            <div
              className="cta-square-card"
              style={{
                cursor: "pointer",
                minHeight: 220,
                minWidth: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                background: "linear-gradient(120deg, #a3e3ff 0%, #f0e9ff 100%)",
                color: "#23272a",
                fontWeight: 700,
                fontSize: "1.15em",
                borderRadius: 18,
                boxShadow: "0 8px 32px rgba(88, 101, 242, 0.13), 0 2px 16px #0002",
                transition: "transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1)",
              }}
              onClick={() => setOpenModal("consultation")}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.06)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
              <div style={{ fontWeight: 800, fontSize: "1.18em", marginBottom: 8 }}>Book a Consultation</div>
              <div style={{ color: "#444", fontWeight: 500, fontSize: "1.05em" }}>
                Schedule a free consultation to discuss your community's needs.
              </div>
            </div>
            <div
              className="cta-square-card"
              style={{
                cursor: "pointer",
                minHeight: 220,
                minWidth: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                background: "linear-gradient(120deg, #ffe082 0%, #a3e3ff 100%)",
                color: "#23272a",
                fontWeight: 700,
                fontSize: "1.15em",
                borderRadius: 18,
                boxShadow: "0 8px 32px rgba(242, 201, 76, 0.13), 0 2px 16px #0002",
                transition: "transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1)",
              }}
              onClick={() => setOpenModal("testimonial")}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.06)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
              <div style={{ fontWeight: 800, fontSize: "1.18em", marginBottom: 8 }}>Leave a Testimonial</div>
              <div style={{ color: "#444", fontWeight: 500, fontSize: "1.05em" }}>
                Share your experience working with BaldApe Services.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-light">
        <div className="container">
          <h2 className="section-header">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-white-card" style={{ minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3>How quickly can you start working on my server?</h3>
              <p>I typically can begin work within 1-3 days of receiving your requirements. For urgent projects, I can start the same day.</p>
            </div>
            <div className="faq-white-card" style={{ minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3>Do you work with all types of communities?</h3>
              <p>Yes! I've worked with gaming communities, educational groups, business networks, and more. Every community is unique.</p>
            </div>
            <div className="faq-white-card" style={{ minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3>What if I'm not satisfied with the results?</h3>
              <p>I offer revisions and adjustments to ensure you're completely happy with the final result. Your satisfaction is my priority.</p>
            </div>
            <div className="faq-white-card" style={{ minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3>Can you help with ongoing management?</h3>
              <p>Absolutely! I offer ongoing management services to help maintain and grow your community over time.</p>
            </div>
            <div className="faq-white-card" style={{ minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3>Do you provide training for my team?</h3>
              <p>Yes, I can train your moderators and administrators on best practices for community management.</p>
            </div>
            <div className="faq-white-card" style={{ minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3>What's included in the consultation?</h3>
              <p>The free consultation includes a detailed analysis of your current setup, goal setting, and a customized action plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals for forms */}
      <Modal open={openModal === "consultation"} onClose={() => setOpenModal(null)}>
        <ConsultationForm 
          onSubmit={handleConsultationSubmit}
          onClose={() => setOpenModal(null)}
        />
      </Modal>
      
      <Modal open={openModal === "testimonial"} onClose={() => setOpenModal(null)}>
        <TestimonialForm 
          onSubmit={handleTestimonialSubmit}
          onClose={() => setOpenModal(null)}
        />
      </Modal>
    </div>
  );
}

export default Contact;
