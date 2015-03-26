//currently not use

var gulp = require('gulp');
var config = require('../config');

var express  = require('express');
var http     = require('http');
var socketIo = require('socket.io');

gulp.task('express', function() {

  var app    = express();
  var server = http.createServer(app);
  var io     = socketIo.listen(server);

  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(__dirname + '../../../server/public'));

  app.get('/', function (req, res) {
    res.sendFile('index.html', {'root': __dirname + '../../../server/public'});
  });

  server.listen(5000);

  io.sockets.on('connection', function (socket) {
    socket.on('addToStats', function (thing, update) {
      io.sockets.emit('addedToStats', thing, update);
    });

    socket.on('removeFromStats', function (thing) {
      io.sockets.emit('removedFromStats', thing);
    });


  });

});
