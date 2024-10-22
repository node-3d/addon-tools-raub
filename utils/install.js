'use strict';

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const { getBin, getPlatform } = require('../include');
const { mkdir, rmdir, rm, exists } = require('./files');


const download = async (url) => {
	const { stderr } = await exec([
		'curl -sL -o',
		`${getBin()}/${getPlatform()}.gz`,
		url,
	].join(' '));
	if (stderr) {
		console.warn(stderr);
	}
};


const install = async (folderUrl) => {
	const binPath = getBin();
	const urlPath = `${folderUrl}/${getPlatform()}.gz`;
	const gzPath = `${binPath}/${getPlatform()}.gz`;
	
	await rmdir(binPath);
	await mkdir(binPath);
	
	await download(urlPath);
	
	if (!(await exists(gzPath))) {
		console.warn(`Could not download "${urlPath}" to "${gzPath}"`);
		return false;
	}
	
	const { stderr } = await exec(`tar -xzf ${gzPath} --directory ${binPath}`);
	if (stderr) {
		console.warn(stderr);
	}
	
	await rm(gzPath);
	return true;
};

module.exports = { install };
