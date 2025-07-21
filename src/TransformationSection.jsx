import React, { useContext, useState } from "react";
import styles from "./styles/components/TransformationSection.module.css";
import ImageExpandOverlay from "./components/ui/ImageExpandOverlay";
import { DebugContext } from "./context/DebugContext";
import FullSizeImageModal from "./components/ui/FullSizeImageModal";

const transformations = [
  {
    badge: "Original State",
    badgeClass: "before overlay-badge",
    image: "/images/portfolio/transformations/old.png",
    alt: "Before: Disorganized Server Design",
    issues: [
      "❌ Poor channel organization",
      "❌ No clear user hierarchy",
      "❌ Limited functionality",
      "❌ Confusing navigation",
    ],
    description:
      "Typical disorganized server with scattered channels, poor role management, and limited user engagement features.",
  },
  {
    badge: "Transformed",
    badgeClass: "after overlay-badge",
    image: "/images/portfolio/transformations/new.png",
    alt: "After: Organized Server Design with clear sections and new features",
    improvements: [
      "✅ Clear channel sections",
      "✅ Improved user hierarchy",
      "✅ Enhanced functionality",
      "✅ Intuitive navigation",
    ],
    description:
      "Transformed server with organized channels, clear roles, and engaging features for a better user experience.",
  },
];

function TransformationSection() {
  const { debug } = useContext(DebugContext);
  const [modalImg, setModalImg] = useState(null);
  return (
    <section id="transformations" className="section section-light">
      <div className="container">
        <h2 className="section-header">Server Transformation Examples</h2>
        <div className="section-subtitle">
          See the dramatic improvements in server organization, user experience,
          and community engagement
        </div>
        <div className={styles.transformationGrid}>
          {transformations.map((item, idx) => (
            <div className={styles.transformationPair} key={idx}>
              <div className={styles.transformationCardImage}>
                {item.badge && (
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <span className={`transformation-badge ${item.badgeClass}`}>{item.badge}</span>
                  </div>
                )}
                <ImageExpandOverlay onClick={() => setModalImg(item)}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    className={styles.fillTransformationImage}
                    style={{ cursor: 'zoom-in' }}
                  />
                </ImageExpandOverlay>
              </div>
              <div className={styles.transformationDetails + " frosted-text-card"}>
                {item.issues && (
                  <ul className="transformation-issues">
                    {item.issues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                )}
                {item.improvements && (
                  <ul className="transformation-improvements">
                    {item.improvements.map((impr, i) => (
                      <li key={i}>{impr}</li>
                    ))}
                  </ul>
                )}
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <FullSizeImageModal
          open={!!modalImg}
          onClose={() => setModalImg(null)}
          src={modalImg?.image}
          alt={modalImg?.alt}
          caption={modalImg?.badge}
        />
      </div>
    </section>
  );
}

export default TransformationSection;
