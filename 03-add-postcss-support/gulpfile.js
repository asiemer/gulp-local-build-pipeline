let gulp = require('gulp')
let sass = require('gulp-sass')

gulp.task('hello', function() {
	console.log('howdy partner!');
})

gulp.task('sass', function() {
	return gulp.src('app/static/scss/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest('build/css'));
})

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('build/css/styles.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});