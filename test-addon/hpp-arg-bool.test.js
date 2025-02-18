'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const boolArgMsg = { message: 'Argument 0 must be of type `Bool`' };
const boolArgLetMsg = { message: 'Argument 0 must be of type `Bool` or be `null`/`undefined`' };

describe('AT / HPP / REQ_BOOL_ARG', () => {
	it('exports reqBoolArg', () => {
		assert.strictEqual(typeof test.reqBoolArg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqBoolArg(), boolArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqBoolArg(undefined), boolArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqBoolArg(null), boolArgMsg);
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.reqBoolArg('1'), boolArgMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.reqBoolArg(1), boolArgMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.reqBoolArg({}), boolArgMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.reqBoolArg([]), boolArgMsg);
	});
	it('accepts a boolean', () => {
		assert.ok(test.reqBoolArg(true));
	});
});

describe('addon-tools.hpp: LET_BOOL_ARG', () => {
	it('exports letBoolArg', () => {
		assert.strictEqual(typeof test.letBoolArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letBoolArg('1'), boolArgLetMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.letBoolArg(1), boolArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letBoolArg({}), boolArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.letBoolArg([]), boolArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.letBoolArg(), false);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.letBoolArg(undefined), false);
	});
	it('accepts null', () => {
		assert.strictEqual(test.letBoolArg(null), false);
	});
	it('accepts a boolean', () => {
		assert.ok(test.letBoolArg(true));
	});
});

describe('addon-tools.hpp: USE_BOOL_ARG', () => {
	it('exports useBoolArg', () => {
		assert.strictEqual(typeof test.useBoolArg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.useBoolArg('1'), boolArgLetMsg);
	});
	it('throws if arg was passed a number', () => {
		assert.throws(() => test.useBoolArg(1), boolArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.useBoolArg({}), boolArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.useBoolArg([]), boolArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.ok(test.useBoolArg());
	});
	it('accepts undefined', () => {
		assert.ok(test.useBoolArg(undefined));
	});
	it('accepts null', () => {
		assert.ok(test.useBoolArg(null));
	});
	it('accepts a boolean', () => {
		assert.ok(test.useBoolArg(true));
	});
});

describe('addon-tools.hpp: SOFT_BOOL_ARG', () => {
	it('exports softBoolArg', () => {
		assert.strictEqual(typeof test.softBoolArg, 'function');
	});
	it('ok if arg was passed a string', () => {
		assert.ok(() => test.softBoolArg('1'));
	});
	it('ok if arg was passed a number', () => {
		assert.ok(() => test.softBoolArg(1));
	});
	it('ok if arg was passed an object', () => {
		assert.ok(() => test.softBoolArg({}));
	});
	it('ok if arg was passed an array', () => {
		assert.ok(() => test.softBoolArg([]));
	});
	it('accepts an empty arg', () => {
		assert.ok(test.softBoolArg() === false);
	});
	it('accepts undefined', () => {
		assert.ok(test.softBoolArg(undefined) === false);
	});
	it('accepts null', () => {
		assert.ok(test.softBoolArg(null) === false);
	});
	it('accepts a boolean', () => {
		assert.ok(test.softBoolArg(true));
	});
});

describe('addon-tools.hpp: WEAK_BOOL_ARG', () => {
	it('exports weakBoolArg', () => {
		assert.strictEqual(typeof test.weakBoolArg, 'function');
	});
	it('ok if arg was passed a string', () => {
		assert.ok(() => test.weakBoolArg('1'));
	});
	it('ok if arg was passed a number', () => {
		assert.ok(() => test.weakBoolArg(1));
	});
	it('ok if arg was passed an object', () => {
		assert.ok(() => test.weakBoolArg({}));
	});
	it('ok if arg was passed an array', () => {
		assert.ok(() => test.weakBoolArg([]));
	});
	it('accepts an empty arg', () => {
		assert.ok(test.weakBoolArg() === false);
	});
	it('accepts undefined', () => {
		assert.ok(test.weakBoolArg(undefined) === false);
	});
	it('accepts null', () => {
		assert.ok(test.weakBoolArg(null) === false);
	});
	it('accepts a boolean', () => {
		assert.ok(test.weakBoolArg(true));
	});
});
