let gulp = require('gulp')
let sass = require('gulp-sass')

gulp.task('hello', function() {
	console.log('howdy partner!');
})

gulp.task('sass', function() {
	return gulp.src('app/static/scss/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest('build/css/sass'));
})

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('build/css/sass/styles.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css/auto'));
});

gulp.task('uncss', function() {
    let uncss = require('gulp-uncss');
    let sourcemaps   = require('gulp-sourcemaps');

    return gulp.src('build/css/auto/styles.css')
        .pipe(sourcemaps.init())
        .pipe(uncss({
            html: ['app/static/index.html'],
            ignore: ['animated', 
            '.wobble',
            '.bounceIn',
            '.bounceOutUp',
            '.zoomOutUp']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('critical', function() {
    let criticalCss = require('gulp-critical-css');

    gulp.src('dist/css/styles.css')
        .pipe(criticalCss())
        .pipe(gulp.dest('dist/css'));
})