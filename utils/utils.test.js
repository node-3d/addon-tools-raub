'use strict';

const utils = require('.');


describe('AT / utils', () => {
	const methods = [
		'install', 'cpbin', 'download', 'read', 'write', 'copy', 'exists',
		'mkdir', 'stat', 'isDir', 'isFile', 'dirUp', 'ensuredir', 'copysafe',
		'readdir', 'subdirs', 'subfiles', 'traverse', 'copyall',
		'rmdir', 'rm', 'WritableBuffer', 'actionPack',
	];
	
	methods.forEach((name) => {
		it(`exports the "${name}" function`, () => {
			expect(typeof utils[name]).toBe('function');
		});
	});
});
