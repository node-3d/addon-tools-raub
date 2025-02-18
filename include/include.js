'use strict';

const path = require('node:path');


const nameWindows = 'windows';
const platformAndArch = `${process.platform}-${process.arch}`;

const platformNames = {
	'win32-x64': nameWindows,
	'linux-x64': 'linux',
	'darwin-x64': 'osx',
	'linux-arm64': 'aarch64',
};

const platformName = platformNames[platformAndArch] || platformAndArch;
const isWindows = platformName === nameWindows;


const getPaths = (dir) => {
	dir = dir.replace(/\\/g, '/');
	
	const bin = `${dir}/bin-${platformName}`;
	const include = `${dir}/include`;
	
	if (isWindows) {
		process.env.path = `${bin};${process.env.path ? `${process.env.path}` : ''}`;
	}
	
	return { bin, include };
};

const getBin = () => `bin-${platformName}`;

const getPlatform = () => platformName;

const getInclude = () => {
	let napi = null;
	try {
		napi = require('node-addon-api');
	} catch (_ex) {
		// do nothing
	}
	
	const rootPath = path.resolve(`${__dirname}/..`).replace(/\\/g, '/');
	const napiInclude = napi ? napi.include_dir.replace(/\\/g, '/') : '';
	const thisInclude = `${rootPath}/include`;
	const includePath = `${napiInclude} ${thisInclude}`;
	
	return includePath;
};


module.exports = {
	getPaths,
	getBin,
	getPlatform,
	getInclude,
};
