'use strict';

const fs = require('node:fs');
const https = require('node:https');
const http = require('node:http');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const { getBin, getPlatform } = require('../include');
const { mkdir, rmdir, rm } = require('./files');


const protocols = { http, https };

const onError = (msg) => {
	console.error(msg);
	process.exit(-1);
};



const installRecursive = async (url, count = 1) => {
	try {
		const proto = protocols[url.match(/^https?/)[0]];
		
		const response = await new Promise((res, rej) => {
			const request = proto.get(url, (response) => res(response));
			request.on('error', (err) => rej(err));
		});
		response.on('error', (err) => { throw err; });
		
		// Handle redirects
		if ([301, 302, 303, 307].includes(response.statusCode)) {
			if (count < 5) {
				return installRecursive(response.headers.location, count + 1);
			}
			console.log(url);
			throw new Error('Error: Too many redirects.');
		}
		
		// Handle bad status
		if (response.statusCode !== 200) {
			console.log(url);
			throw new Error(`Response status was ${response.statusCode}`);
		}
		
		await rmdir(getBin());
		await mkdir(getBin());
		
		const zipPath = `${getBin()}/${getPlatform()}.zip`;
		
		await new Promise((res, rej) => {
			const zipWriter = fs.createWriteStream(zipPath);
			zipWriter.on('error', (err) => rej(err));
			zipWriter.on('finish', () => res());
			response.pipe(zipWriter);
		});
		
		await exec(`tar -xzvf ${zipPath} --directory ${getBin()}`);
		
		await rm(zipPath);
	} catch (ex) {
		onError(ex.message);
	}
};


const install = (folder) => {
	const url = `${folder}/${getPlatform()}.zip`;
	installRecursive(url).then();
};

module.exports = { install };
