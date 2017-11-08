import colors from 'colors';
import { LEVEL } from './constants';


export default class BaseLogger {
  constructor({ level }) {
    if (Object.keys(LEVEL).indexOf(level) < 0) {
      throw new TypeError(`Invalid log level ${level}`);
    }
    this.level = LEVEL[level];
  }

  /* eslint-disable no-console */
  log(...args) {
    console.log(...this.consoleFormat(args, LEVEL.log));
  }

  error(...args) {
    console.log(...this.consoleFormat(args, LEVEL.error));
  }

  info(...args) {
    console.log(...this.consoleFormat(args, LEVEL.info));
  }

  debug(...args) {
    console.log(...this.consoleFormat(args, LEVEL.debug));
  }


  consoleFormat(data, level) {
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
        logString = `LOG: ${timestamp}\n\t${data.reduce(this._stringify, '')}`;
        break;
      default:
        break;
    }

    return logString;
  }
  /* eslint-enable no-console */


  /* ------Private Methods-------- */
  /* eslint-disable class-methods-use-this */
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
