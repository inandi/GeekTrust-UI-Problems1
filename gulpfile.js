var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
	gulp.src('app')
	.pipe(webserver({
		livereload: true,
		directoryListing: true,
		open: true,
		port : 8651,
		open : 'http://localhost:8651/index.html'
	}));
});