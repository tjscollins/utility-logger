import fs from 'fs';
import path from 'path';

import BaseLogger from './BaseLogger';
import { LEVEL, MODE, DEFAULT_NODE_OPTS } from './constants';

export default class nodeLogger extends BaseLogger {
  constructor(suppliedOptions) {
    const options = Object.assign({}, DEFAULT_NODE_OPTS, suppliedOptions);
    super(options);

    if (options.mode !== undefined && Object.keys(MODE).indexOf(options.mode) < 0) {
      throw new TypeError(`Invalid log mode ${options.mode}`);
    }

    this.mode = MODE[options.mode];

    if (this.mode === MODE.file) {
      this.logFile = options.logFile || `${path.basename(process.argv[1])}.log`;
    }
  }

  log(...args) {
    if (this.level >= LEVEL.log) {
      switch (this.mode) {
        case MODE.console:
          super.log(...args);
          break;
        case MODE.file:
          fs.appendFile(this.logFile, this._fileFormat(args, LEVEL.log));
          break;
        default:
          throw new TypeError(`Invalid log mode ${this.mode}`);
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
          fs.appendFile(this.logFile, this._fileFormat(args, LEVEL.error));
          break;
        default:
          throw new TypeError(`Invalid log mode ${this.mode}`);
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
          fs.appendFile(this.logFile, this._fileFormat(args, LEVEL.info));
          break;
        default:
          throw new TypeError(`Invalid log mode ${this.mode}`);
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
          fs.appendFile(this.logFile, this._fileFormat(args, LEVEL.debug));
          break;
        default:
          throw new TypeError(`Invalid log mode ${this.mode}`);
      }
    }
  }

  /* --------Private Methods-------- */

  _fileFormat(data, level) {
    const timestamp = Date();
    let logString;

    switch (level) {
      case LEVEL.error:
        logString = `ERROR: ${timestamp}\n`;
        break;
      case LEVEL.info:
        logString = `INFO: ${timestamp}\n`;
        break;
      case LEVEL.debug:
        logString = `DEBUG: ${timestamp}\n`;
        break;
      case LEVEL.log:
        logString = `LOG: ${timestamp}\n`;
        break;
      default:
        break;
    }

    logString += data.reduce(this._stringify, '');
    return logString;
  }
}
