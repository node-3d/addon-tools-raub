'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const arrayArgMsg = { message: 'Argument 0 must be of type `Array`' };
const arrayArgLetMsg = { message: 'Argument 0 must be of type `Array` or be `null`/`undefined`' };

describe('AT / HPP / REQ_ARRAY_ARG', () => {
	it('exports reqArrayArg', () => {
		assert.strictEqual(typeof test.reqArrayArg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqArrayArg(), arrayArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqArrayArg(undefined), arrayArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqArrayArg(null), arrayArgMsg);
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.reqArrayArg('1'), arrayArgMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.reqArrayArg(1), arrayArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.reqArrayArg(true), arrayArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		assert.throws(() => test.reqArrayArg(test.retExt()), arrayArgMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.reqArrayArg({}), arrayArgMsg);
	});
	it('accepts an array', () => {
		assert.ok(Array.isArray(test.reqArrayArg([])));
	});
});

describe('addon-tools.hpp: LET_ARRAY_ARG', () => {
	it('exports letArrayArg', () => {
		assert.strictEqual(typeof test.letArrayArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letArrayArg('1'), arrayArgLetMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.letArrayArg(1), arrayArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letArrayArg(true), arrayArgLetMsg);
	});
	it('throws if arg was passed a pointer', () => {
		assert.throws(() => test.letArrayArg(test.retExt()), arrayArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letArrayArg({}), arrayArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.ok(Array.isArray(test.letArrayArg()));
	});
	it('accepts undefined', () => {
		assert.ok(Array.isArray(test.letArrayArg(undefined)));
	});
	it('accepts null', () => {
		assert.ok(Array.isArray(test.letArrayArg(null)));
	});
	it('accepts an array', () => {
		assert.ok(Array.isArray(test.letArrayArg([])));
	});
});

describe('addon-tools.hpp: USE_ARRAY_ARG', () => {
	it('exports useArrayArg', () => {
		assert.strictEqual(typeof test.useArrayArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.useArrayArg('1'), arrayArgLetMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.useArrayArg(1), arrayArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.useArrayArg(true), arrayArgLetMsg);
	});
	it('throws if arg was passed a pointer', () => {
		assert.throws(() => test.useArrayArg(test.retExt()), arrayArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.useArrayArg({}), arrayArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.ok(Array.isArray(test.useArrayArg()));
	});
	it('accepts undefined', () => {
		assert.ok(Array.isArray(test.useArrayArg(undefined)));
	});
	it('accepts null', () => {
		assert.ok(Array.isArray(test.useArrayArg(null)));
	});
	it('accepts an array', () => {
		assert.ok(Array.isArray(test.useArrayArg([])));
	});
});
