'use strict';

const { Example } = require('./core');

console.log('Example', Example);


const example = new Example();


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
	console.log('EVT1', arg1, arg2);
});

example.once('evt2', (arg1, arg2) => {
	console.log('EVT2', arg1, arg2);
});


example.emit('evt1', 111, '221');
example.emit('evt1', 112, '222');

example.emit('evt2', 111, '221');
example.emit('evt2', 112, '222');


module.exports = Example;
