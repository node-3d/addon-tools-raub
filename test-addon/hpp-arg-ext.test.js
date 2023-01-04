'use strict';

const test = require('./build/Release/test.node');


const extArgMsg = 'Argument 0 must be of type `Pointer`';

describe('AT / addon-tools.hpp / REQ_EXT_ARG', () => {
	it('exports reqExtArg', () => {
		expect(typeof test.reqExtArg).toBe('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqExtArg()).toThrow(extArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqExtArg(undefined)).toThrow(extArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqExtArg(null)).toThrow(extArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqExtArg('1')).toThrow(extArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.reqExtArg(1)).toThrow(extArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqExtArg(true)).toThrow(extArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqExtArg({})).toThrow(extArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqExtArg([])).toThrow(extArgMsg);
	});
	it('accepts a pointer', () => {
		expect(typeof test.reqExtArg(test.retExt())).toBe('object');
	});
});

describe('addon-tools.hpp: LET_EXT_ARG', () => {
	it('exports letExtArg', () => {
		expect(typeof test.letExtArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letExtArg('1')).toThrow(extArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.letExtArg(1)).toThrow(extArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letExtArg(true)).toThrow(extArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letExtArg({})).toThrow(extArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letExtArg([])).toThrow(extArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(typeof test.letExtArg()).toBe('object');
	});
	it('accepts undefined', () => {
		expect(typeof test.letExtArg(undefined)).toBe('object');
	});
	it('accepts null', () => {
		expect(typeof test.letExtArg(null)).toBe('object');
	});
	it('accepts a pointer', () => {
		expect(typeof test.reqExtArg(test.retExt())).toBe('object');
	});
});

describe('addon-tools.hpp: USE_EXT_ARG', () => {
	it('exports useExtArg', () => {
		expect(typeof test.useExtArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useExtArg('1')).toThrow(extArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.useExtArg(1)).toThrow(extArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useExtArg(true)).toThrow(extArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useExtArg({})).toThrow(extArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useExtArg([])).toThrow(extArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(typeof test.useExtArg()).toBe('object');
	});
	it('accepts undefined', () => {
		expect(typeof test.useExtArg(undefined)).toBe('object');
	});
	it('accepts null', () => {
		expect(typeof test.useExtArg(null)).toBe('object');
	});
	it('accepts a number', () => {
		expect(typeof test.useExtArg(test.retExt())).toBe('object');
	});
});
