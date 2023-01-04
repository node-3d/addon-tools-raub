'use strict';

const test = require('./build/Release/test.node');


const strArgMsg = 'Argument 0 must be of type `String`';

describe('AT / addon-tools.hpp / REQ_STR_ARG', () => {
	it('exports reqStrArg', () => {
		expect(typeof test.reqStrArg).toBe('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqStrArg()).toThrow(strArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqStrArg(undefined)).toThrow(strArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqStrArg(null)).toThrow(strArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.reqStrArg(1)).toThrow(strArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqStrArg(true)).toThrow(strArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqStrArg({})).toThrow(strArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqStrArg([])).toThrow(strArgMsg);
	});
	it('accepts a string', () => {
		expect(test.reqStrArg('1abc')).toEqual('1abc');
	});
});

describe('addon-tools.hpp: LET_STR_ARG', () => {
	it('exports letStrArg', () => {
		expect(typeof test.letStrArg).toBe('function');
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.letStrArg(1)).toThrow(strArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letStrArg(true)).toThrow(strArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letStrArg({})).toThrow(strArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letStrArg([])).toThrow(strArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letStrArg()).toEqual('');
	});
	it('accepts undefined', () => {
		expect(test.letStrArg(undefined)).toEqual('');
	});
	it('accepts null', () => {
		expect(test.letStrArg(null)).toEqual('');
	});
	it('accepts a string', () => {
		expect(test.letStrArg('1abc')).toEqual('1abc');
	});
});

describe('addon-tools.hpp: USE_STR_ARG', () => {
	it('exports useStrArg', () => {
		expect(typeof test.useStrArg).toBe('function');
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.useStrArg(1)).toThrow(strArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useStrArg(true)).toThrow(strArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useStrArg({})).toThrow(strArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useStrArg([])).toThrow(strArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useStrArg()).toEqual('default');
	});
	it('accepts undefined', () => {
		expect(test.useStrArg(undefined)).toEqual('default');
	});
	it('accepts null', () => {
		expect(test.useStrArg(null)).toEqual('default');
	});
	it('accepts a string', () => {
		expect(test.useStrArg('1abc')).toEqual('1abc');
	});
});
