'use strict';

const test = require('./build/Release/test.node');


describe('addon-tools.hpp: Function arguments', () => {
	
	describe('REQ_ARGS', () => {
		it('exports reqArgs3', () => {
			expect(typeof test.reqArgs3).toBe('function');
		});
		it('throws if no args passed', () => {
			expect(() => test.reqArgs3()).toThrow('Expected at least 3 arguments');
		});
		it('throws if 1 arg passed', () => {
			expect(() => test.reqArgs3(1)).toThrow('Expected at least 3 arguments');
		});
		it('returns true if 3 args passed', () => {
			expect(test.reqArgs3(1, 2, 3)).toEqual(true);
		});
		it('returns true if 5 args passed', () => {
			expect(test.reqArgs3(1, 2, 3, 4, 5)).toEqual(true);
		});
	});
	
	describe('IS_ARG_EMPTY', () => {
		it('exports isArg0Empty', () => {
			expect(typeof test.isArg0Empty).toBe('function');
		});
		it('returns true for absent arg', () => {
			expect(test.isArg0Empty()).toEqual(true);
		});
		it('returns true for undefined arg', () => {
			expect(test.isArg0Empty(undefined)).toEqual(true);
		});
		it('returns true for null arg', () => {
			expect(test.isArg0Empty(null)).toEqual(true);
		});
		it('returns false for non-empty value', () => {
			expect(test.isArg0Empty(1)).toEqual(false);
		});
	});
	
	// ------------------------------ FUN_ARG
	
	const funArgMsg = 'Argument 0 must be of type `Function`';
	
	describe('REQ_FUN_ARG', () => {
		it('exports reqFunArg', () => {
			expect(typeof test.reqFunArg).toBe('function');
		});
		it('throws if arg was not passed', () => {
			expect(() => test.reqFunArg()).toThrow(funArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			expect(() => test.reqFunArg(undefined)).toThrow(funArgMsg);
		});
		it('throws if arg was passed null', () => {
			expect(() => test.reqFunArg(null)).toThrow(funArgMsg);
		});
		it('throws if arg was passed a string', () => {
			expect(() => test.reqFunArg('1')).toThrow(funArgMsg);
		});
		it('throws if arg was passed a number', () => {
			expect(() => test.reqFunArg(1)).toThrow(funArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			expect(() => test.reqFunArg(true)).toThrow(funArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			expect(() => test.reqFunArg(test.retExt())).toThrow(funArgMsg);
		});
		it('throws if arg was passed an object', () => {
			expect(() => test.reqFunArg({})).toThrow(funArgMsg);
		});
		it('throws if arg was passed an array', () => {
			expect(() => test.reqFunArg([])).toThrow(funArgMsg);
		});
		it('accepts a function', () => {
			expect(typeof test.reqFunArg(() => {})).toBe('function');
		});
	});
	
	// ------------------------------ ARRV_ARG
	
	const arrvArgMsg = 'Argument 0 must be of type `ArrayBuffer`';
	
	describe('REQ_ARRV_ARG', () => {
		it('exports reqArrvArg', () => {
			expect(typeof test.reqArrvArg).toBe('function');
		});
		it('throws if arg was not passed', () => {
			expect(() => test.reqArrvArg()).toThrow(arrvArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			expect(() => test.reqArrvArg(undefined)).toThrow(arrvArgMsg);
		});
		it('throws if arg was passed null', () => {
			expect(() => test.reqArrvArg(null)).toThrow(arrvArgMsg);
		});
		it('throws if arg was passed a string', () => {
			expect(() => test.reqArrvArg('1')).toThrow(arrvArgMsg);
		});
		it('throws if arg was passed a number', () => {
			expect(() => test.reqArrvArg(1)).toThrow(arrvArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			expect(() => test.reqArrvArg(true)).toThrow(arrvArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			expect(() => test.reqArrvArg(test.retExt())).toThrow(arrvArgMsg);
		});
		it('throws if arg was passed an object', () => {
			expect(() => test.reqArrvArg({})).toThrow(arrvArgMsg);
		});
		it('throws if arg was passed an array', () => {
			expect(() => test.reqArrvArg([])).toThrow(arrvArgMsg);
		});
		it('accepts an array buffer', () => {
			const { buffer } = new Uint8Array([1, 2, 3]);
			expect(test.reqArrvArg(buffer)).toEqual(buffer);
		});
	});
	
	// ------------------------------ BUF_ARG
	
	const bufArgMsg = 'Argument 0 must be of type `Buffer`';
	
	describe('REQ_BUF_ARG', () => {
		it('exports reqBufArg', () => {
			expect(typeof test.reqBufArg).toBe('function');
		});
		it('throws if arg was not passed', () => {
			expect(() => test.reqBufArg()).toThrow(bufArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			expect(() => test.reqBufArg(undefined)).toThrow(bufArgMsg);
		});
		it('throws if arg was passed null', () => {
			expect(() => test.reqBufArg(null)).toThrow(bufArgMsg);
		});
		it('throws if arg was passed a string', () => {
			expect(() => test.reqBufArg('1')).toThrow(bufArgMsg);
		});
		it('throws if arg was passed a number', () => {
			expect(() => test.reqBufArg(1)).toThrow(bufArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			expect(() => test.reqBufArg(true)).toThrow(bufArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			expect(() => test.reqBufArg(test.retExt())).toThrow(bufArgMsg);
		});
		it('throws if arg was passed an object', () => {
			expect(() => test.reqBufArg({})).toThrow(bufArgMsg);
		});
		it('throws if arg was passed an array', () => {
			expect(() => test.reqBufArg([])).toThrow(bufArgMsg);
		});
		it('accepts a buffer', () => {
			const buffer = Buffer.from([1, 2, 3]);
			expect(test.reqBufArg(buffer)).toEqual(buffer);
		});
	});
	
	// ------------------------------ TYPED_ARRAY_ARG
	
	const typedArgMsg = 'Argument 0 must be of type `TypedArray`';
	
	describe('REQ_TYPED_ARRAY_ARG', () => {
		it('exports reqTypedArg', () => {
			expect(typeof test.reqTypedArg).toBe('function');
		});
		it('throws if arg was not passed', () => {
			expect(() => test.reqTypedArg()).toThrow(typedArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			expect(() => test.reqTypedArg(undefined)).toThrow(typedArgMsg);
		});
		it('throws if arg was passed null', () => {
			expect(() => test.reqTypedArg(null)).toThrow(typedArgMsg);
		});
		it('throws if arg was passed a string', () => {
			expect(() => test.reqTypedArg('1')).toThrow(typedArgMsg);
		});
		it('throws if arg was passed a number', () => {
			expect(() => test.reqTypedArg(1)).toThrow(typedArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			expect(() => test.reqTypedArg(true)).toThrow(typedArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			expect(() => test.reqTypedArg(test.retExt())).toThrow(typedArgMsg);
		});
		it('throws if arg was passed an object', () => {
			expect(() => test.reqTypedArg({})).toThrow(typedArgMsg);
		});
		it('throws if arg was passed an array', () => {
			expect(() => test.reqTypedArg([])).toThrow(typedArgMsg);
		});
		it('accepts a typed array', () => {
			const typed = new Uint8Array([1, 2, 3]);
			expect(test.reqTypedArg(typed)).toEqual(typed);
		});
	});
	
});
