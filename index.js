'use strict';

let napi = null;
try {
	napi = require('node-addon-api');
} catch (ex) {
	// do nothing
}

const nameWindows = 'windows';
const nameArch = `${process.platform}-${process.arch}`;

const platformNames = {
	win32: nameWindows,
	linux: 'linux',
	darwin: 'osx',
	'linux-arm64': 'aarch64',
};

const platformName = (
	platformNames[process.platform] ||
	platformNames[nameArch] ||
	nameArch
);

const isWindows = platformName === nameWindows;

const rootPath = __dirname.replace(/\\/g, '/');


const napiInclude = napi ? napi.include_dir.replace(/\\/g, '/') : '';
const thisInclude = `${rootPath}/include`;
const includePath = `${napiInclude} ${thisInclude}`;


const paths = (dir) => {
	dir = dir.replace(/\\/g, '/');
	
	const bin = `${dir}/bin-${platformName}`;
	const include = `${dir}/include`;
	
	if (isWindows) {
		process.env.path = `${bin};${process.env.path ? `${process.env.path}` : ''}`;
	}
	
	return { bin, include };
};


module.exports = {
	paths,
	bin: `bin-${platformName}`,
	platform: platformName,
	include: includePath,
};
