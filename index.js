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

module.exports = {
	path: __dirname + 'lib',
	middleware: middleware,
	css: css
};