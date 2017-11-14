class Colors {
  constructor() {
    this._reset = '\x1b[0m';
    this._bright = '\x1b[1m';
    this._dim = '\x1b[2m';
    this._underscore = '\x1b[4m';
    this._blink = '\x1b[5m';
    this._reverse = '\x1b[7m';
    this._hidden = '\x1b[8m';

    this._fgBlack = '\x1b[30m';
    this._fgRed = '\x1b[31m';
    this._fgGreen = '\x1b[32m';
    this._fgYellow = '\x1b[33m';
    this._fgBlue = '\x1b[34m';
    this._fgMagenta = '\x1b[35m';
    this._fgCyan = '\x1b[36m';
    this._fgWhite = '\x1b[37m';

    this._bgBlack = '\x1b[40m';
    this._bgRed = '\x1b[41m';
    this._bgGreen = '\x1b[42m';
    this._bgYellow = '\x1b[43m';
    this._bgBlue = '\x1b[44m';
    this._bgMagenta = '\x1b[45m';
    this._bgCyan = '\x1b[46m';
    this._bgWhite = '\x1b[47m';
  }

  /* ----- Public Methods ----- */

  red(string) {
    return (typeof window !== 'undefined')
      ? [`%c ${string}`, 'color: red']
      : [this._fgRed + string];
  }

  cyan(string) {
    return (typeof window !== 'undefined')
      ? [`%c ${string}`, 'color: cyan']
      : [this._fgCyan + string];
  }

  green(string) {
    return (typeof window !== 'undefined')
      ? [`%c ${string}`, 'color: green']
      : [this._fgGreen + string];
  }

  darkgreen(string) {
    return (typeof window !== 'undefined')
      ? [`%c ${string}`, 'color: darkgreen']
      : [this._fgGreen + string];
  }

  white(string) {
    return (typeof window !== 'undefined')
      ? [`%c ${string}`, 'color: white']
      : [this._fgWhite + string];
  }

  magenta(string) {
    return (typeof window !== 'undefined')
      ? [`%c ${string}`, 'color: magenta']
      : [this._fgMagenta + string];
  }

  black(string) {
    return (typeof window !== 'undefined')
      ? [`%c ${string}`, 'color: black']
      : [this._fgBlack + string];
  }
}

const colors = new Colors();

export default colors;
