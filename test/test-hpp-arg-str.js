'use strict';

const { expect } = require('chai');
const test = require('./build/Release/test.node');


const strArgMsg = 'Argument 0 must be of type `String`';

describe('REQ_STR_ARG', () => {
	it('exports reqStrArg', () => {
		expect(test.reqStrArg).to.be.a('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqStrArg()).to.throw(strArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqStrArg(undefined)).to.throw(strArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqStrArg(null)).to.throw(strArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.reqStrArg(1)).to.throw(strArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqStrArg(true)).to.throw(strArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.reqStrArg({})).to.throw(strArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.reqStrArg([])).to.throw(strArgMsg);
	});
	it('accepts a string', () => {
		expect(test.reqStrArg('1abc')).to.be.equal('1abc');
	});
});

describe('LET_STR_ARG', () => {
	it('exports letStrArg', () => {
		expect(test.letStrArg).to.be.a('function');
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.letStrArg(1)).to.throw(strArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letStrArg(true)).to.throw(strArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letStrArg({})).to.throw(strArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.letStrArg([])).to.throw(strArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letStrArg()).to.be.equal('');
	});
	it('accepts undefined', () => {
		expect(test.letStrArg(undefined)).to.be.equal('');
	});
	it('accepts null', () => {
		expect(test.letStrArg(null)).to.be.equal('');
	});
	it('accepts a string', () => {
		expect(test.letStrArg('1abc')).to.be.equal('1abc');
	});
});

describe('USE_STR_ARG', () => {
	it('exports useStrArg', () => {
		expect(test.useStrArg).to.be.a('function');
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.useStrArg(1)).to.throw(strArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useStrArg(true)).to.throw(strArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useStrArg({})).to.throw(strArgMsg);
	});
	it('throws if arg was passed an array', () => {
		expect(() => test.useStrArg([])).to.throw(strArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useStrArg()).to.be.equal('default');
	});
	it('accepts undefined', () => {
		expect(test.useStrArg(undefined)).to.be.equal('default');
	});
	it('accepts null', () => {
		expect(test.useStrArg(null)).to.be.equal('default');
	});
	it('accepts a string', () => {
		expect(test.useStrArg('1abc')).to.be.equal('1abc');
	});
});
