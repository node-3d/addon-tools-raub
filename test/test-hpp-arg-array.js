'use strict';

const { expect } = require('chai');
const test = require('./build/Release/test.node');


const arrayArgMsg = 'Argument 0 must be of type `Array`';

describe('REQ_ARRAY_ARG', () => {
	it('exports reqArrayArg', () => {
		expect(test.reqArrayArg).to.be.a('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqArrayArg()).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqArrayArg(undefined)).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqArrayArg(null)).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqArrayArg('1')).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.reqArrayArg(1)).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqArrayArg(true)).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.reqArrayArg(test.retExt())).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqArrayArg({})).to.throw(arrayArgMsg);
	});
	it('accepts an array', () => {
		expect(test.reqArrayArg([])).to.be.an('array');
	});
});

describe('LET_ARRAY_ARG', () => {
	it('exports letArrayArg', () => {
		expect(test.letArrayArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letArrayArg('1')).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.letArrayArg(1)).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letArrayArg(true)).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.letArrayArg(test.retExt())).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letArrayArg({})).to.throw(arrayArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letArrayArg()).to.be.an('array');
	});
	it('accepts undefined', () => {
		expect(test.letArrayArg(undefined)).to.be.an('array');
	});
	it('accepts null', () => {
		expect(test.letArrayArg(null)).to.be.an('array');
	});
	it('accepts an array', () => {
		expect(test.letArrayArg([])).to.be.an('array');
	});
});

describe('USE_ARRAY_ARG', () => {
	it('exports useArrayArg', () => {
		expect(test.useArrayArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useArrayArg('1')).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.useArrayArg(1)).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useArrayArg(true)).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.useArrayArg(test.retExt())).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useArrayArg({})).to.throw(arrayArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useArrayArg()).to.be.an('array');
	});
	it('accepts undefined', () => {
		expect(test.useArrayArg(undefined)).to.be.an('array');
	});
	it('accepts null', () => {
		expect(test.useArrayArg(null)).to.be.an('array');
	});
	it('accepts an array', () => {
		expect(test.useArrayArg([])).to.be.an('array');
	});
});
