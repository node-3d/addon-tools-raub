declare module "addon-tools-raub/download" {
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
	const download: (url: string) => Promise<Buffer>;
	export = download;
}
