import React from "react";
import HeroSection from "../components/ui/HeroSection";

function About() {
  return (
    <div>
      <HeroSection 
        title="About BaldApe Services"
        subtitle="Learn more about my experience, philosophy, and approach to Discord community management."
      />
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
