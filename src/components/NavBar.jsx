import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  // Shared tab style for both desktop and mobile
  const getTabStyle = (active) => ({
    color: active ? "#fff" : "rgba(255, 255, 255, 0.7)",
    textDecoration: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    background: active ? "rgba(125, 249, 255, 0.3)" : "transparent",
    border: "2px solid " + (active ? "#7df9ff" : "transparent"),
    boxSizing: "border-box",
    fontWeight: 600,
    fontSize: "1rem",
    position: "relative",
    margin: 0,
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 0,
    transition: "background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s",
  });

  // Responsive Hamburger NavBar for mobile
  const ResponsiveHamburgerNavBar = () => (
    <>
      <nav
        className="responsive-hamburger-navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(30, 34, 60, 0.98)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "0.7rem 1.2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1.5px solid #7df9ff33",
        }}
      >
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          style={{
            ...getTabStyle(isActive("/")),
            fontSize: "1.2rem",
            fontWeight: 800,
            color: "#7df9ff",
            background: "none",
            border: "none",
            padding: 0,
            margin: 0,
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: 0,
            cursor: "pointer",
          }}
          tabIndex={0}
        >
          BaldApe<br />Services
        </Link>
        <button
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            zIndex: 1001,
          }}
          aria-label="Open navigation menu"
        >
          <span
            style={{
              width: "28px",
              height: "3px",
              background: "#7df9ff",
              borderRadius: "2px",
              transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
              transform: isMenuOpen ? "rotate(45deg) translate(6px, 6px)" : "none",
              position: "relative",
            }}
          />
          <span
            style={{
              width: "28px",
              height: "3px",
              background: "#7df9ff",
              borderRadius: "2px",
              transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
              opacity: isMenuOpen ? 0 : 1,
              position: "relative",
            }}
          />
          <span
            style={{
              width: "28px",
              height: "3px",
              background: "#7df9ff",
              borderRadius: "2px",
              transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
              transform: isMenuOpen ? "rotate(-45deg) translate(7px, -7px)" : "none",
              position: "relative",
            }}
          />
        </button>
      </nav>
      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(20, 20, 30, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 0,
            zIndex: 2000,
            animation: isMenuOpen ? "slideInMenu 0.35s cubic-bezier(.4,2,.6,1)" : "none",
            overflowY: "auto",
          }}
          onClick={e => {
            if (e.target.classList.contains('mobile-menu-overlay')) {
              setIsMenuOpen(false);
            }
          }}
        >
          {/* Close button in top-right */}
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: "fixed",
              top: 18,
              right: 22,
              fontSize: "2.5rem",
              color: "#7df9ff",
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 2100,
            }}
          >
            &times;
          </button>
          <div style={{ height: 60 }} /> {/* Spacer for close button */}
          <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", gap: "1.2rem", marginTop: 20 }}>
            {navItems.filter(item => item.path !== "/").map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  ...getTabStyle(isActive(item.path)),
                  width: "80vw",
                  maxWidth: 340,
                  textAlign: "center",
                  fontSize: "1.15rem",
                  margin: 0,
                }}
                tabIndex={0}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <style>{`
            @keyframes slideInMenu {
              from { transform: translateX(100vw); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );

  // TabNavBar (dark)
  const TabNavBar = () => (
    <nav
      className="tab-navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(30, 34, 60, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Link
        to="/"
        style={{
          ...getTabStyle(isActive("/")),
          fontSize: "1.2rem",
          fontWeight: 800,
          color: "#7df9ff",
          background: "none",
          border: "none",
          padding: 0,
          marginRight: "2rem",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          minWidth: 0,
          cursor: "pointer",
        }}
        tabIndex={0}
      >
        BaldApe<br />Services
      </Link>
      <div className="tab-container" style={{ 
        display: "flex", 
        background: "rgba(255, 255, 255, 0.1)", 
        borderRadius: "12px", 
        padding: "0.25rem",
        gap: "0.25rem"
      }}>
        {navItems.filter(item => item.path !== "/").map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={getTabStyle(isActive(item.path))}
            tabIndex={0}
          >
            {item.label}
            {isActive(item.path) && (
              <div style={{
                position: "absolute",
                bottom: "-1rem",
                left: "50%",
                transform: "translateX(-50%)",
                width: "20px",
                height: "3px",
                background: "#7df9ff",
                borderRadius: "2px",
              }} />
            )}
          </Link>
        ))}
      </div>
      <style>{`
        @media (max-width: 700px) {
          .tab-navbar { display: none !important; }
        }
      `}</style>
    </nav>
  );

  const isMobile = windowWidth <= 700;

  return (
    <>
      {isMobile ? <ResponsiveHamburgerNavBar /> : <TabNavBar />}
    </>
  );
}

export default NavBar;
