'use strict';

const https = require('node:https');
const http = require('node:http');

const { WritableBuffer } = require('./writable-buffer');


const protocols = { http, https };


const downloadRecursive = async (url, count = 1) => {
	const stream = new WritableBuffer();
	const proto = protocols[url.match(/^https?/i)[0].toLowerCase()];
	
	const response = await new Promise((res, rej) => {
		const request = proto.get(url, (response) => res(response));
		request.on('error', (err) => rej(err));
	});
	
	// Handle redirects
	if ([301, 302, 303, 307].includes(response.statusCode)) {
		if (count < 5) {
			return downloadRecursive(response.headers.location, count + 1);
		}
		console.log(url);
		throw new Error('Error: Too many redirects.');
	}
	
	// Handle bad status
	if (response.statusCode !== 200) {
		console.log(url);
		throw new Error(`Response status was ${response.statusCode}`);
	}
	
	response.pipe(stream);
	
	return new Promise((res, rej) => {
		response.on('error', (err) => rej(err));
		response.on('end', () => res(stream.get()));
	});
};

const download = (url) => downloadRecursive(url);

module.exports = { download };
