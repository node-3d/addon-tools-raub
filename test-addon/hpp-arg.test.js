'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


describe('AT / HPP / Function arguments', () => {
	
	const arg3Msg = { message: 'Expected at least 3 arguments' };
	
	describe('REQ_ARGS', () => {
		it('exports reqArgs3', () => {
			assert.strictEqual(typeof test.reqArgs3, 'function');
		});
		it('throws if no args passed', () => {
			assert.throws(() => test.reqArgs3(), arg3Msg);
		});
		it('throws if 1 arg passed', () => {
			assert.throws(() => test.reqArgs3(1), arg3Msg);
		});
		it('returns true if 3 args passed', () => {
			assert.ok(test.reqArgs3(1, 2, 3));
		});
		it('returns true if 5 args passed', () => {
			assert.ok(test.reqArgs3(1, 2, 3, 4, 5));
		});
	});
	
	describe('IS_ARG_EMPTY', () => {
		it('exports isArg0Empty', () => {
			assert.strictEqual(typeof test.isArg0Empty, 'function');
		});
		it('returns true for absent arg', () => {
			assert.ok(test.isArg0Empty());
		});
		it('returns true for undefined arg', () => {
			assert.ok(test.isArg0Empty(undefined));
		});
		it('returns true for null arg', () => {
			assert.ok(test.isArg0Empty(null));
		});
		it('returns false for non-empty value', () => {
			assert.strictEqual(test.isArg0Empty(1), false);
		});
	});
	
	// ------------------------------ FUN_ARG
	
	const funArgMsg = { message: 'Argument 0 must be of type `Function`' };
	
	describe('REQ_FUN_ARG', () => {
		it('exports reqFunArg', () => {
			assert.strictEqual(typeof test.reqFunArg, 'function');
		});
		it('throws if arg was not passed', () => {
			assert.throws(() => test.reqFunArg(), funArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			assert.throws(() => test.reqFunArg(undefined), funArgMsg);
		});
		it('throws if arg was passed null', () => {
			assert.throws(() => test.reqFunArg(null), funArgMsg);
		});
		it('throws if arg was passed a string', () => {
			assert.throws(() => test.reqFunArg('1'), funArgMsg);
		});
		it('throws if arg was passed a number', () => {
			assert.throws(() => test.reqFunArg(1), funArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			assert.throws(() => test.reqFunArg(true), funArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			assert.throws(() => test.reqFunArg(test.retExt()), funArgMsg);
		});
		it('throws if arg was passed an object', () => {
			assert.throws(() => test.reqFunArg({}), funArgMsg);
		});
		it('throws if arg was passed an array', () => {
			assert.throws(() => test.reqFunArg([]), funArgMsg);
		});
		it('accepts a function', () => {
			assert.strictEqual(typeof test.reqFunArg(() => {}), 'function');
		});
	});
	
	// ------------------------------ ARRV_ARG
	
	const arrvArgMsg = { message: 'Argument 0 must be of type `ArrayBuffer`' };
	
	describe('REQ_ARRV_ARG', () => {
		it('exports reqArrvArg', () => {
			assert.strictEqual(typeof test.reqArrvArg, 'function');
		});
		it('throws if arg was not passed', () => {
			assert.throws(() => test.reqArrvArg(), arrvArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			assert.throws(() => test.reqArrvArg(undefined), arrvArgMsg);
		});
		it('throws if arg was passed null', () => {
			assert.throws(() => test.reqArrvArg(null), arrvArgMsg);
		});
		it('throws if arg was passed a string', () => {
			assert.throws(() => test.reqArrvArg('1'), arrvArgMsg);
		});
		it('throws if arg was passed a number', () => {
			assert.throws(() => test.reqArrvArg(1), arrvArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			assert.throws(() => test.reqArrvArg(true), arrvArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			assert.throws(() => test.reqArrvArg(test.retExt()), arrvArgMsg);
		});
		it('throws if arg was passed an object', () => {
			assert.throws(() => test.reqArrvArg({}), arrvArgMsg);
		});
		it('throws if arg was passed an array', () => {
			assert.throws(() => test.reqArrvArg([]), arrvArgMsg);
		});
		it('accepts an array buffer', () => {
			const { buffer } = new Uint8Array([1, 2, 3]);
			assert.strictEqual(test.reqArrvArg(buffer), buffer);
		});
	});
	
	// ------------------------------ BUF_ARG
	
	const bufArgMsg = { message: 'Argument 0 must be of type `Buffer`' };
	
	describe('REQ_BUF_ARG', () => {
		it('exports reqBufArg', () => {
			assert.strictEqual(typeof test.reqBufArg, 'function');
		});
		it('throws if arg was not passed', () => {
			assert.throws(() => test.reqBufArg(), bufArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			assert.throws(() => test.reqBufArg(undefined), bufArgMsg);
		});
		it('throws if arg was passed null', () => {
			assert.throws(() => test.reqBufArg(null), bufArgMsg);
		});
		it('throws if arg was passed a string', () => {
			assert.throws(() => test.reqBufArg('1'), bufArgMsg);
		});
		it('throws if arg was passed a number', () => {
			assert.throws(() => test.reqBufArg(1), bufArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			assert.throws(() => test.reqBufArg(true), bufArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			assert.throws(() => test.reqBufArg(test.retExt()), bufArgMsg);
		});
		it('throws if arg was passed an object', () => {
			assert.throws(() => test.reqBufArg({}), bufArgMsg);
		});
		it('throws if arg was passed an array', () => {
			assert.throws(() => test.reqBufArg([]), bufArgMsg);
		});
		it('accepts a buffer', () => {
			const buffer = Buffer.from([1, 2, 3]);
			assert.strictEqual(test.reqBufArg(buffer), buffer);
		});
	});
	
	// ------------------------------ TYPED_ARRAY_ARG
	
	const typedArgMsg = { message: 'Argument 0 must be of type `TypedArray`' };
	
	describe('REQ_TYPED_ARRAY_ARG', () => {
		it('exports reqTypedArg', () => {
			assert.strictEqual(typeof test.reqTypedArg, 'function');
		});
		it('throws if arg was not passed', () => {
			assert.throws(() => test.reqTypedArg(), typedArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			assert.throws(() => test.reqTypedArg(undefined), typedArgMsg);
		});
		it('throws if arg was passed null', () => {
			assert.throws(() => test.reqTypedArg(null), typedArgMsg);
		});
		it('throws if arg was passed a string', () => {
			assert.throws(() => test.reqTypedArg('1'), typedArgMsg);
		});
		it('throws if arg was passed a number', () => {
			assert.throws(() => test.reqTypedArg(1), typedArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			assert.throws(() => test.reqTypedArg(true), typedArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			assert.throws(() => test.reqTypedArg(test.retExt()), typedArgMsg);
		});
		it('throws if arg was passed an object', () => {
			assert.throws(() => test.reqTypedArg({}), typedArgMsg);
		});
		it('throws if arg was passed an array', () => {
			assert.throws(() => test.reqTypedArg([]), typedArgMsg);
		});
		it('accepts a typed array', () => {
			const typed = new Uint8Array([1, 2, 3]);
			assert.strictEqual(test.reqTypedArg(typed), typed);
		});
	});
});
