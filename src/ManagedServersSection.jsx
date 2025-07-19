import React, { useState } from "react";
import { servers } from "./data/servers";
import ServerCard from "./components/servers/ServerCard";
import ServerWidgetModal from "./components/servers/ServerWidgetModal";
import styles from "./ManagedServersSection.module.css";

function ManagedServersSection() {
  const [modalServer, setModalServer] = useState(null);
  
  return (
    <section id="servers" className="section">
      <div className="container">
        <h2 className="section-header">My Managed Servers</h2>
        <div className="section-subtitle">
          Explore a selection of Discord communities I professionally manage and
          organize.
          <br />
          <span className="subtitle-note">
            Each server is tailored for engagement, clarity, and growth.
          </span>
        </div>
        <div className={`server-showcase ${styles.serverShowcase}`}>
          {servers.map((server, idx) => (
            <ServerCard 
              key={server.key} 
              server={server} 
              onClick={setModalServer}
            />
          ))}
        </div>
        <ServerWidgetModal
          open={!!modalServer}
          onClose={() => setModalServer(null)}
          server={modalServer}
        />
      </div>
    </section>
  );
}

export default ManagedServersSection;
