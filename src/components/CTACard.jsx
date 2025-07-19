import React from "react";

function CTACard({ 
  icon, 
  title, 
  description, 
  onClick, 
  gradient = "linear-gradient(120deg, #a3e3ff 0%, #f0e9ff 100%)",
  shadowColor = "rgba(88, 101, 242, 0.13)"
}) {
  return (
    <div
      className="cta-square-card"
      style={{
        cursor: "pointer",
        minHeight: 220,
        minWidth: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: gradient,
        color: "#23272a",
        fontWeight: 700,
        fontSize: "1.15em",
        borderRadius: 18,
        boxShadow: `0 8px 32px ${shadowColor}, 0 2px 16px #0002`,
        transition: "transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1)",
      }}
      onClick={onClick}
      onMouseOver={e => e.currentTarget.style.transform = "scale(1.06)"}
      onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontWeight: 800, fontSize: "1.18em", marginBottom: 8 }}>{title}</div>
      <div style={{ color: "#444", fontWeight: 500, fontSize: "1.05em" }}>
        {description}
      </div>
    </div>
  );
}

export default CTACard; 