var gulp       = require('gulp');
var config     = require('../config');

gulp.task('watch', function(){
	gulp.watch('./js/**/*.js', ['bundle']);
  gulp.watch('./sass/**/*.scss', ['sass']);
});
