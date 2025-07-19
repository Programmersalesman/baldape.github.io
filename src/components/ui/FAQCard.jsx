import React from "react";
import styles from "./FAQCard.module.css";

function FAQCard({ question, answer }) {
  return (
    <div className={`faq-white-card ${styles.faqCard}`}>
      <h3>{question}</h3>
      <p>{answer}</p>
    </div>
  );
}

export default FAQCard; 