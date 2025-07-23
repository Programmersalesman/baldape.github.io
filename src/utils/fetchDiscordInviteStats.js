// Fetch Discord invite stats for all servers using invite codes
// Usage: fetchDiscordInviteStats(inviteCodes) => { totalMembers, totalOnlineMembers, totalServers }

export async function fetchDiscordInviteStats(inviteCodes) {
  const results = await Promise.all(
    inviteCodes.map(async (code) => {
      try {
        const res = await fetch(`https://discord.com/api/v9/invites/${code}?with_counts=true`);
        if (!res.ok) return { member_count: 0, presence_count: 0 };
        const data = await res.json();
        return {
          member_count: data.approximate_member_count || 0,
          presence_count: data.approximate_presence_count || 0
        };
      } catch {
        return { member_count: 0, presence_count: 0 };
      }
    })
  );
  const totalMembers = results.reduce((sum, s) => sum + s.member_count, 0);
  const totalOnlineMembers = results.reduce((sum, s) => sum + s.presence_count, 0);
  return {
    totalMembers,
    totalOnlineMembers,
    totalServers: inviteCodes.length
  };
} 