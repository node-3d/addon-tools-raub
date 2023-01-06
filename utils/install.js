'use strict';

const fs = require('node:fs');
const https = require('node:https');
const http = require('node:http');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const { getBin, getPlatform } = require('../include');
const { mkdir, rmdir, rm } = require('./files');


const protocols = { http, https };


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
			console.warn(url);
			throw new Error('Error: Too many redirects.');
		}
		
		// Handle bad status
		if (response.statusCode !== 200) {
			console.warn(url);
			throw new Error(`Response status was ${response.statusCode}`);
		}
		
		await rmdir(getBin());
		await mkdir(getBin());
		
		const packPath = `${getBin()}/${getPlatform()}.gz`;
		
		await new Promise((res, rej) => {
			const packWriter = fs.createWriteStream(packPath);
			packWriter.on('error', (err) => rej(err));
			packWriter.on('finish', () => res());
			response.pipe(packWriter);
		});
		
		const { stderr } = await exec(`tar -xzf ${packPath} --directory ${getBin()}`);
		if (stderr) {
			console.warn(stderr);
		}
		
		await rm(packPath);
		return true;
	} catch (error) {
		console.error(error.message);
		return false;
	}
};


const install = async (folder) => {
	const url = `${folder}/${getPlatform()}.gz`;
	return installRecursive(url);
};

module.exports = { install };
