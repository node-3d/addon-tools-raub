'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');
const utils = require('..');


describe('AT / HPP / Console Log', () => {
	let logged = '';
	console._log = console.log;
	console.log = (...args) => {
		logged += `${args.join(',')}.`;
	};
	
	it('logged string to console from cpp', () => {
		test.consoleLogString();
		assert.strictEqual(logged, 'test.');
	});
	
	it('logged args to console from cpp', () => {
		logged = '';
		test.consoleLogArgs();
		assert.strictEqual(logged, 'test,2.');
	});
});

describe('AT / HPP / Global Log', () => {
	let logged = '';
	const fn = (level) => (...args) => {
		logged += `${level}:${args.join(',')}.`;
	};
	utils.createLogger({
		name: 'cpp',
		debug: fn('debug'),
		log: fn('log'),
		info: fn('info'),
		warn: fn('warn'),
		error: fn('error'),
	});
	
	it('logged string to global logger from cpp', () => {
		test.globalLogString();
		assert.strictEqual(logged, 'info:test.');
	});
	
	it('logged args to global logger from cpp', () => {
		logged = '';
		test.globalLogArgs();
		assert.strictEqual(logged, 'warn:test,2.');
	});
});
