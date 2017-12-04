# utility-logger.js

`utility-logger` is a Javascript library to manage logging to console, file (node enviornment), or DOM overlay (for browser) with multiple loging levels and colored logging output.

`utility-logger` offers four levels of logging output.  In order from highest priority to lowest: `log`, `error`, `info`, and `debug`.

## Usage

### Node.js

Add `utility-logger` to your project by running

```
npm install --save utility-logger
```

#### Basic Usage: Console Logging

```
const UtilityLogger = require('utility-logger');

const log = new UtilityLogger({ level: 'debug' });

log.log('Basic forced log statement');
log.info('Informative content');
log.error('Oh no, something went horribly wrong.');
log.debug('Here\'s what I know about it...');
```

#### Basic Usage: File Logging

```
const file = new UtilityLogger({ level: 'debug', mode: 'file' });

file.log('Basic forced log statement');
file.info('Informative content');
file.error('Oh no, something went horribly wrong.');
file.debug('Here\'s what I know about it...');
```

### Browser

#### Basic Usage: Console Logging

To use `utility-logger` in the browser you can either bundle with webpack or include with a script tag:
```
<script src="/path/to/utility-logger.js"></script>
```

In both cases, usage is the same as in a Node.js environment:
```
let log = new UtilityLogger({ level: 'debug' });

log.log('Basic forced log statement');
log.info('Informative content');
log.error('Oh no, something went horribly wrong.');
log.debug('Here\'s what I know about it...');
```