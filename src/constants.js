
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
  overlay: 2,
});

/**
 * Enum for logging output colors
 *
 * @readonly
 * @enum {number}
 */
export const COLOR = Object.freeze({
  log: 'white',
  error: 'red',
  info: 'green',
  debug: 'cyan',
});


export const DEFAULT_NODE_OPTS = Object.freeze({
  level: 'error',
  mode: 'console',
  logFile: undefined,
});

export const DEFAULT_BROWSER_OPTS = Object.freeze({
  level: 'error',
  mode: 'console',
});
