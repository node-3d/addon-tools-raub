'use strict';

const test = require('./build/Release/test.node');


const numArgMsg = 'Argument 0 must be of type `Number`';

describe('addon-tools.hpp: REQ_FLOAT_ARG', () => {
	it('exports reqFloatArg', () => {
		expect(typeof test.reqFloatArg).toBe('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqFloatArg()).toThrow(numArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqFloatArg(undefined)).toThrow(numArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqFloatArg(null)).toThrow(numArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqFloatArg('1')).toThrow(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqFloatArg(true)).toThrow(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqFloatArg({})).toThrow(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqFloatArg([])).toThrow(numArgMsg);
	});
	it('accepts a number', () => {
		expect(test.reqFloatArg(55)).toEqual(55);
	});
});

describe('addon-tools.hpp: LET_FLOAT_ARG', () => {
	it('exports letFloatArg', () => {
		expect(typeof test.letFloatArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letFloatArg('1')).toThrow(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letFloatArg(true)).toThrow(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letFloatArg({})).toThrow(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letFloatArg([])).toThrow(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letFloatArg()).toEqual(0);
	});
	it('accepts undefined', () => {
		expect(test.letFloatArg(undefined)).toEqual(0);
	});
	it('accepts null', () => {
		expect(test.letFloatArg(null)).toEqual(0);
	});
	it('accepts a number', () => {
		expect(test.letFloatArg(55)).toEqual(55);
	});
});

describe('addon-tools.hpp: USE_FLOAT_ARG', () => {
	it('exports useFloatArg', () => {
		expect(typeof test.useFloatArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useFloatArg('1')).toThrow(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useFloatArg(true)).toThrow(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useFloatArg({})).toThrow(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useFloatArg([])).toThrow(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useFloatArg()).toEqual(10);
	});
	it('accepts undefined', () => {
		expect(test.useFloatArg(undefined)).toEqual(10);
	});
	it('accepts null', () => {
		expect(test.useFloatArg(null)).toEqual(10);
	});
	it('accepts a number', () => {
		expect(test.useFloatArg(55)).toEqual(55);
	});
});
