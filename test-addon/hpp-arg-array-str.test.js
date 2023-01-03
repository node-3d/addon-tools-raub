'use strict';

const test = require('./build/Release/test.node');


const arrayArgMsg = 'Argument 0 must be of type `Array`';

describe('addon-tools.hpp: LET_ARRAY_ARG', () => {
	it('exports letArrayStrArg', () => {
		expect(typeof test.letArrayStrArg).toBe('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letArrayStrArg('1')).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.letArrayStrArg(1)).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letArrayStrArg(true)).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.letArrayStrArg(test.retExt())).toThrow(arrayArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letArrayStrArg({})).toThrow(arrayArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(Array.isArray(test.letArrayStrArg())).toBe(true);
	});
	it('accepts undefined', () => {
		expect(Array.isArray(test.letArrayStrArg(undefined))).toBe(true);
	});
	it('accepts null', () => {
		expect(Array.isArray(test.letArrayStrArg(null))).toBe(true);
	});
	it('accepts an array', () => {
		expect(Array.isArray(test.letArrayStrArg([]))).toBe(true);
	});
	it('returns same array', () => {
		expect(test.letArrayStrArg(['a', 'b'])).toEqual(['a', 'b']);
	});
});
