var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	ng_annotate = require('gulp-ng-annotate');

gulp.task('default', ['compress']);

gulp.task('compress', function() {
	gulp.src(['src/currency.js'])
		.pipe(ng_annotate())
		.pipe(uglify())
		.pipe(rename('currency.min.js'))
		.pipe(gulp.dest('dist/'));
});
