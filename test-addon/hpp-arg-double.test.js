'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const numArgMsg = { message: 'Argument 0 must be of type `Number`' };
const numArgLetMsg = { message: 'Argument 0 must be of type `Number` or be `null`/`undefined`' };

describe('AT / HPP / REQ_DOUBLE_ARG', () => {
	it('exports reqDoubleArg', () => {
		assert.strictEqual(typeof test.reqDoubleArg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqDoubleArg(), numArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqDoubleArg(undefined), numArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqDoubleArg(null), numArgMsg);
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.reqDoubleArg('1'), numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.reqDoubleArg(true), numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.reqDoubleArg({}), numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.reqDoubleArg([]), numArgMsg);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.reqDoubleArg(55), 55);
	});
});

describe('addon-tools.hpp: LET_DOUBLE_ARG', () => {
	it('exports letDoubleArg', () => {
		assert.strictEqual(typeof test.letDoubleArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letDoubleArg('1'), numArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letDoubleArg(true), numArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letDoubleArg({}), numArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.letDoubleArg([]), numArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.letDoubleArg(), 0);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.letDoubleArg(undefined), 0);
	});
	it('accepts null', () => {
		assert.strictEqual(test.letDoubleArg(null), 0);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.letDoubleArg(55), 55);
	});
});

describe('addon-tools.hpp: USE_DOUBLE_ARG', () => {
	it('exports useDoubleArg', () => {
		assert.strictEqual(typeof test.useDoubleArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.useDoubleArg('1'), numArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.useDoubleArg(true), numArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.useDoubleArg({}), numArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.useDoubleArg([]), numArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.useDoubleArg(), 10);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.useDoubleArg(undefined), 10);
	});
	it('accepts null', () => {
		assert.strictEqual(test.useDoubleArg(null), 10);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.useDoubleArg(55), 55);
	});
});
