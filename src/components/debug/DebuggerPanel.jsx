import React, { useContext } from 'react';
import { DebugContext } from '../../context/DebugContext';

// Usage: Place <DebuggerPanel> around debug tools in your page/component
function DebuggerPanel({ children }) {
  const { debug } = useContext(DebugContext);
  if (!debug) return null;
  return (
    <aside style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
      zIndex: 2000,
      background: 'rgba(30,34,40,0.98)',
      color: '#fff',
      borderTopLeftRadius: 12,
      boxShadow: '0 0 16px rgba(0,0,0,0.25)',
      padding: 16,
      minWidth: 320,
      maxWidth: 480,
      maxHeight: '80vh',
      overflowY: 'auto',
      fontSize: 14
    }}>
      <div style={{fontWeight: 600, marginBottom: 8, letterSpacing: 1}}>🪲 Debugger Panel</div>
      {children}
    </aside>
  );
}

export default DebuggerPanel; 