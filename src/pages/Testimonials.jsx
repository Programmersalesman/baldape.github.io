import React, { useState, useEffect } from "react";
import Modal from "../components/ui/Modal";
import { LoadingSpinner } from "../components/ui";
import { 
  TestimonialForm,
  TestimonialAnalytics,
  TestimonialList,
  TestimonialWordCloud,
  TestimonialCarousel,
  TestimonialsHero
} from "../components/testimonials";
import FormDebugPanel from "../components/forms/FormDebugPanel";
import StatusMessage from "../components/ui/StatusMessage";
import testimonialsData from "../testimonialsData";
import { sendToDiscord } from "../services/discordService";
import styles from "./Testimonials.module.css";
import { 
  getPublicTestimonials, 
  addTestimonial, 
  getTestimonialStats,
  exportTestimonials,
  importTestimonials,
  clearTestimonials,
  subscribeToTestimonials
} from "../services/supabaseTestimonialService";
import { testSupabaseConnection } from "../services/testSupabaseConnection";


function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugFormData, setDebugFormData] = useState(null);
  const [storageStats, setStorageStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [featureFilter, setFeatureFilter] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');

  // Load testimonials on component mount and set up real-time subscriptions
  // Note: React StrictMode causes this to run twice in development
  useEffect(() => {
    console.log('🔄 Loading testimonials...');
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Load public testimonials from Supabase
        const result = await getPublicTestimonials();
        
        if (result.success) {
          console.log(`✅ Loaded ${result.testimonials.length} testimonials from Supabase`);
          setTestimonials(result.testimonials);
        } else {
          console.error('❌ Error loading testimonials:', result.error);
          // Fallback to sample data if Supabase fails
          setTestimonials(testimonialsData);
        }
        
        // Load statistics
        const statsResult = await getTestimonialStats();
        if (statsResult.success) {
          setStorageStats(statsResult.stats);
        }
      } catch (error) {
        console.error('❌ Error loading testimonials:', error);
        setTestimonials(testimonialsData);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
    
    // Set up real-time subscription for testimonials updates
    const subscription = subscribeToTestimonials((payload) => {
      console.log('🔄 Real-time update received:', payload);
      
      if (payload.eventType === 'INSERT' && payload.new.approved && payload.new.permission === 'public') {
        // New approved public testimonial added
        setTestimonials(prev => [payload.new, ...prev]);
        // Refresh statistics
        getTestimonialStats().then(result => {
          if (result.success) {
            setStorageStats(result.stats);
          }
        });
      } else if (payload.eventType === 'UPDATE') {
        // Testimonial updated (e.g., approved/rejected)
        if (payload.new.approved && payload.new.permission === 'public') {
          // Testimonial was approved and is public
          setTestimonials(prev => {
            const exists = prev.find(t => t.id === payload.new.id);
            if (!exists) {
              return [payload.new, ...prev];
            }
            return prev.map(t => t.id === payload.new.id ? payload.new : t);
          });
        } else {
          // Testimonial was rejected or made private, remove from public view
          setTestimonials(prev => prev.filter(t => t.id !== payload.new.id));
        }
        // Refresh statistics
        getTestimonialStats().then(result => {
          if (result.success) {
            setStorageStats(result.stats);
          }
        });
      } else if (payload.eventType === 'DELETE') {
        // Testimonial deleted
        setTestimonials(prev => prev.filter(t => t.id !== payload.old.id));
        // Refresh statistics
        getTestimonialStats().then(result => {
          if (result.success) {
            setStorageStats(result.stats);
          }
        });
      }
    });
    
    // Cleanup subscription on unmount
    return () => {
      console.log('🧹 Cleaning up real-time subscription');
      subscription.unsubscribe();
    };
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

  // Debug Functions - Simplified and focused
  const handleFillForm = () => {
    const testData = {
      name: "Test User",
      discord: "testuser#1234",
      community: "baldapes-lab",
      role: "member",
      email: "test@example.com",
      message: "This is a test testimonial submission from the testimonials page. The service was excellent and I would highly recommend it to others.",
      rating: 5,
      features: ["organization", "bots"],
      permission: "yes",
      anonymous: "public",
      date: new Date().toISOString().slice(0, 10)
    };
    
    console.log('📝 Filling form with test data:', testData);
    setDebugFormData(testData);
    alert('Form filled with test data! You can now submit using the regular submit button.');
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

  const handleViewStats = async () => {
    try {
      const statsResult = await getTestimonialStats();
      if (statsResult.success) {
        const stats = statsResult.stats;
        console.log('📊 Supabase Statistics:', stats);
        alert(`Database Stats:\nTotal: ${stats.total}\nApproved: ${stats.approved}\nPending: ${stats.pending}\nAvg Rating: ${stats.averageRating}`);
      } else {
        alert('Failed to load statistics: ' + statsResult.error);
      }
    } catch (error) {
      console.error('Error getting stats:', error);
      alert('Error getting statistics. Check console for details.');
    }
  };

  const handleReviewFormData = () => {
    console.log('📋 Current form data:', debugFormData);
    alert('Form data logged to console. Check browser console for details.');
  };

  const handleTestConnection = async () => {
    console.log('🧪 Running Supabase connection test...');
    const result = await testSupabaseConnection();
    console.log('🧪 Connection test result:', result);
    alert(`Connection test completed. Check console for details.\nSuccess: ${result.success}\nInsert Error: ${result.insertError?.message || 'None'}`);
  };

  // Handle star rating filtering from analytics
  const handleStarFilter = (rating) => {
    console.log('⭐ Star filter clicked:', rating);
    if (rating === null) {
      console.log('🔄 Clearing star filter, setting to newest');
      setSortBy('newest'); // Clear filter and go back to newest first
    } else {
      console.log(`⭐ Setting star filter to rating-${rating}`);
      setSortBy(`rating-${rating}`);
    }
  };

  // Handle feature filtering from word cloud
  const handleFeatureFilter = (feature) => {
    // This will be passed to TestimonialList
    setFeatureFilter(feature);
  };

  return (
    <>
      {/* Debug Panel - Only shows when modal is open */}
      <FormDebugPanel
        formType={modalOpen ? 'testimonial' : null}
        onFillForm={handleFillForm}
        onTestDiscordWebhook={handleTestDiscordWebhook}
        onReviewFormData={handleReviewFormData}
        formData={debugFormData}
        onViewStats={handleViewStats}
        onTestConnection={handleTestConnection}
        storageStats={storageStats}
      />

      {/* Status Messages */}
      <StatusMessage
        message={submissionStatus.message}
        type={submissionStatus.type}
        onClose={() => setSubmissionStatus({ type: null, message: '' })}
      />

      {/* Hero Section */}
      <TestimonialsHero onOpenModal={() => setModalOpen(true)} />

      {/* Main Testimonials Section */}
      <section className="section">
        <div className="container">
          {/* Carousel in main section */}
          {!isLoading && testimonials.length > 0 && (
            <div className={styles.carouselContainer}>
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          )}

          {/* Testimonials Content */}
          {isLoading ? (
            <LoadingSpinner message="Loading testimonials..." size="large" />
          ) : (
            <>
              <TestimonialWordCloud 
                testimonials={testimonials}
                onFeatureClick={handleFeatureFilter}
                selectedFeature={featureFilter}
              />
              <TestimonialAnalytics 
                testimonials={testimonials} 
                onStarClick={handleStarFilter}
                currentSort={sortBy}
              />
              <TestimonialList 
                testimonials={testimonials} 
                sortBy={sortBy}
                onSortChange={setSortBy}
                featureFilter={featureFilter}
                onFeatureFilterChange={setFeatureFilter}
              />
            </>
          )}
        </div>
      </section>

      {/* Modal for testimonial form */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <TestimonialForm 
          onSubmit={handleTestimonialSubmit}
          onClose={() => setModalOpen(false)}
          initialValues={debugFormData}
        />
      </Modal>
    </>
  );
}

export default Testimonials;
