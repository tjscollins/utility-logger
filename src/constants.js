
/**
 * Enum for logging levels
 *
 * @readonly
 * @enum {number}
 */
export const LEVEL = Object.freeze({
  quiet: 0,
  log: 1,
  error: 2,
  info: 3,
  debug: 4,
});

/**
 * Enum for logging output modes
 *
 * @readonly
 * @enum {number}
 */
export const MODE = Object.freeze({
  console: 0,
  file: 1,
});


export const DEFAULT_NODE_OPTS = Object.freeze({
  level: 'error',
  mode: 'console',
  logFile: undefined,
});
