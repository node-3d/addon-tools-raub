declare module "addon-tools-raub/cpbin" {
	/**
	 * Copy binary
	 * Copies the addon binary from `src/build/Release` to the platform folder.
	 * ```
	 * declare const cpbin: (name: string) => Promise<void>;
	 * export default cpbin;
	 * ```
	 * It is useful for development builds. Use it in your **src/package.json**:
	 * ```
	 * "scripts": {
	 *   * "build": "node-gyp rebuild && node -e \"require('addon-tools-raub/cpbin')('ADDON')\""
	 * },
	 * ```
	 * Here ADDON should be replaced with the name of your addon, without `.node` extension.
	*/
	const cpbin: (name: string) => Promise<void>;
	export = cpbin;
}
