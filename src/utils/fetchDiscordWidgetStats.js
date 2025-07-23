// Fetch Discord widget stats for all servers
// Usage: fetchDiscordWidgetStats(servers) => { totalMembers, totalServers, totalOnlineMembers }

export async function fetchDiscordWidgetStats(servers) {
  const results = await Promise.all(
    servers.map(async (server) => {
      try {
        const res = await fetch(server.widgetUrl);
        if (!res.ok) return { member_count: 0, presence_count: 0 };
        const data = await res.json();
        return {
          member_count: data.member_count || (data.members ? data.members.length : 0),
          presence_count: data.presence_count || 0
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
    totalServers: servers.length
  };
} 