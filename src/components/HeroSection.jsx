import React from "react";

function HeroSection({ 
  title, 
  subtitle, 
  showProfile = true, 
  profileImage = "/images/profile-pic.png",
  profileAlt = "BaldApe - Discord Services Professional"
}) {
  return (
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