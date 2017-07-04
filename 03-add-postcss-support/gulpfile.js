let gulp = require('gulp')
let sass = require('gulp-sass')

gulp.task('hello', function() {
	console.log('howdy partner!');
})

gulp.task('sass', function() {
	return gulp.src('app/static/scss/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'));
})