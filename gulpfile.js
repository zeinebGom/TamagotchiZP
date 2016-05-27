var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

/* Configuration */

var jsSource =	[
					  './assets/scripts/models/*.ts'
					 ,'./assets/scripts/*.ts'

				];
var jsTarget = "app.js";


var cssSource =	[
					'./assets/styles/main.css'
				];
var cssTarget = 'main.css';

var imgSource =	[
					'./assets/images/*.png'
				];

var distTarget = "./dist/";




/* Concat TypeScript files */
gulp.task('js', function() {
	return	gulp.src(jsSource)
			.pipe(ts({
				noImplicitAny: false,
				out: jsTarget
			}))
			.pipe(concat(jsTarget))
			.pipe(gulp.dest('./dist/'))
			.pipe(livereload());
});


/* Concat SASS files */
gulp.task('sass', function () {
	return	gulp.src(cssSource)
			.pipe(concat(cssTarget))
    		.pipe(gulp.dest('./dist/'))
    		.pipe(livereload());
});

/* Copy images */
gulp.task('img', function () {
	return	gulp.src(imgSource)
    		.pipe(gulp.dest('./dist/images/'))
    		.pipe(livereload());
});


gulp.task('watch', function() {
	livereload.listen();

	gulp.watch(jsSource, ['js']);
	gulp.watch(cssSource, ['sass']);
	gulp.watch(imgSource, ['img']);
	gulp.watch('index.html', function() {
		livereload.reload('./index.html');
	});
});