'use strict';

const test = require('./build/Release/test.node');


const arrayArgMsg = 'Argument 0 must be of type `Array`';

describe('AT / addon-tools.hpp / REQ_ARRAY_ARG', () => {
	it('exports reqArrayArg', () => {
		expect(typeof test.reqArrayArg).toBe('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqArrayArg()).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqArrayArg(undefined)).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqArrayArg(null)).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqArrayArg('1')).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.reqArrayArg(1)).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqArrayArg(true)).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.reqArrayArg(test.retExt())).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqArrayArg({})).toThrow(arrayArgMsg);
	});
	it('accepts an array', () => {
		expect(Array.isArray(test.reqArrayArg([]))).toBe(true);
	});
});

describe('addon-tools.hpp: LET_ARRAY_ARG', () => {
	it('exports letArrayArg', () => {
		expect(typeof test.letArrayArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letArrayArg('1')).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.letArrayArg(1)).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letArrayArg(true)).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.letArrayArg(test.retExt())).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letArrayArg({})).toThrow(arrayArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(Array.isArray(test.letArrayArg())).toBe(true);
	});
	it('accepts undefined', () => {
		expect(Array.isArray(test.letArrayArg(undefined))).toBe(true);
	});
	it('accepts null', () => {
		expect(Array.isArray(test.letArrayArg(null))).toBe(true);
	});
	it('accepts an array', () => {
		expect(Array.isArray(test.letArrayArg([]))).toBe(true);
	});
});

describe('addon-tools.hpp: USE_ARRAY_ARG', () => {
	it('exports useArrayArg', () => {
		expect(typeof test.useArrayArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useArrayArg('1')).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.useArrayArg(1)).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useArrayArg(true)).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.useArrayArg(test.retExt())).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useArrayArg({})).toThrow(arrayArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(Array.isArray(test.useArrayArg())).toBe(true);
	});
	it('accepts undefined', () => {
		expect(Array.isArray(test.useArrayArg(undefined))).toBe(true);
	});
	it('accepts null', () => {
		expect(Array.isArray(test.useArrayArg(null))).toBe(true);
	});
	it('accepts an array', () => {
		expect(Array.isArray(test.useArrayArg([]))).toBe(true);
	});
});
