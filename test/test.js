'use strict';

const { expect } = require('chai');
const { stub, spy } = require('sinon');

const tools = require('..');


const PROPS = ['bin', 'platform', 'include', 'mkdir', 'rm', 'cp'];


describe('Tools', () => {
	
	let log;
	let stubbed;
	beforeEach(() => {
		log = spy();
		stubbed = stub(console, 'log').callsFake(log);
	});
	afterEach(() => stubbed.restore());
	
	
	describe('Properties', () => {
		
		PROPS.forEach(
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
