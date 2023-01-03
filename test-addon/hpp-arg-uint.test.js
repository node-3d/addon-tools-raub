'use strict';

const test = require('./build/Release/test.node');


const uintArgMsg = 'Argument 0 must be of type `Uint32`';

describe('addon-tools.hpp: REQ_UINT_ARG / REQ_UINT32_ARG', () => {
	it('exports reqUintArg', () => {
		expect(typeof test.reqUintArg).toBe('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqUintArg()).toThrow(uintArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqUintArg(undefined)).toThrow(uintArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqUintArg(null)).toThrow(uintArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqUintArg('1')).toThrow(uintArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqUintArg(true)).toThrow(uintArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqUintArg({})).toThrow(uintArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqUintArg([])).toThrow(uintArgMsg);
	});
	it('accepts a number', () => {
		expect(test.reqUintArg(55)).toEqual(55);
	});
});

describe('addon-tools.hpp: LET_UINT_ARG / LET_UINT32_ARG', () => {
	it('exports letUintArg', () => {
		expect(typeof test.letUintArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letUintArg('1')).toThrow(uintArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letUintArg(true)).toThrow(uintArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letUintArg({})).toThrow(uintArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letUintArg([])).toThrow(uintArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letUintArg()).toEqual(0);
	});
	it('accepts undefined', () => {
		expect(test.letUintArg(undefined)).toEqual(0);
	});
	it('accepts null', () => {
		expect(test.letUintArg(null)).toEqual(0);
	});
	it('accepts a number', () => {
		expect(test.letUintArg(55)).toEqual(55);
	});
});

describe('addon-tools.hpp: USE_UINT_ARG / USE_UINT32_ARG', () => {
	it('exports useUintArg', () => {
		expect(typeof test.useUintArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useUintArg('1')).toThrow(uintArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useUintArg(true)).toThrow(uintArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useUintArg({})).toThrow(uintArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useUintArg([])).toThrow(uintArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useUintArg()).toEqual(10);
	});
	it('accepts undefined', () => {
		expect(test.useUintArg(undefined)).toEqual(10);
	});
	it('accepts null', () => {
		expect(test.useUintArg(null)).toEqual(10);
	});
	it('accepts a number', () => {
		expect(test.useUintArg(55)).toEqual(55);
	});
});
