'use strict';

const loggers = {};

const levels = [null, 'error', 'warn', 'info', 'log', 'debug'];
let currentLevel = 'log';

const levelIdx = levels.reduce(
	(accum, next, i) => ({ ...accum, [next || 'null']: i }),
	{},
);

const _wrapOutput = (outputFn, level) => {
	return (...args) => {
		if (levelIdx[level] > levelIdx[currentLevel]) {
			return;
		}
		outputFn(...args);
	};
};

const _assignMethods = (logger, methods) => {
	Object.entries(methods).forEach(([k, v]) => {
		if (levels.includes(k)) {
			logger.replace(k, v);
		}
	});
};

const createLogger = (opts) => {
	const prev = loggers[opts.name];
	if (prev) {
		_assignMethods(prev, opts);
		return prev;
	}
	const newLogger = {
		debug: console.debug,
		log: console.log,
		info: console.info,
		warn: console.warn,
		error: console.error,
		replace: (level, fn) => {
			if (levelIdx[level]) {
				newLogger[level] = _wrapOutput(fn || console.log, level);
			}
		},
	};
	_assignMethods(newLogger, opts);
	
	loggers[opts.name] = newLogger;
	
	return newLogger;
};

const setLevel = (levelOrNull) => {
	if (levels.includes(levelOrNull)) {
		currentLevel = levelOrNull;
	}
};

const getLevel = () => currentLevel;

const getLoggers = () => ({ ...loggers });

const getLogger = (name) => loggers[name] || createLogger({ name });

if (!global.AddonTools.log) {
	global.AddonTools.log = (name, level, ...args) => {
		const logger = loggers[name];
		if (!logger) {
			return;
		}
		logger[level](...args);
	};
}

createLogger({ name: 'addon-tools' });

module.exports = {
	createLogger, setLevel, getLevel, getLoggers, getLogger,
};
