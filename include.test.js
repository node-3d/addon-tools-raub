'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const tools = require('.');


describe('AT / include', () => {
	const stringMethods = ['getBin', 'getPlatform', 'getInclude'];
	
	stringMethods.forEach((name) => {
		describe(`#${name}()`, () => {
			it('is a function', () => {
				assert.strictEqual(typeof tools[name], 'function');
			});
			
			it('returns an object', () => {
				assert.strictEqual(typeof tools[name](), 'string');
			});
		});
	});
	
	describe('#getPaths()', () => {
		it('is a function', () => {
			assert.strictEqual(typeof tools.getPaths, 'function');
		});
		
		it('returns an object', () => {
			assert.strictEqual(typeof tools.getPaths(__dirname), 'object');
		});
		
		it('has "include" string', () => {
			assert.strictEqual(typeof tools.getPaths(__dirname).include, 'string');
		});
		
		it('has "bin" string', () => {
			assert.strictEqual(typeof tools.getPaths(__dirname).include, 'string');
		});
	});
});
