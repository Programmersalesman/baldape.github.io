import React from 'react';
import styles from '../../styles/components/RoleBadge.module.css';

const RoleBadge = ({ role, size = 'medium' }) => {
  // Normalize role text for consistent styling
  const normalizedRole = role?.toLowerCase() || 'member';
  
  // Define role categories and their styling
  const getRoleInfo = (role) => {
    switch (role) {
      case 'owner':
      case 'admin':
        return {
          label: 'Admin',
          type: 'admin',
          gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          color: '#ff6b6b',
          icon: '👑'
        };
      case 'moderator':
      case 'mod':
        return {
          label: 'Moderator',
          type: 'moderator',
          gradient: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)',
          color: '#feca57',
          icon: '🛡️'
        };
      case 'vip':
        return {
          label: 'VIP',
          type: 'vip',
          gradient: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)',
          color: '#a8e6cf',
          icon: '⭐'
        };
      case 'member':
      default:
        return {
          label: 'Member',
          type: 'member',
          gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
          color: '#74b9ff',
          icon: '👤'
        };
    }
  };

  const roleInfo = getRoleInfo(normalizedRole);
  const sizeClass = styles[size] || styles.medium;

  return (
    <div 
      className={`${styles.roleBadge} ${styles[roleInfo.type]} ${sizeClass}`}
      style={{
        '--role-gradient': roleInfo.gradient,
        '--role-color': roleInfo.color
      }}
      title={`Role: ${roleInfo.label}`}
    >
      <span className={styles.roleIcon}>{roleInfo.icon}</span>
      <span className={styles.roleText}>{roleInfo.label}</span>
    </div>
  );
};

export default RoleBadge; 