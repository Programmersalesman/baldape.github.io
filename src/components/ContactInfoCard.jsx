import React from "react";

function ContactInfoCard({ icon, title, value, link }) {
  const cardContent = (
    <div className="frosted-card" style={{ 
      textAlign: "center", 
      minHeight: 220, 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <h3 style={{ fontWeight: 700, fontSize: "1.2em", marginBottom: 4 }}>{title}</h3>
      <div style={{ color: "#444", fontSize: "1.05em" }}>{value}</div>
    </div>
  );

  if (link) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

export default ContactInfoCard; 