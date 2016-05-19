/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use('public/javascripts', express.static(path.join(__dirname,
		'public/javascripts')));
app.use('public/stylesheets', express.static(path.join(__dirname,
		'public/stylesheets')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var log = "";

readLines.index = 0;
readLines.last = -1;

app.get('/log', function(req, res) {
	var input = fs.createReadStream('D:\\Java\\Logs\\abga.log');
	readLines(input, func);
	res.send(log.substring(0, log.length - 1));
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

var fs = require('fs');

function readLines(input, func) {
	var remaining = '';

	input.on('data',
			function(data) {
				remaining += data;
				readLines.index = remaining.indexOf('\n', readLines.last);
				while (readLines.index > -1) {
					readLines.index = remaining.indexOf('\n', readLines.last);
					if (readLines.index > 0) {
						var line = remaining.substring(readLines.last,
								readLines.index);
						readLines.last = readLines.index + 1;
						func(line);
					}
				}
				if (readLines.last > -1 && remaining.length > 0
						&& readLines.last < remaining.length) {
					var line = remaining.substring(readLines.last,
							remaining.length);
					readLines.last = remaining.length + 1;
					func(line);
				}
			});

	input.on('end', function() {
		input.close();
	});
}

function func(data) {
	log += data + "\n";
	console.log('Line: ' + data);
}
