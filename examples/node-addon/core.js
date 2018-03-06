'use strict';

const util = require('util');

const { Example } = require('./binary/addon');


Example.prototype[util.inspect.custom] = function() {
	return `Example { listeners: [${this.eventNames()}] }`;
};


module.exports = Example;
