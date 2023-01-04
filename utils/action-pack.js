'use strict';

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const { getPlatform, getBin } = require('../include');


const actionPack = async () => {
	try {
		await exec(`cd ${getBin()} && tar -czf ../${getPlatform()}.gz *`);
		console.log(`pack=${getPlatform()}.gz`);
	} catch (error) {
		console.error(error);
		process.exit(-1);
	}
};


module.exports = { actionPack };
