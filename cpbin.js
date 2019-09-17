'use strict';

const fs = require('fs');

const { bin } = require('.');


const copy = (src, dest) => new Promise(
	(res, rej) => fs.copyFile(src, dest, err => (err ? rej(err) : res()))
);


const exists = name => new Promise(
	res => fs.access(
		name,
		fs.constants.F_OK,
		err => res(err ? false : true)
	)
);


const mkdir = async name => {
	if (await exists(name)) {
		return;
	}
	return new Promise(
		(res, rej) => fs.mkdir(name, err => (err ? rej(err) : res()))
	);
};


const rm = async name => {
	if ( ! await exists(name) ) {
		return;
	}
	await new Promise(
		(res, rej) => fs.unlink(name, err => (err ? rej(err) : res()))
	);
};


module.exports = async name => {
	
	const srcDir = process.cwd().replace(/\\/g, '/');
	
	if ( ! await exists(`${srcDir}/build/Release/${name}.node`) ) {
		console.error(`Error. File "${srcDir}/build/Release/${name}.node" not found.`);
	}
	
	const binAbs = `${srcDir}/../${bin}`;
	
	if ( ! await exists(binAbs) ) {
		await mkdir(binAbs);
	}
	
	const destAbs = `${binAbs}/${name}.node`;
	
	if (await exists(destAbs)) {
		await rm(destAbs);
	}
	
	await copy(`${srcDir}/build/Release/${name}.node`, destAbs);
	
	console.log(`The binary "${name}.node" was copied to "${bin}".`);
	
};
