declare module "addon-tools-raub/install" {
	/**
	 * Install binaries
	 * Downloads and unzips the platform specific binary for the calling package.
	 * To use it, create a new script for your package, which may as well be named
	 * **install.js**, with the following content:
	 * ```
	 * 'use strict';
	 * const install = require('addon-tools-raub/install');
	 * const prefix = 'https://github.com/USER/ADDON-NAME/releases/download';
	 * const tag = 'v1.0.0';
	 * install(`${prefix}/${tag}`);
	 * ```
	 * * `prefix` - the constant base part of the download url.
	 * * `tag` - the version-dependent part of the url.
	 * ```
	 * "scripts": {
	 *   "postinstall": "node install"
	 * },
	 * ```
	*/
	const install: (folder: string) => void;
	export = install;
}
