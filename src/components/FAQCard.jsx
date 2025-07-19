import React from "react";

function FAQCard({ question, answer }) {
  return (
    <div className="faq-white-card" style={{ 
      minHeight: 180, 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center" 
    }}>
      <h3>{question}</h3>
      <p>{answer}</p>
    </div>
  );
}

export default FAQCard; 