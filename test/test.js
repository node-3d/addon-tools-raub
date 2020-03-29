'use strict';

const { expect } = require('chai');


describe('index.js', () => {
	
	const tools = require('..');
	
	describe('Properties', () => {
		
		['bin', 'platform', 'include'].forEach(
			m => it(`#${m} is a string`, () => {
				expect(tools[m]).to.be.a('string');
			})
		);
		
	});
	
	describe('#paths()', () => {
		
		it('is a function', () => {
			expect(tools.paths).to.be.a('function');
		});
		
		it('returns an object', () => {
			expect(tools.paths(__dirname)).to.be.an('object');
		});
		
		it('has "include" string', () => {
			expect(tools.paths(__dirname).include).to.be.a('string');
		});
		
		it('has "bin" string', () => {
			expect(tools.paths(__dirname).include).to.be.a('string');
		});
		
	});
	
});


describe('addon-tools.hpp', () => {
	
	const test = require('./build/Release/test.node');
	
	describe('Basic tools', () => {
		
		it('calls an empty function / NAPI_ENV / NAPI_HS', () => {
			expect(test.empty).to.be.a('function');
			expect(test.empty()).to.be.undefined;
		});
		
		it('calls a throwing function / JS_THROW', () => {
			expect(test.throwing).to.be.a('function');
			expect(() => test.throwing()).to.throw('Some error');
		});
		
		it('constructs and returns undefined / JS_UNDEFINED / RET_UNDEFINED', () => {
			expect(test.retUndefined).to.be.a('function');
			expect(test.retUndefined()).to.be.undefined;
		});
		
		it('constructs and returns null / JS_NULL / RET_NULL', () => {
			expect(test.retNull).to.be.a('function');
			expect(test.retNull()).to.be.null;
		});
		
		it('constructs and returns a string / JS_STR / RET_STR', () => {
			expect(test.retStr).to.be.a('function');
			expect(test.retStr()).to.be.a('string');
		});
		
		it('constructs and returns a number / JS_NUM / RET_NUM', () => {
			expect(test.retNum).to.be.a('function');
			expect(test.retNum()).to.be.a('number');
		});
		
		it('constructs and returns an External / JS_EXT / RET_EXT', () => {
			expect(test.retExt).to.be.a('function');
			expect(test.retExt()).to.be.an('object');
		});
		
		it('constructs and returns a boolean / JS_BOOL / RET_BOOL', () => {
			expect(test.retBool).to.be.a('function');
			expect(test.retBool()).to.be.an('boolean');
		});
		
		it('constructs and returns an (empty) Object / JS_OBJECT', () => {
			expect(test.retObject).to.be.a('function');
			expect(test.retObject()).to.be.an('object');
		});
		
		it('constructs and returns an (empty) Array / JS_ARRAY', () => {
			expect(test.retArray).to.be.a('function');
			expect(test.retArray()).to.be.an('array');
		});
		
	});
	
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
		
		// ------------------------------ STR_ARG
		
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
		
		// ------------------------------ INT_ARG
		
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
		
		// ------------------------------ UINT_ARG
		
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
		
		// ------------------------------ BOOL_ARG
		
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
		
		// ------------------------------ OFFS_ARG
		
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
		
		// ------------------------------ DOUBLE_ARG
		
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
		
		// ------------------------------ FLOAT_ARG
		
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
		
		// ------------------------------ EXT_ARG
		
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
		
		// ------------------------------ OBJ_ARG
		
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
				expect(() => test.reqObjArg(test.retExt())).to.throw(objArgMsg);
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
				expect(test.reqObjArg({})).to.be.an('object');
			});
			it('accepts an array', () => {
				expect(test.reqObjArg([])).to.be.an('array');
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
				expect(() => test.reqObjArg(test.retExt())).to.throw(objArgMsg);
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
				expect(test.reqObjArg({})).to.be.an('object');
			});
			it('accepts an array', () => {
				expect(test.reqObjArg([])).to.be.an('array');
			});
		});
		
		// ------------------------------ ARRAY_ARG
		
		const arrayArgMsg = 'Argument 0 must be of type `Array`';
		
		describe('REQ_ARRAY_ARG', () => {
			it('exports reqArrayArg', () => {
				expect(test.reqArrayArg).to.be.a('function');
			});
			it('throws if arg was not passed', () => {
				expect(() => test.reqArrayArg()).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed undefined', () => {
				expect(() => test.reqArrayArg(undefined)).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed null', () => {
				expect(() => test.reqArrayArg(null)).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed a string', () => {
				expect(() => test.reqArrayArg('1')).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed a number', () => {
				expect(() => test.reqArrayArg(1)).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed a boolean', () => {
				expect(() => test.reqArrayArg(true)).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed a pointer', () => {
				expect(() => test.reqArrayArg(test.retExt())).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed an object', () => {
				expect(() => test.reqArrayArg({})).to.throw(arrayArgMsg);
			});
			it('accepts an array', () => {
				expect(test.reqArrayArg([])).to.be.an('array');
			});
		});
		
		describe('LET_ARRAY_ARG', () => {
			it('exports letArrayArg', () => {
				expect(test.letArrayArg).to.be.a('function');
			});
			it('throws if arg was passed a string', () => {
				expect(() => test.letArrayArg('1')).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed a number', () => {
				expect(() => test.letArrayArg(1)).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed a boolean', () => {
				expect(() => test.letArrayArg(true)).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed a pointer', () => {
				expect(() => test.reqArrayArg(test.retExt())).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed an object', () => {
				expect(() => test.reqArrayArg({})).to.throw(arrayArgMsg);
			});
			it('accepts an empty arg', () => {
				expect(test.letArrayArg()).to.be.an('array');
			});
			it('accepts undefined', () => {
				expect(test.letArrayArg(undefined)).to.be.an('array');
			});
			it('accepts null', () => {
				expect(test.letArrayArg(null)).to.be.an('array');
			});
			it('accepts an array', () => {
				expect(test.reqArrayArg([])).to.be.an('array');
			});
		});
		
		describe('USE_ARRAY_ARG', () => {
			it('exports useArrayArg', () => {
				expect(test.useArrayArg).to.be.a('function');
			});
			it('throws if arg was passed a string', () => {
				expect(() => test.useArrayArg('1')).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed a number', () => {
				expect(() => test.useArrayArg(1)).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed a boolean', () => {
				expect(() => test.useArrayArg(true)).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed a pointer', () => {
				expect(() => test.reqArrayArg(test.retExt())).to.throw(arrayArgMsg);
			});
			it('throws if arg was passed an object', () => {
				expect(() => test.reqArrayArg({})).to.throw(arrayArgMsg);
			});
			it('accepts an empty arg', () => {
				expect(test.useArrayArg()).to.be.an('array');
			});
			it('accepts undefined', () => {
				expect(test.useArrayArg(undefined)).to.be.an('array');
			});
			it('accepts null', () => {
				expect(test.useArrayArg(null)).to.be.an('array');
			});
			it('accepts an array', () => {
				expect(test.reqArrayArg([])).to.be.an('array');
			});
		});
		
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
	
});
