'use strict';

const utils = require('.');


describe('utils.js', () => {
	const methods = [
		'install', 'cpbin', 'download', 'read', 'write', 'copy', 'exists',
		'mkdir', 'stat', 'isDir', 'isFile', 'dirUp', 'ensuredir', 'copysafe',
		'readdir', 'subdirs', 'subfiles', 'traverse', 'copyall',
		'rmdir', 'rm', 'WritableBuffer',
	];
	
	methods.forEach((name) => {
		it('is a function', () => {
			expect(typeof utils[name]).toBe('function');
		});
	});
});
