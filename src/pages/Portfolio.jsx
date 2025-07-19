import React from "react";
import HeroSection from "../components/HeroSection";
import ManagedServersSection from "../ManagedServersSection";
import OrganizationSection from "../OrganizationSection";
import BotSection from "../BotSection";
import TransformationSection from "../TransformationSection";

function Portfolio() {
  return (
    <div>
      <HeroSection 
        title="BaldApe Services Portfolio"
        subtitle="Explore examples of my work managing successful Discord communities. See how I transform disorganized servers into professional, engaging environments that drive growth and user retention."
      />

      {/* Managed Servers Section */}
      <ManagedServersSection />
      <OrganizationSection />
      <BotSection />
      <TransformationSection />
    </div>
  );
}

export default Portfolio;
