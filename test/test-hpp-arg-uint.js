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
		expect(() => test.letArrayArg(test.retExt())).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.letArrayArg({})).to.throw(arrayArgMsg);
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
		expect(test.letArrayArg([])).to.be.an('array');
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
		expect(() => test.useArrayArg(test.retExt())).to.throw(arrayArgMsg);
	});
	it('throws if arg was passed an object', () => {
		expect(() => test.useArrayArg({})).to.throw(arrayArgMsg);
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
		expect(test.useArrayArg([])).to.be.an('array');
	});
});
