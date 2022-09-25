'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');

let AdmZip = null;
try {
	AdmZip = require('adm-zip');
} catch (ex) {
	console.error('The `install` script requires `adm-zip` module to be installed.');
	process.exit(1);
}

const { bin, platform } = require('.');
const { mkdir, rm } = require('./utils');


const protocols = { http, https };

const onError = msg => {
	console.error(msg);
	process.exit(-1);
};

const zipPath = `${bin}/${bin}.zip`;


const install = async (url, count = 1) => {
	try {
		const proto = protocols[url.match(/^https?/)[0]];
		
		const response = await new Promise((res, rej) => {
			const request = proto.get(url, response => res(response));
			request.on('error', err => rej(err));
		});
		response.on('error', err => { throw err; });
		
		// Handle redirects
		if ([301, 302, 303, 307].includes(response.statusCode)) {
			if (count < 5) {
				return install(response.headers.location, count + 1);
			}
			console.log(url);
			throw new Error('Error: Too many redirects.');
		}
		
		// Handle bad status
		if (response.statusCode !== 200) {
			console.log(url);
			throw new Error(`Response status was ${response.statusCode}`);
		}
		
		await mkdir(bin);
		
		await new Promise((res, rej) => {
			const zipWriter = fs.createWriteStream(zipPath);
			zipWriter.on('error', err => rej(err));
			zipWriter.on('finish', () => res());
			response.pipe(zipWriter);
		});
		
		const zip = new AdmZip(zipPath);
		zip.extractAllTo(bin, true);
		
		await rm(zipPath);
		
	} catch (ex) {
		onError(ex.message);
	}
};


module.exports = folder => {
	const url = `${folder}/${platform}.zip`;
	install(url).then();
};
