import React from "react";
import styles from "./FormDebugPanel.module.css";

function FormDebugPanel({ 
  formType, 
  onFillForm,
  onTestDiscordWebhook, 
  onReviewFormData,
  formData = null,
  onViewStats,
  onTestConnection,
  storageStats = null
}) {
  if (!formType) return null;

  return (
    <div className={styles.debugPanel}>
      <div className={styles.header}>
        🐛 Debug - {formType} (Supabase)
      </div>
      
      <div className={styles.buttonContainer}>
        <button
          onClick={() => onFillForm()}
          className={styles.fillButton}
        >
          📝 Fill Form
        </button>

        <button
          onClick={() => onTestDiscordWebhook()}
          className={styles.webhookButton}
        >
          📡 Test Webhook
        </button>

        <button
          onClick={() => onReviewFormData()}
          className={styles.dataButton}
        >
          📋 View Data
        </button>

        <button
          onClick={() => onViewStats()}
          className={styles.statsButton}
        >
          📊 Database Stats
        </button>

        <button
          onClick={() => onTestConnection()}
          className={styles.connectionButton}
        >
          🔍 Test Connection
        </button>
      </div>

      {formData && (
        <div className={styles.dataPreview}>
          <strong>Data:</strong>
          <pre className={styles.dataContent}>
            {JSON.stringify(formData, null, 1)}
          </pre>
        </div>
      )}

      {storageStats && (
        <div className={styles.statsPreview}>
          <strong>Database:</strong>
          <div className={styles.statsContent}>
            Total: {storageStats.total || storageStats.totalTestimonials}<br/>
            Approved: {storageStats.approved}<br/>
            Pending: {storageStats.pending}<br/>
            Avg Rating: {storageStats.averageRating || storageStats.avgRating}
          </div>
        </div>
      )}
    </div>
  );
}

export default FormDebugPanel; 