import React from "react";
import HeroSection from "../components/HeroSection";

function Services() {
  return (
    <div>
      <HeroSection 
        title="Services"
        subtitle="Discover the range of Discord management and consulting services I offer."
      />
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
