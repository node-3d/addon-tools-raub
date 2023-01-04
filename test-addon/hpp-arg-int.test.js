'use strict';

const test = require('./build/Release/test.node');


const intArgMsg = 'Argument 0 must be of type `Int32`';

describe('AT / addon-tools.hpp / REQ_INT_ARG, REQ_INT32_ARG', () => {
	it('exports reqIntArg', () => {
		expect(typeof test.reqIntArg).toBe('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqIntArg()).toThrow(intArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqIntArg(undefined)).toThrow(intArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqIntArg(null)).toThrow(intArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqIntArg('1')).toThrow(intArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqIntArg(true)).toThrow(intArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqIntArg({})).toThrow(intArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqIntArg([])).toThrow(intArgMsg);
	});
	it('accepts a number', () => {
		expect(test.reqIntArg(55)).toEqual(55);
	});
});

describe('addon-tools.hpp: LET_INT_ARG / LET_INT32_ARG', () => {
	it('exports letIntArg', () => {
		expect(typeof test.letIntArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letIntArg('1')).toThrow(intArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letIntArg(true)).toThrow(intArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letIntArg({})).toThrow(intArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letIntArg([])).toThrow(intArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letIntArg()).toEqual(0);
	});
	it('accepts undefined', () => {
		expect(test.letIntArg(undefined)).toEqual(0);
	});
	it('accepts null', () => {
		expect(test.letIntArg(null)).toEqual(0);
	});
	it('accepts a number', () => {
		expect(test.letIntArg(55)).toEqual(55);
	});
});

describe('addon-tools.hpp: USE_INT_ARG / USE_INT32_ARG', () => {
	it('exports useIntArg', () => {
		expect(typeof test.useIntArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useIntArg('1')).toThrow(intArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useIntArg(true)).toThrow(intArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useIntArg({})).toThrow(intArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useIntArg([])).toThrow(intArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useIntArg()).toEqual(10);
	});
	it('accepts undefined', () => {
		expect(test.useIntArg(undefined)).toEqual(10);
	});
	it('accepts null', () => {
		expect(test.useIntArg(null)).toEqual(10);
	});
	it('accepts a number', () => {
		expect(test.useIntArg(55)).toEqual(55);
	});
});
