'use strict';

const path = require('path');


const thisDir = __dirname.replace(/\\/g, '/');

const nanInclude = path.dirname(require.resolve('nan')).replace(/\\/g, '/');
const thisInclude = `${thisDir}/include`;


const names = ['win32', 'win64', 'linux32', 'linux64', 'mac64'];

const prefixName = name => `bin-${name}`;

const getPlatformDir = platform => {
	switch (platform) {
		case 'win32'  : return process.arch === 'x64' ? 'win64'   : 'win32';
		case 'linux'  : return process.arch === 'x64' ? 'linux64'   : 'linux32';
		case 'darwin' : return 'mac64';
		default       : throw new Error(`Platform "${platform}" is not supported.`);
	}
};


const currentDir = prefixName(getPlatformDir(process.platform));
const remDirs = names.map(prefixName).filter(n => n !== currentDir);

const isWindows = process.platform === 'win32';

const paths = dir => {
	
	dir = dir.replace(/\\/g, '/');
	
	const binPath = `${dir}/${currentDir}`;
	
	if (isWindows) {
		process.env.path = `${process.env.path ? `${process.env.path};` : ''}${binPath}`;
	}
	
	return {
		bin() { console.log(binPath); },
		rem() { console.log(remDirs.map(k => `${dir}/${k}`).join(' ')); },
		include() { console.log(`${dir}/include`); },
	};
	
};


module.exports = {
	
	paths,
	
	root() { return console.log(thisDir); },
	
	include() { console.log(`${nanInclude} ${thisInclude}`); },
	
	mkdir() { return isWindows ? `${thisDir}/_mkdir.bat` : 'mkdir'; },
	rm()    { return isWindows ? `${thisDir}/_rm.bat`    : 'rm'; },
	cp()    { return isWindows ? `${thisDir}/_cp.bat`    : 'cp'; },
	
};
