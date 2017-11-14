import colors from './colors';
import { LEVEL, NODE_COLORS } from './constants';


export default class BaseLogger {
  constructor({ level }) {
    if (Object.keys(LEVEL).indexOf(level) < 0) {
      throw new TypeError(`Invalid log level ${level}`);
    }
    this.colors = NODE_COLORS;
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
    const levelColor = this.colors[level];
    const logString = `${timestamp}\n${data.reduce(this._stringify, '')}`;

    switch (level) {
      case LEVEL.error:
        return colors[levelColor](`ERROR: ${logString}`);
      case LEVEL.info:
        return colors[levelColor](`INFO: ${logString}`);
      case LEVEL.debug:
        return colors[levelColor](`DEBUG: ${logString}`);
      case LEVEL.log:
        return colors[levelColor](`LOG: ${logString}`);
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
