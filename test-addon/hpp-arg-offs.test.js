'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const numArgMsg = { message: 'Argument 0 must be of type `Number`' };
const numArgLetMsg = { message: 'Argument 0 must be of type `Number` or be `null`/`undefined`' };

describe('AT / HPP / REQ_OFFS_ARG', () => {
	it('exports reqOffsArg', () => {
		assert.strictEqual(typeof test.reqOffsArg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqOffsArg(), numArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqOffsArg(undefined), numArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqOffsArg(null), numArgMsg);
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.reqOffsArg('1'), numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.reqOffsArg(true), numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.reqOffsArg({}), numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.reqOffsArg([]), numArgMsg);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.reqOffsArg(55), 55);
	});
});

describe('addon-tools.hpp: LET_OFFS_ARG', () => {
	it('exports letOffsArg', () => {
		assert.strictEqual(typeof test.letOffsArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letOffsArg('1'), numArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letOffsArg(true), numArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letOffsArg({}), numArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.letOffsArg([]), numArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.letOffsArg(), 0);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.letOffsArg(undefined), 0);
	});
	it('accepts null', () => {
		assert.strictEqual(test.letOffsArg(null), 0);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.letOffsArg(55), 55);
	});
});

describe('addon-tools.hpp: USE_OFFS_ARG', () => {
	it('exports useOffsArg', () => {
		assert.strictEqual(typeof test.useOffsArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.useOffsArg('1'), numArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.useOffsArg(true), numArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.useOffsArg({}), numArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.useOffsArg([]), numArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.useOffsArg(), 10);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.useOffsArg(undefined), 10);
	});
	it('accepts null', () => {
		assert.strictEqual(test.useOffsArg(null), 10);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.useOffsArg(55), 55);
	});
});
