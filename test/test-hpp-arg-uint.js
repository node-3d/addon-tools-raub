'use strict';

const { expect } = require('chai');
const test = require('./build/Release/test.node');


const uintArgMsg = 'Argument 0 must be of type `Uint32`';

describe('REQ_UINT_ARG / REQ_UINT32_ARG', () => {
	it('exports reqUintArg', () => {
		expect(test.reqUintArg).to.be.a('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqUintArg()).to.throw(uintArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqUintArg(undefined)).to.throw(uintArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqUintArg(null)).to.throw(uintArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqUintArg('1')).to.throw(uintArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqUintArg(true)).to.throw(uintArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqUintArg({})).to.throw(uintArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqUintArg([])).to.throw(uintArgMsg);
	});
	it('accepts a number', () => {
		expect(test.reqUintArg(55)).to.be.equal(55);
	});
});

describe('LET_UINT_ARG / LET_UINT32_ARG', () => {
	it('exports letUintArg', () => {
		expect(test.letUintArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letUintArg('1')).to.throw(uintArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letUintArg(true)).to.throw(uintArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letUintArg({})).to.throw(uintArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letUintArg([])).to.throw(uintArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letUintArg()).to.be.equal(0);
	});
	it('accepts undefined', () => {
		expect(test.letUintArg(undefined)).to.be.equal(0);
	});
	it('accepts null', () => {
		expect(test.letUintArg(null)).to.be.equal(0);
	});
	it('accepts a number', () => {
		expect(test.letUintArg(55)).to.be.equal(55);
	});
});

describe('USE_UINT_ARG / USE_UINT32_ARG', () => {
	it('exports useUintArg', () => {
		expect(test.useUintArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useUintArg('1')).to.throw(uintArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useUintArg(true)).to.throw(uintArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useUintArg({})).to.throw(uintArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useUintArg([])).to.throw(uintArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useUintArg()).to.be.equal(10);
	});
	it('accepts undefined', () => {
		expect(test.useUintArg(undefined)).to.be.equal(10);
	});
	it('accepts null', () => {
		expect(test.useUintArg(null)).to.be.equal(10);
	});
	it('accepts a number', () => {
		expect(test.useUintArg(55)).to.be.equal(55);
	});
});
