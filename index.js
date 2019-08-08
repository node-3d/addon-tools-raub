'use strict';

const platformNames = {
	win32  : 'windows',
	linux  : 'linux',
	darwin : 'osx',
};

const platformName = platformNames[process.platform];
const isWindows = process.platform === 'win32';

if ( ! platformName ) {
	console.log(`Error: UNKNOWN PLATFORM "${process.platform}"`);
}

const rootPath = __dirname.replace(/\\/g, '/');


const napiInclude = require('node-addon-api').include.replace(/\\/g, '/');
const thisInclude = `${rootPath}/include`;
const includePath = `${napiInclude} ${thisInclude}`;


const paths = dir => {
	
	dir = dir.replace(/\\/g, '/');
	
	const bin     = `${dir}/bin-${platformName}`;
	const include = `${dir}/include`;
	
	if (isWindows) {
		process.env.path = `${bin};${process.env.path ? `${process.env.path}` : ''}`;
	}
	
	return { bin, include };
	
};


const mkdirPath = isWindows ? `${rootPath}/bat/mkdir.bat` : 'mkdir';
const rmPath    = isWindows ? `${rootPath}/bat/rm.bat` : 'rm';
const cpPath    = isWindows ? `${rootPath}/bat/cp.bat` : 'cp';


module.exports = {
	
	paths,
	
	bin      : `bin-${platformName}`,
	platform : platformName,
	include  : includePath,
	
	mkdir : mkdirPath,
	rm    : rmPath,
	cp    : cpPath,
	
};
