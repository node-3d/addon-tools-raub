'use strict';

const { copy, exists, mkdir, rm } = require('./files');
const { getBin } = require('../include');


const cpbin = async (name) => {
	const srcDir = process.cwd().replace(/\\/g, '/');
	
	if (!await exists(`${srcDir}/build/Release/${name}.node`) ) {
		console.error(`Error. File "${srcDir}/build/Release/${name}.node" not found.`);
	}
	
	const binAbs = `${srcDir}/../${getBin()}`;
	
	if (!await exists(binAbs)) {
		await mkdir(binAbs);
	}
	
	const destAbs = `${binAbs}/${name}.node`;
	
	if (await exists(destAbs)) {
		await rm(destAbs);
	}
	
	await copy(`${srcDir}/build/Release/${name}.node`, destAbs);
	
	console.log(`The binary "${name}.node" was copied to "${getBin()}".`);
};

module.exports = { cpbin };
