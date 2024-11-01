'use strict';

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const { getBin, getPlatform } = require('../include');
const { mkdir, rmdir, rm, exists } = require('./files');
const { getLogger } = require('./logger');

const logger = getLogger('addon-tools');

const download = async (url) => {
	const { stderr } = await exec([
		'curl -sL -o',
		`${getBin()}/${getPlatform()}.gz`,
		url,
	].join(' '));
	if (stderr) {
		logger.warn(stderr);
	}
};


const unpack = async (gzPath, binPath) => {
	const { stderr } = await exec(`tar -xzf ${gzPath} --directory ${binPath}`);
	if (stderr) {
		logger.warn(stderr);
	}
};


const install = async (folderUrl) => {
	const binPath = getBin();
	const urlPath = `${folderUrl}/${getPlatform()}.gz`;
	const gzPath = `${binPath}/${getPlatform()}.gz`;
	
	await rmdir(binPath);
	await mkdir(binPath);
	
	try {
		await download(urlPath);
		
		if (!(await exists(gzPath))) {
			logger.warn(`Could not download "${urlPath}" to "${gzPath}"`);
			return false;
		}
		
		await unpack(gzPath, binPath);
	} catch (error) {
		logger.warn(error);
		return false;
	}
	await rm(gzPath);
	return true;
};

module.exports = { install };
