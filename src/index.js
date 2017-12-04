import NodeLogger from './NodeLogger';
import BrowserLogger from './BrowserLogger';

export default (function selectLogger() {
  if (typeof window !== 'undefined') {
    return BrowserLogger;
  } else if (typeof global !== 'undefined') {
    return NodeLogger;
  }
  throw new Error('Unknown environment');
})();
