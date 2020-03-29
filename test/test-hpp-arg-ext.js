'use strict';

const { expect } = require('chai');
const test = require('./build/Release/test.node');


const extArgMsg = 'Argument 0 must be of type `Pointer`';

describe('REQ_EXT_ARG', () => {
	it('exports reqExtArg', () => {
		expect(test.reqExtArg).to.be.a('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqExtArg()).to.throw(extArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqExtArg(undefined)).to.throw(extArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqExtArg(null)).to.throw(extArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqExtArg('1')).to.throw(extArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.reqExtArg(1)).to.throw(extArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqExtArg(true)).to.throw(extArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqExtArg({})).to.throw(extArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqExtArg([])).to.throw(extArgMsg);
	});
	it('accepts a pointer', () => {
		expect(test.reqExtArg(test.retExt())).to.be.an('object');
	});
});

describe('LET_EXT_ARG', () => {
	it('exports letExtArg', () => {
		expect(test.letExtArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letExtArg('1')).to.throw(extArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.letExtArg(1)).to.throw(extArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letExtArg(true)).to.throw(extArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letExtArg({})).to.throw(extArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letExtArg([])).to.throw(extArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letExtArg()).to.be.an('object');
	});
	it('accepts undefined', () => {
		expect(test.letExtArg(undefined)).to.be.an('object');
	});
	it('accepts null', () => {
		expect(test.letExtArg(null)).to.be.an('object');
	});
	it('accepts a pointer', () => {
		expect(test.reqExtArg(test.retExt())).to.be.an('object');
	});
});

describe('USE_EXT_ARG', () => {
	it('exports useExtArg', () => {
		expect(test.useExtArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useExtArg('1')).to.throw(extArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.useExtArg(1)).to.throw(extArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useExtArg(true)).to.throw(extArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useExtArg({})).to.throw(extArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useExtArg([])).to.throw(extArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useExtArg()).to.be.an('object');
	});
	it('accepts undefined', () => {
		expect(test.useExtArg(undefined)).to.be.an('object');
	});
	it('accepts null', () => {
		expect(test.useExtArg(null)).to.be.an('object');
	});
	it('accepts a number', () => {
		expect(test.useExtArg(test.retExt())).to.be.an('object');
	});
});
