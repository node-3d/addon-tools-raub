'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const uintArgMsg = { message: 'Argument 0 must be of type `Uint32`' };
const uintArgLetMsg = { message: 'Argument 0 must be of type `Uint32` or be `null`/`undefined`' };

describe('AT / HPP / REQ_UINT_ARG, REQ_UINT32_ARG', () => {
	it('exports reqUintArg', () => {
		assert.strictEqual(typeof test.reqUintArg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqUintArg(), uintArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqUintArg(undefined), uintArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqUintArg(null), uintArgMsg);
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.reqUintArg('1'), uintArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.reqUintArg(true), uintArgMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.reqUintArg({}), uintArgMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.reqUintArg([]), uintArgMsg);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.reqUintArg(55), 55);
	});
});

describe('addon-tools.hpp: LET_UINT_ARG / LET_UINT32_ARG', () => {
	it('exports letUintArg', () => {
		assert.strictEqual(typeof test.letUintArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letUintArg('1'), uintArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letUintArg(true), uintArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letUintArg({}), uintArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.letUintArg([]), uintArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.letUintArg(), 0);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.letUintArg(undefined), 0);
	});
	it('accepts null', () => {
		assert.strictEqual(test.letUintArg(null), 0);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.letUintArg(55), 55);
	});
});

describe('addon-tools.hpp: USE_UINT_ARG / USE_UINT32_ARG', () => {
	it('exports useUintArg', () => {
		assert.strictEqual(typeof test.useUintArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.useUintArg('1'), uintArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.useUintArg(true), uintArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.useUintArg({}), uintArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.useUintArg([]), uintArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.useUintArg(), 10);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.useUintArg(undefined), 10);
	});
	it('accepts null', () => {
		assert.strictEqual(test.useUintArg(null), 10);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.useUintArg(55), 55);
	});
});
