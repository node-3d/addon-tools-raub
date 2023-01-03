'use strict';

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const utils = require('.');
const packageJson = require('../package.json');


describe('utils.js', () => {
	const methods = [
		'install', 'cpbin', 'download', 'read', 'write', 'copy', 'exists',
		'mkdir', 'stat', 'isDir', 'isFile', 'dirUp', 'ensuredir', 'copysafe',
		'readdir', 'subdirs', 'subfiles', 'traverse', 'copyall',
		'rmdir', 'rm', 'WritableBuffer',
	];
	
	methods.forEach((name) => {
		it(`exports the "${name}" function`, () => {
			expect(typeof utils[name]).toBe('function');
		});
	});
	
	describe('actionVersion', () => {
		it('logs package version', async () => {
			const { stdout } = await exec('node -e "require(\'./utils\').actionVersion()"');
			expect(stdout).toBe(`version=${packageJson.version}`);
		});
	});
});
