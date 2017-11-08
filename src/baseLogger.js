import colors from 'colors';
import { LEVEL } from './constants';


export default class BaseLogger {
  constructor({ level }) {
    if (Object.keys(LEVEL).indexOf(level) < 0) {
      throw new TypeError(`Invalid log level ${level}`);
    }
    this.level = LEVEL[level];
  }

  log(...args) {
    console.log(...this._consoleFormat(args, LEVEL.log));
  }

  error(...args) {
    console.error(...this._consoleFormat(args, LEVEL.error));
  }

  info(...args) {
    console.info(...this._consoleFormat(args, LEVEL.info));
  }

  debug(...args) {
    console.warn(...this._consoleFormat(args, LEVEL.debug));
  }


  /* ------Private Methods-------- */
  /* eslint-disable class-methods-use-this */

  /**
   * Format data into the correct string format based on log level
   *
   * @param {any} data
   * @param {LEVEL} level
   * @returns
   * @memberof BaseLogger
   */
  _consoleFormat(data, level) {
    const timestamp = Date();
    let logString;

    switch (level) {
      case LEVEL.error:
        logString = colors.red(`ERROR: ${timestamp}\n${data.reduce(this._stringify, '')}`);
        break;
      case LEVEL.info:
        logString = colors.green(`INFO: ${timestamp}\n${data.reduce(this._stringify, '')}`);
        break;
      case LEVEL.debug:
        logString = colors.cyan(`DEBUG: ${timestamp}\n${data.reduce(this._stringify, '')}`);
        break;
      case LEVEL.log:
        logString = `LOG: ${timestamp}\n${data.reduce(this._stringify, '')}`;
        break;
      default:
        break;
    }

    return logString;
  }

  /**
   * Private reducer to stringify an array of items
   *
   * @param {string} acc
   * @param {any} next
   * @returns
   */
  _stringify(acc, next) {
    return `${acc}\t${next}\n\n`;
  }
  /* eslint-enable class-methods-use-this */
}
