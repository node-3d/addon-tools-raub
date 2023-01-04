declare module "addon-tools-raub" {
	/**
	* Get the internal paths for an addon
	* Returns a set of platform dependent paths depending on the input dir
	*/
	export const getPaths: (dir: string) => Readonly<{
		/**
		* Path to binaries
		* Platform binary directory absolute path for this `dir`
		*/
		bin: string;
		/**
		* Path to include
		* Include directory for this `dir`
		*/
		include: string;
	}>;
	
	type TPlatformName = 'windows' | 'linux' | 'osx' | 'aarch64';
	type TPlatformDir = `bin-${TPlatformName}`;
	
	/**
	* Get the platform-specific binary directory name
	*/
	export const getBin: () => TPlatformDir;
	
	/**
	* Get the platform identifier
	*/
	export const getPlatform: () => TPlatformName;
	
	/**
	* Get the include directories for **binding.gyp**
	* Both 'addon-tools-raub' and 'node-addon-api' include paths.
	* In binding.gyp: `'<!@(node -p "require(\'addon-tools-raub\').getInclude()")'`
	*/
	export const getInclude: () => string;
	
	/**
	* Install binaries
	* Downloads and unzips the platform specific binary for the calling package.
	* To use it, create a new script for your package, which may as well be named
	* **install.js**, with the following content:
	*
	* ```
	* 'use strict';
	* const { install } = require('addon-tools-raub');
	* const prefix = 'https://github.com/USER/ADDON-NAME/releases/download';
	* const tag = '1.0.0';
	* install(`${prefix}/${tag}`);
	* ```
	*
	* * `prefix` - the constant base part of the download url.
	* * `tag` - the version-dependent part of the url.
	*
	* ```
	* "scripts": {
	*   "postinstall": "node install"
	* },
	* ```
	*/
	export const install: (folder: string) => void;
	
	
	/**
	* Copy binary
	* Copies the addon binary from `src/build/Release` to the platform-specific folder.
	*
	* ```
	* "scripts": {
	*   * "build": "node-gyp rebuild && node -e \"require('addon-tools-raub').cpbin('ADDON')\""
	* },
	* ```
	*
	* Here ADDON should be replaced with the name of your addon, without `.node` extension.
	*/
	export const cpbin: (name: string) => Promise<void>;
	
	
	/**
	* Package version for GitHub Actions
	* Example of `actionZip` usage in **Github Actions**:
	*
	* ```
	* - name: Zip Files
	* id: zip-files
	* run: node -p "require('addon-tools-raub').actionZip()" >> $GITHUB_OUTPUT
	* - name: Store Binaries
	* uses: softprops/action-gh-release@v1
	* with:
	* 	files: ${{ steps.zip-files.outputs.zip }}
	* ```
	*/
	export const actionZip: () => void;
	
	
	/**
	* Download to memory
	* Accepts an **URL**, and returns an in-memory file Buffer,
	* when the file is loaded. Use for small files, as the whole
	* file will be loaded into memory at once.
	*
	* ```
	* download(srcUrl).then(data => useData(data), err => emit('error', err));
	* ```
	* or
	* ```
	* const data = await download(srcUrl);
	* useData(data);
	* ```
	*/
	export const download: (url: string) => Promise<Buffer>;
	
	/**
	* (async) Read a file
	* Reads a whole file to string, NOT A Buffer
	*/
	
	
	/**
	* WritableBuffer
	* A [Writable](https://nodejs.org/api/stream.html#stream_writable_streams)
	* stream buffer, that is stored in-memory and can be fully
	* obtained when writing was finished. It is equivalent to stream-writing
	* a temporary file and then reading it into a `Buffer`.
	*/
	export class WritableBuffer extends Writable {
		constructor();
		/**
		* Get the downloaded data
		* Use `stream.get()` to obtain the data when writing was finished
		*/
		get(): Buffer;
	}
	
	
	export const read: (name: string) => Promise<string>;
	
	/**
	* (async) Write a file
	*/
	export const write: (name: string, text: string) => Promise<void>;
	
	/**
	* (async) Copy a file
	*/
	export const copy: (src: string, dest: string) => Promise<void>;
	
	/**
	* (async) Check if a file/folder exists
	*/
	export const exists: (name: string) => Promise<boolean>;
	
	/**
	* (async) Create an empty folder
	*/
	export const mkdir: (name: string) => Promise<void>;
	
	/**
	* (async) Get status on a file
	*/
	export const stat: (name: string) => Promise<Stats>;
	
	/**
	* (async) Check if the path is a folder
	*/
	export const isDir: (name: string) => Promise<boolean>;
	
	/**
	* (async) Check if the path is a file
	*/
	export const isFile: (name: string) => Promise<boolean>;
	
	/**
	* Cut the path one folder up
	*/
	export const dirUp: (dir: string) => string;
	
	/**
	* (async) Create a directory
	* Like `mkdir -p`, makes sure a directory exists
	*/
	export const ensuredir: (dir: string) => Promise<void>;
	
	/**
	* (async) Copy a file
	* Copy a file, `dest` folder is created if needed
	*/
	export const copysafe: (src: string, dest: string) => Promise<void>;
	
	/**
	* (async) Read a directory
	* Get file/folder names of the 1st level
	*/
	export const readdir: (src: string, dest: string) => Promise<ReadonlyArray<string>>;
	
	/**
	* (async) List subdirectories
	* Get folder paths (concatenated with input) of the 1st level
	*/
	export const subdirs: (name: string) => Promise<ReadonlyArray<string>>;
	
	/**
	* (async) List nested files
	* Get file paths (concatenated with input) of the 1st level
	*/
	export const subfiles: (name: string) => Promise<ReadonlyArray<string>>;
	
	/**
	* (async) Get all nested files recursively
	* Folder paths are omitted by default.
	* Order is: shallow-to-deep, each subdirectory lists dirs-then-files.
	*/
	export const traverse: (name: string, showDirs?: boolean) => Promise<ReadonlyArray<string>>;
	
	/**
	* (async) Copy a directory
	* Copy a folder with all the contained files
	*/
	export const copyall: (src: string, dest: string) => Promise<void>;
	
	/**
	* (async) Remove a directory
	* Like `rm -rf`, removes everything recursively
	*/
	export const rmdir: (name: string) => Promise<void>;
	
	/**
	* (async) Remove a file
	* Must be a file, not a folder. Just `fs.unlink`.
	*/
	export const rm: (name: string) => Promise<void>;
}
