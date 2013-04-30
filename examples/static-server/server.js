var fs = require('fs'),
	http = require('http'),
	static = require('node-static'),
	colors = require('colors'),
	stylus = require('stylus'),
	dookie = require('../../'); // TO DO: set 'dookie-css' before publish

var port = process.env.PORT || 8081;

var app = http.createServer(handler);

var files = new static.Server('./public');

fs.readFile(__dirname + '/public/css/style.styl', 'utf8', function (err, str) {
	if (err) {
		console.log('Error while reading file'.red, err);
	}

	// use stylus for styling
	stylus(str)
		.use(dookie.css()) // call dookie.css() function
		.render(function (err, css) {
			if (err) {
				console.log('Error while rendering stylus'.red, err);
			}

			fs.writeFileSync(__dirname + '/public/css/style.css', css, 'utf8', function (err) {
				if (err) {
					console.log('Error while writing file'.red, err);
				}
			});
		});
});

// serve files on request
function handler(request, response) {
	request.addListener('end', function() {
		files.serve(request, response);
	});
}

app.listen(port);
console.log(('dookie example app started on localhost:' + port).green);