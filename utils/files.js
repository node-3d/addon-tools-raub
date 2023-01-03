'use strict';

const fs = require('node:fs');


// (async) Reads a whole file to string, NOT A Buffer
const read = (name) => new Promise(
	(res, rej) => fs.readFile(
		name,
		(err, data) => (err ? rej(err) : res(data.toString()))
	)
);


// (async) Write a file
const write = (name, text) => new Promise(
	(res, rej) => fs.writeFile(name, text, (err) => (err ? rej(err) : res()))
);


// (async) Copy a file
const copy = async (src, dest) => {
	try {
		await new Promise(
			(res, rej) => fs.copyFile(src, dest, (err) => (err ? rej(err) : res()))
		);
	} catch (e) {
		if (e.code !== 'EBUSY') {
			console.warn('WARNING\n', e);
		}
	}
};


// (async) Check if a file/folder exists
const exists = (name) => new Promise(
	(res) => fs.access(
		name,
		fs.constants.F_OK,
		(err) => res(err ? false : true)
	)
);


// (async) Create an empty folder
const mkdir = async (name) => {
	if (await exists(name)) {
		return;
	}
	return new Promise(
		(res, rej) => fs.mkdir(name, (err) => (err ? rej(err) : res()))
	);
};


// (async) Get status on a file
const stat = (name) => new Promise(
	(res, rej) => fs.stat(name, (err, stats) => (err ? rej(err) : res(stats)))
);


// (async) Check if the path is a folder
const isDir = async (name) => (await stat(name)).isDirectory();


// (async) Check if the path is a file
const isFile = async (name) => (await stat(name)).isFile();


// Cut the path one folder up
const dirUp = (dir) => dir.replace(/\\/g, '/').split('/').slice(0, -1).join('/');


// (async) Like `mkdir -p`, makes sure a directory exists
const ensuredir = async (dir) => {
	if (await exists(dir) && await isDir(dir)) {
		return;
	}
	await ensuredir(dirUp(dir));
	await mkdir(dir);
};


// (async) Copy a file, `dest` folder is created if needed
const copysafe = async (src, dest) => {
	await ensuredir(dirUp(dest));
	await copy(src, dest);
};


// (async) Get file/folder names of the 1st level
const readdir = (name) => new Promise(
	(res, rej) => fs.readdir(
		name,
		(err, dirents) => (err ? rej(err) : res(dirents))
	)
);


// (async) Get folder paths (concatenated with input) of the 1st level
const subdirs = async (name) => {
	const all = await readdir(name);
	const mapped = await Promise.all(all.map((d) => isDir(`${name}/${d}`)));
	return all.filter((_, i) => mapped[i]);
};


// (async) Get file paths (concatenated with input) of the 1st level
const subfiles = async (name) => {
	const all = await readdir(name);
	const mapped = await Promise.all(all.map((d) => isFile(`${name}/${d}`)));
	return all.filter((_, i) => mapped[i]).map((f) => `${name}/${f}`);
};


// (async) Get all nested files recursively
// Folder paths are omitted by default
// Order is: shallow-to-deep, each subdirectory lists dirs-then-files.
const traverse = async (name, showDirs = false) => {
	const dirs = [];
	const stack = [name];
	while (stack.length) {
		const dir = stack.pop();
		dirs.push(dir);
		(await subdirs(dir)).forEach((d) => stack.push(`${dir}/${d}`));
	}
	return (showDirs ? dirs : []).concat(
		...(await Promise.all(dirs.map(subfiles)))
	);
};


// (async) Copy a folder with all the contained files
const copyall = async (src, dest) => {
	const files = (await traverse(src, true)).reverse();
	while (files.length) {
		const target = files.pop();
		const dir = await isDir(target);
		if (dir) {
			await mkdir(target.replace(src, dest));
		} else {
			await copy(target, target.replace(src, dest));
		}
	}
};


// (async) Like `rm -rf`, removes everything recursively
const rmdir = async (name) => {
	if (!await exists(name)) {
		return;
	}
	const paths = await traverse(name, true);
	while (paths.length) {
		const target = paths.pop();
		const dir = await isDir(target);
		await new Promise(
			(res, rej) => fs[dir ? 'rmdir' : 'unlink'](
				target,
				(err) => (err ? rej(err) : res())
			)
		);
	}
};


// (async) Remove a file. Must be a file, not a folder. Just `fs.unlink`.
const rm = async (name) => {
	if (!await exists(name)) {
		return;
	}
	await new Promise(
		(res, rej) => fs.unlink(name, (err) => (err ? rej(err) : res()))
	);
};

module.exports = {
	read,
	write,
	copy,
	exists,
	mkdir,
	stat,
	isDir,
	isFile,
	dirUp,
	ensuredir,
	copysafe,
	readdir,
	subdirs,
	subfiles,
	traverse,
	copyall,
	rmdir,
	rm,
};
