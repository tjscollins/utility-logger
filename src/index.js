import NodeLogger from './NodeLogger';
import BrowserLogger from './BrowserLogger';

const Logger = (typeof process !== 'undefined') && (process.release.name === 'node') ? NodeLogger : BrowserLogger;

export default Logger;
