let gulp = require('gulp')
let sass = require('gulp-sass')
let runSequence = require('run-sequence')
let browserSync = require('browser-sync');
let reload = browserSync.reload;
let nodemon = require('gulp-nodemon');

gulp.task('hello', function() {
	console.log('howdy partner!');
})

gulp.task('build', function() {
    runSequence('clean',
        'sass',
        'autoprefixer',
        'uncss',
        'critical');
})

gulp.task('watch', ['browserSync', 'build'], function() {
    gulp.watch('app/static/scss/*.scss', ['build']);
    gulp.watch('app/static/scripts/*.js', reload);
    gulp.watch('app/static/*.html', reload);
})

gulp.task('clean', function() {
    let del = require('del');

    return del(['dist/**', '!dist', 'build/**', '!build'], {force:true});
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
        .pipe(browserSync.reload({ // update browsersync when css is regenerated
            stream: true
        }))
})

gulp.task('critical', function() {
    let criticalCss = require('gulp-critical-css');

    gulp.src('dist/css/styles.css')
        .pipe(criticalCss())
        .pipe(gulp.dest('dist/css'));
})

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app/index.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('browserSync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "localhost:3000", //local node app address
        port: 3001, //use different port than the node app
        notify: true
    });
})


