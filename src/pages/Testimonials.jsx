import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import TestimonialForm from "../components/TestimonialForm";
import TestimonialAnalytics from "../components/TestimonialAnalytics";
import TestimonialList from "../components/TestimonialList";
import TestimonialWordCloud from "../components/TestimonialWordCloud";
import FormDebugPanel from "../components/FormDebugPanel";
import StatusMessage from "../components/StatusMessage";
import testimonialsData from "../testimonialsData";
import { sendToDiscord } from "../services/discordService";
import { 
  getPublicTestimonials, 
  addTestimonial, 
  getTestimonialStats,
  exportTestimonials,
  importTestimonials,
  clearTestimonials 
} from "../services/supabaseTestimonialService";

function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugFormData, setDebugFormData] = useState(null);
  const [storageStats, setStorageStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load testimonials on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Load public testimonials from Supabase
        const result = await getPublicTestimonials();
        
        if (result.success) {
          console.log(`Loaded ${result.testimonials.length} testimonials from Supabase`);
          setTestimonials(result.testimonials);
        } else {
          console.error('Error loading testimonials:', result.error);
          // Fallback to sample data if Supabase fails
          setTestimonials(testimonialsData);
        }
        
        // Load statistics
        const statsResult = await getTestimonialStats();
        if (statsResult.success) {
          setStorageStats(statsResult.stats);
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setTestimonials(testimonialsData);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

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
      
      // Add to Supabase database
      const result = await addTestimonial(data);
      
      if (result.success) {
        // Update local state
        setTestimonials(prev => [result.testimonial, ...prev]);
        
        // Update statistics
        const statsResult = await getTestimonialStats();
        if (statsResult.success) {
          setStorageStats(statsResult.stats);
        }
        
        setSubmissionStatus({ type: 'success', message: 'Testimonial submitted successfully!' });
        setTimeout(() => {
          setModalOpen(false);
          setSubmissionStatus({ type: null, message: '' });
          setIsSubmitting(false);
          setDebugFormData(null);
        }, 2000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Testimonial submission error:', error);
      setSubmissionStatus({ type: 'error', message: `Failed to submit testimonial: ${error.message}` });
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

  // Data management functions
  const handleExportData = () => {
    const result = exportTestimonials();
    if (result.success) {
      alert('Testimonials exported successfully!');
    } else {
      alert('Export failed: ' + result.error);
    }
  };

  const handleImportData = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const result = await importTestimonials(file);
    if (result.success) {
      alert(`Successfully imported ${result.count} testimonials!`);
      // Reload testimonials
      const reloadResult = await getPublicTestimonials();
      if (reloadResult.success) {
        setTestimonials(reloadResult.testimonials);
      }
      const statsResult = await getTestimonialStats();
      if (statsResult.success) {
        setStorageStats(statsResult.stats);
      }
    } else {
      alert('Import failed: ' + result.error);
    }
  };

  const handleClearData = async () => {
    if (confirm('Are you sure you want to clear all testimonials? This action cannot be undone.')) {
      const result = await clearTestimonials();
      if (result.success) {
        alert('All testimonials cleared successfully!');
        setTestimonials([]);
        setStorageStats(null);
      } else {
        alert('Clear failed: ' + result.error);
      }
    }
  };

  const handleViewStats = async () => {
    const statsResult = await getTestimonialStats();
    if (statsResult.success) {
      const stats = statsResult.stats;
      console.log('📊 Supabase Statistics:', stats);
      alert(`Supabase Stats:\nTotal: ${stats.total}\nApproved: ${stats.approved}\nPending: ${stats.pending}\nAvg Rating: ${stats.averageRating}`);
    } else {
      alert('Failed to load statistics: ' + statsResult.error);
    }
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
        onExportData={handleExportData}
        onImportData={handleImportData}
        onClearData={handleClearData}
        onViewStats={handleViewStats}
        storageStats={storageStats}
      />

      {/* Status Messages */}
      <StatusMessage
        message={submissionStatus.message}
        type={submissionStatus.type}
        onClose={() => setSubmissionStatus({ type: null, message: '' })}
      />

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
          {isLoading ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '200px',
              color: '#b9bbbe',
              fontSize: '1.2em'
            }}>
              Loading testimonials...
            </div>
          ) : (
            <>
              <TestimonialAnalytics testimonials={testimonials} />
              <TestimonialWordCloud testimonials={testimonials} />
              <TestimonialList testimonials={testimonials} />
            </>
          )}
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
