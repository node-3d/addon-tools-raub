'use strict';

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const { getPlatform, getBin } = require('../include');


const actionZip = async () => {
	try {
		await exec(`cd ${getBin()} && tar -acf ../${getPlatform()}.zip *`);
		console.log(`zip=${getPlatform()}.zip`);
	} catch (error) {
		console.error(error);
		process.exit(-1);
	}
};


module.exports = { actionZip };
