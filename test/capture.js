var casper = require('casper').create();
var colorizer = require('colorizer').create('Colorizer');

var url = casper.cli.get(0) || 'http://localhost:8082';

var date = (new Date()).toString().replace(/\s/g, '-');
var filename = 'dookie-css-test-' + date + '.jpg';

casper.start(url, function () {
	this.echo('test started on url - ' + url, 'INFO');
});

casper.then(function () {
	casper.waitForSelector('.tests', function () {
		this.captureSelector(filename, '.tests');
		this.echo('screenshot captured under name - ' + filename, 'COMMENT');
	});
});

casper.run(function () {
	this.echo('test ended', 'INFO');
	this.exit();
});