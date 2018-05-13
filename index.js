'use strict';

const path = require('path');


const rootPath = __dirname.replace(/\\/g, '/');

const nanInclude = path.dirname(require.resolve('nan')).replace(/\\/g, '/');
const thisInclude = `${rootPath}/include`;


const isWindows = process.platform === 'win32';

const names = ['win32', 'win64', 'linux32', 'linux64', 'mac64'];

const prefixName = name => `bin-${name}`;

const getPlatformDir = platform => {
	switch (platform) {
		case 'win32'  : return process.arch === 'x64' ? 'win64' : 'win32';
		case 'linux'  : return process.arch === 'x64' ? 'linux64' : 'linux32';
		case 'darwin' : return 'mac64';
		default       : throw new Error(`Platform "${platform}" is not supported.`);
	}
};


const currentDir = prefixName(getPlatformDir(process.platform));
const remDirs = names.map(prefixName).filter(n => n !== currentDir);


const paths = dir => {
	
	dir = dir.replace(/\\/g, '/');
	
	const binPath = `${dir}/${currentDir}`;
	
	if (isWindows) {
		process.env.path = `${binPath};${process.env.path ? `${process.env.path}` : ''}`;
	}
	
	const remPath = remDirs.map(k => `${dir}/${k}`).join(' ');
	const includePath = `${dir}/include`;
	
	return {
		
		binPath,
		remPath,
		includePath,
		
		bin() { console.log(binPath); },
		rem() { console.log(remPath); },
		include() { console.log(includePath); },
		
	};
	
};


const includePath = `${nanInclude} ${thisInclude}`;

const mkdirPath = isWindows ? `${rootPath}/_mkdir.bat` : 'mkdir';
const rmPath    = isWindows ? `${rootPath}/_rm.bat` : 'rm';
const cpPath    = isWindows ? `${rootPath}/_cp.bat` : 'cp';


module.exports = {
	
	paths,
	
	rootPath,
	includePath,
	mkdirPath,
	rmPath,
	cpPath,
	
	root() { return console.log(rootPath); },
	include() { console.log(includePath); },
	
	mkdir() { return console.log(mkdirPath); },
	rm() { return console.log(rmPath); },
	cp() { return console.log(cpPath); },
	
};
