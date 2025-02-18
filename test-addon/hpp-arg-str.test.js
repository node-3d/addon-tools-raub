'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const strArgMsg = { message: 'Argument 0 must be of type `String`' };
const strArgLetMsg = { message: 'Argument 0 must be of type `String` or be `null`/`undefined`' };

describe('AT / HPP / REQ_STR_ARG', () => {
	it('exports reqStrArg', () => {
		assert.strictEqual(typeof test.reqStrArg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqStrArg(), strArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqStrArg(undefined), strArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqStrArg(null), strArgMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.reqStrArg(1), strArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.reqStrArg(true), strArgMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.reqStrArg({}), strArgMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.reqStrArg([]), strArgMsg);
	});
	it('accepts a string', () => {
		assert.strictEqual(test.reqStrArg('1abc'), '1abc');
	});
});

describe('addon-tools.hpp: LET_STR_ARG', () => {
	it('exports letStrArg', () => {
		assert.strictEqual(typeof test.letStrArg, 'function');
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.letStrArg(1), strArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letStrArg(true), strArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letStrArg({}), strArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.letStrArg([]), strArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.letStrArg(), '');
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.letStrArg(undefined), '');
	});
	it('accepts null', () => {
		assert.strictEqual(test.letStrArg(null), '');
	});
	it('accepts a string', () => {
		assert.strictEqual(test.letStrArg('1abc'), '1abc');
	});
});

describe('addon-tools.hpp: USE_STR_ARG', () => {
	it('exports useStrArg', () => {
		assert.strictEqual(typeof test.useStrArg, 'function');
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.useStrArg(1), strArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.useStrArg(true), strArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.useStrArg({}), strArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.useStrArg([]), strArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.useStrArg(), 'default');
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.useStrArg(undefined), 'default');
	});
	it('accepts null', () => {
		assert.strictEqual(test.useStrArg(null), 'default');
	});
	it('accepts a string', () => {
		assert.strictEqual(test.useStrArg('1abc'), '1abc');
	});
});

describe('addon-tools.hpp: WEAK_STR_ARG', () => {
	it('exports weakStrArg', () => {
		assert.strictEqual(typeof test.weakStrArg, 'function');
	});
	it('ok if arg was passed a string', () => {
		assert.strictEqual(test.weakStrArg('1'), '1');
	});
	it('ok if arg was passed a number', () => {
		assert.strictEqual(test.weakStrArg(1), '1');
	});
	it('ok if arg was passed an object', () => {
		assert.strictEqual(test.weakStrArg({}), '[object Object]');
	});
	it('ok if arg was passed an array', () => {
		assert.strictEqual(test.weakStrArg([]), '');
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.weakStrArg(), 'undefined');
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.weakStrArg(undefined), 'undefined');
	});
	it('accepts null', () => {
		assert.strictEqual(test.weakStrArg(null), 'null');
	});
	it('accepts a boolean', () => {
		assert.strictEqual(test.weakStrArg(true), 'true');
	});
});
