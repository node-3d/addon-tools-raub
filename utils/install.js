'use strict';

const https = require('node:https');
const http = require('node:http');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const { bin, platform } = require('..');
const { mkdir, rmdir, rm } = require('./files');


const protocols = { http, https };

const onError = (msg) => {
	console.error(msg);
	process.exit(-1);
};

const zipPath = `${bin}/${bin}.zip`;


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
		
		await rmdir(bin);
		await mkdir(bin);
		
		await exec(`tar -xzvf ${platform}.zip --directory ${bin}`);
		
		await rm(zipPath);
	} catch (ex) {
		onError(ex.message);
	}
};


const install = (folder) => {
	const url = `${folder}/${platform}.zip`;
	installRecursive(url).then();
};

module.exports = { install };
