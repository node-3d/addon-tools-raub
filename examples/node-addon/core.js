'use strict';

const util = require('util');

const core = require('./binary/addon');


const { Example } = core;

Example.prototype[util.inspect.custom] = function() {
	return `Example { listeners: [${this.eventNames()}] }`;
};


module.exports = core;
