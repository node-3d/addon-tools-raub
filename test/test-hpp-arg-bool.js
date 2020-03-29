'use strict';

const { expect } = require('chai');
const test = require('./build/Release/test.node');


const boolArgMsg = 'Argument 0 must be of type `Bool`';

describe('REQ_BOOL_ARG', () => {
	it('exports reqBoolArg', () => {
		expect(test.reqBoolArg).to.be.a('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqBoolArg()).to.throw(boolArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqBoolArg(undefined)).to.throw(boolArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqBoolArg(null)).to.throw(boolArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqBoolArg('1')).to.throw(boolArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.reqBoolArg(1)).to.throw(boolArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqBoolArg({})).to.throw(boolArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqBoolArg([])).to.throw(boolArgMsg);
	});
	it('accepts a boolean', () => {
		expect(test.reqBoolArg(true)).to.be.equal(true);
	});
});

describe('LET_BOOL_ARG', () => {
	it('exports letBoolArg', () => {
		expect(test.letBoolArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letBoolArg('1')).to.throw(boolArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.letBoolArg(1)).to.throw(boolArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letBoolArg({})).to.throw(boolArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letBoolArg([])).to.throw(boolArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letBoolArg()).to.be.equal(false);
	});
	it('accepts undefined', () => {
		expect(test.letBoolArg(undefined)).to.be.equal(false);
	});
	it('accepts null', () => {
		expect(test.letBoolArg(null)).to.be.equal(false);
	});
	it('accepts a boolean', () => {
		expect(test.letBoolArg(true)).to.be.equal(true);
	});
});

describe('USE_BOOL_ARG', () => {
	it('exports useBoolArg', () => {
		expect(test.useBoolArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useBoolArg('1')).to.throw(boolArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.useBoolArg(1)).to.throw(boolArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useBoolArg({})).to.throw(boolArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useBoolArg([])).to.throw(boolArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useBoolArg()).to.be.equal(true);
	});
	it('accepts undefined', () => {
		expect(test.useBoolArg(undefined)).to.be.equal(true);
	});
	it('accepts null', () => {
		expect(test.useBoolArg(null)).to.be.equal(true);
	});
	it('accepts a boolean', () => {
		expect(test.useBoolArg(true)).to.be.equal(true);
	});
});
