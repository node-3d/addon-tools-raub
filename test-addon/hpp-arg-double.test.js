'use strict';

const test = require('./build/Release/test.node');


const numArgMsg = 'Argument 0 must be of type `Number`';

describe('addon-tools.hpp: REQ_DOUBLE_ARG', () => {
	it('exports reqDoubleArg', () => {
		expect(typeof test.reqDoubleArg).toBe('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqDoubleArg()).toThrow(numArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqDoubleArg(undefined)).toThrow(numArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqDoubleArg(null)).toThrow(numArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqDoubleArg('1')).toThrow(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqDoubleArg(true)).toThrow(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqDoubleArg({})).toThrow(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqDoubleArg([])).toThrow(numArgMsg);
	});
	it('accepts a number', () => {
		expect(test.reqDoubleArg(55)).toEqual(55);
	});
});

describe('addon-tools.hpp: LET_DOUBLE_ARG', () => {
	it('exports letDoubleArg', () => {
		expect(typeof test.letDoubleArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letDoubleArg('1')).toThrow(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letDoubleArg(true)).toThrow(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letDoubleArg({})).toThrow(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letDoubleArg([])).toThrow(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letDoubleArg()).toEqual(0);
	});
	it('accepts undefined', () => {
		expect(test.letDoubleArg(undefined)).toEqual(0);
	});
	it('accepts null', () => {
		expect(test.letDoubleArg(null)).toEqual(0);
	});
	it('accepts a number', () => {
		expect(test.letDoubleArg(55)).toEqual(55);
	});
});

describe('addon-tools.hpp: USE_DOUBLE_ARG', () => {
	it('exports useDoubleArg', () => {
		expect(typeof test.useDoubleArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useDoubleArg('1')).toThrow(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useDoubleArg(true)).toThrow(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useDoubleArg({})).toThrow(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useDoubleArg([])).toThrow(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useDoubleArg()).toEqual(10);
	});
	it('accepts undefined', () => {
		expect(test.useDoubleArg(undefined)).toEqual(10);
	});
	it('accepts null', () => {
		expect(test.useDoubleArg(null)).toEqual(10);
	});
	it('accepts a number', () => {
		expect(test.useDoubleArg(55)).toEqual(55);
	});
});
