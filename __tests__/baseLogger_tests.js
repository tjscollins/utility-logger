import BaseLogger, { LEVEL } from '../src/baseLogger';

describe('BaseLogger', () => {
    it('should configure itself with supplied log level', () => {
        let logger = new BaseLogger('quiet');
        expect(logger.level).toBe(LEVEL.quiet);

        logger = new BaseLogger('error');
        expect(logger.level).toBe(LEVEL.error);
        
        logger = new BaseLogger('info');
        expect(logger.level).toBe(LEVEL.info);
        
        logger = new BaseLogger('debug');
        expect(logger.level).toBe(LEVEL.debug);
    });

    it('should throw an error if used with invalid log level', (done) => {
        try {
            let logger = new BaseLogger('test');
            done(Error('BaseLogger did not throw an error when called with invalid log level.'));
        } catch (err) {
            expect(err).toBeInstanceOf(Error);
            done();
        }
    });
});