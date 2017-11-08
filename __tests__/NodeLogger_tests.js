import colors from 'colors';
import sinon from 'sinon';

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
});
