'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const extArgMsg = { message: 'Argument 0 must be of type `Pointer`' };
const extArgLetMsg = { message: 'Argument 0 must be of type `Pointer` or be `null`/`undefined`' };

describe('AT / HPP / REQ_EXT_ARG', () => {
	it('exports reqExtArg', () => {
		assert.strictEqual(typeof test.reqExtArg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqExtArg(), extArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqExtArg(undefined), extArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqExtArg(null), extArgMsg);
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.reqExtArg('1'), extArgMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.reqExtArg(1), extArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.reqExtArg(true), extArgMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.reqExtArg({}), extArgMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.reqExtArg([]), extArgMsg);
	});
	it('accepts a pointer', () => {
		assert.strictEqual(typeof test.reqExtArg(test.retExt()), 'object');
	});
});

describe('addon-tools.hpp: LET_EXT_ARG', () => {
	it('exports letExtArg', () => {
		assert.strictEqual(typeof test.letExtArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letExtArg('1'), extArgLetMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.letExtArg(1), extArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letExtArg(true), extArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letExtArg({}), extArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.letExtArg([]), extArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(typeof test.letExtArg(), 'object');
	});
	it('accepts undefined', () => {
		assert.strictEqual(typeof test.letExtArg(undefined), 'object');
	});
	it('accepts null', () => {
		assert.strictEqual(typeof test.letExtArg(null), 'object');
	});
	it('accepts a pointer', () => {
		assert.strictEqual(typeof test.reqExtArg(test.retExt()), 'object');
	});
});

describe('addon-tools.hpp: USE_EXT_ARG', () => {
	it('exports useExtArg', () => {
		assert.strictEqual(typeof test.useExtArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.useExtArg('1'), extArgLetMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.useExtArg(1), extArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.useExtArg(true), extArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.useExtArg({}), extArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.useExtArg([]), extArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(typeof test.useExtArg(), 'object');
	});
	it('accepts undefined', () => {
		assert.strictEqual(typeof test.useExtArg(undefined), 'object');
	});
	it('accepts null', () => {
		assert.strictEqual(typeof test.useExtArg(null), 'object');
	});
	it('accepts a number', () => {
		assert.strictEqual(typeof test.useExtArg(test.retExt()), 'object');
	});
});
