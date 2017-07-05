/* global require */

const gulp = require("gulp");
const sass = require("gulp-sass");
const runSequence = require("run-sequence");
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const nodemon = require("gulp-nodemon");

gulp.task("hello", () => {
	console.log("howdy partner!");
});

gulp.task("build", () => {
    runSequence("eslint",
        "clean",
        "sass",
        "autoprefixer",
        "uncss",
        "critical",
        "imagemin");
});

gulp.task("watch", ["browserSync", "build"], () => {
    gulp.watch("app/static/scss/*.scss", ["build"]);
    gulp.watch("app/static/scripts/*.js", reload);
    gulp.watch("app/static/*.html", reload);
});

gulp.task("clean", () => {
    const del = require("del");

    return del(["dist/**", "!dist", "build/**", "!build"], {
        force: true
    });
});

gulp.task("sass", () =>
	gulp.src("app/static/scss/styles.scss")
		.pipe(sass())
		.pipe(gulp.dest("build/css/sass")));

gulp.task("autoprefixer", () => {
    const postcss = require("gulp-postcss");
    const sourcemaps = require("gulp-sourcemaps");
    const autoprefixer = require("autoprefixer");

    return gulp.src("build/css/sass/styles.css")
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build/css/auto"));
});

gulp.task("uncss", () => {
    const uncss = require("gulp-uncss");
    const sourcemaps = require("gulp-sourcemaps");

    return gulp.src("build/css/auto/styles.css")
        .pipe(sourcemaps.init())
        .pipe(uncss({
            html: ["app/static/index.html"],
            ignore: ["animated",
            ".wobble",
            ".bounceIn",
            ".bounceOutUp",
            ".zoomOutUp"]
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.reload({ // update browsersync when css is regenerated
            stream: true
        }));
});

gulp.task("critical", () => {
    const criticalCss = require("gulp-critical-css");

    gulp.src("dist/css/styles.css")
        .pipe(criticalCss())
        .pipe(gulp.dest("dist/css"));
});

gulp.task("nodemon", cb => {
  let called = false;

  return nodemon({
    script: "app/index.js",
    ignore: [
      "gulpfile.js",
      "node_modules/"
    ]
  })
  .on("start", () => {
    if (!called) {
      called = true;
      return cb();
    }
    return true;
  })
  .on("restart", () => {
    setTimeout(() => {
      reload({ stream: false });
    }, 1000);
    return true;
  });
});

gulp.task("browserSync", ["nodemon"], () => {
    browserSync.init(null, {
        proxy: "localhost:3000", // local node app address
        port: 3001, // use different port than the node app
        notify: true
    });
});

gulp.task("eslint", () => {
    const eslint = require("gulp-eslint");

    return gulp.src("app/**/*.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task("imagemin", () => {
    const imageMin = require("gulp-imagemin");

    gulp.src("app/static/images/*")
        .pipe(imageMin())
        .pipe(gulp.dest("dist/images"));
});


