'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const { download } = require('..');


const url = 'https://raw.githubusercontent.com/node-3d/image-raub/refs/tags/4.3.0/test/freeimage.jpg';


describe('AT / Download', async () => {
	const data = await download(url);
	
	it('data is Buffer', () => {
		assert.strictEqual(data.constructor, Buffer);
	});
	
	it('downloaded byte count is correct', async () => {
		assert.strictEqual(data.length, 7972);
	});
});
