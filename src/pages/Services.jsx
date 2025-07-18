import React from "react";

function Services() {
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
              <h1>Services</h1>
              <p>
                Discover the range of Discord management and consulting services I offer.
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
          <h2 className="section-header">Service Packages</h2>
          <div className="section-subtitle">More details coming soon...</div>
        </div>
      </section>
    </div>
  );
}

export default Services;
