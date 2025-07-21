import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from '../../styles/components/NavBar.module.css';

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

  // Responsive Hamburger NavBar for mobile
  const ResponsiveHamburgerNavBar = () => (
    <>
      <nav className={styles.hamburgerNavbar}>
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className={styles.logo}
          tabIndex={0}
        >
          BaldApe<br />Services
        </Link>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Open navigation menu"
        >
          <span className={`${styles.hamburgerLine} ${styles.hamburgerLineTop} ${isMenuOpen ? styles.open : ''}`} />
          <span className={`${styles.hamburgerLine} ${styles.hamburgerLineMiddle} ${isMenuOpen ? styles.open : ''}`} />
          <span className={`${styles.hamburgerLine} ${styles.hamburgerLineBottom} ${isMenuOpen ? styles.open : ''}`} />
        </button>
      </nav>
      <div
        className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.open : ''}`}
        onClick={e => {
          if (e.target.classList.contains(styles.mobileMenuOverlay)) {
            setIsMenuOpen(false);
          }
        }}
      >
        {/* Close button in top-right */}
        <button
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          className={`${styles.closeBtn} ${isMenuOpen ? styles.open : ''}`}
        >
          &times;
        </button>
        <div className={styles.closeSpacer} />
        <div className={styles.mobileMenuContainer}>
          {navItems.filter(item => item.path !== "/").map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`${styles.tab} ${isActive(item.path) ? styles.active : ''} ${styles.mobileTab}`}
              tabIndex={0}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );

  // TabNavBar (desktop)
  const TabNavBar = () => (
    <nav className={styles.navbar}>
      <Link
        to="/"
        className={`${styles.logo} ${styles.logoDesktop}`}
        tabIndex={0}
      >
        BaldApe<br />Services
      </Link>
      <div className={styles.tabContainer}>
        {navItems.filter(item => item.path !== "/").map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.tab} ${isActive(item.path) ? styles.active : ''}`}
            tabIndex={0}
          >
            {item.label}
            {isActive(item.path) && <div className={styles.activeIndicator} />}
          </Link>
        ))}
      </div>
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
