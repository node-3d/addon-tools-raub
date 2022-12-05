'use strict';

const { copy, exists, mkdir, rm } = require('./utils');
const { bin } = require('.');


module.exports = async (name) => {
	const srcDir = process.cwd().replace(/\\/g, '/');
	
	if (!await exists(`${srcDir}/build/Release/${name}.node`) ) {
		console.error(`Error. File "${srcDir}/build/Release/${name}.node" not found.`);
	}
	
	const binAbs = `${srcDir}/../${bin}`;
	
	if (!await exists(binAbs)) {
		await mkdir(binAbs);
	}
	
	const destAbs = `${binAbs}/${name}.node`;
	
	if (await exists(destAbs)) {
		await rm(destAbs);
	}
	
	await copy(`${srcDir}/build/Release/${name}.node`, destAbs);
	
	console.log(`The binary "${name}.node" was copied to "${bin}".`);
};
