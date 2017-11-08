/* eslint-disable no-use-before-define */
import colors from 'colors';
import sinon from 'sinon';
import fs from 'fs';

import NodeLogger from '../src/NodeLogger';
import { LEVEL, MODE } from '../src/constants';

describe('NodeLogger', () => {
  it('should set output mode = MODE.file and logFile', () => {
    const logger = new NodeLogger({ mode: 'file' });
    expect(logger.mode).toBe(MODE.file);
    expect(logger.logFile).toBe('jest.log');
  });

  it('should set mode = MODE.console', () => {
    const logger = new NodeLogger({ mode: 'console' });
    expect(logger.mode).toBe(MODE.console);
    expect(logger.logFile).toBe(undefined);
  });

  describe('NodeLogger._fileFormat', () => {
    it('should format NodeLogger.log logging correctly', () => {
      const logger = new NodeLogger({ level: 'debug', mode: 'file' });
      expect(logger._fileFormat(['test'], LEVEL.log)).toBe(`LOG: ${Date()}\n\ttest\n\n`);
    });

    it('should format NodeLogger.error logging correctly', () => {
      const logger = new NodeLogger({ level: 'debug', mode: 'file' });
      expect(logger._fileFormat(['test'], LEVEL.error)).toBe(`ERROR: ${Date()}\n\ttest\n\n`);
    });

    it('should format NodeLogger.info logging correctly', () => {
      const logger = new NodeLogger({ level: 'debug', mode: 'file' });
      expect(logger._fileFormat(['test'], LEVEL.info)).toBe(`INFO: ${Date()}\n\ttest\n\n`);
    });

    it('should format NodeLogger.debug logging correctly', () => {
      const logger = new NodeLogger({ level: 'debug', mode: 'file' });
      expect(logger._fileFormat(['test'], LEVEL.debug)).toBe(`DEBUG: ${Date()}\n\ttest\n\n`);
    });
  });

  describe('NodeLogger.log', testLoggerMethod('log'));

  describe('NodeLogger.error', testLoggerMethod('error'));

  describe('NodeLogger.info', testLoggerMethod('info'));

  describe('NodeLogger.debug', testLoggerMethod('debug'));
});

function testLoggerMethod(level) {
  return () => {
    let consoleStub,
      fsStub;

    beforeEach(() => {
      consoleStub = sinon.stub(console, 'log');
      fsStub = sinon.stub(fs, 'appendFile');
    });

    afterEach(() => {
      consoleStub.restore();
      fsStub.restore();
    });

    it(`should check the log level and only proceed if level >= LEVEL.${level}`, () => {
      const logger = new NodeLogger({ level: 'quiet' });
      logger[level]('test');
      expect(console.log.called).toBe(false);
      logger.level = LEVEL[level];
      logger[level]('test');
      expect(console.log.called).toBe(true);
    });

    it('should switch based on logging mode', () => {
      const logger = new NodeLogger({ level, mode: 'console' });
      logger[level]('test');
      expect(console.log.calledOnce).toBe(true);
      expect(fs.appendFile.calledOnce).toBe(false);
      logger.mode = MODE.file;
      logger[level]('test');
      expect(console.log.calledOnce).toBe(true);
      expect(fs.appendFile.calledOnce).toBe(true);
    });
  };
}
