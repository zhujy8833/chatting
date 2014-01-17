
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var io = require('socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 4444);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);
var serv_io = io.listen(server);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
//websocket
serv_io.on('connection', function(socket){
	socket.on('set nickname', function (name) {
	    serv_io.sockets.emit('ready', {nickname : name}); 
	});

	socket.on('send message', function(data){
		serv_io.sockets.emit('sent out', data);
	});

	// socket.on('disconnect', function(){
	// 	socket.emit("user disconnected");
	// });
});
