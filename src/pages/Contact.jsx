import React, { useState, useRef } from "react";
import Modal from "../components/Modal";
import TestimonialForm from "../components/TestimonialForm";
import ConsultationForm from "../components/ConsultationForm";
import HeroSection from "../components/HeroSection";
import FormDebugPanel from "../components/FormDebugPanel";
import { sendToDiscord } from "../services/discordService";

function Contact() {
  const [openModal, setOpenModal] = useState(null); // 'consultation' | 'testimonial' | null
  const [submissionStatus, setSubmissionStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugFormData, setDebugFormData] = useState(null);

  const handleTestimonialSubmit = async (testimonialData) => {
    if (isSubmitting) {
      console.log('🚫 Submission blocked - already submitting');
      return;
    }
    
    setIsSubmitting(true);
    setDebugFormData(testimonialData);
    
    try {
      console.log('📤 Sending testimonial to Discord:', testimonialData);
      await sendToDiscord(testimonialData, 'testimonial');
      setSubmissionStatus({ type: 'success', message: 'Testimonial submitted successfully!' });
      setTimeout(() => {
        setOpenModal(null);
        setSubmissionStatus({ type: null, message: '' });
        setIsSubmitting(false);
        setDebugFormData(null);
      }, 2000);
    } catch (error) {
      console.error('Testimonial submission error:', error);
      setSubmissionStatus({ type: 'error', message: 'Failed to submit testimonial. Please try again.' });
      setTimeout(() => {
        setSubmissionStatus({ type: null, message: '' });
        setIsSubmitting(false);
      }, 3000);
    }
  };

  const handleConsultationSubmit = async (consultationData) => {
    if (isSubmitting) {
      console.log('🚫 Submission blocked - already submitting');
      return;
    }
    
    setIsSubmitting(true);
    setDebugFormData(consultationData);
    
    try {
      console.log('📤 Sending consultation to Discord:', consultationData);
      await sendToDiscord(consultationData, 'consultation');
      setSubmissionStatus({ type: 'success', message: 'Consultation request submitted successfully!' });
      setTimeout(() => {
        setOpenModal(null);
        setSubmissionStatus({ type: null, message: '' });
        setIsSubmitting(false);
        setDebugFormData(null);
      }, 2000);
    } catch (error) {
      console.error('Consultation submission error:', error);
      setSubmissionStatus({ type: 'error', message: 'Failed to submit consultation request. Please try again.' });
      setTimeout(() => {
        setSubmissionStatus({ type: null, message: '' });
        setIsSubmitting(false);
      }, 3000);
    }
  };

  // Debug Functions
  const handleFillForm = () => {
    const testData = openModal === 'testimonial' 
      ? {
          name: "Test User",
          discord: "testuser#1234",
          community: "baldapes-lab",
          role: "member",
          email: "test@example.com",
          message: "This is a test testimonial submission.",
          rating: 5,
          features: ["organization", "bots"],
          permission: "yes",
          anonymous: "public",
          date: new Date().toISOString().slice(0, 10)
        }
      : {
          name: "Test User",
          email: "test@example.com",
          discord: "testuser#1234",
          community: "Test Community",
          memberCount: "101-500",
          services: ["quick-setup", "premium-setup"],
          goals: "Improve community engagement and organization",
          challenges: "Disorganized channels and low activity",
          timeline: "1-2-weeks",
          budget: "100-200",
          preferredTime: "afternoon",
          additionalInfo: "This is a test consultation request.",
          date: new Date().toISOString().slice(0, 10)
        };
    
    console.log('📝 Filling form with test data:', testData);
    setDebugFormData(testData);
    alert('Form filled with test data! You can now submit or modify the form.');
  };

  const handleTestSubmission = () => {
    if (!debugFormData) {
      alert('No form data to submit. Use "Fill Form" first.');
      return;
    }
    
    console.log('🧪 Testing form submission with:', debugFormData);
    if (openModal === 'testimonial') {
      handleTestimonialSubmit(debugFormData);
    } else {
      handleConsultationSubmit(debugFormData);
    }
  };

  const handleTestDiscordWebhook = async () => {
    console.log('🧪 Testing Discord webhook...');
    try {
      const testData = { name: "Webhook Test", message: "Testing Discord webhook functionality" };
      await sendToDiscord(testData, openModal);
      alert('Discord webhook test successful!');
    } catch (error) {
      alert('Discord webhook test failed: ' + error.message);
    }
  };

  const handleReviewFormData = () => {
    console.log('📋 Current form data:', debugFormData);
    alert('Form data logged to console. Check browser console for details.');
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
          <div className="section-subtitle">
            Ready to transform your Discord server? Let's discuss your needs.
          </div>
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
              <h3>Do you provide training for your team?</h3>
              <p>Yes, I can train your moderators and administrators on best practices for community management.</p>
            </div>
            <div className="faq-white-card" style={{ minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3>What's included in the consultation?</h3>
              <p>The free consultation includes a detailed analysis of your current setup, goal setting, and a customized action plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Debug Panel - Only shows when modals are open */}
      <FormDebugPanel
        formType={openModal}
        onFillForm={handleFillForm}
        onTestSubmission={handleTestSubmission}
        onTestDiscordWebhook={handleTestDiscordWebhook}
        onReviewFormData={handleReviewFormData}
        formData={debugFormData}
      />

      {/* Status Messages */}
      {submissionStatus.message && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 3001,
            background: submissionStatus.type === 'success' ? "#43b581" : "#f04747",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: "1.1em",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          {submissionStatus.message}
        </div>
      )}

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
