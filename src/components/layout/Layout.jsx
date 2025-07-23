import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import NavBar from "./NavBar";
import styles from '../../styles/components/Layout.module.css';
import { FigmaIcon } from '../ui/v2/icons/glyphs';

function Layout({ children }) {
  const location = useLocation();

  // Scroll to top when route changes to prevent layout jumps
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`main-layout ${styles.mainLayout}`}>
      <NavBar />
      <main className={styles.main}>
        {children}
      </main>
      <footer className={`site-footer ${styles.footer}`}>
        <div className={styles.footerLinksRow}>
          <Link to="/contact" className={styles.footerLink}>Contact</Link>
          <span className={styles.footerDivider}>|</span>
          <Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link>
          <span className={styles.footerDivider}>|</span>
          <Link to="/terms" className={styles.footerLink}>Terms of Service</Link>
        </div>
        <div className={styles.copyright}>
          &copy; 2025 BaldApe Services
        </div>
        <div className={styles.techStack}>
          Built with React, Vite, TypeScript, and Cursor
        </div>
      </footer>
    </div>
  );
}

export default Layout;
