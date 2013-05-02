var colors = require('colors');
var fork = require('child_process').fork;
var exec = require('child_process').exec;

var childServer, childTester;

childServer = fork('server.js');

childTester = exec('casperjs capture.js', function (err, stdout, stderr) {
	if (err) {
		console.log('Exec error: %s'.red, err);
		return childServer.kill();
	}

	console.info(stdout);
	childServer.kill();
});