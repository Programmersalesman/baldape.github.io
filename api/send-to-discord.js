export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract form data from the request body
  const { name, email, message, community, role, privacy, testimonial } = req.body;

  // Determine which webhook to use
  let webhookUrl;
  let content;
  if (testimonial) {
    webhookUrl = process.env.DISCORD_WEBHOOK_URL_TESTIMONIAL;
    content = `**New Testimonial Submission**\n` +
      (name ? `**Name:** ${name}\n` : '') +
      (community ? `**Community:** ${community}\n` : '') +
      (role ? `**Role:** ${role}\n` : '') +
      (privacy ? `**Privacy:** ${privacy}\n` : '') +
      (testimonial ? `**Testimonial:** ${testimonial}\n` : '');
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