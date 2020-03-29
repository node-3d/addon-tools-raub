'use strict';

const { expect } = require('chai');
const test = require('./build/Release/test.node');


const numArgMsg = 'Argument 0 must be of type `Number`';

describe('REQ_OFFS_ARG', () => {
	it('exports reqOffsArg', () => {
		expect(test.reqOffsArg).to.be.a('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqOffsArg()).to.throw(numArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqOffsArg(undefined)).to.throw(numArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqOffsArg(null)).to.throw(numArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqOffsArg('1')).to.throw(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqOffsArg(true)).to.throw(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqOffsArg({})).to.throw(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqOffsArg([])).to.throw(numArgMsg);
	});
	it('accepts a number', () => {
		expect(test.reqOffsArg(55)).to.be.equal(55);
	});
});

describe('LET_OFFS_ARG', () => {
	it('exports letOffsArg', () => {
		expect(test.letOffsArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letOffsArg('1')).to.throw(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letOffsArg(true)).to.throw(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letOffsArg({})).to.throw(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letOffsArg([])).to.throw(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letOffsArg()).to.be.equal(0);
	});
	it('accepts undefined', () => {
		expect(test.letOffsArg(undefined)).to.be.equal(0);
	});
	it('accepts null', () => {
		expect(test.letOffsArg(null)).to.be.equal(0);
	});
	it('accepts a number', () => {
		expect(test.letOffsArg(55)).to.be.equal(55);
	});
});

describe('USE_OFFS_ARG', () => {
	it('exports useOffsArg', () => {
		expect(test.useOffsArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useOffsArg('1')).to.throw(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useOffsArg(true)).to.throw(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useOffsArg({})).to.throw(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useOffsArg([])).to.throw(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useOffsArg()).to.be.equal(10);
	});
	it('accepts undefined', () => {
		expect(test.useOffsArg(undefined)).to.be.equal(10);
	});
	it('accepts null', () => {
		expect(test.useOffsArg(null)).to.be.equal(10);
	});
	it('accepts a number', () => {
		expect(test.useOffsArg(55)).to.be.equal(55);
	});
});
