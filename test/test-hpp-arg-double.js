'use strict';

const { expect } = require('chai');
const test = require('./build/Release/test.node');


const numArgMsg = 'Argument 0 must be of type `Number`';

describe('REQ_DOUBLE_ARG', () => {
	it('exports reqDoubleArg', () => {
		expect(test.reqDoubleArg).to.be.a('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqDoubleArg()).to.throw(numArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqDoubleArg(undefined)).to.throw(numArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqDoubleArg(null)).to.throw(numArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqDoubleArg('1')).to.throw(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqDoubleArg(true)).to.throw(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqDoubleArg({})).to.throw(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqDoubleArg([])).to.throw(numArgMsg);
	});
	it('accepts a number', () => {
		expect(test.reqDoubleArg(55)).to.be.equal(55);
	});
});

describe('LET_DOUBLE_ARG', () => {
	it('exports letDoubleArg', () => {
		expect(test.letDoubleArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letDoubleArg('1')).to.throw(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letDoubleArg(true)).to.throw(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letDoubleArg({})).to.throw(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letDoubleArg([])).to.throw(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letDoubleArg()).to.be.equal(0);
	});
	it('accepts undefined', () => {
		expect(test.letDoubleArg(undefined)).to.be.equal(0);
	});
	it('accepts null', () => {
		expect(test.letDoubleArg(null)).to.be.equal(0);
	});
	it('accepts a number', () => {
		expect(test.letDoubleArg(55)).to.be.equal(55);
	});
});

describe('USE_DOUBLE_ARG', () => {
	it('exports useDoubleArg', () => {
		expect(test.useDoubleArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useDoubleArg('1')).to.throw(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useDoubleArg(true)).to.throw(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useDoubleArg({})).to.throw(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useDoubleArg([])).to.throw(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useDoubleArg()).to.be.equal(10);
	});
	it('accepts undefined', () => {
		expect(test.useDoubleArg(undefined)).to.be.equal(10);
	});
	it('accepts null', () => {
		expect(test.useDoubleArg(null)).to.be.equal(10);
	});
	it('accepts a number', () => {
		expect(test.useDoubleArg(55)).to.be.equal(55);
	});
});
