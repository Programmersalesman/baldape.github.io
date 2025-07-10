export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract all possible fields
  const {
    name,
    email,
    message,
    community,
    role,
    privacy,
    testimonial,
    rating,
    features,
    permission,
    anonymous,
    discord,
    memberCount,
    services,
    goals,
    challenges,
    timeline,
    budget,
    preferredTime,
    additionalInfo
  } = req.body;

  // Determine which webhook to use and format content
  let webhookUrl;
  let content;
  if (testimonial) {
    webhookUrl = process.env.DISCORD_WEBHOOK_URL_TESTIMONIAL;
    content = `**New Testimonial Submission**\n` +
      (name ? `**Name:** ${name}\n` : '') +
      (community ? `**Community:** ${community}\n` : '') +
      (role ? `**Role:** ${role}\n` : '') +
      (email ? `**Email:** ${email}\n` : '') +
      (rating ? `**Rating:** ${rating}\n` : '') +
      (testimonial ? `**Testimonial:** ${testimonial}\n` : '') +
      (features && features.length ? `**Features Liked:** ${Array.isArray(features) ? features.join(', ') : features}\n` : '') +
      (permission ? `**Permission:** ${permission}\n` : '') +
      (anonymous ? `**Privacy:** ${anonymous}\n` : '');
  } else if (goals || discord || memberCount || services) {
    webhookUrl = process.env.DISCORD_WEBHOOK_URL_CONTACT;
    content = `**New Consultation Request**\n` +
      (name ? `**Name:** ${name}\n` : '') +
      (email ? `**Email:** ${email}\n` : '') +
      (discord ? `**Discord:** ${discord}\n` : '') +
      (community ? `**Community:** ${community}\n` : '') +
      (memberCount ? `**Member Count:** ${memberCount}\n` : '') +
      (services && services.length ? `**Services:** ${Array.isArray(services) ? services.join(', ') : services}\n` : '') +
      (goals ? `**Goals:** ${goals}\n` : '') +
      (challenges ? `**Challenges:** ${challenges}\n` : '') +
      (timeline ? `**Timeline:** ${timeline}\n` : '') +
      (budget ? `**Budget:** ${budget}\n` : '') +
      (preferredTime ? `**Preferred Time:** ${preferredTime}\n` : '') +
      (additionalInfo ? `**Additional Info:** ${additionalInfo}\n` : '');
  } else {
    webhookUrl = process.env.DISCORD_WEBHOOK_URL_CONTACT;
    content = `**New Contact Submission**\n` +
      (name ? `**Name:** ${name}\n` : '') +
      (email ? `**Email:** ${email}\n` : '') +
      (message ? `**Message:** ${message}\n` : '');
  }

  if (!webhookUrl) {
    return res.status(500).json({ error: 'Discord webhook URL not configured.' });
  }

  try {
    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    if (!discordRes.ok) {
      throw new Error('Failed to send to Discord');
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 