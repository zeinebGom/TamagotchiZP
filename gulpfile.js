var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

/* Configuration */

var jsSource =	[
					 './assets/scripts/*.ts'

				];
var jsTarget = "app.js";


var cssSource =	[
					'./assets/styles/main.css'
				];
var cssTarget = 'main.css';


var distTarget = "./dist/";




/* Concat TypeScript files */
gulp.task('compileJS', function() {
	return gulp.src(jsSource)
		.pipe(ts({
			noImplicitAny: true,
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


gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(jsSource, ['compileJS']);
	gulp.watch(cssSource, ['sass']);
	
	gulp.watch('index.html', function() {
		livereload.reload('./index.html');
	});
});