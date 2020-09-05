"use strict";


// https://gist.github.com/jeromecoupe/0b807b0c1050647eb340360902c3203a


const gulp = require("gulp");
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const cssnano = require("gulp-cssnano");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");


function css() {
    return gulp
        .src("./sass/main.sass")
        .pipe(postcss([ autoprefixer() ]))
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssnano({zindex: false}))
        .pipe(gulp.dest("./css"));
}


// Lint scripts
// function scriptsLint() {
//     return gulp
//         .src(["./assets/js/**/*", "./gulpfile.js"])
//         .pipe(plumber())
//         .pipe(eslint())
//         .pipe(eslint.format())
//         .pipe(eslint.failAfterError());
// }

// Transpile, concatenate and minify scripts
// function scripts() {
//     return gulp
//         .src(["./assets/js/**/*"])
//         .pipe(plumber())
//         .pipe(webpackstream(webpackconfig, webpack))
//         // folder only, filename is specified in webpack config
//         .pipe(gulp.dest("./_site/assets/js/"))
//         .pipe(browsersync.stream());
// }



// Watch files
function watchFiles() {
    gulp.watch("./sass/*.sass", css);
    // gulp.watch("public/js/**/*", gulp.series(scriptsLint, scripts));
}

// Tasks
gulp.task("css", css);
// gulp.task("js", gulp.series(scriptsLint, scripts));


// watch
gulp.task("watch", gulp.parallel(watchFiles));
