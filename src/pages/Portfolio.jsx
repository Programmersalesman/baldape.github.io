import React from "react";
import ManagedServersSection from "../ManagedServersSection";
import OrganizationSection from "../OrganizationSection";
import BotSection from "../BotSection";
import TransformationSection from "../TransformationSection";

function Portfolio() {
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
              <h1>BaldApe Services Portfolio</h1>
              <p>
                Explore examples of my work managing successful Discord
                communities. See how I transform disorganized servers into
                professional, engaging environments that drive growth and user
                retention.
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

      {/* Managed Servers Section */}
      <ManagedServersSection />
      <OrganizationSection />
      <BotSection />
      <TransformationSection />
    </div>
  );
}

export default Portfolio;
