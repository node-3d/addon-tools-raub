'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const utils = require('..');

describe('AT / Logger', () => {
	let logged = '';
	const fn = (level) => (...args) => {
		logged += `${level}:${args.join(',')}.`;
	};
	const logger = utils.createLogger({
		name: 'test',
		debug: fn('debug'),
		log: fn('log'),
		info: fn('info'),
		warn: fn('warn'),
		error: fn('error'),
	});
	
	it('creates a custom logger', () => {
		assert.strictEqual(typeof logger, 'object');
		assert.isOk(logger.debug);
		assert.isOk(logger.log);
		assert.isOk(logger.info);
		assert.isOk(logger.warn);
		assert.isOk(logger.error);
	});
	
	it('creates a default logger', () => {
		const logger2 = utils.createLogger({ name: 'test2' });
		assert.strictEqual(typeof logger2, 'object');
		assert.isOk(logger2.debug);
		assert.isOk(logger2.log);
		assert.isOk(logger2.info);
		assert.isOk(logger2.warn);
		assert.isOk(logger2.error);
	});
	
	it('creates a fallback logger', () => {
		const logger3 = utils.getLogger(`logger-${Math.random()}`);
		assert.strictEqual(typeof logger3, 'object');
		assert.isOk(logger3.debug);
		assert.isOk(logger3.log);
		assert.isOk(logger3.info);
		assert.isOk(logger3.warn);
		assert.isOk(logger3.error);
	});
	
	it('fetches a named logger', () => {
		assert.strictEqual(utils.getLogger('test'), logger);
	});
	
	it('logged the messages at default "log" level', () => {
		logger.debug('1', '2');
		logger.log(3, 4);
		logger.info('5');
		logger.warn('6');
		logger.error('7');
		assert.strictEqual(logged, 'log:3,4.info:5.warn:6.error:7.');
	});
	
	it('logged the messages at "debug" level', () => {
		logged = '';
		utils.setLevel('debug');
		logger.debug('1', '2');
		logger.log(3, 4);
		logger.info('5');
		logger.warn('6');
		logger.error('7');
		assert.strictEqual(logged, 'debug:1,2.log:3,4.info:5.warn:6.error:7.');
	});
	
	it('logged the messages at "null" level', () => {
		logged = '';
		utils.setLevel(null);
		logger.warn('6');
		logger.error('7');
		assert.strictEqual(logged, '');
	});
	
	it('logged through global helper', () => {
		logged = '';
		utils.setLevel('error');
		global.AddonTools.log('test', 'warn', '6');
		global.AddonTools.log('test', 'error', '7');
		assert.strictEqual(logged, 'error:7.');
	});
	
	it('has default "addon-tools" logger', () => {
		assert.isOk(utils.getLoggers()['addon-tools']);
	});
	
});
