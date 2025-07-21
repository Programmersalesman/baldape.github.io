// logger.js
// Usage: import { log, warn, error } from './logger';
// Use log(), warn(), error() for debug output

export const log = (debug, ...args) => { if (debug) console.log(...args); };
export const warn = (debug, ...args) => { if (debug) console.warn(...args); };
export const error = (debug, ...args) => { if (debug) console.error(...args); }; 