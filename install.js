'use strict';


const https = require('https');
const http  = require('http');

const unzipper = require('unzipper');

const { bin, platform } = require('.');


const protocols = { http, https };

const onError = msg => {
	console.error(msg);
	process.exit(-1);
};


const install = (url, count = 1) => {
	
	url = url.toLowerCase();
	const proto = protocols[url.match(/^https?/)[0]];
	
	const request = https.get(url, response => {
		
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
		
		const extractor = unzipper.Extract({ path: bin });
		extractor.on('error', err => onError(err.message));
		
		response.pipe(extractor);
		
	});
	
	request.on('error', err => onError(err.message));
	
};


module.exports = folder => {
	const url = `${folder}/${platform}.zip`;
	install(url);
};
