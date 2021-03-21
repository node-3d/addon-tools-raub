'use strict';

const test = require('./build/Release/test.node');


const objArgMsg = 'Argument 0 must be of type `Object`';

describe('addon-tools.hpp: REQ_OBJ_ARG', () => {
	it('exports reqObjArg', () => {
		expect(typeof test.reqObjArg).toBe('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqObjArg()).toThrow(objArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqObjArg(undefined)).toThrow(objArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqObjArg(null)).toThrow(objArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqObjArg('1')).toThrow(objArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.reqObjArg(1)).toThrow(objArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqObjArg(true)).toThrow(objArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.reqObjArg(test.retExt())).toThrow(objArgMsg);
	});
	it('accepts an object', () => {
		expect(typeof test.reqObjArg({})).toBe('object');
	});
	it('accepts an array', () => {
		expect(Array.isArray(test.reqObjArg([]))).toBe(true);
	});
});

describe('addon-tools.hpp: LET_OBJ_ARG', () => {
	it('exports letObjArg', () => {
		expect(typeof test.letObjArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letObjArg('1')).toThrow(objArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.letObjArg(1)).toThrow(objArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letObjArg(true)).toThrow(objArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.letObjArg(test.retExt())).toThrow(objArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(typeof test.letObjArg()).toBe('object');
	});
	it('accepts undefined', () => {
		expect(typeof test.letObjArg(undefined)).toBe('object');
	});
	it('accepts null', () => {
		expect(typeof test.letObjArg(null)).toBe('object');
	});
	it('accepts an object', () => {
		expect(typeof test.letObjArg({})).toBe('object');
	});
	it('accepts an array', () => {
		expect(Array.isArray(test.letObjArg([]))).toBe(true);
	});
});

describe('addon-tools.hpp: USE_OBJ_ARG', () => {
	it('exports useObjArg', () => {
		expect(typeof test.useObjArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useObjArg('1')).toThrow(objArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.useObjArg(1)).toThrow(objArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useObjArg(true)).toThrow(objArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.useObjArg(test.retExt())).toThrow(objArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(typeof test.useObjArg()).toBe('object');
	});
	it('accepts undefined', () => {
		expect(typeof test.useObjArg(undefined)).toBe('object');
	});
	it('accepts null', () => {
		expect(typeof test.useObjArg(null)).toBe('object');
	});
	it('accepts an object', () => {
		expect(typeof test.useObjArg({})).toBe('object');
	});
	it('accepts an array', () => {
		expect(Array.isArray(test.useObjArg([]))).toBe(true);
	});
});
