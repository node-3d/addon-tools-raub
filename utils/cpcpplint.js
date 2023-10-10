'use strict';

const { copy, exists } = require('./files');


const cpcpplint = async () => {
	const cpplintDest = `${process.cwd()}/CPPLINT.cfg`.replace(/\\/g, '/');
	const cpplintSrc = `${__dirname}/CPPLINT.cfg`.replace(/\\/g, '/');
	
	if (!await exists(cpplintSrc) ) {
		console.error('Error. File "CPPLINT.cfg" not found.');
		return;
	}
	
	if (await exists(cpplintDest) ) {
		console.warn('Warning. Dest "CPPLINT.cfg" exists and will be overwritten.');
	}
	
	await copy(cpplintSrc, cpplintDest);
	
	console.log(`"CPPLINT.cfg" was copied to "${cpplintDest}".`);
};

module.exports = { cpcpplint };
