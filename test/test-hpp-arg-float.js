'use strict';

const { expect } = require('chai');
const test = require('./build/Release/test.node');


const numArgMsg = 'Argument 0 must be of type `Number`';

describe('REQ_FLOAT_ARG', () => {
	it('exports reqFloatArg', () => {
		expect(test.reqFloatArg).to.be.a('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqFloatArg()).to.throw(numArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqFloatArg(undefined)).to.throw(numArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqFloatArg(null)).to.throw(numArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqFloatArg('1')).to.throw(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqFloatArg(true)).to.throw(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqFloatArg({})).to.throw(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqFloatArg([])).to.throw(numArgMsg);
	});
	it('accepts a number', () => {
		expect(test.reqFloatArg(55)).to.be.equal(55);
	});
});

describe('LET_FLOAT_ARG', () => {
	it('exports letFloatArg', () => {
		expect(test.letFloatArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letFloatArg('1')).to.throw(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letFloatArg(true)).to.throw(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letFloatArg({})).to.throw(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letFloatArg([])).to.throw(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letFloatArg()).to.be.equal(0);
	});
	it('accepts undefined', () => {
		expect(test.letFloatArg(undefined)).to.be.equal(0);
	});
	it('accepts null', () => {
		expect(test.letFloatArg(null)).to.be.equal(0);
	});
	it('accepts a number', () => {
		expect(test.letFloatArg(55)).to.be.equal(55);
	});
});

describe('USE_FLOAT_ARG', () => {
	it('exports useFloatArg', () => {
		expect(test.useFloatArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useFloatArg('1')).to.throw(numArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useFloatArg(true)).to.throw(numArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useFloatArg({})).to.throw(numArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useFloatArg([])).to.throw(numArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useFloatArg()).to.be.equal(10);
	});
	it('accepts undefined', () => {
		expect(test.useFloatArg(undefined)).to.be.equal(10);
	});
	it('accepts null', () => {
		expect(test.useFloatArg(null)).to.be.equal(10);
	});
	it('accepts a number', () => {
		expect(test.useFloatArg(55)).to.be.equal(55);
	});
});
