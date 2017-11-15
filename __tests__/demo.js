const Logger = require('../dist/utility-logger');

const log = new Logger({ level: 'debug' });

log.log('Basic forced log statement');
log.info('Informative content');
log.error('Oh no, something went horribly wrong.');
log.debug('Here\'s what I know about it...');

const file = new Logger({ level: 'debug', mode: 'file' });

file.log('Basic forced log statement');
file.info('Informative content');
file.error('Oh no, something went horribly wrong.');
file.debug('Here\'s what I know about it...');
