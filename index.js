'use strict';


const thisDir = __dirname.replace(/\\/g, '/');

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


const paths = dir => {
	
	dir = dir.replace(/\\/g, '/');
	
	const binPath = `${dir}/${currentDir}`;
	
	if (process.platform === 'win32') {
		process.env.path = `${process.env.path ? `${process.env.path};` : ''}${binPath}`;
	}
	
	return {
		bin     : binPath,
		rem     : remDirs.map(k => `${dir}/${k}`).join(' '),
		include : `${dir}/include`,
	};
	
};


module.exports = {
	
	paths,
	
	root    : thisDir,
	include : `${thisDir}/include`,
	
	printNan() { require('nan'); },
	
	mkdir : process.platform === 'win32' ? `"${thisDir}/_mkdir.bat"` : 'mkdir',
	rm    : process.platform === 'win32' ? `"${thisDir}/_rm.bat"` : 'rm',
	cp    : process.platform === 'win32' ? `"${thisDir}/_cp.bat"` : 'cp',
	
};
