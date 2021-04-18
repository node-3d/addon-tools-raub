import type { Writable } from 'stream';


declare module "addon-tools-raub/writable-buffer" {
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
	
	export = WritableBuffer;
}
