import fs from 'fs';

import BaseLogger from './BaseLogger';
import { LEVEL, MODE, DEFAULT_NODE_OPTS, NODE_COLORS } from './constants';

/**
 * @typedef {number} LOG_LEVEL
 * @typedef {string} TEXT_COLOR
 * @typedef {number} OUTPUT_MODE
 */

/**
 * Instantiate a logger configured to use a given log level and mode
 *
 * @export
 * @class nodeLogger
 * @extends {BaseLogger}
 */
export default class NodeLogger extends BaseLogger {
  constructor(suppliedOptions) {
    const options = Object.assign({}, DEFAULT_NODE_OPTS, suppliedOptions);

    if (options.mode !== undefined && Object.keys(MODE).indexOf(options.mode) < 0) {
      throw new TypeError(`Invalid log mode for NodeLogger ${options.modeName}`);
    }

    super(options);

    this.colors = NODE_COLORS;
    this.modeName = options.mode;
    this.mode = MODE[this.modeName];

    if (this.mode === MODE.file) {
      if (!options.logFile) {
        throw new TypeError('Invalid logFile undefined');
      }
      this.logFile = options.logFile;
    }
  }

  log(...args) {
    if (this.level >= LEVEL.log) {
      switch (this.mode) {
        case MODE.console:
          super.log(...args);
          break;
        case MODE.file:
          fs.appendFileSync(this.logFile, this._fileFormat(args, LEVEL.log));
          break;
        default:
          throw new TypeError(`Invalid log mode for NodeLogger ${this.modeName}`);
      }
    }
  }

  error(...args) {
    if (this.level >= LEVEL.error) {
      switch (this.mode) {
        case MODE.console:
          super.error(...args);
          break;
        case MODE.file:
          fs.appendFileSync(this.logFile, this._fileFormat(args, LEVEL.error));
          break;
        default:
          throw new TypeError(`Invalid log mode for NodeLogger ${this.modeName}`);
      }
    }
  }

  info(...args) {
    if (this.level >= LEVEL.info) {
      switch (this.mode) {
        case MODE.console:
          super.info(...args);
          break;
        case MODE.file:
          fs.appendFileSync(this.logFile, this._fileFormat(args, LEVEL.info));
          break;
        default:
          throw new TypeError(`Invalid log mode for NodeLogger ${this.modeName}`);
      }
    }
  }

  debug(...args) {
    if (this.level >= LEVEL.debug) {
      switch (this.mode) {
        case MODE.console:
          super.debug(...args);
          break;
        case MODE.file:
          fs.appendFileSync(this.logFile, this._fileFormat(args, LEVEL.debug));
          break;
        default:
          throw new TypeError(`Invalid log mode for NodeLogger ${this.modeName}`);
      }
    }
  }

  /* --------Private Methods-------- */

  /**
  * Format a list of items into a string to be output to the log
  *
  * @param {any[]} data
  * @param {LOG_LEVEL} level
  * @returns {string}
  * @memberof nodeLogger
  */
  _fileFormat(data, level) {
    const timestamp = Date();
    const logString = `${timestamp}\n${data.reduce(this._stringify, '')}`;

    switch (level) {
      case LEVEL.error:
        return `ERROR: ${timestamp}\n`;
      case LEVEL.info:
        return `INFO: ${timestamp}\n`;
      case LEVEL.debug:
        return `DEBUG: ${timestamp}\n`;
      case LEVEL.log:
        return `LOG: ${timestamp}\n`;
      default:
        return logString;
    }
  }
}
