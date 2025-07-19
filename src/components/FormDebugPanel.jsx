import React from "react";

function FormDebugPanel({ 
  formType, 
  onTestSubmission, 
  onFillForm,
  onTestDiscordWebhook, 
  onReviewFormData,
  formData = null,
  onExportData,
  onImportData,
  onClearData,
  onViewStats,
  storageStats = null
}) {
  if (!formType) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: 20,
        zIndex: 3100, // Higher than modal close button (2100), modal overlay (2000), and status messages (3001)
        background: "rgba(0, 0, 0, 0.9)",
        border: "2px solid #5865F2",
        borderRadius: 8,
        padding: "12px",
        minWidth: 200,
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ 
        color: "#a3e3ff", 
        fontWeight: 700, 
        fontSize: "1em", 
        marginBottom: 8,
        borderBottom: "1px solid #444",
        paddingBottom: 4
      }}>
        🐛 Debug - {formType}
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <button
          onClick={() => onFillForm()}
          style={{
            background: "#43b581",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "6px 10px",
            fontSize: "0.85em",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          📝 Fill Form
        </button>

        <button
          onClick={() => onTestSubmission()}
          style={{
            background: "#faa61a",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "6px 10px",
            fontSize: "0.85em",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ✅ Test Submit
        </button>

        <button
          onClick={() => onTestDiscordWebhook()}
          style={{
            background: "#5865F2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "6px 10px",
            fontSize: "0.85em",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          📡 Test Webhook
        </button>

        <button
          onClick={() => onReviewFormData()}
          style={{
            background: "#7289da",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "6px 10px",
            fontSize: "0.85em",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          📋 View Data
        </button>

        {/* Data Management Section */}
        {(formType === 'testimonial' || formType === 'consultation') && (
          <>
            <div style={{ 
              marginTop: 8, 
              padding: 4, 
              background: "rgba(255, 255, 255, 0.05)", 
              borderRadius: 4,
              borderTop: "1px solid #444"
            }}>
              <div style={{ color: "#a3e3ff", fontSize: "0.8em", fontWeight: 600, marginBottom: 4 }}>
                💾 Data Management
              </div>
            </div>

            <button
              onClick={() => onExportData()}
              style={{
                background: "#43b581",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "6px 10px",
                fontSize: "0.85em",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              📤 Export Data
            </button>

            <label
              style={{
                background: "#faa61a",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "6px 10px",
                fontSize: "0.85em",
                fontWeight: 600,
                cursor: "pointer",
                display: "block",
                textAlign: "center",
              }}
            >
              📥 Import Data
              <input
                type="file"
                accept=".json"
                onChange={onImportData}
                style={{ display: "none" }}
              />
            </label>

            <button
              onClick={() => onViewStats()}
              style={{
                background: "#5865F2",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "6px 10px",
                fontSize: "0.85em",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              📊 View Stats
            </button>

            <button
              onClick={() => onClearData()}
              style={{
                background: "#f04747",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "6px 10px",
                fontSize: "0.85em",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              🗑️ Clear All
            </button>
          </>
        )}
      </div>

      {formData && (
        <div style={{ 
          marginTop: 8, 
          padding: 4, 
          background: "rgba(255, 255, 255, 0.1)", 
          borderRadius: 4,
          fontSize: "0.75em",
          color: "#b9bbbe",
          maxHeight: 80,
          overflowY: "auto"
        }}>
          <strong>Data:</strong>
          <pre style={{ margin: 2, fontSize: "0.7em" }}>
            {JSON.stringify(formData, null, 1)}
          </pre>
        </div>
      )}

      {storageStats && (
        <div style={{ 
          marginTop: 8, 
          padding: 4, 
          background: "rgba(255, 255, 255, 0.05)", 
          borderRadius: 4,
          fontSize: "0.75em",
          color: "#b9bbbe"
        }}>
          <strong>Storage:</strong>
          <div style={{ fontSize: "0.7em", marginTop: 2 }}>
            Total: {storageStats.totalTestimonials}<br/>
            Public: {storageStats.publicTestimonials}<br/>
            Size: {storageStats.storageSizeKB}KB
          </div>
        </div>
      )}
    </div>
  );
}

export default FormDebugPanel; 