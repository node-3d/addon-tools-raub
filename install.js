'use strict';


const https = require('https');
const unzipper = require('unzipper');

const unzipper = require('unzipper');

const REPO = process.argv[1];


const download = (url, count = 1) => {
	const sendReq = https.get(url, response => {
		if ([301, 302, 303, 307].includes(response.statusCode)) {
			if (count < 5) {
				return download(response.headers.location, count + 1);
			}
			console.error('Error: Too many redirects.');
			process.exit(-1);
			return;
		}
		if (response.statusCode !== 200) {
			console.log('Response status was ' + response.statusCode);
			process.exit(-1);
			return;
		}
		response.pipe(unzipper.Extract({ path: 'bin' }));
	});
	
	sendReq.on('error', err => {
		console.log(err.message);
		process.exit(-1);
	});
};

download('https://github.com/raub/test-download/releases/download/v1.0.0/win.zip');
