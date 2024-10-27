'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const { install, exists, getBin } = require('..');


const prefix = 'https://github.com/node-3d/segfault-raub/releases/download';
const tag = '2.3.0';


describe('AT / Install', async () => {
	const status = await install(`${prefix}/${tag}`);
	
	it('status is true', () => {
		assert.strictEqual(status, true);
	});
	
	it('platform folder exists', async () => {
		const isFolderCreated = await exists(`${__dirname}/../${getBin()}`);
		assert.strictEqual(isFolderCreated, true);
	});
	
	it('platform binary exists', async () => {
		const isAddonAvailable = await exists(`${__dirname}/../${getBin()}/segfault.node`);
		assert.strictEqual(isAddonAvailable, true);
	});
});
