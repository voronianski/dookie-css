var fs = require('fs'),
	http = require('http'),
	static = require('node-static'),
	colors = require('colors'),
	stylus = require('stylus'),
	path = require('path'),
	dookie = require('../../');

var port = process.env.PORT || 8081;

var app = http.createServer(handler);

var files = new static.Server('./public');

var cssFile = __dirname + '/public/css/style.css';
var stylFile = __dirname + '/styl/style.styl';

fs.readFile(stylFile, 'utf8', function (err, str) {
	if (err) {
		console.error('Error while reading file: %s'.red, err);
		return;
	}

	// use stylus for styling
	stylus(str)
		.use(dookie.css()) // call dookie.css() function
		.include(__dirname + '/styl')
		.set('compress', true)
		.render(function (err, css) {
			if (err) {
				console.error('Error while rendering stylus: %s'.red, err);
			}

			fs.writeFileSync(cssFile, css, 'utf8', function (err) {
				if (err) {
					console.error('Error while writing file: %s'.red, err);
					return;
				}
			});
		});
});

// serve files on request
function handler (request, response) {
	request.addListener('end', function() {
		files.serve(request, response, function (err, result) {
			if (err) {
				console.error('Error serving %s - %s'.red, request.url, err.message);
				response.writeHead(err.status, err.headers);
				response.end();
			} else {
				console.info('%s - %s'.cyan, response.statusCode, request.url);
			}
		});
	});
}

app.listen(port);
console.info('dookie example app started on localhost:%s'.yellow, port);