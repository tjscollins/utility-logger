/* eslint-disable no-use-before-define */
import sinon from 'sinon';

import BrowserLogger from '../src/BrowserLogger';
import { LEVEL, MODE } from '../src/constants';

describe('BrowserLogger', () => {
  it('should set output mode = MODE.overlay', () => {
    const logger = new BrowserLogger({ mode: 'overlay' });
    expect(logger.mode).toBe(MODE.overlay);
    expect(logger.overlay).toBeDefined();
  });

  it('should set mode = MODE.console', () => {
    const logger = new BrowserLogger({ mode: 'console' });
    expect(logger.mode).toBe(MODE.console);
  });

  describe('BrowserLogger._overlayFormat', () => {
    it('should format BrowserLogger.log logging correctly', () => {
      const logger = new BrowserLogger({ level: 'debug', mode: 'file' });
      expect(logger._overlayFormat(['test'], LEVEL.log)).toBe(`LOG: ${Date()}<br/>&emsp;test<br />\n`);
    });

    it('should format BrowserLogger.error logging correctly', () => {
      const logger = new BrowserLogger({ level: 'debug', mode: 'file' });
      expect(logger._overlayFormat(['test'], LEVEL.error)).toBe(`ERROR: ${Date()}<br/>&emsp;test<br />\n`);
    });

    it('should format BrowserLogger.info logging correctly', () => {
      const logger = new BrowserLogger({ level: 'debug', mode: 'file' });
      expect(logger._overlayFormat(['test'], LEVEL.info)).toBe(`INFO: ${Date()}<br/>&emsp;test<br />\n`);
    });

    it('should format BrowserLogger.debug logging correctly', () => {
      const logger = new BrowserLogger({ level: 'debug', mode: 'file' });
      expect(logger._overlayFormat(['test'], LEVEL.debug)).toBe(`DEBUG: ${Date()}<br/>&emsp;test<br />\n`);
    });
  });

  describe('BrowserLogger.log', testLoggerMethod('log'));

  describe('BrowserLogger.error', testLoggerMethod('error'));

  describe('BrowserLogger.info', testLoggerMethod('info'));

  describe('BrowserLogger.debug', testLoggerMethod('debug'));
});

function testLoggerMethod(level) {
  return () => {
    let logStub;
    let errorStub;
    let infoStub;
    let debugStub;
    global.document = {
      createElement: sinon.stub().returns(global.document),
      setAttribute: sinon.stub(),
    };

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

    it(`should check the log level and only proceed if level >= LEVEL.${level}`, () => {
      const logger = new BrowserLogger({ level: 'quiet' });
      logger[level]('test');
      expect(console.log.called).toBe(false);
      logger.level = LEVEL[level];
      logger[level]('test');
      const consoleMethod = level === 'debug' ? 'warn' : level;
      expect(console[consoleMethod].called).toBe(true);
    });

    it('should switch based on logging mode', () => {
      const logger = new BrowserLogger({ level, mode: 'console' });
      logger.overlay = {
        appendChild: sinon.spy(),
      };
      logger[level]('test');
      const consoleMethod = level === 'debug' ? 'warn' : level;
      expect(console[consoleMethod].calledOnce).toBe(true);
      expect(logger.overlay.appendChild.called).toBe(false);
      logger.mode = MODE.overlay;
      logger[level]('test');
      expect(console[consoleMethod].calledOnce).toBe(true);
      expect(logger.overlay.appendChild.calledOnce).toBe(true);
    });
  };
}
