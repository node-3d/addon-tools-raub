'use strict';

const Example = require('./core');

console.log('Example', Example);


const example = new Example();

console.log('example 0', example);

console.log('static listenerCount', Example.listenerCount);

console.log('listenerCount', example.listenerCount);
console.log('addListener', example.addListener);
console.log('emit', example.emit);
console.log('eventNames', example.eventNames);
console.log('getMaxListeners', example.getMaxListeners);
console.log('listeners', example.listeners);
console.log('on', example.on);
console.log('once', example.once);
console.log('prependListener', example.prependListener);
console.log('prependOnceListener', example.prependOnceListener);
console.log('removeAllListeners', example.removeAllListeners);
console.log('removeListener', example.removeListener);
console.log('setMaxListeners', example.setMaxListeners);
console.log('rawListeners', example.rawListeners);
console.log('destroy', example.destroy);


example.on('evt1', (arg1, arg2) => {
	console.log('EVT1', arg1, arg2, example.eventNames());
});

example.once('evt2', (arg1, arg2) => {
	console.log('EVT2', arg1, arg2, example.eventNames());
});


example.emit('evt1', 111, '221');
example.emit('evt1', 112, '222');

console.log('example.eventNames 1', example.eventNames());

example.emit('evt2', 111, '221');

console.log('example.eventNames 2', example.eventNames());

example.emit('evt2', 112, '222');


console.log('example 1', example);


example.setMaxListeners(2);
example.on('max1', () => {});
example.on('max1', () => {});
example.on('max1', () => {});

module.exports = Example;
