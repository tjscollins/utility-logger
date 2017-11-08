/* global document */
import BaseLogger from './BaseLogger';

import { LEVEL, COLOR, MODE, DEFAULT_BROWSER_OPTS } from './constants';

export default class BrowserLogger extends BaseLogger {
  constructor(opts) {
    const options = Object.assign({}, DEFAULT_BROWSER_OPTS, opts);
    super(options);

    if (options.mode !== undefined && Object.keys(MODE).indexOf(options.mode) < 0) {
      throw new TypeError(`Invalid log mode ${options.mode}`);
    }

    this.mode = MODE[options.mode];

    if (this.mode === MODE.overlay) {
      // Create and position overlay logging window
      this.overlay = document.createElement('div');
      this.overlay.setAttribute('id', 'logger-overlay');
      this.overlay.setAttribute('style', 'position: fixed; bottom: 0; top: 200px; right: 0; width 250px; overflow-y: scroll; background-color: rgba(0,0,0,0.35); color: white;');
    }
  }

  log(...args) {
    if (this.level >= LEVEL.log) {
      const logEntry = document.createElement('span');
      switch (this.mode) {
        case MODE.console:
          super.log(...args);
          break;
        case MODE.overlay:
          logEntry.innerHTML = this._overlayFormat(args, LEVEL.log);
          logEntry.setAttribute('style', `color: ${COLOR[LEVEL.log]}`);
          break;
        default:
          throw new TypeError(`Invalid log mode for BrowserLogger: ${this.mode}`);
      }
      this.overlay.appendChild(logEntry);
    }
  }

  error(...args) {
    if (this.level >= LEVEL.error) {
      const logEntry = document.createElement('span');
      switch (this.mode) {
        case MODE.console:
          super.error(...args);
          break;
        case MODE.overlay:
          logEntry.innerHTML = this._overlayFormat(args, LEVEL.error);
          logEntry.setAttribute('style', `color: ${COLOR[LEVEL.error]}`);
          break;
        default:
          throw new TypeError(`Invalid log mode for BrowserLogger: ${this.mode}`);
      }
      this.overlay.appendChild(logEntry);
    }
  }

  info(...args) {
    if (this.level >= LEVEL.info) {
      const logEntry = document.createElement('span');
      switch (this.mode) {
        case MODE.console:
          super.info(...args);
          break;
        case MODE.overlay:
          logEntry.innerHTML = this._overlayFormat(args, LEVEL.info);
          logEntry.setAttribute('style', `color: ${COLOR[LEVEL.info]}`);
          break;
        default:
          throw new TypeError(`Invalid log mode for BrowserLogger: ${this.mode}`);
      }
      this.overlay.appendChild(logEntry);
    }
  }

  debug(...args) {
    if (this.level >= LEVEL.debug) {
      const logEntry = document.createElement('span');
      switch (this.mode) {
        case MODE.console:
          super.debug(...args);
          break;
        case MODE.overlay:
          logEntry.innerHTML = this._overlayFormat(args, LEVEL.debug);
          logEntry.setAttribute('style', `color: ${COLOR[LEVEL.debug]}`);
          break;
        default:
          throw new TypeError(`Invalid log mode for BrowserLogger: ${this.mode}`);
      }
      this.overlay.appendChild(logEntry);
    }
  }

  /* --------Private Methods-------- */

  _overlayFormat(data, level) {
    const timestamp = Date();
    let logString;

    switch (level) {
      case LEVEL.error:
        logString = `ERROR: ${timestamp}<br/>`;
        break;
      case LEVEL.info:
        logString = `INFO: ${timestamp}<br/>`;
        break;
      case LEVEL.debug:
        logString = `DEBUG: ${timestamp}<br/>`;
        break;
      case LEVEL.log:
        logString = `LOG: ${timestamp}<br/>`;
        break;
      default:
        break;
    }

    const dataString = data.reduce(this._stringify, '');
    dataString.replace('\n', '<br />');
    dataString.replace('\t', '&emsp;');
    return logString + dataString;
  }
}
