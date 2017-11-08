/* eslint-disable no-use-before-define */
import colors from 'colors';
import sinon from 'sinon';

import BaseLogger from '../src/BaseLogger';
import { LEVEL } from '../src/constants';

describe('BaseLogger', () => {
  it('should configure itself with supplied log level', () => {
    let logger = new BaseLogger({ level: 'quiet' });
    expect(logger.level).toBe(LEVEL.quiet);

    logger = new BaseLogger({ level: 'error' });
    expect(logger.level).toBe(LEVEL.error);

    logger = new BaseLogger({ level: 'info' });
    expect(logger.level).toBe(LEVEL.info);

    logger = new BaseLogger({ level: 'debug' });
    expect(logger.level).toBe(LEVEL.debug);
  });

  it('should throw an error if used with invalid log level', (done) => {
    try {
      const logger = new BaseLogger({ level: 'test' });
      done(Error('BaseLogger did not throw an error when called with invalid log level.'));
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      done();
    }
  });

  describe('BaseLogger._consoleFormat', () => {
    it('should format BaseLoggerr.log logging correctly', () => {
      const logger = new BaseLogger({ level: 'debug' });
      expect(logger._consoleFormat(['test'], LEVEL.log)).toBe(`LOG: ${Date()}\n\ttest\n\n`);
    });

    it('should format BaseLoggerr.error logging correctly', () => {
      const logger = new BaseLogger({ level: 'debug' });
      expect(logger._consoleFormat(['test'], LEVEL.error)).toBe(colors.red(`ERROR: ${Date()}\n\ttest\n\n`));
    });

    it('should format BaseLoggerr.info logging correctly', () => {
      const logger = new BaseLogger({ level: 'debug' });
      expect(logger._consoleFormat(['test'], LEVEL.info)).toBe(colors.green(`INFO: ${Date()}\n\ttest\n\n`));
    });

    it('should format BaseLoggerr.debug logging correctly', () => {
      const logger = new BaseLogger({ level: 'debug' });
      expect(logger._consoleFormat(['test'], LEVEL.debug)).toBe(colors.cyan(`DEBUG: ${Date()}\n\ttest\n\n`));
    });
  });

  describe('Baselogger.log', testLoggerMethod('log'));

  describe('Baselogger.error', testLoggerMethod('error'));

  describe('Baselogger.info', testLoggerMethod('info'));

  describe('Baselogger.debug', testLoggerMethod('debug'));
});

function testLoggerMethod(level) {
  return () => {
    let logStub;
    let errorStub;
    let infoStub;
    let debugStub;

    beforeEach(() => {
      logStub = sinon.stub(console, 'log');
      errorStub = sinon.stub(console, 'error');
      infoStub = sinon.stub(console, 'info');
      debugStub = sinon.stub(console, 'warn');
    });

    afterEach(() => {
      logStub.restore();
      errorStub.restore();
      infoStub.restore();
      debugStub.restore();
    });

    it('should invoke console.log', () => {
      const logger = new BaseLogger({ level });
      logger[level]('Test');

      const consoleMethod = level === 'debug' ? 'warn' : level;
      expect(console[consoleMethod].calledOnce).toBe(true);
    });
  };
}
