import React from "react";
import HeroSection from "../components/ui/HeroSection";

function Home() {
  return (
    <div>
      <HeroSection 
        title="Welcome to BaldApe Services"
        subtitle="Professional Discord server management, organization, and community growth."
      />
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
