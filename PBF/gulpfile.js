"use strict";

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
        .src("./scss/main.scss")
        .pipe(postcss([ autoprefixer() ]))
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssnano({zindex: false}))
        .pipe(gulp.dest("./css"));
}

function watchFiles() {
    gulp.watch("./scss/*.scss", css);
}

gulp.task("css", css);

gulp.task("watch", gulp.parallel(watchFiles));
