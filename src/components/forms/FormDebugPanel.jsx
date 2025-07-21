import React from "react";
import styles from '../../styles/components/FormDebugPanel.module.css';
import { log, warn, error as logError } from '../../utils/logger';
import { useContext } from 'react';
import { DebugContext } from '../../context/DebugContext';

function FormDebugPanel({ 
  formType, 
  onFillForm,
  onTestSubmission,
  onTestDiscordWebhook, 
  onReviewFormData,
  formData = null,
  onExportData,
  onImportData,
  onClearData,
  onViewStats,
  storageStats = null
}) {
  const { debug, setDebug } = useContext(DebugContext);
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  if (!formType) return null;

  // Wrap all actions with logger
  const handleFillForm = () => {
    log(debug, '📝 [FormDebugPanel] Fill Form clicked');
    onFillForm && onFillForm();
  };
  const handleTestSubmission = () => {
    log(debug, '🧪 [FormDebugPanel] Test Submission clicked');
    onTestSubmission && onTestSubmission();
  };
  const handleTestDiscordWebhook = () => {
    log(debug, '🧪 [FormDebugPanel] Test Discord Webhook clicked');
    onTestDiscordWebhook && onTestDiscordWebhook();
  };
  const handleReviewFormData = () => {
    log(debug, '📋 [FormDebugPanel] Review Form Data clicked', formData);
    onReviewFormData && onReviewFormData();
  };
  const handleExportData = () => {
    log(debug, '⬇️ [FormDebugPanel] Export Data clicked');
    onExportData && onExportData();
  };
  const handleImportData = (e) => {
    log(debug, '⬆️ [FormDebugPanel] Import Data clicked');
    onImportData && onImportData(e);
  };
  const handleClearData = () => {
    log(debug, '🗑️ [FormDebugPanel] Clear Data clicked');
    onClearData && onClearData();
  };
  const handleViewStats = () => {
    log(debug, '📊 [FormDebugPanel] View Stats clicked');
    onViewStats && onViewStats();
  };

  return (
    <div className={styles.debugPanel}>
      <div className={styles.header}>
        🐞 Debug - {formType && formType.charAt(0).toUpperCase() + formType.slice(1)} (Supabase)
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleFillForm} className="btn" style={{background:'#e0e7ef',color:'#23272a',fontWeight:700}}>📝 Fill Form</button>
        <button onClick={handleTestSubmission} className="btn" style={{background:'#e0e7ef',color:'#23272a',fontWeight:700}}>🧪 Test Submission</button>
        <button onClick={handleTestDiscordWebhook} className="btn" style={{background:'#e0e7ef',color:'#23272a',fontWeight:700}}>📡 Test Webhook</button>
        <button onClick={handleReviewFormData} className="btn" style={{background:'#e0e7ef',color:'#23272a',fontWeight:700}}>📋 View Data</button>
        <button onClick={handleExportData} className="btn" style={{background:'#e0e7ef',color:'#23272a',fontWeight:700}}>⬇️ Export Data</button>
        <label className="btn" style={{background:'#e0e7ef',color:'#23272a',fontWeight:700,display:'block',textAlign:'left'}}>
          ⬆️ Import Data
          <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleImportData} />
        </label>
        <button onClick={handleClearData} className="btn" style={{background:'#e0e7ef',color:'#23272a',fontWeight:700}}>🗑️ Clear Data</button>
        <button onClick={handleViewStats} className="btn" style={{background:'#e0e7ef',color:'#23272a',fontWeight:700}}>📊 Database Stats</button>
      </div>
      {formData && (
        <div className={styles.dataPreview}>
          <strong>Data:</strong>
          <pre className={styles.dataContent}>{JSON.stringify(formData, null, 1)}</pre>
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