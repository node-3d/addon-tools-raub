import type { Stats } from 'fs';

declare module "addon-tools-raub/utils" {
	/**
	 * (async) Read a file
	 * Reads a whole file to string, NOT A Buffer
	*/
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
