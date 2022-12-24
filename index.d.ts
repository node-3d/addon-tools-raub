declare module "addon-tools-raub" {
	/**
	 * Addon paths
	 * Returns a set of platform dependent paths depending on input dir
	*/
	export const paths: (dir: string) => Readonly<{
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
	 * Platform-dependent binary directory name
	*/
	export const bin: TPlatformDir;
	
	export const platform: TPlatformName;
	
	/**
	 * Main include directories
	 * Both 'addon-tools-raub' and 'node-addon-api' include paths.
	 * For binding.gyp: `'<!@(node -p "require(\'addon-tools-raub\').include")'`
	*/
	export const include: string;
}
