'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var yaml = require('js-yaml');
var fs = require('fs');
var Promise = require('bluebird');

var cssnext = require('postcss-cssnext');
var simpleVars = require('postcss-simple-vars');
var nested = require('postcss-nested')

// js format check
gulp.task('check', ['clean'], function() {
    return gulp
        .src('./src/js/**/*.js')
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError())
        .pipe(gulp.dest('./src/tempjs'));
});

// js file clean
gulp.task('clean', function(cb) {
    return del('./src/tempjs', cb);
});

// js eslint set
gulp.task('js_lint', function() {
    return gulp
        .src('./src/js/**/*.js')
        .pipe(
            $.prettier()
        )
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError())
        .pipe(gulp.dest('./src/tempjs'));
});

// js file copy
gulp.task('copy_js', function() {
    return gulp.src('./src/tempjs/**/*.js').pipe(gulp.dest('./src/js'));
});

// js format
gulp.task('format_js', function(cb) {
    runSequence('js_lint', 'copy_js', 'clean', cb);
});

//js concat not use yaml
gulp.task('concat_js', function() {
    return gulp
        .src('src/js/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe(
            $.babel({
                presets: [
                    ['env', { forceAllTransforms: process.env === 'production' } ]
                ]
            })
        )
        .pipe($.concat('all.js'))
        .pipe($.sourcemaps.write('sourceMap/js'))
        .pipe(gulp.dest('./dist/js'));
});

//js concat use yaml
gulp.task('concat_js_yaml', function() {
    var concatData = yaml.safeLoad(fs.readFileSync('./concat.yml'), 'utf8');
    console.log(concatData);

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            for (var i = 0; i < concatData.concat.length; i++) {
                gulp.src(concatData.concat[i].src)
                    .pipe(
                        $.babel({
                            presets: [
                                ['env', { forceAllTransforms: process.env === 'production' } ]
                            ]
                        })
                    )
                    .pipe($.concat({path: concatData.concat[i].out}))
                    .pipe(gulp.dest('./dist/js'))
            }
            resolve();
        },1000)
    })
});

// js uglify
gulp.task('uglify_js', function () {
    return gulp
        .src('src/js/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe(
            $.babel({
                presets: [
                    ['env', { forceAllTransforms: true } ]  // for uglifyjs...
                ]
            })
        )
        .pipe($.concat('all.js'))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('sourceMap/js'))
        .pipe(gulp.dest('./dist/js'));
});

// css lint
gulp.task('lint_css', function () {
   return gulp.src('src/css/**/*.css')
       .pipe($.stylelint({
           reporters: [
               {formatter: 'string', console: true}
           ],
           fix: true
       }))
       .pipe(gulp.dest('./dist/css'));
});

//css format and concat
gulp.task('concat_css', function () {
    var plugins = [
        cssnext({browsers: ['last 1 version']}),
        simpleVars(),
        nested()
    ];
    return gulp.src('src/css/**/*.css')
        .pipe($.sourcemaps.init())
        .pipe($.postcss(plugins))
        .pipe($.sourcemaps.write('sourceMap/css'))
        .pipe(gulp.dest('./dist/css'));
});

//css uglify
gulp.task('uglify_css', function () {
    var plugins = [
        cssnext(),
        simpleVars(),
        nested()
    ];
    return gulp.src('src/css/**/*.css')
        .pipe($.sourcemaps.init())
        .pipe($.postcss(plugins))
        .pipe($.sourcemaps.write('sourceMap/css'))
        .pipe($.cleanCss())
        .pipe(gulp.dest('./dist/css'));
});

// build
gulp.task('build', function (cb) {
    runSequence('uglify_css', 'uglify_js', cb);
});