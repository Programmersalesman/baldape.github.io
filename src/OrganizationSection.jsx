import React, { useContext, useState } from "react";
import styles from "./styles/components/OrganizationSection.module.css";
import ImageExpandOverlay from "./components/ui/ImageExpandOverlay";
import { DebugContext } from "./context/DebugContext";
import FullSizeImageModal from "./components/ui/FullSizeImageModal";

const transformations = [
  {
    img: "/images/portfolio/organization/private-access.png",
    alt: "Private Access Categories Example",
    title: "Private Access Categories",
    desc: "Exclusive channels for premium members with proper role-based permissions and security. Custom categories ensure VIP members have dedicated spaces for exclusive content, private discussions, and special features that enhance their experience while maintaining server hierarchy.",
  },
  {
    img: "/images/portfolio/organization/media-section.png",
    alt: "Media Posting Example",
    title: "Media Posting",
    desc: "Automated posting from social media and news sources directly to Discord using services like RSS.app and TweetShift. Streamlined content delivery keeps your community updated with the latest news, social media updates, and relevant content without manual posting, ensuring consistent engagement.",
  },
  {
    img: "/images/portfolio/organization/server-meta.png",
    alt: "Server Meta Tracking & Giveaways Example",
    title: "Server Meta Tracking & Giveaways",
    desc: "Track XP, invite leaderboards, and run automated giveaways to boost engagement and reward your community. Comprehensive analytics help identify top contributors while automated systems maintain fair competition and keep members motivated to participate actively.",
  },
  {
    img: "/images/portfolio/organization/user-threads.png",
    alt: "User Threads Management Example",
    title: "User Threads Management",
    desc: "Organized threading system for user-generated content and discussions. Structured conversation channels prevent spam while encouraging meaningful dialogue, making it easy for members to find relevant discussions and contribute to ongoing conversations.",
  },
];

function OrganizationSection() {
  const { debug } = useContext(DebugContext);
  const [modalImg, setModalImg] = useState(null);
  return (
    <section id="organization" className="section section-light">
      <div className="container">
        <h2 className="section-header">Professional Server Organization</h2>
        <div className="section-subtitle">
          Each server below is expertly organized to maximize clarity, security,
          and engagement.
        </div>
        <div className={styles.organizationGrid}>
          {transformations.map((item, idx) => (
            <div className={styles.organizationUnifiedCard} key={idx}>
              <div className={styles.organizationCardImage}>
                <ImageExpandOverlay onClick={() => setModalImg(item)}>
                  <img
                    src={item.img}
                    alt={item.alt}
                    className={styles.fillOrganizationImage}
                    style={{ cursor: 'zoom-in' }}
                  />
                </ImageExpandOverlay>
              </div>
              <div className={styles.organizationCardText}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <FullSizeImageModal
          open={!!modalImg}
          onClose={() => setModalImg(null)}
          src={modalImg?.img}
          alt={modalImg?.alt}
          caption={modalImg?.title}
        />
      </div>
    </section>
  );
}

export default OrganizationSection;
