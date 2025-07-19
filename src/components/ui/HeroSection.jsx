import React from "react";
import styles from "./HeroSection.module.css";

function HeroSection({ 
  title, 
  subtitle, 
  showProfile = true, 
  profileImage = "/images/profile-pic.png",
  profileAlt = "BaldApe - Discord Services Professional"
}) {
  return (
    <section className={`hero ${styles.hero}`}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {showProfile && (
            <div className="hero-profile">
              <img
                src={profileImage}
                alt={profileAlt}
                className="profile-pic"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection; 