import React, { useState, useEffect } from "react";
import ProgressBar from "../ui/ProgressBar";
import { calculateFormProgress, fieldValidators } from "../../utils/formProgress";
import styles from "./ConsultationForm.module.css";

const defaultFields = {
  name: "",
  email: "",
  discord: "",
  community: "",
  memberCount: "",
  services: [],
  goals: "",
  challenges: "",
  timeline: "",
  budget: "",
  preferredTime: "",
  additionalInfo: "",
};

const serviceOptions = [
  { value: "quick-setup", label: "Quick Setup" },
  { value: "premium-setup", label: "Premium Setup" },
  { value: "server-audit", label: "Server Audit & Optimization" },
  { value: "ongoing-management", label: "Ongoing Management" },
  { value: "custom", label: "Custom Solution" },
];

const memberCountOptions = [
  { value: "1-50", label: "1-50 members" },
  { value: "51-100", label: "51-100 members" },
  { value: "101-500", label: "101-500 members" },
  { value: "501-1000", label: "501-1000 members" },
  { value: "1000+", label: "1000+ members" },
];

const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-2-weeks", label: "1-2 weeks" },
  { value: "1-month", label: "1 month" },
  { value: "flexible", label: "Flexible" },
];

const budgetOptions = [
  { value: "50-100", label: "$50-$100" },
  { value: "100-200", label: "$100-$200" },
  { value: "200-500", label: "$200-$500" },
  { value: "500+", label: "$500+" },
  { value: "discuss", label: "Let's discuss" },
];

const timeOptions = [
  { value: "morning", label: "Morning (9 AM - 12 PM EST)" },
  { value: "afternoon", label: "Afternoon (12 PM - 5 PM EST)" },
  { value: "evening", label: "Evening (5 PM - 9 PM EST)" },
  { value: "weekend", label: "Weekend" },
  { value: "flexible", label: "Flexible" },
];

function ConsultationForm({ onSubmit, onClose, initialValues }) {
  const [fields, setFields] = useState(initialValues || defaultFields);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Calculate form completion percentage
  const requiredFields = ['name', 'email', 'community', 'services', 'goals'];
  const progress = calculateFormProgress(fields, requiredFields, {
    email: fieldValidators.email
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFields((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((s) => s !== value),
      }));
    } else {
      setFields((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!fields.name.trim()) errs.name = "Name is required.";
    if (!fields.email.trim()) errs.email = "Email is required.";
    if (!fields.email.includes("@")) errs.email = "Please enter a valid email address.";
    if (!fields.community.trim()) errs.community = "Community name is required.";
    if (fields.services.length === 0) errs.services = "Please select at least one service.";
    if (!fields.goals.trim()) errs.goals = "Goals are required.";
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
      }, 2000);
    }
  };

  return (
    <form className={styles.consultationForm} autoComplete="off" onSubmit={handleSubmit}>
      <h2 className={styles.title}>Book Your Free Consultation</h2>
      <p className={styles.description}>
        Fill out the form below and I'll get back to you within 24 hours to schedule your consultation.
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
              className={styles.input}
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>Email Address *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={fields.email}
              onChange={handleChange}
              required 
              className={styles.input}
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>
        </div>
        <div className={styles.fieldRow}>
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
          <div className={styles.fieldGroup}>
            <label htmlFor="community" className={styles.label}>Community Name *</label>
            <input 
              type="text" 
              id="community" 
              name="community" 
              value={fields.community}
              onChange={handleChange}
              required 
              className={styles.input}
            />
            {errors.community && <div className={styles.error}>{errors.community}</div>}
          </div>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="memberCount" className={styles.label}>Current Member Count</label>
            <select 
              id="memberCount" 
              name="memberCount" 
              value={fields.memberCount}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select member count</option>
              {memberCountOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="services" className={styles.label}>Services of Interest *</label>
            <div className={styles.checkboxGroup}>
              {serviceOptions.map(opt => (
                <label key={opt.value} className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="services" 
                    value={opt.value} 
                    checked={fields.services.includes(opt.value)}
                    onChange={handleChange}
                  /> 
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            {errors.services && <div className={styles.error}>{errors.services}</div>}
          </div>
        </div>
        <div>
          <label htmlFor="goals" className={styles.label}>What are your main goals? *</label>
          <textarea 
            id="goals" 
            name="goals" 
            value={fields.goals}
            onChange={handleChange}
            rows={4} 
            required 
            className={styles.textarea}
          ></textarea>
          {errors.goals && <div className={styles.error}>{errors.goals}</div>}
        </div>
        <div>
          <label htmlFor="challenges" className={styles.label}>Current Challenges</label>
          <textarea 
            id="challenges" 
            name="challenges" 
            value={fields.challenges}
            onChange={handleChange}
            rows={3} 
            className={styles.textarea}
          ></textarea>
        </div>
        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="timeline" className={styles.label}>Preferred Timeline</label>
            <select 
              id="timeline" 
              name="timeline" 
              value={fields.timeline}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select timeline</option>
              {timelineOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="budget" className={styles.label}>Budget Range</label>
            <select 
              id="budget" 
              name="budget" 
              value={fields.budget}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select budget range</option>
              {budgetOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="preferredTime" className={styles.label}>Preferred Consultation Time</label>
            <select 
              id="preferredTime" 
              name="preferredTime" 
              value={fields.preferredTime}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select preferred time</option>
              {timeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="additionalInfo" className={styles.label}>Additional Information</label>
          <textarea 
            id="additionalInfo" 
            name="additionalInfo" 
            value={fields.additionalInfo}
            onChange={handleChange}
            rows={3} 
            className={styles.textarea}
          ></textarea>
        </div>
      </div>
      <div className={styles.formActions}>
        <button 
          type="submit" 
          className={styles.submitButton} 
          id="consultation-submit" 
          disabled={submitted}
        >
          {submitted ? "Thank you! We'll be in touch soon." : "Schedule Consultation"}
        </button>
        <button 
          type="button" 
          onClick={() => setFields(defaultFields)}
          className={styles.clearButton}
        >
          Clear
        </button>
      </div>
      {submitted && <div className={styles.successMessage}>Consultation request submitted!</div>}
    </form>
  );
}

export default ConsultationForm; 