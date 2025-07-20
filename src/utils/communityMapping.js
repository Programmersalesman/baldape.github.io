// Community mapping with proper names and gradients
// This ensures consistent styling across all testimonial components

export const communityMapping = {
  "baldapes-lab": {
    name: "BaldApe's Lab",
    gradient: "linear-gradient(90deg, #b91c1c 0%, #ef4444 50%, #f87171 100%)",
    color: "#b91c1c"
  },
  "panda-picks": {
    name: "Panda Picks", 
    gradient: "linear-gradient(90deg, #1f2937 0%, #374151 50%, #4b5563 100%)",
    color: "#1f2937"
  },
  "cloak-line-bets": {
    name: "Cloak Line Bets",
    gradient: "linear-gradient(90deg, #0ea5e9 0%, #22d3ee 50%, #14b8a6 100%)",
    color: "#0ea5e9"
  },
  "sportsscijacob": {
    name: "SportsSciJacob",
    gradient: "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)",
    color: "#1e3a8a"
  },
  "cantstopthecaptv": {
    name: "CantStopTheCapTV",
    gradient: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #fde047 100%)",
    color: "#f59e0b"
  },
  "betsbyraven": {
    name: "BetsByRaven",
    gradient: "linear-gradient(90deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)",
    color: "#7c3aed"
  }
};

// Helper function to normalize community names to slugs
const normalizeCommunityName = (communityName) => {
  if (!communityName) return null;
  
  // Direct slug matches
  if (communityMapping[communityName]) {
    return communityName;
  }
  
  // Handle different formats
  const normalized = communityName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  // Special cases for the 6 real servers
  const specialCases = {
    'baldapes-lab': 'baldapes-lab',
    'panda-picks': 'panda-picks',
    'cloak-line-bets': 'cloak-line-bets',
    'sportsscijacob': 'sportsscijacob',
    'sports-sci-jacob': 'sportsscijacob',
    'cantstopthecaptv': 'cantstopthecaptv',
    'cant-stop-the-cap-tv': 'cantstopthecaptv',
    'betsbyraven': 'betsbyraven',
    'bets-by-raven': 'betsbyraven'
  };
  
  return specialCases[normalized] || normalized;
};

// Helper function to get community info
export const getCommunityInfo = (communitySlug) => {
  const normalizedSlug = normalizeCommunityName(communitySlug);
  return communityMapping[normalizedSlug] || {
    name: communitySlug || 'Unknown Community',
    gradient: "linear-gradient(90deg, #6b7280 0%, #9ca3af 50%, #d1d5db 100%)",
    color: "#6b7280"
  };
}; 