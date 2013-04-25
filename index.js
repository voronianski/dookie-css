var stylus = require('stylus');

function middleware (str, path) {
	return stylus(str).set('filename', path).use(css());
}

function css () {
	return function (style) {
		style.include(__dirname);
		style.import('lib');
	};
}

exports.path = __dirname + '/lib';
exports.middleware = middleware;
exports.css = css;