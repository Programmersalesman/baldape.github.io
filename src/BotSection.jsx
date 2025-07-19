import React from "react";
import { bots } from "./data/bots";
import BotCard from "./components/bots/BotCard";
import styles from "./BotSection.module.css";

function BotSection() {
  return (
    <section id="bots" className="section section-light">
      <div className="container">
        <h2 className="section-header">Professional Bot Integration</h2>
        <div className="section-subtitle bots-subtitle">
          Each bot below is expertly integrated to elevate your server's
          features, security, and engagement.
          <br />
          <span className="subtitle-note">
            More integrations are always being added.
          </span>
        </div>
        <div className={`bots-grid ${styles.botsGrid}`}>
          {bots.map((bot, idx) => (
            <BotCard key={idx} bot={bot} />
          ))}
          {/* Two placeholder cards to fill the grid */}
          <BotCard isPlaceholder={true} />
          <BotCard isPlaceholder={true} />
        </div>
        {/* Mystery card below the grid, spanning 2/3rds of the row */}
        <BotCard isMystery={true} />
      </div>
    </section>
  );
}

export default BotSection;
