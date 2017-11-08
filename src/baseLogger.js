import colors from 'colors';

const LEVEL = Object.freeze({
    quiet: 0,
    error: 1,
    info: 2,
    debug: 3,
    log: 4,
});

class baseLogger {
    constructor(logLevel) {
        this.level = LEVEL[loglevel];
    }

    log (...args) {
        console.log(...this.format(args, LEVEL.log));
    }
    
    error (...args) {
        console.log(...this.format(args, LEVEL.error));
    }
        
    info (...args) {
        console.log(...this.format(args, LEVEL.info));
    }
    
    debug (...args) {
        console.log(...this.format(args, LEVEL.debug));
    }

    format(data, level) {
        if (LEVEL.values().indexOf(level) < 0) {
            throw new Error('Invalid log level');
        }

    }

}