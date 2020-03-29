'use strict';

const { expect } = require('chai');
const test = require('./build/Release/test.node');


const intArgMsg = 'Argument 0 must be of type `Int32`';

describe('REQ_INT_ARG / REQ_INT32_ARG', () => {
	it('exports reqIntArg', () => {
		expect(test.reqIntArg).to.be.a('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqIntArg()).to.throw(intArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqIntArg(undefined)).to.throw(intArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqIntArg(null)).to.throw(intArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqIntArg('1')).to.throw(intArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqIntArg(true)).to.throw(intArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqIntArg({})).to.throw(intArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqIntArg([])).to.throw(intArgMsg);
	});
	it('accepts a number', () => {
		expect(test.reqIntArg(55)).to.be.equal(55);
	});
});

describe('LET_INT_ARG / LET_INT32_ARG', () => {
	it('exports letIntArg', () => {
		expect(test.letIntArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letIntArg('1')).to.throw(intArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letIntArg(true)).to.throw(intArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letIntArg({})).to.throw(intArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letIntArg([])).to.throw(intArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letIntArg()).to.be.equal(0);
	});
	it('accepts undefined', () => {
		expect(test.letIntArg(undefined)).to.be.equal(0);
	});
	it('accepts null', () => {
		expect(test.letIntArg(null)).to.be.equal(0);
	});
	it('accepts a number', () => {
		expect(test.letIntArg(55)).to.be.equal(55);
	});
});

describe('USE_INT_ARG / USE_INT32_ARG', () => {
	it('exports useIntArg', () => {
		expect(test.useIntArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useIntArg('1')).to.throw(intArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useIntArg(true)).to.throw(intArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useIntArg({})).to.throw(intArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useIntArg([])).to.throw(intArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useIntArg()).to.be.equal(10);
	});
	it('accepts undefined', () => {
		expect(test.useIntArg(undefined)).to.be.equal(10);
	});
	it('accepts null', () => {
		expect(test.useIntArg(null)).to.be.equal(10);
	});
	it('accepts a number', () => {
		expect(test.useIntArg(55)).to.be.equal(55);
	});
});
