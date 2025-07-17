import React from "react";

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
      "❌ Confusing navigation"
    ],
    description: "Typical disorganized server with scattered channels, poor role management, and limited user engagement features."
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
      "✅ Intuitive navigation"
    ],
    description: "Transformed server with organized channels, clear roles, and engaging features for a better user experience."
  }
];

function TransformationCard({ badge, badgeClass, image, alt, issues, improvements, description }) {
  return (
    <div className="transformation-group">
      <div className="transformation-card dark-glass-card no-hover equal-size">
        <div className="image-badge-wrapper">
          <span className={`transformation-badge ${badgeClass}`}>{badge}</span>
          <img src={image} alt={alt} className="transformation-image fill-card-image" />
        </div>
      </div>
      <div className="transformation-details frosted-text-card">
        {issues && (
          <ul className="transformation-issues">
            {issues.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        )}
        {improvements && (
          <ul className="transformation-improvements">
            {improvements.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        )}
        <p>{description}</p>
      </div>
    </div>
  );
}

function TransformationSection() {
  return (
    <section id="transformations" className="section section-light">
      <div className="container">
        <h2 className="section-header">Server Transformation Examples</h2>
        <div className="section-subtitle">
          See the dramatic improvements in server organization, user experience, and community engagement
        </div>
        <div className="grid-2">
          {transformations.map((t, idx) => (
            <TransformationCard key={idx} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TransformationSection; 