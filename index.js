'use strict';


const thisDir = __dirname.replace(/\\/g, '/');

const allDirs = ['bin_win32', 'bin_win64', 'bin_linux32', 'bin_linux64', 'bin_mac64'];

const platformDirs = {
	get win32()  { return process.arch === 'x64' ? 'bin_win64'   : 'bin_win32';   },
	get linux()  { return process.arch === 'x64' ? 'bin_linux64' : 'bin_linux32'; },
	get darwin() { return 'bin_mac64'; },
};

const binDir  = platformDirs[process.platform];

const remDirs = allDirs.splice(allDirs.indexOf(binDir), 1);


const paths = dir => {
	
	dir = dir.replace(/\\/g, '/');
	
	const binPath = `${dir}/${binDir}`;
	
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
	
	_rd  :`${thisDir}/_rd.bat`,
	_del :`${thisDir}/_del.bat`,
	
};
