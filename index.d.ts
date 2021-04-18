declare module "addon-tools-raub" {
	/**
	 * Addon paths
	 * Returns a set of platform dependent paths depending on input dir
	*/
	export const paths: (dir: string) => Readonly<{
		/**
		 * Path to binaries
		 * Platform binary directory absolute path
		*/
		bin: string;
		/**
		 * Path to include
		 * Include directory for this dir
		*/
		include: string;
	}>;
	/**
	 * Binary folder name
	 * Platform-dependent binary directory name
	*/
	export const bin: string;
	/**
	 * Platform name
	 * One of: 'windows', 'linux', 'osx'
	*/
	export const platform: string;
	/**
	 * Main include directories
	 * Both 'addon-tools-raub' and 'node-addon-api' include paths.
	 * Use with node -p through list context command expansion <!@(...).
	*/
	export const include: string;
}
