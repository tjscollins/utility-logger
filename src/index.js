import nodeLogger from './nodeLogger';
import browserLogger from './browserLogger';

const Logger = process ? nodeLogger : browserLogger;

export default Logger;