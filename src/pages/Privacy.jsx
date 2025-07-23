import React from "react";
import styles from '../styles/components/LegalPage.module.css';

function Privacy() {
  return (
    <div className={styles.legalContainer}>
      <h1 className={styles.legalTitle}>Privacy Policy</h1>
      <p className={styles.legalParagraph}><strong>Effective Date:</strong> June 2024</p>
      <p className={styles.legalParagraph}>
        This Privacy Policy (the "Policy") governs the manner in which BaldApe Services ("Company," "we," "us," or "our") collects, uses, maintains, and discloses information collected from users ("User," "you," or "your") of the website located at <a href="https://programmersalesman.github.io" className={styles.legalLink}>https://programmersalesman.github.io</a> (the "Site") and any related services (collectively, the "Services"). By accessing or using the Site or Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Policy.
      </p>
      <h2 className={styles.legalSectionTitle}>1. Information Collection</h2>
      <p className={styles.legalParagraph}>
        The Company may collect personal information from Users in a variety of ways, including, but not limited to, when Users visit the Site, register on the Site, fill out a form, or interact with the Services. The types of information collected may include, without limitation:
      </p>
      <ul className={styles.legalList}>
        <li>Personal identification information (such as name, email address, mailing address, phone number, or other identifiers by which you may be contacted online or offline);</li>
        <li>Technical and usage information (such as IP address, browser type, device information, operating system, referring URLs, pages visited, and the dates and times of visits);</li>
        <li>Any other information you voluntarily provide to the Company in connection with your use of the Services.</li>
      </ul>
      <h2 className={styles.legalSectionTitle}>2. Use of Information</h2>
      <p className={styles.legalParagraph}>
        The Company may use the information collected from Users for the following purposes:
      </p>
      <ul className={styles.legalList}>
        <li>To provide, operate, and maintain the Site and Services;</li>
        <li>To improve customer service and respond to your requests, questions, and feedback;</li>
        <li>To personalize User experience and deliver content and product offerings relevant to your interests;</li>
        <li>To analyze usage and trends to enhance the Site and Services;</li>
        <li>To comply with applicable laws, regulations, and legal obligations;</li>
        <li>To protect the rights, property, or safety of the Company, its Users, or others;</li>
        <li>For any other purpose disclosed to you at the time the information is collected or with your consent.</li>
      </ul>
      <h2 className={styles.legalSectionTitle}>3. Cookies and Tracking Technologies</h2>
      <p className={styles.legalParagraph}>
        The Site may use "cookies" and other tracking technologies to enhance User experience, analyze trends, administer the Site, and gather demographic information. Users may choose to set their web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the Site may not function properly.
      </p>
      <h2 className={styles.legalSectionTitle}>4. Disclosure of Information</h2>
      <p className={styles.legalParagraph}>
        The Company does not sell, trade, or rent Users' personal identification information to others. The Company may disclose information to third-party service providers who assist in operating the Site and providing the Services, subject to confidentiality obligations. The Company may also disclose information:
      </p>
      <ul className={styles.legalList}>
        <li>To comply with legal obligations, court orders, or governmental requests;</li>
        <li>To enforce our policies, terms, and agreements;</li>
        <li>To protect the rights, property, or safety of the Company, Users, or others;</li>
        <li>In connection with a merger, acquisition, or sale of all or a portion of the Company's assets, in which case Users will be notified of any change in ownership or use of their personal information.</li>
      </ul>
      <h2 className={styles.legalSectionTitle}>5. Data Security</h2>
      <p className={styles.legalParagraph}>
        The Company adopts commercially reasonable security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the Internet or method of electronic storage is completely secure, and the Company cannot guarantee absolute security.
      </p>
      <h2 className={styles.legalSectionTitle}>6. International Data Transfers</h2>
      <p className={styles.legalParagraph}>
        Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. By using the Site and Services, you consent to such transfers.
      </p>
      <h2 className={styles.legalSectionTitle}>7. User Rights and Choices</h2>
      <p className={styles.legalParagraph}>
        Subject to applicable law, you may have the right to access, correct, update, or request deletion of your personal information. You may also have the right to object to or restrict certain processing of your information. To exercise these rights, please contact the Company using the contact information provided below.
      </p>
      <h2 className={styles.legalSectionTitle}>8. Children's Privacy</h2>
      <p className={styles.legalParagraph}>
        The Site and Services are not directed to individuals under the age of 13. The Company does not knowingly collect personal information from children under 13. If you believe that a child has provided us with personal information, please contact us and we will take steps to delete such information promptly.
      </p>
      <h2 className={styles.legalSectionTitle}>9. Third-Party Websites</h2>
      <p className={styles.legalParagraph}>
        The Site may contain links to third-party websites or services that are not owned or controlled by the Company. The Company is not responsible for the privacy practices or content of such third-party sites. Users are encouraged to review the privacy policies of any third-party sites they visit.
      </p>
      <h2 className={styles.legalSectionTitle}>10. Changes to This Policy</h2>
      <p className={styles.legalParagraph}>
        The Company reserves the right to update or modify this Policy at any time. Any changes will be effective immediately upon posting the revised Policy on the Site. Users are encouraged to review this Policy periodically for any changes. Continued use of the Site or Services after any such changes constitutes acceptance of the revised Policy.
      </p>
      <h2 className={styles.legalSectionTitle}>11. Contact Information</h2>
      <p className={styles.legalParagraph}>
        If you have any questions, concerns, or requests regarding this Privacy Policy or the Company's data practices, please contact us at: <a href="mailto:BaldApeBiz@proton.me" className={styles.legalLink}>BaldApeBiz@proton.me</a>.
      </p>
      <p className={styles.legalNote}>
        This Privacy Policy is provided for informational purposes only and does not constitute legal advice. For specific legal guidance, please consult a qualified attorney.
      </p>
    </div>
  );
}

export default Privacy; 