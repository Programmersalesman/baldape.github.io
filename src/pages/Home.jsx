import React from "react";

function Home() {
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
              <h1>Welcome to BaldApe Services</h1>
              <p>
                Professional Discord server management, organization, and community growth.
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
          <h2 className="section-header">Featured Services</h2>
          <div className="section-subtitle">More coming soon...</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
