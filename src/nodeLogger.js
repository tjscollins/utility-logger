import baseLogger from 'baseLogger';
import fs from 'fs';

import { LEVEL, MODE } from './constants';

class nodeLogger extends baseLogger {
  constructor(opts) {
    super(opts.level);

    if (Object.keys(MODE).indexOf(opts.mode) < 0) {
      throw new TypeError(`Invalid log mode ${opts.mode}`);
    }

    this.mode = MODE[opts.mode];

    if (this.mode == MODE.file) {
      this.logFile = opts.logFile;
    }
  }

  fileFormat(data, level) {}

  log(...args) {
    switch (this.mode) {
      case MODE.console:
        super.log(...args);
        break;
      case MODE.file:
        fs.appendFile(this.logFile, this.fileFormat(args, LEVEL.log));
        break;
      default:
        throw new TypeError(`Invalid log mode ${this.mode}`);
    }
  }

  error(...args) {
    switch (this.mode) {
      case MODE.console:
        super.error(...args);
        break;
      case MODE.file:
        fs.appendFile(this.logFile, this.fileFormat(args, LEVEL.error));
        break;
      default:
        throw new TypeError(`Invalid log mode ${this.mode}`);
    }
  }

  info(...args) {
    switch (this.mode) {
      case MODE.console:
        super.info(...args);
        break;
      case MODE.file:
        fs.appendFile(this.logFile, this.fileFormat(args, LEVEL.info));
        break;
      default:
        throw new TypeError(`Invalid log mode ${this.mode}`);
    }
  }

  debug(...args) {
    switch (this.mode) {
      case MODE.console:
        super.debug(...args);
        break;
      case MODE.file:
        fs.appendFile(this.logFile, this.fileFormat(args, LEVEL.debug));
        break;
      default:
        throw new TypeError(`Invalid log mode ${this.mode}`);
    }
  }
}
