var fs = require('fs'),
	http = require('http'),
	colors = require('colors'),
	send = require('send'),
	stylus = require('stylus'),
	dookie = require('../');

(function () {
	var port = process.env.PORT || 8082;

	var app = http.createServer(handler);

	var path = __dirname + '/public';
	var cssFile = __dirname + '/public/css/style.css';
	var stylFile = __dirname + '/styl/style.styl';

	fs.readFile(stylFile, 'utf8', function (err, str) {
		if (err) {
			console.error('Error while reading file: %s'.red, err);
			return;
		}

		stylus(str)
			.use(dookie.css())
			.include(__dirname + '/styl')
			.render(function (err, css) {
				if (err) {
					console.error('Error while rendering stylus: %s'.red, err);
					return;
				}

				fs.writeFileSync(cssFile, css, 'utf8', function (err) {
					if (err) {
						console.error('Error while writing file: %s'.red, err);
					}
				});
			});
	});

	function handler (req, res) {
		send(req, req.url)
			.root(path)
			.on('error', errorHandler)
			.on('end', fileHandler)
			.pipe(res);

		function fileHandler () {
			console.info('%s - %s'.cyan, res.statusCode, req.url);
		}

		function errorHandler (err) {
			console.error('%s - Error serving %s'.red, err.status, req.url);
			res.writeHead(err.status, err.headers);
			res.end();
		}
	}

	app.listen(port);
	console.info('dookie test server started on localhost:%s'.yellow, port);
})();