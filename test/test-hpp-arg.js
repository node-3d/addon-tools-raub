'use strict';

const { expect } = require('chai');
const test = require('./build/Release/test.node');


describe('Function arguments', () => {
	
	it('can require 3 args / REQ_ARGS', () => {
		expect(test.reqArgs3).to.be.a('function');
		expect(() => test.reqArgs3(1)).to.throw('Expected at least 3 arguments');
		expect(test.reqArgs3(1, 2, 3)).to.be.true;
	});
	
	describe('IS_ARG_EMPTY', () => {
		it('exports isArg0Empty', () => {
			expect(test.isArg0Empty).to.be.a('function');
		});
		it('returns true for absent arg', () => {
			expect(test.isArg0Empty()).to.be.true;
		});
		it('returns true for undefined arg', () => {
			expect(test.isArg0Empty(undefined)).to.be.true;
		});
		it('returns true for null arg', () => {
			expect(test.isArg0Empty(null)).to.be.true;
		});
		it('returns false for non-empty value', () => {
			expect(test.isArg0Empty(1)).to.be.false;
		});
	});
	
	require('./test-hpp-arg-str');
	require('./test-hpp-arg-int');
	require('./test-hpp-arg-uint');
	require('./test-hpp-arg-bool');
	require('./test-hpp-arg-offs');
	require('./test-hpp-arg-double');
	require('./test-hpp-arg-float');
	require('./test-hpp-arg-ext');
	require('./test-hpp-arg-obj');
	require('./test-hpp-arg-array');
	
	// ------------------------------ FUN_ARG
	
	const funArgMsg = 'Argument 0 must be of type `Function`';
	
	describe('REQ_FUN_ARG', () => {
		it('exports reqFunArg', () => {
			expect(test.reqFunArg).to.be.a('function');
		});
		it('throws if arg was not passed', () => {
			expect(() => test.reqFunArg()).to.throw(funArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			expect(() => test.reqFunArg(undefined)).to.throw(funArgMsg);
		});
		it('throws if arg was passed null', () => {
			expect(() => test.reqFunArg(null)).to.throw(funArgMsg);
		});
		it('throws if arg was passed a string', () => {
			expect(() => test.reqFunArg('1')).to.throw(funArgMsg);
		});
		it('throws if arg was passed a number', () => {
			expect(() => test.reqFunArg(1)).to.throw(funArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			expect(() => test.reqFunArg(true)).to.throw(funArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			expect(() => test.reqFunArg(test.retExt())).to.throw(funArgMsg);
		});
		it('throws if arg was passed an object', () => {
			expect(() => test.reqFunArg({})).to.throw(funArgMsg);
		});
		it('throws if arg was passed an array', () => {
			expect(() => test.reqFunArg([])).to.throw(funArgMsg);
		});
		it('accepts a function', () => {
			expect(test.reqFunArg(() => {})).to.be.a('function');
		});
	});
	
	// ------------------------------ ARRV_ARG
	
	const arrvArgMsg = 'Argument 0 must be of type `ArrayBuffer`';
	
	describe('REQ_ARRV_ARG', () => {
		it('exports reqArrvArg', () => {
			expect(test.reqArrvArg).to.be.a('function');
		});
		it('throws if arg was not passed', () => {
			expect(() => test.reqArrvArg()).to.throw(arrvArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			expect(() => test.reqArrvArg(undefined)).to.throw(arrvArgMsg);
		});
		it('throws if arg was passed null', () => {
			expect(() => test.reqArrvArg(null)).to.throw(arrvArgMsg);
		});
		it('throws if arg was passed a string', () => {
			expect(() => test.reqArrvArg('1')).to.throw(arrvArgMsg);
		});
		it('throws if arg was passed a number', () => {
			expect(() => test.reqArrvArg(1)).to.throw(arrvArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			expect(() => test.reqArrvArg(true)).to.throw(arrvArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			expect(() => test.reqArrvArg(test.retExt())).to.throw(arrvArgMsg);
		});
		it('throws if arg was passed an object', () => {
			expect(() => test.reqArrvArg({})).to.throw(arrvArgMsg);
		});
		it('throws if arg was passed an array', () => {
			expect(() => test.reqArrvArg([])).to.throw(arrvArgMsg);
		});
		it('accepts an array buffer', () => {
			const { buffer } = new Uint8Array([1, 2, 3]);
			expect(test.reqArrvArg(buffer)).to.be.equal(buffer);
		});
	});
	
	// ------------------------------ BUF_ARG
	
	const bufArgMsg = 'Argument 0 must be of type `Buffer`';
	
	describe('REQ_BUF_ARG', () => {
		it('exports reqBufArg', () => {
			expect(test.reqBufArg).to.be.a('function');
		});
		it('throws if arg was not passed', () => {
			expect(() => test.reqBufArg()).to.throw(bufArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			expect(() => test.reqBufArg(undefined)).to.throw(bufArgMsg);
		});
		it('throws if arg was passed null', () => {
			expect(() => test.reqBufArg(null)).to.throw(bufArgMsg);
		});
		it('throws if arg was passed a string', () => {
			expect(() => test.reqBufArg('1')).to.throw(bufArgMsg);
		});
		it('throws if arg was passed a number', () => {
			expect(() => test.reqBufArg(1)).to.throw(bufArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			expect(() => test.reqBufArg(true)).to.throw(bufArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			expect(() => test.reqBufArg(test.retExt())).to.throw(bufArgMsg);
		});
		it('throws if arg was passed an object', () => {
			expect(() => test.reqBufArg({})).to.throw(bufArgMsg);
		});
		it('throws if arg was passed an array', () => {
			expect(() => test.reqBufArg([])).to.throw(bufArgMsg);
		});
		it('accepts a buffer', () => {
			const buffer = Buffer.from([1, 2, 3]);
			expect(test.reqBufArg(buffer)).to.be.equal(buffer);
		});
	});
	
	// ------------------------------ TYPED_ARRAY_ARG
	
	const typedArgMsg = 'Argument 0 must be of type `TypedArray`';
	
	describe('REQ_TYPED_ARRAY_ARG', () => {
		it('exports reqTypedArg', () => {
			expect(test.reqTypedArg).to.be.a('function');
		});
		it('throws if arg was not passed', () => {
			expect(() => test.reqTypedArg()).to.throw(typedArgMsg);
		});
		it('throws if arg was passed undefined', () => {
			expect(() => test.reqTypedArg(undefined)).to.throw(typedArgMsg);
		});
		it('throws if arg was passed null', () => {
			expect(() => test.reqTypedArg(null)).to.throw(typedArgMsg);
		});
		it('throws if arg was passed a string', () => {
			expect(() => test.reqTypedArg('1')).to.throw(typedArgMsg);
		});
		it('throws if arg was passed a number', () => {
			expect(() => test.reqTypedArg(1)).to.throw(typedArgMsg);
		});
		it('throws if arg was passed a boolean', () => {
			expect(() => test.reqTypedArg(true)).to.throw(typedArgMsg);
		});
		it('throws if arg was passed a pointer', () => {
			expect(() => test.reqTypedArg(test.retExt())).to.throw(typedArgMsg);
		});
		it('throws if arg was passed an object', () => {
			expect(() => test.reqTypedArg({})).to.throw(typedArgMsg);
		});
		it('throws if arg was passed an array', () => {
			expect(() => test.reqTypedArg([])).to.throw(typedArgMsg);
		});
		it('accepts a typed array', () => {
			const typed = new Uint8Array([1, 2, 3]);
			expect(test.reqTypedArg(typed)).to.be.equal(typed);
		});
	});
	
});
