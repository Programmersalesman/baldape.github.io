import React, { useState } from "react";
import Modal from "../components/Modal";
import TestimonialForm from "../components/TestimonialForm";
import TestimonialAnalytics from "../components/TestimonialAnalytics";
import TestimonialList from "../components/TestimonialList";
import TestimonialWordCloud from "../components/TestimonialWordCloud";
import FormDebugPanel from "../components/FormDebugPanel";
import testimonialsData from "../testimonialsData";
import { sendToDiscord } from "../services/discordService";

function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [submissionStatus, setSubmissionStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugFormData, setDebugFormData] = useState(null);

  // Add new testimonial to the top of the list and send to Discord
  const handleTestimonialSubmit = async (data) => {
    if (isSubmitting) {
      console.log('🚫 Submission blocked - already submitting');
      return;
    }
    
    setIsSubmitting(true);
    setDebugFormData(data);
    
    try {
      console.log('📤 Sending testimonial to Discord:', data);
      // Send to Discord webhook
      await sendToDiscord(data, 'testimonial');
      
      // Add to local testimonials list
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
      
      setSubmissionStatus({ type: 'success', message: 'Testimonial submitted successfully!' });
      setTimeout(() => {
        setModalOpen(false);
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

  // Debug Functions
  const handleFillForm = () => {
    const testData = {
      name: "Test User",
      discord: "testuser#1234",
      community: "baldapes-lab",
      role: "member",
      email: "test@example.com",
      message: "This is a test testimonial submission from the testimonials page.",
      rating: 5,
      features: ["organization", "bots"],
      permission: "yes",
      anonymous: "public",
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
    
    console.log('🧪 Testing testimonial submission with:', debugFormData);
    handleTestimonialSubmit(debugFormData);
  };

  const handleTestDiscordWebhook = async () => {
    console.log('🧪 Testing Discord webhook...');
    try {
      const testData = { name: "Webhook Test", message: "Testing Discord webhook functionality" };
      await sendToDiscord(testData, 'testimonial');
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
    <>
      {/* Debug Panel - Only shows when modal is open */}
      <FormDebugPanel
        formType={modalOpen ? 'testimonial' : null}
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

        {/* Testimonials Content */}
        <div className="container">
          <TestimonialAnalytics testimonials={testimonials} />
          <TestimonialWordCloud testimonials={testimonials} />
          <TestimonialList testimonials={testimonials} />
        </div>

        {/* Modal for testimonial form */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <TestimonialForm 
            onSubmit={handleTestimonialSubmit}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      </section>
    </>
  );
}

export default Testimonials;
