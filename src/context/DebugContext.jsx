import React, { createContext, useState, useMemo } from 'react';

const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

export const DebugContext = createContext({ debug: false, setDebug: () => {} });

export const DebugProvider = ({ children }) => {
  const [debug, setDebug] = useState(isLocalhost);
  const value = useMemo(() => ({ debug, setDebug }), [debug]);
  return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>;
};

export const DebugToggleButton = () => {
  const { debug, setDebug } = React.useContext(DebugContext);
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  if (!isLocal) return null;
  return (
    <button
      onClick={() => setDebug((d) => !d)}
      style={{
        position: 'fixed',
        right: 24,
        bottom: 32,
        zIndex: 4000,
        background: debug ? '#43b581' : '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: 24,
        padding: '12px 20px',
        fontWeight: 700,
        fontSize: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
        cursor: 'pointer',
        opacity: 0.92,
        transition: 'background 0.2s, opacity 0.2s',
      }}
      title={debug ? 'Disable Debug Mode' : 'Enable Debug Mode'}
    >
      {debug ? '🛑 Debug ON' : '🐞 Debug OFF'}
    </button>
  );
}; 