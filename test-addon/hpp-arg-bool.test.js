'use strict';

const test = require('./build/Release/test.node');


const boolArgMsg = 'Argument 0 must be of type `Bool`';

describe('addon-tools.hpp: REQ_BOOL_ARG', () => {
	it('exports reqBoolArg', () => {
		expect(typeof test.reqBoolArg).toBe('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqBoolArg()).toThrow(boolArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqBoolArg(undefined)).toThrow(boolArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqBoolArg(null)).toThrow(boolArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqBoolArg('1')).toThrow(boolArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.reqBoolArg(1)).toThrow(boolArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqBoolArg({})).toThrow(boolArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqBoolArg([])).toThrow(boolArgMsg);
	});
	it('accepts a boolean', () => {
		expect(test.reqBoolArg(true)).toEqual(true);
	});
});

describe('addon-tools.hpp: LET_BOOL_ARG', () => {
	it('exports letBoolArg', () => {
		expect(typeof test.letBoolArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letBoolArg('1')).toThrow(boolArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.letBoolArg(1)).toThrow(boolArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letBoolArg({})).toThrow(boolArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letBoolArg([])).toThrow(boolArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letBoolArg()).toEqual(false);
	});
	it('accepts undefined', () => {
		expect(test.letBoolArg(undefined)).toEqual(false);
	});
	it('accepts null', () => {
		expect(test.letBoolArg(null)).toEqual(false);
	});
	it('accepts a boolean', () => {
		expect(test.letBoolArg(true)).toEqual(true);
	});
});

describe('addon-tools.hpp: USE_BOOL_ARG', () => {
	it('exports useBoolArg', () => {
		expect(typeof test.useBoolArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useBoolArg('1')).toThrow(boolArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.useBoolArg(1)).toThrow(boolArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useBoolArg({})).toThrow(boolArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useBoolArg([])).toThrow(boolArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useBoolArg()).toEqual(true);
	});
	it('accepts undefined', () => {
		expect(test.useBoolArg(undefined)).toEqual(true);
	});
	it('accepts null', () => {
		expect(test.useBoolArg(null)).toEqual(true);
	});
	it('accepts a boolean', () => {
		expect(test.useBoolArg(true)).toEqual(true);
	});
});
