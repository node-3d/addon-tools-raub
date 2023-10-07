'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const arrayArgLetMsg = { message: 'Argument 0 must be of type `Array` or be `null`/`undefined`' };

describe('AT / HPP / LET_ARRAY_ARG', () => {
	it('exports letArrayStrArg', () => {
		assert.strictEqual(typeof test.letArrayStrArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letArrayStrArg('1'), arrayArgLetMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.letArrayStrArg(1), arrayArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letArrayStrArg(true), arrayArgLetMsg);
	});
	it('throws if arg was passed a pointer', () => {
		assert.throws(() => test.letArrayStrArg(test.retExt()), arrayArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letArrayStrArg({}), arrayArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.ok(Array.isArray(test.letArrayStrArg()));
	});
	it('accepts undefined', () => {
		assert.ok(Array.isArray(test.letArrayStrArg(undefined)));
	});
	it('accepts null', () => {
		assert.ok(Array.isArray(test.letArrayStrArg(null)));
	});
	it('accepts an array', () => {
		assert.ok(Array.isArray(test.letArrayStrArg([])));
	});
	it('returns same array', () => {
		assert.deepStrictEqual(test.letArrayStrArg(['a', 'b']),['a', 'b']);
	});
});
