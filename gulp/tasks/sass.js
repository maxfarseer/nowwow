var gulp = require('gulp');
var sass = require('gulp-sass');
var handleErrors = require('../util/handleErrors');
var config = require('../config');
var connect = require('gulp-connect');

gulp.task('sass', function() {
  var sassParams = {};

  if (config.env === 'production') {
    sassParams.outputStyle = 'compressed';
  }

  if (config.env === 'development') {
      //sassParams.onError = function(e) { console.log(e); };
      sassParams.onError = function(e) { handleErrors(e) };
      sassParams.sourceMap = 'sass';
      //sassParams.sourceComments = 'map';
  }

  return gulp.src('./css/app.scss')
    .pipe(sass(sassParams))
    .pipe(gulp.dest(config.outputDir + '/css'));
});
