declare module "addon-tools-raub" {
	type Stats = import('node:fs').Stats;
	type Writable = import('node:stream').Writable;
	type Readable = import('node:stream').Readable;
	type WritableOptions = import('node:stream').WritableOptions;
	
	/**
	 * Get the internal paths for an addon
	 *
	 * Returns a set of platform dependent paths depending on the input dir
	 */
	export const getPaths: (dir: string) => Readonly<{
		/**
		 * Path to binaries
		 *
		 * Platform binary directory absolute path for this `dir`
		 */
		bin: string;
		/**
		 * Path to include
		 *
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
	 *
	 * Both 'addon-tools-raub' and 'node-addon-api' include paths.
	 * In binding.gyp: `'<!@(node -p "require(\'addon-tools-raub\').getInclude()")'`
	 */
	export const getInclude: () => string;
	
	/**
	 * Install binaries
	 *
	 * Downloads and unpacks the platform specific binary for the calling package.
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
	export const install: (folder: string) => Promise<boolean>;
	
	
	/**
	 * Copy binary
	 *
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
	 * Packs binaries into GZIP
	 *
	 * Example of `actionPack` usage in **Github Actions**:
	 *
	 * ```
	 * - name: Pack Files
	 * id: pack-files
	 * run: node -e "require('addon-tools-raub').actionPack()" >> $GITHUB_OUTPUT
	 * - name: Store Binaries
	 * uses: softprops/action-gh-release@v1
	 * with:
	 * 	files: ${{ steps.pack-files.outputs.pack }}
	 * ```
	 */
	export const actionPack: () => Promise<void>;
	
	
	/**
	 * Download to memory
	 *
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
	 *
	 * Reads a whole file to string, NOT A Buffer
	 */
	
	
    type ComposeFnParam = (source: any) => void;
	/**
	 * WritableBuffer
	 *
	 * A [Writable](https://nodejs.org/api/stream.html#stream_writable_streams)
	 * stream buffer, that is stored in-memory and can be fully
	 * obtained when writing was finished. It is equivalent to stream-writing
	 * a temporary file and then reading it into a `Buffer`.
	 */
	export class WritableBuffer implements Writable {
		constructor();
		/**
		 * Get the downloaded data
		 * Use `stream.get()` to obtain the data when writing was finished
		 */
		get(): Buffer;
		
		// ----------- implements Writable
		
        readonly writable: boolean;
        readonly writableEnded: boolean;
        readonly writableFinished: boolean;
        readonly writableHighWaterMark: number;
        readonly writableLength: number;
        readonly writableObjectMode: boolean;
        readonly writableCorked: number;
        destroyed: boolean;
        readonly closed: boolean;
        readonly errored: Error | null;
        readonly writableNeedDrain: boolean;
        constructor(opts?: WritableOptions);
        _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void;
        _writev?(
            chunks: Array<{
                chunk: any;
                encoding: BufferEncoding;
            }>,
            callback: (error?: Error | null) => void,
        ): void;
        _construct?(callback: (error?: Error | null) => void): void;
        _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
        _final(callback: (error?: Error | null) => void): void;
        write(chunk: any, callback?: (error: Error | null | undefined) => void): boolean;
        write(chunk: any, encoding: BufferEncoding, callback?: (error: Error | null | undefined) => void): boolean;
        setDefaultEncoding(encoding: BufferEncoding): this;
        end(cb?: () => void): this;
        end(chunk: any, cb?: () => void): this;
        end(chunk: any, encoding: BufferEncoding, cb?: () => void): this;
        cork(): void;
        uncork(): void;
        destroy(error?: Error): this;
        addListener(event: "close", listener: () => void): this;
        addListener(event: "drain", listener: () => void): this;
        addListener(event: "error", listener: (err: Error) => void): this;
        addListener(event: "finish", listener: () => void): this;
        addListener(event: "pipe", listener: (src: Readable) => void): this;
        addListener(event: "unpipe", listener: (src: Readable) => void): this;
        addListener(event: string | symbol, listener: (...args: any[]) => void): this;
        emit(event: "close"): boolean;
        emit(event: "drain"): boolean;
        emit(event: "error", err: Error): boolean;
        emit(event: "finish"): boolean;
        emit(event: "pipe", src: Readable): boolean;
        emit(event: "unpipe", src: Readable): boolean;
        emit(event: string | symbol, ...args: any[]): boolean;
        on(event: "close", listener: () => void): this;
        on(event: "drain", listener: () => void): this;
        on(event: "error", listener: (err: Error) => void): this;
        on(event: "finish", listener: () => void): this;
        on(event: "pipe", listener: (src: Readable) => void): this;
        on(event: "unpipe", listener: (src: Readable) => void): this;
        on(event: string | symbol, listener: (...args: any[]) => void): this;
        once(event: "close", listener: () => void): this;
        once(event: "drain", listener: () => void): this;
        once(event: "error", listener: (err: Error) => void): this;
        once(event: "finish", listener: () => void): this;
        once(event: "pipe", listener: (src: Readable) => void): this;
        once(event: "unpipe", listener: (src: Readable) => void): this;
        once(event: string | symbol, listener: (...args: any[]) => void): this;
        prependListener(event: "close", listener: () => void): this;
        prependListener(event: "drain", listener: () => void): this;
        prependListener(event: "error", listener: (err: Error) => void): this;
        prependListener(event: "finish", listener: () => void): this;
        prependListener(event: "pipe", listener: (src: Readable) => void): this;
        prependListener(event: "unpipe", listener: (src: Readable) => void): this;
        prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
        prependOnceListener(event: "close", listener: () => void): this;
        prependOnceListener(event: "drain", listener: () => void): this;
        prependOnceListener(event: "error", listener: (err: Error) => void): this;
        prependOnceListener(event: "finish", listener: () => void): this;
        prependOnceListener(event: "pipe", listener: (src: Readable) => void): this;
        prependOnceListener(event: "unpipe", listener: (src: Readable) => void): this;
        prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
        removeListener(event: "close", listener: () => void): this;
        removeListener(event: "drain", listener: () => void): this;
        removeListener(event: "error", listener: (err: Error) => void): this;
        removeListener(event: "finish", listener: () => void): this;
        removeListener(event: "pipe", listener: (src: Readable) => void): this;
        removeListener(event: "unpipe", listener: (src: Readable) => void): this;
        removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
        pipe<T extends NodeJS.WritableStream>(
            destination: T,
            options?: {
                end?: boolean | undefined;
            },
        ): T;
        compose<T extends NodeJS.ReadableStream>(
            stream: T | ComposeFnParam | Iterable<T> | AsyncIterable<T>,
            options?: { signal: AbortSignal },
        ): T;
		off(eventName: string | symbol, listener: (...args: any[]) => void): this;
		removeAllListeners(event?: string | symbol): this;
		setMaxListeners(n: number): this;
		getMaxListeners(): number;
		listeners(eventName: string | symbol): Function[];
		rawListeners(eventName: string | symbol): Function[];
		emit(eventName: string | symbol, ...args: any[]): boolean;
		listenerCount(eventName: string | symbol, listener?: Function): number;
		eventNames(): Array<string | symbol>;
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
	 *
	 * Like `mkdir -p`, makes sure a directory exists
	 */
	export const ensuredir: (dir: string) => Promise<void>;
	
	/**
	 * (async) Copy a file
	 *
	 * Copy a file, `dest` folder is created if needed
	 */
	export const copysafe: (src: string, dest: string) => Promise<void>;
	
	/**
	 * (async) Read a directory
	 *
	 * Get file/folder names of the 1st level
	 */
	export const readdir: (src: string, dest: string) => Promise<ReadonlyArray<string>>;
	
	/**
	 * (async) List subdirectories
	 *
	 * Get folder paths (concatenated with input) of the 1st level
	 */
	export const subdirs: (name: string) => Promise<ReadonlyArray<string>>;
	
	/**
	 * (async) List nested files
	 *
	 * Get file paths (concatenated with input) of the 1st level
	 */
	export const subfiles: (name: string) => Promise<ReadonlyArray<string>>;
	
	/**
	 * (async) Get all nested files recursively
	 *
	 * Folder paths are omitted by default.
	 * Order is: shallow-to-deep, each subdirectory lists dirs-then-files.
	 */
	export const traverse: (name: string, showDirs?: boolean) => Promise<ReadonlyArray<string>>;
	
	/**
	 * (async) Copy a directory
	 *
	 * Copy a folder with all the contained files
	 */
	export const copyall: (src: string, dest: string) => Promise<void>;
	
	/**
	 * (async) Remove a directory
	 *
	 * Like `rm -rf`, removes everything recursively
	 */
	export const rmdir: (name: string) => Promise<void>;
	
	/**
	 * (async) Remove a file
	 *
	 * Must be a file, not a folder. Just `fs.unlink`.
	 */
	export const rm: (name: string) => Promise<void>;
}
