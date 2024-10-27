'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const utils = require('..');


describe('AT / Util Exports', () => {
	const methods = [
		'install', 'cpbin', 'download', 'read', 'write', 'copy', 'exists',
		'mkdir', 'stat', 'isDir', 'isFile', 'dirUp', 'ensuredir', 'copysafe',
		'readdir', 'subdirs', 'subfiles', 'traverse', 'copyall',
		'rmdir', 'rm', 'WritableBuffer', 'actionPack',
		'createLogger', 'setLevel', 'getLevel', 'getLoggers',
	];
	
	methods.forEach((name) => {
		it(`exports the "${name}" function`, () => {
			assert.strictEqual(typeof utils[name], 'function');
		});
	});
});
