import React, { useState, useRef } from "react";
import Modal from "../components/ui/Modal";
import TestimonialForm from "../components/testimonials/TestimonialForm";
import ConsultationForm from "../components/forms/ConsultationForm";
import HeroSection from "../components/ui/HeroSection";
import FormDebugPanel from "../components/forms/FormDebugPanel";
import DebuggerPanel from "../components/debug/DebuggerPanel";
import ContactInfoCard from "../components/ui/ContactInfoCard";
import CTACard from "../components/ui/CTACard";
import FAQCard from "../components/ui/FAQCard";
import StatusMessage from "../components/ui/StatusMessage";
import { sendToDiscord } from "../services/discordService";
import { addTestimonial, exportTestimonials, importTestimonials, clearTestimonials, getTestimonialStats } from "../services/supabaseTestimonialService";
import { addConsultation, exportConsultations, importConsultations, clearConsultations, getConsultationStats } from "../services/supabaseConsultationService";
// import { CoreCalendar, CoreStar } from "@glyphs/react-core"; // Removed: package not found. Replace with another icon library if needed.
// import { CoreArrow } from '@glyphs/react-core'; // Removed: package not found. Replace with another icon library if needed.
// import { BrandsFigma } from '@glyphs/react-brands'; // Removed: package not found. Replace with another icon library if needed.
// import { FlagsCanada } from '@glyphs/react-flags'; // Removed: package not found. Replace with another icon library if needed.
import { CalendarIcon, StarIcon } from '../components/ui/v2/icons/glyphs';

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
      
      // Add to persistent storage
      const result = addTestimonial(testimonialData);
      
      if (result.success) {
        setSubmissionStatus({ type: 'success', message: 'Testimonial submitted successfully!' });
        setTimeout(() => {
          setOpenModal(null);
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
      
      // Add to Supabase database
      const result = await addConsultation(consultationData);
      
      if (result.success) {
        setSubmissionStatus({ type: 'success', message: 'Consultation request submitted successfully!' });
        setTimeout(() => {
          setOpenModal(null);
          setSubmissionStatus({ type: null, message: '' });
          setIsSubmitting(false);
          setDebugFormData(null);
        }, 2000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Consultation submission error:', error);
      setSubmissionStatus({ type: 'error', message: `Failed to submit consultation request: ${error.message}` });
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
          community: "baldapes-lab",
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

  // Data management functions
  const handleExportData = async () => {
    if (openModal === 'testimonial') {
      const result = await exportTestimonials();
      if (result.success) {
        alert('Testimonials exported successfully!');
      } else {
        alert('Export failed: ' + result.error);
      }
    } else if (openModal === 'consultation') {
      const result = await exportConsultations();
      if (result.success) {
        alert('Consultations exported successfully!');
      } else {
        alert('Export failed: ' + result.error);
      }
    }
  };

  const handleImportData = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (openModal === 'testimonial') {
      const result = await importTestimonials(file);
      if (result.success) {
        alert(`Successfully imported ${result.count} testimonials!`);
      } else {
        alert('Import failed: ' + result.error);
      }
    } else if (openModal === 'consultation') {
      const result = await importConsultations(file);
      if (result.success) {
        alert(`Successfully imported ${result.count} consultations!`);
      } else {
        alert('Import failed: ' + result.error);
      }
    }
  };

  const handleClearData = async () => {
    const dataType = openModal === 'testimonial' ? 'testimonials' : 'consultations';
    if (confirm(`Are you sure you want to clear all ${dataType}? This action cannot be undone.`)) {
      const result = openModal === 'testimonial' ? await clearTestimonials() : await clearConsultations();
      if (result.success) {
        alert(`All ${dataType} cleared successfully!`);
      } else {
        alert('Clear failed: ' + result.error);
      }
    }
  };

  const handleViewStats = async () => {
    if (openModal === 'testimonial') {
      const statsResult = await getTestimonialStats();
      if (statsResult.success) {
        const stats = statsResult.stats;
        console.log('📊 Testimonial Statistics:', stats);
        alert(`Testimonial Stats:\nTotal: ${stats.total}\nApproved: ${stats.approved}\nPending: ${stats.pending}\nAvg Rating: ${stats.averageRating}`);
      } else {
        alert('Failed to load testimonial statistics: ' + statsResult.error);
      }
    } else if (openModal === 'consultation') {
      const statsResult = await getConsultationStats();
      if (statsResult.success) {
        const stats = statsResult.stats;
        console.log('📊 Consultation Statistics:', stats);
        alert(`Consultation Stats:\nTotal: ${stats.total}\nPending: ${stats.statusStats.pending || 0}\nCompleted: ${stats.statusStats.completed || 0}\nAvg Budget: $${stats.averageBudget}`);
      } else {
        alert('Failed to load consultation statistics: ' + statsResult.error);
      }
    }
  };

  return (
    <div>
      <HeroSection 
        title="Contact"
        subtitle="Get in touch to discuss your Discord server needs or request a consultation."
      />
      {/* DebuggerPanel wraps all debug tools */}
      <DebuggerPanel>
        <FormDebugPanel
          formType={openModal}
          onFillForm={handleFillForm}
          onTestSubmission={handleTestSubmission}
          onTestDiscordWebhook={handleTestDiscordWebhook}
          onReviewFormData={handleReviewFormData}
          formData={debugFormData}
          onExportData={handleExportData}
          onImportData={handleImportData}
          onClearData={handleClearData}
          onViewStats={handleViewStats}
          storageStats={openModal === 'testimonial' ? getTestimonialStats() : getConsultationStats()}
        />
        {/* Add more debug panels here if needed */}
      </DebuggerPanel>
      {/* Contact Info Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-header">Contact Information</h2>
          <div className="faq-grid">
            <ContactInfoCard 
              icon="📧" 
              title="Email" 
              value="baldape@example.com"
              link="mailto:baldape@example.com"
            />
            <ContactInfoCard 
              icon="💬" 
              title="Discord" 
              value="BaldApe#1234"
            />
            <ContactInfoCard 
              icon="🌐" 
              title="Website" 
              value="www.baldapeservices.com"
              link="https://www.baldapeservices.com"
            />
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
            <CTACard
              icon={<CalendarIcon size={48} color="#2D9CDB" />}
              title="Book a Consultation"
              description="Schedule a free consultation to discuss your community's needs."
              onClick={() => setOpenModal("consultation")}
              gradient="linear-gradient(120deg, #a3e3ff 0%, #f0e9ff 100%)"
              shadowColor="rgba(88, 101, 242, 0.13)"
            />
            <CTACard
              icon={<StarIcon size={48} color="#F2C94C" />}
              title="Leave a Testimonial"
              description="Share your experience working with BaldApe Services."
              onClick={() => setOpenModal("testimonial")}
              gradient="linear-gradient(120deg, #ffe082 0%, #a3e3ff 100%)"
              shadowColor="rgba(242, 201, 76, 0.13)"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-light">
        <div className="container">
          <h2 className="section-header">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <FAQCard
              question="How quickly can you start working on my server?"
              answer="I typically can begin work within 1-3 days of receiving your requirements. For urgent projects, I can start the same day."
            />
            <FAQCard
              question="Do you work with all types of communities?"
              answer="Yes! I've worked with gaming communities, educational groups, business networks, and more. Every community is unique."
            />
            <FAQCard
              question="What if I'm not satisfied with the results?"
              answer="I offer revisions and adjustments to ensure you're completely happy with the final result. Your satisfaction is my priority."
            />
            <FAQCard
              question="Can you help with ongoing management?"
              answer="Absolutely! I offer ongoing management services to help maintain and grow your community over time."
            />
            <FAQCard
              question="Do you provide training for your team?"
              answer="Yes, I can train your moderators and administrators on best practices for community management."
            />
            <FAQCard
              question="What's included in the consultation?"
              answer="The free consultation includes a detailed analysis of your current setup, goal setting, and a customized action plan."
            />
          </div>
        </div>
      </section>

      {/* Status Messages */}
      <StatusMessage
        message={submissionStatus.message}
        type={submissionStatus.type}
        onClose={() => setSubmissionStatus({ type: null, message: '' })}
      />

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
