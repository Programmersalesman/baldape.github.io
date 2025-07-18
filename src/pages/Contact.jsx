import React, { useState } from "react";
import Modal from "../components/Modal";

function StarRating({ value, onChange }) {
  // value: current rating (1-5 or 0 for none)
  // onChange: function(newValue)
  return (
    <div className="star-rating" style={{ fontSize: '2.1em', display: 'flex', flexDirection: 'row', gap: '0.2em', cursor: 'pointer', marginBottom: 0 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ color: value >= star ? '#ffd700' : '#e0e0e0', transition: 'color 0.2s' }}
          onClick={() => onChange(value === star ? 0 : star)}
          onMouseOver={e => e.currentTarget.style.color = '#ffd700'}
          onMouseOut={e => e.currentTarget.style.color = value >= star ? '#ffd700' : '#e0e0e0'}
          role="button"
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onChange(value === star ? 0 : star); }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Contact() {
  const [openModal, setOpenModal] = useState(null); // 'consultation' | 'testimonial' | null
  const [testimonialRating, setTestimonialRating] = useState(0);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          background: "none",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
        }}
      >
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Contact</h1>
              <p>
                Get in touch to discuss your Discord server needs or request a consultation.
              </p>
            </div>
            <div className="hero-profile">
              <img
                src="/images/profile-pic.jpg"
                alt="BaldApe - Discord Services Professional"
                className="profile-pic"
              />
            </div>
          </div>
        </div>
      </section>

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
        <h2 style={{ textAlign: "center", marginBottom: 18, fontSize: '2.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Book Your Free Consultation</h2>
        <p style={{ textAlign: "center", marginBottom: 40, fontSize: '1.25rem', color: '#b9bbbe', maxWidth: 700 }}>
          Fill out the form below and I'll get back to you within 24 hours to schedule your consultation.
        </p>
        <form className="consultation-form" style={{ width: '100%', maxWidth: 900, margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} autoComplete="off">
          {/* Single column, large spacing */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem', width: '100%' }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="name" style={{ color: '#e3e6ee', fontWeight: 600 }}>Full Name *</label><input type="text" id="name" name="name" required style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} /></div>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="email" style={{ color: '#e3e6ee', fontWeight: 600 }}>Email Address *</label><input type="email" id="email" name="email" required style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} /></div>
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="discord" style={{ color: '#e3e6ee', fontWeight: 600 }}>Discord Username</label><input type="text" id="discord" name="discord" placeholder="username#0000" style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} /></div>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="community" style={{ color: '#e3e6ee', fontWeight: 600 }}>Community Name *</label><input type="text" id="community" name="community" required style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} /></div>
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="member-count" style={{ color: '#e3e6ee', fontWeight: 600 }}>Current Member Count</label><select id="member-count" name="member-count" style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}><option value="">Select member count</option><option value="1-50">1-50 members</option><option value="51-100">51-100 members</option><option value="101-500">101-500 members</option><option value="501-1000">501-1000 members</option><option value="1000+">1000+ members</option></select></div>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="services" style={{ color: '#e3e6ee', fontWeight: 600 }}>Services of Interest *</label><div className="checkbox-group" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5em' }}><label className="checkbox-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="checkbox" name="services[]" value="quick-setup" /> <span>Quick Setup</span></label><label className="checkbox-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="checkbox" name="services[]" value="premium-setup" /> <span>Premium Setup</span></label><label className="checkbox-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="checkbox" name="services[]" value="server-audit" /> <span>Server Audit & Optimization</span></label><label className="checkbox-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="checkbox" name="services[]" value="ongoing-management" /> <span>Ongoing Management</span></label><label className="checkbox-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="checkbox" name="services[]" value="custom" /> <span>Custom Solution</span></label></div></div>
            </div>
            <div><label htmlFor="goals" style={{ color: '#e3e6ee', fontWeight: 600 }}>What are your main goals? *</label><textarea id="goals" name="goals" rows={4} required style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}></textarea></div>
            <div><label htmlFor="challenges" style={{ color: '#e3e6ee', fontWeight: 600 }}>Current Challenges</label><textarea id="challenges" name="challenges" rows={3} style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}></textarea></div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="timeline" style={{ color: '#e3e6ee', fontWeight: 600 }}>Preferred Timeline</label><select id="timeline" name="timeline" style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}><option value="">Select timeline</option><option value="asap">As soon as possible</option><option value="1-2-weeks">1-2 weeks</option><option value="1-month">1 month</option><option value="flexible">Flexible</option></select></div>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="budget" style={{ color: '#e3e6ee', fontWeight: 600 }}>Budget Range</label><select id="budget" name="budget" style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}><option value="">Select budget range</option><option value="50-100">$50-$100</option><option value="100-200">$100-$200</option><option value="200-500">$200-$500</option><option value="500+">$500+</option><option value="discuss">Let's discuss</option></select></div>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="preferred-time" style={{ color: '#e3e6ee', fontWeight: 600 }}>Preferred Consultation Time</label><select id="preferred-time" name="preferred-time" style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}><option value="">Select preferred time</option><option value="morning">Morning (9 AM - 12 PM EST)</option><option value="afternoon">Afternoon (12 PM - 5 PM EST)</option><option value="evening">Evening (5 PM - 9 PM EST)</option><option value="weekend">Weekend</option><option value="flexible">Flexible</option></select></div>
            </div>
            <div><label htmlFor="additional-info" style={{ color: '#e3e6ee', fontWeight: 600 }}>Additional Information</label><textarea id="additional-info" name="additional-info" rows={3} style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}></textarea></div>
          </div>
          <button type="submit" className="cta-button" id="consultation-submit" style={{ width: "100%", marginTop: 18, fontSize: '1.25em', borderRadius: 18, padding: '1.3em 0', boxShadow: '0 2px 16px #5865f299', background: 'linear-gradient(90deg, #23272a 0%, #5865f2 100%)', color: '#fff', border: 'none', fontWeight: 700, letterSpacing: '0.5px', transition: 'none' }}>
            Schedule Consultation
          </button>
        </form>
      </Modal>
      <Modal open={openModal === "testimonial"} onClose={() => setOpenModal(null)}>
        <h2 style={{ textAlign: "center", marginBottom: 18, fontSize: '2.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Share Your Experience</h2>
        <p style={{ textAlign: "center", marginBottom: 40, fontSize: '1.25rem', color: '#b9bbbe', maxWidth: 700 }}>
          Leave a testimonial about your experience working with BaldApe Services.
        </p>
        <form className="testimonial-form" style={{ width: '100%', maxWidth: 900, margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} autoComplete="off">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem', width: '100%' }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="testimonial-name" style={{ color: '#e3e6ee', fontWeight: 600 }}>Full Name *</label><input type="text" id="testimonial-name" name="testimonial-name" required style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} /></div>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="testimonial-discord" style={{ color: '#e3e6ee', fontWeight: 600 }}>Discord Username</label><input type="text" id="testimonial-discord" name="testimonial-discord" placeholder="username#0000" style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} /></div>
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="testimonial-community" style={{ color: '#e3e6ee', fontWeight: 600 }}>Which Community Are You From? *</label><select id="testimonial-community" name="testimonial-community" required style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}><option value="">Select your community</option><option value="baldapes-lab">BaldApe's Lab</option><option value="panda-picks">Panda Picks</option><option value="sportsscijacob">SportsSciJacob</option><option value="cantstopthecaptv">CantStopTheCapTV</option><option value="betsbyraven">BetsByRaven</option></select></div>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="testimonial-role" style={{ color: '#e3e6ee', fontWeight: 600 }}>Your Role in the Community</label><select id="testimonial-role" name="testimonial-role" style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}><option value="">Select your role</option><option value="member">Regular Member</option><option value="vip">VIP Member</option><option value="moderator">Moderator</option><option value="admin-owner">Admin/Owner</option><option value="other">Other</option></select></div>
              <div style={{ flex: 1, minWidth: 260 }}><label htmlFor="testimonial-email" style={{ color: '#e3e6ee', fontWeight: 600 }}>Email Address</label><input type="email" id="testimonial-email" name="testimonial-email" placeholder="Optional - for follow-up" style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }} /></div>
            </div>
            <div><label htmlFor="testimonial-message" style={{ color: '#e3e6ee', fontWeight: 600 }}>Your Testimonial *</label><textarea id="testimonial-message" name="testimonial-message" rows={5} required style={{ width: '100%', background: '#23272a', color: '#f3f6fa', border: '1.5px solid #444', borderRadius: 12, padding: '1.1em 1.2em', fontSize: '1.13em' }}></textarea></div>
            <div className="form-group rating-group">
              <label htmlFor="testimonial-rating" style={{ color: '#e3e6ee', fontWeight: 600 }}>Rating *</label>
              <StarRating value={testimonialRating} onChange={setTestimonialRating} />
            </div>
            <div><label htmlFor="features" style={{ color: '#e3e6ee', fontWeight: 600 }}>What Features Do You Like Most?</label><div className="checkbox-group" style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '2em', flexWrap: 'wrap' }}><label className="checkbox-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="checkbox" name="features[]" value="organization" /> <span>Organization</span></label><label className="checkbox-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="checkbox" name="features[]" value="bots" /> <span>Bot Integration</span></label><label className="checkbox-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="checkbox" name="features[]" value="support" /> <span>Support</span></label><label className="checkbox-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="checkbox" name="features[]" value="engagement" /> <span>Engagement</span></label></div></div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 320 }}><label style={{ color: '#e3e6ee', fontWeight: 600 }}>Permission to Use Testimonial *</label><div className="radio-group"><label className="radio-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="radio" name="permission" value="yes" required /> <span>Yes, I give permission to use this testimonial on the website</span></label><label className="radio-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="radio" name="permission" value="no" /> <span>No, I do not give permission (testimonial will not be used)</span></label></div></div>
              <div style={{ flex: 1, minWidth: 320 }}><label style={{ color: '#e3e6ee', fontWeight: 600 }}>Privacy Preference</label><div className="radio-group"><label className="radio-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="radio" name="anonymous" value="public" /> <span>Public (show my username)</span></label><label className="radio-label" style={{ color: '#f3f6fa', fontWeight: 400 }}><input type="radio" name="anonymous" value="anonymous" /> <span>Anonymous (hide my username)</span></label></div></div>
            </div>
          </div>
          <button type="submit" className="cta-button" id="testimonial-submit" style={{ width: "100%", marginTop: 18, fontSize: '1.25em', borderRadius: 18, padding: '1.3em 0', boxShadow: '0 2px 16px #5865f299', background: 'linear-gradient(90deg, #23272a 0%, #5865f2 100%)', color: '#fff', border: 'none', fontWeight: 700, letterSpacing: '0.5px', transition: 'none' }}>
            Submit Testimonial
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Contact;
