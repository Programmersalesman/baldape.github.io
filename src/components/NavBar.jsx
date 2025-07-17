import React from "react";

function NavBar() {
  return (
    <nav style={{padding: '1rem', background: '#222', color: '#fff', display: 'flex', gap: '1.5rem'}}>
      <a href="/" style={{color: '#fff'}}>Home</a>
      <a href="/about" style={{color: '#fff'}}>About</a>
      <a href="/services" style={{color: '#fff'}}>Services</a>
      <a href="/portfolio" style={{color: '#fff'}}>Portfolio</a>
      <a href="/testimonials" style={{color: '#fff'}}>Testimonials</a>
      <a href="/contact" style={{color: '#fff'}}>Contact</a>
    </nav>
  );
}

export default NavBar; 