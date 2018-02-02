'use strict';

const path = require('path');
const fs = require('fs');

const { expect } = require('chai');
const { stub, spy } = require('sinon');

const tools = require('addon-tools-raub');


const toolsDir = path.dirname(require.resolve('addon-tools-raub')).replace(/\\/g, '/')
const allMethods = ['paths', 'root', 'include', 'mkdir', 'rm', 'cp'];
const ownMethods = allMethods.slice(1);
const cmdMethods = allMethods.slice(3);
const pathsMethods = ['bin', 'rem', 'include'];


describe('Tools', () => {
	
	let log;
	let stubbed;
	beforeEach(() => {
		log = spy();
		stubbed = stub(console, 'log').callsFake(log)
	});
	afterEach(() => stubbed.restore());
	
	
	describe('Own Methods', () => {
		
		allMethods.forEach(
			m => it(`#${m}() is available`, () => {
				expect(tools).to.respondTo(m);
			})
		);
		
		
		ownMethods.forEach(
			m => it(`#${m}() writes stdout`, () => {
				tools[m]();
				expect(log.getCall(0), 'called').to.exist;
				expect(log.getCall(0).args[0], 'has args').to.exist;
				expect(log.getCall(0).args[0], 'writes string').to.be.a('string');
			})
		);
		
		
		it(`#root() is correct`, () => {
			tools.root();
			expect(log.getCall(0).args[0]).to.equal(toolsDir);
		});
		
		
		it(`#include() is correct`, async () => {
			
			tools.include();
			const dirs = log.getCall(0).args[0].split(' ');
			
			const stats = await Promise.all(dirs.map(dir => new Promise(
				(res, rej) => fs.stat(
					dir,
					(err, stat) => err ? res(false) : res(stat.isDirectory())
				)
			)));
			
			dirs.forEach((dir, i) => expect(stats[i], dir).to.be.true);
			
		});
		
	});
	
	
	describe('Paths', () => {
		
		it(`#paths() returns an object`, () => {
			expect(tools.paths(__dirname)).to.be.an('object');
		});
		
		
		pathsMethods.forEach(
			m => it(`#${m}() is available`, () => {
				const paths = tools.paths(__dirname);
				expect(paths).to.respondTo(m);
			})
		);
		
		
		pathsMethods.forEach(
			m => it(`#${m}() writes stdout`, () => {
				const paths = tools.paths(__dirname);
				paths[m]();
				expect(log.getCall(0), 'called').to.exist;
				expect(log.getCall(0).args[0], 'has args').to.exist;
				expect(log.getCall(0).args[0], 'writes string').to.be.a('string');
			})
		);
		
	});
	
});
