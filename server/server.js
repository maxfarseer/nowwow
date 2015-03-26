var express  = require('express');
var http     = require('http');
var socketIo = require('socket.io');

var app    = express();
var server = http.createServer(app);
var io     = socketIo.listen(server);

app.use(require('connect-livereload')({port: 4002}));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile('index.html', {'root': __dirname + '/public'});
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  console.log(tinylr);
  tinylr.listen(4002);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  console.log(fileName);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('watch', function() {
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch('css/*.css', notifyLiveReload);
});

gulp.task('default', ['livereload', 'watch'], function() {

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
