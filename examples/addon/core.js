'use strict';

const util = require('util');

const { binPath } = require('addon-tools-raub');

const core = require(`./${binPath}/addon`);


const { Example } = core;

Example.prototype[util.inspect.custom] = function () {
	return `Example { listeners: [${this.eventNames()}] }`;
};


module.exports = core;
