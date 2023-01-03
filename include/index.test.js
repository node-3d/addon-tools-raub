'use strict';

const tools = require('.');


describe('index.js', () => {
	describe(
		'Properties',
		() => ['bin', 'platform', 'include'].forEach(
			(m) => it(`#${m} is a string`, () => {
				expect(typeof tools[m]).toBe('string');
			})
		)
	);
	
	describe('#paths()', () => {
		it('is a function', () => {
			expect(typeof tools.paths).toBe('function');
		});
		
		it('returns an object', () => {
			expect(typeof tools.paths(__dirname)).toBe('object');
		});
		
		it('has "include" string', () => {
			expect(typeof tools.paths(__dirname).include).toBe('string');
		});
		
		it('has "bin" string', () => {
			expect(typeof tools.paths(__dirname).include).toBe('string');
		});
	});
});
