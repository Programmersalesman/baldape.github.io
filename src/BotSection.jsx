import React from "react";

const bots = [
  {
    href: "https://cakey.bot/",
    img: "/images/portfolio/bots/cakeybot.webp",
    alt: "Cakey Bot Logo",
    name: "Cakey Bot",
    desc: "Advanced moderation and utility bot with custom commands"
  },
  {
    href: "https://invitemanager.xyz/",
    img: "/images/portfolio/bots/invite-management.gif",
    alt: "Invite Management Logo",
    name: "Invite Management",
    desc: "Professional invite tracking and management system"
  },
  {
    href: "https://security.gg/",
    img: "/images/portfolio/bots/security.png",
    alt: "Security.gg Logo",
    name: "Security.gg",
    desc: "Advanced security and anti-raid protection"
  },
  {
    href: "https://quarklogger.com/",
    img: "/images/portfolio/bots/quark.png",
    alt: "Quark Logger Logo",
    name: "Quark Logger",
    desc: "Comprehensive logging and audit trail system"
  },
  {
    href: "https://rss.app/",
    img: "/images/portfolio/bots/rss-app.png",
    alt: "RSS.app Logo",
    name: "RSS.app",
    desc: "Automated content delivery and news updates (paid service)"
  },
  {
    href: "https://autopublisher.com/",
    img: "/images/portfolio/bots/auto-publisher.png",
    alt: "Auto Publisher Logo",
    name: "Auto Publisher",
    desc: "Automated content publishing and scheduling"
  },
  {
    href: "https://statbot.net/",
    img: "/images/portfolio/bots/statbot.png",
    alt: "Stat Bot Logo",
    name: "Stat Bot",
    desc: "Server analytics and member statistics"
  }
];

function BotSection() {
  return (
    <section id="bots" className="section section-light">
      <div className="container">
        <h2 className="section-header">Professional Bot Integration</h2>
        <div className="section-subtitle bots-subtitle">
          Each bot below is expertly integrated to elevate your server’s features, security, and engagement.<br />
          <span className="subtitle-note">More integrations are always being added.</span>
        </div>
        <div className="bots-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-lg)'}}>
          {bots.map((bot, idx) => (
            <a href={bot.href} className="bot-card" target="_blank" rel="noopener" key={idx}>
              <div className="bot-icon">
                <img src={bot.img} alt={bot.alt} className="bot-logo" />
              </div>
              <h3>{bot.name}</h3>
              <p>{bot.desc}</p>
            </a>
          ))}
          {/* Two placeholder cards to fill the grid */}
          <div className="bot-card bot-card-placeholder" tabIndex={-1} aria-disabled="true" style={{cursor: 'not-allowed', opacity: 0.65, pointerEvents: 'none'}}>
            <div className="bot-icon" style={{fontSize: '3rem', color: '#a3e3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px'}}>
              ⏳
            </div>
            <h3>Coming Soon</h3>
            <p>New integration in progress</p>
          </div>
          <div className="bot-card bot-card-placeholder" tabIndex={-1} aria-disabled="true" style={{cursor: 'not-allowed', opacity: 0.65, pointerEvents: 'none'}}>
            <div className="bot-icon" style={{fontSize: '3rem', color: '#a3e3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px'}}>
              ⏳
            </div>
            <h3>Coming Soon</h3>
            <p>New integration in progress</p>
          </div>
        </div>
        {/* Mystery card below the grid, spanning 2/3rds of the row */}
        <div className="bot-card bot-card-mystery" style={{margin: '2rem auto 0 auto', maxWidth: '600px', gridColumn: '1 / span 2'}}>
          <div className="bot-icon" style={{fontSize: '3.5rem', color: '#a3e3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px'}}>
            &#10068;
          </div>
          <h3 style={{letterSpacing: '2px'}}>Your Dream Bot?</h3>
          <p style={{fontStyle: 'italic', color: '#fff', opacity: 0.85}}>Looking for something unique? Ask about custom bots or integrations tailored to your needs.</p>
        </div>
      </div>
    </section>
  );
}

export default BotSection; 