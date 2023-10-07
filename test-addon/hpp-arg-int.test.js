'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const intArgMsg = { message: 'Argument 0 must be of type `Int32`' };
const intArgLetMsg = { message: 'Argument 0 must be of type `Int32` or be `null`/`undefined`' };

describe('AT / HPP / REQ_INT_ARG, REQ_INT32_ARG', () => {
	it('exports reqIntArg', () => {
		assert.strictEqual(typeof test.reqIntArg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqIntArg(), intArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqIntArg(undefined), intArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqIntArg(null), intArgMsg);
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.reqIntArg('1'), intArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.reqIntArg(true), intArgMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.reqIntArg({}), intArgMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.reqIntArg([]), intArgMsg);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.reqIntArg(55), 55);
	});
});

describe('addon-tools.hpp: LET_INT_ARG / LET_INT32_ARG', () => {
	it('exports letIntArg', () => {
		assert.strictEqual(typeof test.letIntArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letIntArg('1'), intArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letIntArg(true), intArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letIntArg({}), intArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.letIntArg([]), intArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.letIntArg(), 0);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.letIntArg(undefined), 0);
	});
	it('accepts null', () => {
		assert.strictEqual(test.letIntArg(null), 0);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.letIntArg(55), 55);
	});
});

describe('addon-tools.hpp: USE_INT_ARG / USE_INT32_ARG', () => {
	it('exports useIntArg', () => {
		assert.strictEqual(typeof test.useIntArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.useIntArg('1'), intArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.useIntArg(true), intArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.useIntArg({}), intArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.useIntArg([]), intArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.useIntArg(), 10);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.useIntArg(undefined), 10);
	});
	it('accepts null', () => {
		assert.strictEqual(test.useIntArg(null), 10);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.useIntArg(55), 55);
	});
});
