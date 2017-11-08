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
  /* eslint-disable class-methods-use-this */
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
    const stringify = (acc, next) => `${acc}\n\n\t${next}`;

    switch (level) {
      case LEVEL.error:
        logString = colors.red(`ERROR: ${timestamp}\n\t${data.reduce(stringify, '')}`);
        break;
      case LEVEL.info:
        logString = colors.green(`INFO: ${timestamp}\n\t${data.reduce(stringify, '')}`);
        break;
      case LEVEL.debug:
        logString = colors.cyan(`DEBUG: ${timestamp}\n\t${data.reduce(stringify, '')}`);
        break;
      case LEVEL.log:
        logString = `LOG: ${timestamp}\n\t${data.reduce(stringify, '')}`;
        break;
      default:
        break;
    }
    console.log(logString);
  }
  /* eslint-enable class-methods-use-this */
  /* eslint-enable no-console */
}
