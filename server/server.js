var express  = require('express');
var http     = require('http');
var socketIo = require('socket.io');

var app    = express();
var server = http.createServer(app);
var io     = socketIo.listen(server);

server.listen(5000);

app.use(express.static('/Users/user/developments/local/nowwow/'));

app.get('/', function (req, res) {
  res.sendFile('index.html', {'root': '../nowwow'});
});

io.sockets.on('connection', function (socket) {
  socket.on('addToStats', function (thing, update) {
    io.sockets.emit('addedToStats', thing, update);
  });

  socket.on('removeFromStats', function (thing) {
    io.sockets.emit('removedFromStats', thing);
  });


});
