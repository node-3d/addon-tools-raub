'use strict';

const tools = require('.');


describe('AT / include', () => {
	const stringMethods = ['getBin', 'getPlatform', 'getInclude'];
	
	stringMethods.forEach((name) => {
		describe(`#${name}()`, () => {
			it('is a function', () => {
				expect(typeof tools[name]).toBe('function');
			});
			
			it('returns an object', () => {
				expect(typeof tools[name]()).toBe('string');
			});
		});
	});
	
	describe('#getPaths()', () => {
		it('is a function', () => {
			expect(typeof tools.getPaths).toBe('function');
		});
		
		it('returns an object', () => {
			expect(typeof tools.getPaths(__dirname)).toBe('object');
		});
		
		it('has "include" string', () => {
			expect(typeof tools.getPaths(__dirname).include).toBe('string');
		});
		
		it('has "bin" string', () => {
			expect(typeof tools.getPaths(__dirname).include).toBe('string');
		});
	});
});
