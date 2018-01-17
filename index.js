'use strict';


const allDirs = ['bin_win32', 'bin_win64', 'bin_linux32', 'bin_linux64', 'bin_mac64'];

const platformDirs = {
	get win32()  { return process.arch === 'x64' ? 'bin_win64'   : 'bin_win32';   },
	get linux()  { return process.arch === 'x64' ? 'bin_linux64' : 'bin_linux32'; },
	get darwin() { return 'bin_mac64'; },
};

const binDir  = platformDirs[process.platform];

const remDirs = allDirs.splice(allDirs.indexOf(binDir), 1);


const paths = dir => {
	
	const binPath = `${dir}/${binDir}`;
	
	if (process.platform === 'win32') {
		process.env.path = `${process.env.path ? `${process.env.path};` : ''}${binPath}`;
	}
	
	return {
		bin     : binPath,
		rem     : remDirs.map(k => `${dir.replace(/\\/g, '/')}/${k}`).join(' '),
		include : `${dir}/include`,
	};
	
};


module.exports = {
	
	paths,
	
	root    : __dirname,
	gypi    : `${__dirname}/addon-tools.gypi`,
	include : `${__dirname}/include`,
	
	_rd  :`${__dirname}/_rd.bat`,
	_del :`${__dirname}/_del.bat`,
	
};
