'use strict';

const path = require('path');

const platformNames = {
	win32  : 'win',
	linux  : 'lin',
	darwin : 'osx',
};

const platformName = platformNames[process.platform];

if ( ! platformName ) {
	console.log(`Error: UNKNOWN PLATFORM "${process.platform}"`);
}

const isWindows = process.platform === 'win32';

const rootPath = __dirname.replace(/\\/g, '/');

const napiInclude = require('node-addon-api').include.replace(/\\/g, '/');
const thisInclude = `${rootPath}/include`;

const paths = dir => {
	
	dir = dir.replace(/\\/g, '/');
	
	const binPath = `${dir}/${platformName}`;
	
	if (isWindows) {
		process.env.path = `${binPath};${process.env.path ? `${process.env.path}` : ''}`;
	}
	
	const includePath = `${dir}/include`;
	
	return { bin, include };
	
};


const includePath = `${napiInclude} ${thisInclude}`;
const binPath = currentDir;

const mkdirPath = isWindows ? `${rootPath}/bat/mkdir.bat` : 'mkdir';
const rmPath    = isWindows ? `${rootPath}/bat/rm.bat` : 'rm';
const cpPath    = isWindows ? `${rootPath}/bat/cp.bat` : 'cp';


module.exports = {
	
	paths,
	
	platform: platformName,
	include: includePath,
	
	mkdir: mkdirPath,
	rm: rmPath,
	cp: cpPath,
	
};
