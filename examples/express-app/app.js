var express = require('express'),
	stylus = require('stylus'),
	http = require('http'),
	path = require('path'),
	dookie = require('../../');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 8083);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(stylus.middleware({
		src: __dirname + '/public',
		compile: dookie.middleware
	}));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', function (req, res) {
	res.render('index', { title: 'Express with dookie' });
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port %s", app.get('port'));
});
