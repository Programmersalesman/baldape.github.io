// Utility functions for filtering testimonials

/**
 * Check if a role is considered an admin/owner role
 * @param {string} role - The role to check
 * @returns {boolean} - True if the role is admin/owner level
 */
export const isAdminRole = (role) => {
  const normalizedRole = role?.toLowerCase() || 'member';
  return ['admin', 'administrator'].includes(normalizedRole);
};

/**
 * Check if a role is considered a moderator or higher role
 * @param {string} role - The role to check
 * @returns {boolean} - True if the role is moderator level or higher
 */
export const isModeratorRole = (role) => {
  const normalizedRole = role?.toLowerCase() || 'member';
  return ['moderator', 'mod', 'admin', 'administrator'].includes(normalizedRole);
};

/**
 * Check if a role is considered a VIP or higher role
 * @param {string} role - The role to check
 * @returns {boolean} - True if the role is VIP level or higher
 */
export const isVIPRole = (role) => {
  const normalizedRole = role?.toLowerCase() || 'member';
  return ['vip', 'premium', 'moderator', 'mod', 'admin', 'administrator'].includes(normalizedRole);
};

/**
 * Filter testimonials by role type
 * @param {Array} testimonials - Array of testimonial objects
 * @param {string} roleType - Type of role to filter by ('admin', 'moderator', 'vip', 'member')
 * @returns {Array} - Filtered testimonials
 */
export const filterTestimonialsByRole = (testimonials, roleType) => {
  if (!testimonials || !Array.isArray(testimonials)) return [];
  
  switch (roleType) {
    case 'admin':
      return testimonials.filter(t => isAdminRole(t.role));
    case 'moderator':
      return testimonials.filter(t => isModeratorRole(t.role));
    case 'vip':
      return testimonials.filter(t => isVIPRole(t.role));
    case 'member':
      return testimonials.filter(t => !isVIPRole(t.role));
    default:
      return testimonials;
  }
};

/**
 * Get role statistics from testimonials
 * @param {Array} testimonials - Array of testimonial objects
 * @returns {Object} - Statistics about roles
 */
export const getRoleStats = (testimonials) => {
  if (!testimonials || !Array.isArray(testimonials)) {
    return {
      total: 0,
      admin: 0,
      moderator: 0,
      vip: 0,
      member: 0,
      unknown: 0
    };
  }

  const stats = {
    total: testimonials.length,
    admin: 0,
    moderator: 0,
    vip: 0,
    member: 0,
    unknown: 0
  };

  testimonials.forEach(testimonial => {
    const role = testimonial.role?.toLowerCase();
    
    if (isAdminRole(role)) {
      stats.admin++;
    } else if (isModeratorRole(role)) {
      stats.moderator++;
    } else if (isVIPRole(role)) {
      stats.vip++;
    } else if (role === 'member' || role) {
      stats.member++;
    } else {
      stats.unknown++;
    }
  });

  return stats;
};

/**
 * Sort testimonials by role priority (admin/owner first, then moderator, VIP, member)
 * @param {Array} testimonials - Array of testimonial objects
 * @returns {Array} - Sorted testimonials
 */
export const sortTestimonialsByRole = (testimonials) => {
  if (!testimonials || !Array.isArray(testimonials)) return [];
  
  const rolePriority = {
    'admin': 4,
    'administrator': 4,
    'moderator': 3,
    'mod': 3,
    'vip': 2,
    'premium': 2,
    'member': 1
  };

  return [...testimonials].sort((a, b) => {
    const roleA = (a.role || 'member').toLowerCase();
    const roleB = (b.role || 'member').toLowerCase();
    const priorityA = rolePriority[roleA] || 0;
    const priorityB = rolePriority[roleB] || 0;
    
    // Sort by role priority (highest first), then by date (newest first)
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }
    
    const dateA = new Date(a.created_at || a.date || 0);
    const dateB = new Date(b.created_at || b.date || 0);
    return dateB - dateA;
  });
}; 