import React, { useState } from "react";
import StarRating from "./StarRating";

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
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    if (!fields.name.trim()) errs.name = "Name is required.";
    if (!fields.community) errs.community = "Community is required.";
    if (!fields.message.trim()) errs.message = "Testimonial is required.";
    if (!fields.rating) errs.rating = "Rating is required.";
    if (!fields.permission) errs.permission = "Permission is required.";
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
    <form className="testimonial-form" style={{ width: '100%', maxWidth: 900, margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} autoComplete="off" onSubmit={handleSubmit}>
      <h2 style={{ textAlign: "center", marginBottom: 18, fontSize: '2.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Share Your Experience</h2>
      <p style={{ textAlign: "center", marginBottom: 40, fontSize: '1.25rem', color: '#b9bbbe', maxWidth: 700 }}>
        Leave a testimonial about your experience working with BaldApe Services.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem', width: '100%' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="name" style={{ color: '#e3e6ee', fontWeight: 600 }}>Full Name *</label>
            <input type="text" id="name" name="name" value={fields.name} onChange={handleChange} required style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} />
            {errors.name && <div style={{ color: '#f04747', fontSize: '0.98em' }}>{errors.name}</div>}
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="discord" style={{ color: '#e3e6ee', fontWeight: 600 }}>Discord Username</label>
            <input type="text" id="discord" name="discord" value={fields.discord} onChange={handleChange} placeholder="username#0000" style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="community" style={{ color: '#e3e6ee', fontWeight: 600 }}>Which Community Are You From? *</label>
            <select id="community" name="community" value={fields.community} onChange={handleChange} required style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}>
              <option value="">Select your community</option>
              {communityOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            {errors.community && <div style={{ color: '#f04747', fontSize: '0.98em' }}>{errors.community}</div>}
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="role" style={{ color: '#e3e6ee', fontWeight: 600 }}>Your Role in the Community</label>
            <select id="role" name="role" value={fields.role} onChange={handleChange} style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}>
              <option value="">Select your role</option>
              {roleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <label htmlFor="email" style={{ color: '#e3e6ee', fontWeight: 600 }}>Email Address</label>
            <input type="email" id="email" name="email" value={fields.email} onChange={handleChange} placeholder="Optional - for follow-up" style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} />
          </div>
        </div>
        <div>
          <label htmlFor="message" style={{ color: '#e3e6ee', fontWeight: 600 }}>Your Testimonial *</label>
          <textarea id="message" name="message" value={fields.message} onChange={handleChange} rows={5} required style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}></textarea>
          {errors.message && <div style={{ color: '#f04747', fontSize: '0.98em' }}>{errors.message}</div>}
        </div>
        <div className="form-group rating-group">
          <label htmlFor="rating" style={{ color: '#e3e6ee', fontWeight: 600 }}>Rating *</label>
          <StarRating value={fields.rating} onChange={handleRating} />
          {errors.rating && <div style={{ color: '#f04747', fontSize: '0.98em' }}>{errors.rating}</div>}
        </div>
        <div>
          <label htmlFor="features" style={{ color: '#e3e6ee', fontWeight: 600 }}>What Features Do You Like Most?</label>
          <div className="checkbox-group" style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap' }}>
            {featureOptions.map(opt => (
              <label key={opt.value} className="checkbox-label" style={{ color: '#f3f6fa', fontWeight: 400 }}>
                <input type="checkbox" name="features" value={opt.value} checked={fields.features.includes(opt.value)} onChange={handleChange} /> <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <label style={{ color: '#e3e6ee', fontWeight: 600 }}>Permission to Use Testimonial *</label>
            <div className="radio-group">
              <label className="radio-label" style={{ color: '#f3f6fa', fontWeight: 400 }}>
                <input type="radio" name="permission" value="yes" checked={fields.permission === "yes"} onChange={handleChange} required /> <span>Yes, I give permission to use this testimonial on the website</span>
              </label>
              <label className="radio-label" style={{ color: '#f3f6fa', fontWeight: 400 }}>
                <input type="radio" name="permission" value="no" checked={fields.permission === "no"} onChange={handleChange} /> <span>No, I do not give permission (testimonial will not be used)</span>
              </label>
            </div>
            {errors.permission && <div style={{ color: '#f04747', fontSize: '0.98em' }}>{errors.permission}</div>}
          </div>
          <div style={{ flex: 1, minWidth: 320 }}>
            <label style={{ color: '#e3e6ee', fontWeight: 600 }}>Privacy Preference</label>
            <div className="radio-group">
              <label className="radio-label" style={{ color: '#f3f6fa', fontWeight: 400 }}>
                <input type="radio" name="anonymous" value="public" checked={fields.anonymous === "public"} onChange={handleChange} /> <span>Public (show my username)</span>
              </label>
              <label className="radio-label" style={{ color: '#f3f6fa', fontWeight: 400 }}>
                <input type="radio" name="anonymous" value="anonymous" checked={fields.anonymous === "anonymous"} onChange={handleChange} /> <span>Anonymous (hide my username)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="cta-button" id="testimonial-submit" style={{ width: "100%", marginTop: 18, fontSize: '1.25em', borderRadius: 18, padding: '1.3em 0', boxShadow: '0 2px 16px #5865f299', background: 'linear-gradient(90deg, #23272a 0%, #5865f2 100%)', color: '#fff', border: 'none', fontWeight: 700, letterSpacing: '0.5px', transition: 'none' }}>
        {submitted ? "Thank you!" : "Submit Testimonial"}
      </button>
      {submitted && <div style={{ color: '#43b581', textAlign: 'center', marginTop: 18, fontSize: '1.15em', fontWeight: 600 }}>Testimonial submitted!</div>}
    </form>
  );
}

export default TestimonialForm; 