'use strict';

const { expect } = require('chai');
const test = require('./build/Release/test.node');


const objArgMsg = 'Argument 0 must be of type `Object`';

describe('REQ_OBJ_ARG', () => {
	it('exports reqObjArg', () => {
		expect(test.reqObjArg).to.be.a('function');
	});
	it('throws if arg was not passed', () => {
		expect(() => test.reqObjArg()).to.throw(objArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		expect(() => test.reqObjArg(undefined)).to.throw(objArgMsg);
	});
	it('throws if arg was passed null', () => {
		expect(() => test.reqObjArg(null)).to.throw(objArgMsg);
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.reqObjArg('1')).to.throw(objArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.reqObjArg(1)).to.throw(objArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.reqObjArg(true)).to.throw(objArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.reqObjArg(test.retExt())).to.throw(objArgMsg);
	});
	it('accepts an object', () => {
		expect(test.reqObjArg({})).to.be.an('object');
	});
	it('accepts an array', () => {
		expect(test.reqObjArg([])).to.be.an('array');
	});
});

describe('LET_OBJ_ARG', () => {
	it('exports letObjArg', () => {
		expect(test.letObjArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.letObjArg('1')).to.throw(objArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.letObjArg(1)).to.throw(objArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.letObjArg(true)).to.throw(objArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.letObjArg(test.retExt())).to.throw(objArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.letObjArg()).to.be.an('object');
	});
	it('accepts undefined', () => {
		expect(test.letObjArg(undefined)).to.be.an('object');
	});
	it('accepts null', () => {
		expect(test.letObjArg(null)).to.be.an('object');
	});
	it('accepts an object', () => {
		expect(test.letObjArg({})).to.be.an('object');
	});
	it('accepts an array', () => {
		expect(test.letObjArg([])).to.be.an('array');
	});
});

describe('USE_OBJ_ARG', () => {
	it('exports useObjArg', () => {
		expect(test.useObjArg).to.be.a('function');
	});
	it('throws if arg was passed a string', () => {
		expect(() => test.useObjArg('1')).to.throw(objArgMsg);
	});
	it('throws if arg was passed a number', () => {
		expect(() => test.useObjArg(1)).to.throw(objArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		expect(() => test.useObjArg(true)).to.throw(objArgMsg);
	});
	it('throws if arg was passed a pointer', () => {
		expect(() => test.useObjArg(test.retExt())).to.throw(objArgMsg);
	});
	it('accepts an empty arg', () => {
		expect(test.useObjArg()).to.be.an('object');
	});
	it('accepts undefined', () => {
		expect(test.useObjArg(undefined)).to.be.an('object');
	});
	it('accepts null', () => {
		expect(test.useObjArg(null)).to.be.an('object');
	});
	it('accepts an object', () => {
		expect(test.useObjArg({})).to.be.an('object');
	});
	it('accepts an array', () => {
		expect(test.useObjArg([])).to.be.an('array');
	});
});
