import React, { useState } from "react";

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
    <form className="consultation-form" style={{ width: '100%', maxWidth: 900, margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} autoComplete="off" onSubmit={handleSubmit}>
      <h2 style={{ textAlign: "center", marginBottom: 18, fontSize: '2.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Book Your Free Consultation</h2>
      <p style={{ textAlign: "center", marginBottom: 40, fontSize: '1.25rem', color: '#b9bbbe', maxWidth: 700 }}>
        Fill out the form below and I'll get back to you within 24 hours to schedule your consultation.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem', width: '100%' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="name" style={{ color: '#e3e6ee', fontWeight: 600 }}>Full Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={fields.name}
              onChange={handleChange}
              required 
              style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} 
            />
            {errors.name && <div style={{ color: '#f04747', fontSize: '0.98em' }}>{errors.name}</div>}
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="email" style={{ color: '#e3e6ee', fontWeight: 600 }}>Email Address *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={fields.email}
              onChange={handleChange}
              required 
              style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} 
            />
            {errors.email && <div style={{ color: '#f04747', fontSize: '0.98em' }}>{errors.email}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="discord" style={{ color: '#e3e6ee', fontWeight: 600 }}>Discord Username</label>
            <input 
              type="text" 
              id="discord" 
              name="discord" 
              value={fields.discord}
              onChange={handleChange}
              placeholder="username#0000" 
              style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} 
            />
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="community" style={{ color: '#e3e6ee', fontWeight: 600 }}>Community Name *</label>
            <input 
              type="text" 
              id="community" 
              name="community" 
              value={fields.community}
              onChange={handleChange}
              required 
              style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} 
            />
            {errors.community && <div style={{ color: '#f04747', fontSize: '0.98em' }}>{errors.community}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="memberCount" style={{ color: '#e3e6ee', fontWeight: 600 }}>Current Member Count</label>
            <select 
              id="memberCount" 
              name="memberCount" 
              value={fields.memberCount}
              onChange={handleChange}
              style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}
            >
              <option value="">Select member count</option>
              {memberCountOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="services" style={{ color: '#e3e6ee', fontWeight: 600 }}>Services of Interest *</label>
            <div className="checkbox-group" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              {serviceOptions.map(opt => (
                <label key={opt.value} className="checkbox-label" style={{ color: '#f3f6fa', fontWeight: 400 }}>
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
            {errors.services && <div style={{ color: '#f04747', fontSize: '0.98em' }}>{errors.services}</div>}
          </div>
        </div>
        <div>
          <label htmlFor="goals" style={{ color: '#e3e6ee', fontWeight: 600 }}>What are your main goals? *</label>
          <textarea 
            id="goals" 
            name="goals" 
            value={fields.goals}
            onChange={handleChange}
            rows={4} 
            required 
            style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}
          ></textarea>
          {errors.goals && <div style={{ color: '#f04747', fontSize: '0.98em' }}>{errors.goals}</div>}
        </div>
        <div>
          <label htmlFor="challenges" style={{ color: '#e3e6ee', fontWeight: 600 }}>Current Challenges</label>
          <textarea 
            id="challenges" 
            name="challenges" 
            value={fields.challenges}
            onChange={handleChange}
            rows={3} 
            style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}
          ></textarea>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="timeline" style={{ color: '#e3e6ee', fontWeight: 600 }}>Preferred Timeline</label>
            <select 
              id="timeline" 
              name="timeline" 
              value={fields.timeline}
              onChange={handleChange}
              style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}
            >
              <option value="">Select timeline</option>
              {timelineOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="budget" style={{ color: '#e3e6ee', fontWeight: 600 }}>Budget Range</label>
            <select 
              id="budget" 
              name="budget" 
              value={fields.budget}
              onChange={handleChange}
              style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}
            >
              <option value="">Select budget range</option>
              {budgetOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="preferredTime" style={{ color: '#e3e6ee', fontWeight: 600 }}>Preferred Consultation Time</label>
            <select 
              id="preferredTime" 
              name="preferredTime" 
              value={fields.preferredTime}
              onChange={handleChange}
              style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}
            >
              <option value="">Select preferred time</option>
              {timeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="additionalInfo" style={{ color: '#e3e6ee', fontWeight: 600 }}>Additional Information</label>
          <textarea 
            id="additionalInfo" 
            name="additionalInfo" 
            value={fields.additionalInfo}
            onChange={handleChange}
            rows={3} 
            style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}
          ></textarea>
        </div>
      </div>
      <button type="submit" className="cta-button" id="consultation-submit" style={{ width: "100%", marginTop: 18, fontSize: '1.25em', borderRadius: 18, padding: '1.3em 0', boxShadow: '0 2px 16px #5865f299', background: 'linear-gradient(90deg, #23272a 0%, #5865f2 100%)', color: '#fff', border: 'none', fontWeight: 700, letterSpacing: '0.5px', transition: 'none' }}>
        {submitted ? "Thank you! We'll be in touch soon." : "Schedule Consultation"}
      </button>
      {submitted && <div style={{ color: '#43b581', textAlign: 'center', marginTop: 18, fontSize: '1.15em', fontWeight: 600 }}>Consultation request submitted!</div>}
    </form>
  );
}

export default ConsultationForm; 