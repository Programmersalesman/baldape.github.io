// Discord webhook service for form submissions
const DISCORD_WEBHOOK_URL_TESTIMONIAL = import.meta.env.VITE_DISCORD_WEBHOOK_URL_TESTIMONIAL;
const DISCORD_WEBHOOK_URL_CONTACT = import.meta.env.VITE_DISCORD_WEBHOOK_URL_CONTACT;

export const sendToDiscord = async (formData, formType) => {
  // Determine which webhook to use and format content
  let webhookUrl;
  let content;

  if (formType === 'testimonial') {
    webhookUrl = DISCORD_WEBHOOK_URL_TESTIMONIAL;
    content =
      `**New Testimonial Submission**\n` +
      (formData.name ? `**Name:** ${formData.name}\n` : "") +
      (formData.community ? `**Community:** ${formData.community}\n` : "") +
      (formData.role ? `**Role:** ${formData.role}\n` : "") +
      (formData.email ? `**Email:** ${formData.email}\n` : "") +
      (formData.rating ? `**Rating:** ${formData.rating}/5\n` : "") +
      (formData.message ? `**Testimonial:** ${formData.message}\n` : "") +
      (formData.features && formData.features.length
        ? `**Features Liked:** ${Array.isArray(formData.features) ? formData.features.join(", ") : formData.features}\n`
        : "") +
      (formData.permission ? `**Permission:** ${formData.permission}\n` : "") +
      (formData.anonymous ? `**Privacy:** ${formData.anonymous}\n` : "") +
      (formData.date ? `**Date:** ${formData.date}\n` : "");
  } else if (formType === 'consultation') {
    webhookUrl = DISCORD_WEBHOOK_URL_CONTACT;
    content =
      `**New Consultation Request**\n` +
      (formData.name ? `**Name:** ${formData.name}\n` : "") +
      (formData.email ? `**Email:** ${formData.email}\n` : "") +
      (formData.discord ? `**Discord:** ${formData.discord}\n` : "") +
      (formData.community ? `**Community:** ${formData.community}\n` : "") +
      (formData.memberCount ? `**Member Count:** ${formData.memberCount}\n` : "") +
      (formData.services && formData.services.length
        ? `**Services:** ${Array.isArray(formData.services) ? formData.services.join(", ") : formData.services}\n`
        : "") +
      (formData.goals ? `**Goals:** ${formData.goals}\n` : "") +
      (formData.challenges ? `**Challenges:** ${formData.challenges}\n` : "") +
      (formData.timeline ? `**Timeline:** ${formData.timeline}\n` : "") +
      (formData.budget ? `**Budget:** ${formData.budget}\n` : "") +
      (formData.preferredTime ? `**Preferred Time:** ${formData.preferredTime}\n` : "") +
      (formData.additionalInfo ? `**Additional Info:** ${formData.additionalInfo}\n` : "") +
      (formData.date ? `**Date:** ${formData.date}\n` : "");
  } else {
    // Fallback for general contact
    webhookUrl = DISCORD_WEBHOOK_URL_CONTACT;
    content =
      `**New Contact Submission**\n` +
      (formData.name ? `**Name:** ${formData.name}\n` : "") +
      (formData.email ? `**Email:** ${formData.email}\n` : "") +
      (formData.message ? `**Message:** ${formData.message}\n` : "");
  }

  // Check if webhook URL is configured
  if (!webhookUrl) {
    console.warn(`Discord webhook URL not configured for ${formType}. Form data logged to console instead.`);
    console.log(`Form submission (${formType}):`, formData);
    console.log(`Formatted content:`, content);
    
    // Return success to prevent form submission errors
    // In production, you'd want to handle this differently
    return { success: true, message: "Form submitted (Discord webhook not configured)" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status} ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Discord webhook error:", error);
    throw error;
  }
}; 