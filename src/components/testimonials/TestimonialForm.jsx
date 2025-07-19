import React, { useState, useEffect } from "react";
import StarRating from "../ui/StarRating";
import ProgressBar from "../ui/ProgressBar";
import { calculateFormProgress, fieldValidators } from "../../utils/formProgress";
import styles from "./TestimonialForm.module.css";

const defaultFields = {
  name: "",
  discord: "",
  community: "",
  role: "",
  email: "",
  message: "",
  rating: 0,
  features: [],
  permission: "",
  anonymous: "public",
};

const featureOptions = [
  { value: "organization", label: "Organization" },
  { value: "bots", label: "Bot Integration" },
  { value: "support", label: "Support" },
  { value: "engagement", label: "Engagement" },
];

const communityOptions = [
  { value: "baldapes-lab", label: "BaldApe's Lab" },
  { value: "panda-picks", label: "Panda Picks" },
  { value: "sportsscijacob", label: "SportsSciJacob" },
  { value: "cantstopthecaptv", label: "CantStopTheCapTV" },
  { value: "betsbyraven", label: "BetsByRaven" },
];

const roleOptions = [
  { value: "member", label: "Regular Member" },
  { value: "vip", label: "VIP Member" },
  { value: "moderator", label: "Moderator" },
  { value: "admin-owner", label: "Admin/Owner" },
  { value: "other", label: "Other" },
];

function TestimonialForm({ onSubmit, onClose, initialValues }) {
  const [fields, setFields] = useState(initialValues || defaultFields);
  
  // Update fields when initialValues change (for debug panel)
  React.useEffect(() => {
    if (initialValues) {
      setFields(initialValues);
    }
  }, [initialValues]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Calculate form completion percentage
  const requiredFields = ['name', 'community', 'message', 'rating', 'permission'];
  const progress = calculateFormProgress(fields, requiredFields, {
    rating: fieldValidators.rating,
    permission: fieldValidators.permission
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFields((prev) => ({
        ...prev,
        features: checked
          ? [...prev.features, value]
          : prev.features.filter((f) => f !== value),
      }));
    } else if (type === "radio") {
      setFields((prev) => ({ ...prev, [name]: value }));
    } else {
      setFields((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRating = (val) => {
    setFields((prev) => ({ ...prev, rating: val }));
  };

  const validate = () => {
    const errs = {};
    if (!fields.name.trim()) errs.name = "Please enter your full name.";
    if (fields.name.trim().length < 2) errs.name = "Name must be at least 2 characters long.";
    if (!fields.community) errs.community = "Please select your community.";
    if (!fields.message.trim()) errs.message = "Please share your testimonial.";
    if (fields.message.trim().length < 10) errs.message = "Testimonial must be at least 10 characters long.";
    if (fields.message.trim().length > 1000) errs.message = "Testimonial must be 1000 characters or less.";
    if (!fields.rating) errs.rating = "Please provide a rating.";
    if (!fields.permission) errs.permission = "Please indicate if you give permission to use this testimonial.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit({ ...fields, date: new Date().toISOString().slice(0, 10) });
      setSubmitted(true);
      setFields(defaultFields);
      setTimeout(() => {
        setSubmitted(false);
        if (onClose) onClose();
      }, 1500);
    }
  };

  return (
    <form className={styles.testimonialForm} autoComplete="off" onSubmit={handleSubmit}>
      <h2 className={styles.title}>Share Your Experience</h2>
      <p className={styles.description}>
        Leave a testimonial about your experience working with BaldApe Services.
      </p>
      
      {/* Form Progress Indicator */}
      <ProgressBar progress={progress} />
      <div className={styles.formFields}>
        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="name" className={styles.label}>Full Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={fields.name} 
              onChange={handleChange} 
              required 
              placeholder="Enter your full name"
              aria-describedby={errors.name ? "name-error" : undefined}
              className={styles.input}
            />
            {errors.name && <div id="name-error" className={styles.error}>{errors.name}</div>}
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="discord" className={styles.label}>Discord Username</label>
            <input 
              type="text" 
              id="discord" 
              name="discord" 
              value={fields.discord} 
              onChange={handleChange} 
              placeholder="username#0000" 
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="community" className={styles.label}>Which Community Are You From? *</label>
            <select id="community" name="community" value={fields.community} onChange={handleChange} required className={styles.select}>
              <option value="">Select your community</option>
              {communityOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            {errors.community && <div className={styles.error}>{errors.community}</div>}
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="role" className={styles.label}>Your Role in the Community</label>
            <select id="role" name="role" value={fields.role} onChange={handleChange} className={styles.select}>
              <option value="">Select your role</option>
              {roleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={fields.email} 
              onChange={handleChange} 
              placeholder="Optional - for follow-up" 
              className={styles.input}
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className={styles.label}>Your Testimonial *</label>
          <textarea 
            id="message" 
            name="message" 
            value={fields.message} 
            onChange={handleChange} 
            rows={5} 
            required 
            placeholder="Share your experience working with BaldApe Services..."
            className={styles.textarea}
          />
          <div className={styles.charCountContainer}>
            {errors.message && <div className={styles.error}>{errors.message}</div>}
            <div className={`${styles.charCount} ${fields.message.length > 500 ? styles.error : ''}`}>
              {fields.message.length}/1000 characters
            </div>
          </div>
        </div>
        <div className={styles.ratingGroup}>
          <label htmlFor="rating" className={styles.label}>Rating *</label>
          <StarRating value={fields.rating} onChange={handleRating} />
          {errors.rating && <div className={styles.error}>{errors.rating}</div>}
        </div>
        <div>
          <label htmlFor="features" className={styles.label}>What Features Do You Like Most?</label>
          <div className={styles.checkboxGroup}>
            {featureOptions.map(opt => (
              <label key={opt.value} className={styles.checkboxLabel}>
                <input type="checkbox" name="features" value={opt.value} checked={fields.features.includes(opt.value)} onChange={handleChange} /> <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.fieldGroupWide}>
            <label className={styles.label}>Permission to Use Testimonial *</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input type="radio" name="permission" value="yes" checked={fields.permission === "yes"} onChange={handleChange} required /> <span>Yes, I give permission to use this testimonial on the website</span>
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="permission" value="no" checked={fields.permission === "no"} onChange={handleChange} /> <span>No, I do not give permission (testimonial will not be used)</span>
              </label>
            </div>
            {errors.permission && <div className={styles.error}>{errors.permission}</div>}
          </div>
          <div className={styles.fieldGroupWide}>
            <label className={styles.label}>Privacy Preference</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input type="radio" name="anonymous" value="public" checked={fields.anonymous === "public"} onChange={handleChange} /> <span>Public (show my username)</span>
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="anonymous" value="anonymous" checked={fields.anonymous === "anonymous"} onChange={handleChange} /> <span>Anonymous (hide my username)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Actions */}
      <div className={styles.formActions}>
        <button 
          type="submit" 
          className={styles.submitButton} 
          id="testimonial-submit" 
          disabled={submitted}
        >
          {submitted ? "Thank you!" : "Submit Testimonial"}
        </button>
        <button 
          type="button" 
          onClick={() => setFields(defaultFields)}
          className={styles.clearButton}
        >
          Clear
        </button>
      </div>
      
      {submitted && (
        <div className={styles.successMessage}>
          ✅ Testimonial submitted successfully! Thank you for sharing your experience.
        </div>
      )}
    </form>
  );
}

export default TestimonialForm; 