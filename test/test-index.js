'use strict';

const { expect } = require('chai');


describe('index.js', () => {
	
	const tools = require('..');
	
	describe(
		'Properties',
		() => ['bin', 'platform', 'include'].forEach(
			m => it(`#${m} is a string`, () => {
				expect(tools[m]).to.be.a('string');
			})
		)
	);
	
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
