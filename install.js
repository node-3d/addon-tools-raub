'use strict';


const https = require('https');
const http  = require('http');
const fs  = require('fs');

const AdmZip = require('adm-zip');

const { bin, platform } = require('.');


const protocols = { http, https };

const onError = msg => {
	console.error(msg);
	process.exit(-1);
};

const zipPath = `${bin}/${bin}.zip`;


const install = (url, count = 1) => {
	
	const proto = protocols[url.match(/^https?/)[0]];
	
	const request = proto.get(url, response => {
		
		// Handle redirects
		if ([301, 302, 303, 307].includes(response.statusCode)) {
			if (count < 5) {
				return install(response.headers.location, count + 1);
			}
			console.log(url);
			return onError('Error: Too many redirects.');
		}
		
		// Handle bad status
		if (response.statusCode !== 200) {
			console.log(url);
			return onError(`Response status was ${response.statusCode}`);
		}
		
		response.on('error', err => onError(err.message));
		
		fs.mkdirSync(bin);
		const zipWriter = fs.createWriteStream(zipPath);
		zipWriter.on('error', err => onError(err.message));
		response.pipe(zipWriter);
		
		zipWriter.on('finish', () => {
			const zip = new AdmZip(zipPath);
			zip.extractAllTo(bin, true);
			fs.unlinkSync(zipPath);
		});
		
	});
	
	request.on('error', err => onError(err.message));
	
};


module.exports = folder => {
	const url = `${folder}/${platform}.zip`;
	install(url);
};
