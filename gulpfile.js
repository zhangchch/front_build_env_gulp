'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

// js format check
gulp.task('check', ['clean'], function () {
    return gulp.src('./src/js/**/*.js')
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError())
        .pipe(gulp.dest('./src/tempjs'))
});

// js file clean
gulp.task('clean', function (cb) {
    return del('./src/tempjs', cb);
});

// js eslint set
gulp.task('js_lint', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe($.prettier({
            singleQuote: true,
            trailingComma: "all",
            bracketSpacing : true,
            semi: true,
            tabWidth: 4,
            printWidth: 120
        }))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError())
        .pipe(gulp.dest('./src/tempjs'))
});

// js file copy
gulp.task('copy_js', function () {
    return gulp.src('./src/tempjs/**/*.js')
        .pipe(gulp.dest('./src/js'))
});

// js format
gulp.task('format_js', function (cb) {
    runSequence('js_lint','copy_js','clean',cb);
});