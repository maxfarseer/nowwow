var browserify   = require('browserify');
var watchify   = require('watchify');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var config       = require('../config');

gulp.task('bundle', function(){

  function browserifyShare() {

    var b = new browserify({
      entries: './js/app.js',
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    });

    b = watchify(b); //TODO: потестировать, буста скорости не было
    b.on('update', function(){
      bundleShare(b);
    });

    if (config.env === 'production') {
      b.plugin('minifyify', {
        map: '/bundle.js.map',
        minify: true,
        output: outputDir+'/bundle.js.map'
      });
    }

    bundleShare(b);
  }

  function bundleShare(b) {
    b.bundle()
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(config.outputDir + '/js'));
  }

  return browserifyShare();

});
