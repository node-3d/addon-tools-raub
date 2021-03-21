'use strict';

const test = require('./build/Release/test.node');


const numArgMsg = 'Argument 0 must be of type `Number`';

describe('addon-tools.hpp: REQ_OFFS_ARG', () => {
	it('exports reqOffsArg', () => {
		expect(typeof test.reqOffsArg).toBe('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqOffsArg()).toThrow(numArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqOffsArg(undefined)).toThrow(numArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqOffsArg(null)).toThrow(numArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqOffsArg('1')).toThrow(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqOffsArg(true)).toThrow(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqOffsArg({})).toThrow(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqOffsArg([])).toThrow(numArgMsg);
	});
	it('accepts a number', () => {
		expect(test.reqOffsArg(55)).toEqual(55);
	});
});

describe('addon-tools.hpp: LET_OFFS_ARG', () => {
	it('exports letOffsArg', () => {
		expect(typeof test.letOffsArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letOffsArg('1')).toThrow(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letOffsArg(true)).toThrow(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letOffsArg({})).toThrow(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letOffsArg([])).toThrow(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letOffsArg()).toEqual(0);
	});
	it('accepts undefined', () => {
		expect(test.letOffsArg(undefined)).toEqual(0);
	});
	it('accepts null', () => {
		expect(test.letOffsArg(null)).toEqual(0);
	});
	it('accepts a number', () => {
		expect(test.letOffsArg(55)).toEqual(55);
	});
});

describe('addon-tools.hpp: USE_OFFS_ARG', () => {
	it('exports useOffsArg', () => {
		expect(typeof test.useOffsArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useOffsArg('1')).toThrow(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useOffsArg(true)).toThrow(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useOffsArg({})).toThrow(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useOffsArg([])).toThrow(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useOffsArg()).toEqual(10);
	});
	it('accepts undefined', () => {
		expect(test.useOffsArg(undefined)).toEqual(10);
	});
	it('accepts null', () => {
		expect(test.useOffsArg(null)).toEqual(10);
	});
	it('accepts a number', () => {
		expect(test.useOffsArg(55)).toEqual(55);
	});
});
