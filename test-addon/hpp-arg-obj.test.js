'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const objArgMsg = { message: 'Argument 0 must be of type `Object`' };
const objArgLetMsg = { message: 'Argument 0 must be of type `Object` or be `null`/`undefined`' };

describe('AT / HPP / REQ_OBJ_ARG', () => {
	it('exports reqObjArg', () => {
		assert.strictEqual(typeof test.reqObjArg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqObjArg(), objArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqObjArg(undefined), objArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqObjArg(null), objArgMsg);
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.reqObjArg('1'), objArgMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.reqObjArg(1), objArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.reqObjArg(true), objArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		assert.throws(() => test.reqObjArg(test.retExt()), objArgMsg);
	});
	it('accepts an object', () => {
		assert.strictEqual(typeof test.reqObjArg({}), 'object');
	});
	it('accepts an array', () => {
		assert.ok(Array.isArray(test.reqObjArg([])));
	});
});

describe('addon-tools.hpp: LET_OBJ_ARG', () => {
	it('exports letObjArg', () => {
		assert.strictEqual(typeof test.letObjArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letObjArg('1'), objArgLetMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.letObjArg(1), objArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letObjArg(true), objArgLetMsg);
	});
	it('throws if arg was passed a pointer', () => {
		assert.throws(() => test.letObjArg(test.retExt()), objArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(typeof test.letObjArg(), 'object');
	});
	it('accepts undefined', () => {
		assert.strictEqual(typeof test.letObjArg(undefined), 'object');
	});
	it('accepts null', () => {
		assert.strictEqual(typeof test.letObjArg(null), 'object');
	});
	it('accepts an object', () => {
		assert.strictEqual(typeof test.letObjArg({}), 'object');
	});
	it('accepts an array', () => {
		assert.ok(Array.isArray(test.letObjArg([])));
	});
});

describe('addon-tools.hpp: USE_OBJ_ARG', () => {
	it('exports useObjArg', () => {
		assert.strictEqual(typeof test.useObjArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.useObjArg('1'), objArgLetMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.useObjArg(1), objArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.useObjArg(true), objArgLetMsg);
	});
	it('throws if arg was passed a pointer', () => {
		assert.throws(() => test.useObjArg(test.retExt()), objArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(typeof test.useObjArg(), 'object');
	});
	it('accepts undefined', () => {
		assert.strictEqual(typeof test.useObjArg(undefined), 'object');
	});
	it('accepts null', () => {
		assert.strictEqual(typeof test.useObjArg(null), 'object');
	});
	it('accepts an object', () => {
		assert.strictEqual(typeof test.useObjArg({}), 'object');
	});
	it('accepts an array', () => {
		assert.ok(Array.isArray(test.useObjArg([])));
	});
});
