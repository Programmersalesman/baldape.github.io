import React from "react";

function About() {
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
              <h1>About BaldApe Services</h1>
              <p>
                Learn more about my experience, philosophy, and approach to Discord community management.
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
      {/* Placeholder for additional sections/cards */}
      <section className="section">
        <div className="container">
          <h2 className="section-header">My Background</h2>
          <div className="section-subtitle">More details coming soon...</div>
        </div>
      </section>
    </div>
  );
}

export default About;
