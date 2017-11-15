/**
 * @typedef {number} LOG_LEVEL
 * @typedef {string} TEXT_COLOR
 * @typedef {number} OUTPUT_MODE
 */


/**
 * Enum for logging levels
 *
 * @readonly
 * @enum {LOG_LEVEL}
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
 * @enum {OUTPUT_MODE}
 */
export const MODE = Object.freeze({
  console: 0,
  file: 1,
  overlay: 2,
});

/**
 * Enum for logging output colors in node environemnt
 *
 * @readonly
 * @enum {TEXT_COLOR}
 */
export const NODE_COLORS = Object.freeze({
  [LEVEL.log]: 'default',
  [LEVEL.error]: 'red',
  [LEVEL.info]: 'green',
  [LEVEL.debug]: 'magenta',
});

/**
 * Enum for logging output colors in browser console
 *
 * @readonly
 * @enum {TEXT_COLOR}
 */
export const BROWSER_COLORS = Object.freeze({
  [LEVEL.log]: 'default',
  [LEVEL.error]: 'red',
  [LEVEL.info]: 'darkgreen',
  [LEVEL.debug]: 'black',
});


export const DEFAULT_NODE_OPTS = Object.freeze({
  level: 'error',
  mode: 'console',
  logFile: 'logFile.log',
});

export const DEFAULT_BROWSER_OPTS = Object.freeze({
  level: 'error',
  mode: 'console',
});
