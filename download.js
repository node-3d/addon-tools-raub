'use strict';

const https = require('https');
const http  = require('http');

const WritableBuffer = require('./writable-buffer');


const protocols = { http, https };


const download = async (url, count = 1) => {
	url = url.toLowerCase();
	
	const stream = new WritableBuffer();
	const proto = protocols[url.match(/^https?/)[0]];
	
	const response = await new Promise((res, rej) => {
		const request = proto.get(url, (response) => res(response));
		request.on('error', (err) => rej(err));
	});
	
	// Handle redirects
	if ([301, 302, 303, 307].includes(response.statusCode)) {
		if (count < 5) {
			return download(response.headers.location, count + 1);
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

module.exports = (url) => download(url);
