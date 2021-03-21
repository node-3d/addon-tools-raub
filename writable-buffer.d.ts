import type { Writable } from 'stream';

export class WritableBuffer extends Writable {
    constructor();
    get(): Buffer;
};
