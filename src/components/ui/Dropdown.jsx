import React, { useState, useRef, useEffect } from "react";
import styles from '../../styles/components/Dropdown.module.css';

function Dropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select option",
  disabled = false,
  className = "",
  id = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div 
      className={`${styles.dropdownContainer} ${className}`}
      ref={dropdownRef}
      id={id}
    >
      <button
        className={`${styles.dropdownButton} ${isOpen ? styles.open : ""} ${disabled ? styles.disabled : ""}`}
        onClick={handleToggle}
        disabled={disabled}
        type="button"
      >
        <span className={styles.dropdownText}>{displayText}</span>
        <span className={`${styles.dropdownIcon} ${isOpen ? styles.iconUp : styles.iconDown}`}>
          {isOpen ? "⌃" : "⌄"}
        </span>
      </button>
      
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <button
              key={option.value || index}
              className={`${styles.dropdownOption} ${
                option.value === value ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(option)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown; 