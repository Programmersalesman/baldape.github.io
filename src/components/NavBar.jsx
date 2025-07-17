import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav
      style={{
        padding: "1rem",
        background: "#222",
        color: "#fff",
        display: "flex",
        gap: "1.5rem",
      }}
    >
      <Link to="/" style={{ color: "#fff" }}>
        Home
      </Link>
      <Link to="/about" style={{ color: "#fff" }}>
        About
      </Link>
      <Link to="/services" style={{ color: "#fff" }}>
        Services
      </Link>
      <Link to="/portfolio" style={{ color: "#fff" }}>
        Portfolio
      </Link>
      <Link to="/testimonials" style={{ color: "#fff" }}>
        Testimonials
      </Link>
      <Link to="/contact" style={{ color: "#fff" }}>
        Contact
      </Link>
    </nav>
  );
}

export default NavBar;
