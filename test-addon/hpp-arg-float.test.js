'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const numArgMsg = { message: 'Argument 0 must be of type `Number`' };
const numArgLetMsg = { message: 'Argument 0 must be of type `Number` or be `null`/`undefined`' };

describe('AT / HPP / REQ_FLOAT_ARG', () => {
	it('exports reqFloatArg', () => {
		assert.strictEqual(typeof test.reqFloatArg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqFloatArg(), numArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqFloatArg(undefined), numArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqFloatArg(null), numArgMsg);
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.reqFloatArg('1'), numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.reqFloatArg(true), numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.reqFloatArg({}), numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.reqFloatArg([]), numArgMsg);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.reqFloatArg(55), 55);
	});
});

describe('addon-tools.hpp: LET_FLOAT_ARG', () => {
	it('exports letFloatArg', () => {
		assert.strictEqual(typeof test.letFloatArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letFloatArg('1'), numArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letFloatArg(true), numArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letFloatArg({}), numArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.letFloatArg([]), numArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.letFloatArg(), 0);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.letFloatArg(undefined), 0);
	});
	it('accepts null', () => {
		assert.strictEqual(test.letFloatArg(null), 0);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.letFloatArg(55), 55);
	});
});

describe('addon-tools.hpp: USE_FLOAT_ARG', () => {
	it('exports useFloatArg', () => {
		assert.strictEqual(typeof test.useFloatArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.useFloatArg('1'), numArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.useFloatArg(true), numArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.useFloatArg({}), numArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.useFloatArg([]), numArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.useFloatArg(), 10);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.useFloatArg(undefined), 10);
	});
	it('accepts null', () => {
		assert.strictEqual(test.useFloatArg(null), 10);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.useFloatArg(55), 55);
	});
});
