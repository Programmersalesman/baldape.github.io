import React from "react";
import styles from '../../styles/components/HeroSection.module.css';

function HeroSection({ 
  title, 
  subtitle, 
  showProfile = true, 
  profileImage = "/images/profile-pic.png",
  profileAlt = "BaldApe - Discord Services Professional",
  children
}) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <section className={`hero ${styles.hero}`}>
      <div className="container">
        <div className="hero-content">
          {isMobile ? (
            <>
              {showProfile && (
                <div className="hero-profile">
                  <img
                    src={profileImage}
                    alt={profileAlt}
                    className="profile-pic"
                  />
                </div>
              )}
              <div className="hero-text">
                <h1>{title}</h1>
                <p>{subtitle}</p>
              </div>
              {children && (
                <div className="hero-extra" style={{ marginTop: '1.1rem', marginBottom: '1.2rem', textAlign: 'center' }}>
                  {children}
                </div>
              )}
            </>
          ) : (
            <>
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
              {children && (
                <div className="hero-extra" style={{ marginTop: 0, textAlign: undefined }}>
                  {children}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection; 