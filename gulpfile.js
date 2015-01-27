'use strict';

var gulp = require('gulp');
var log = require('gulp-util').log;
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var lintFiles = [
  'bin/em',
  'src/commands/*.js',
  'src/utils/*.js',
  'src/skeletons/core/*.js',
  'src/skeletons/app/*.js',
  'src/skeletons/generators/*.js',
  '!node_modules/**'
];

gulp.task('lint', function () {
  return gulp.src(lintFiles)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

// task: jscs
// @describe need to be passed to be able to build the project
gulp.task('jscs', function () {
  var src = [
    'gulpfile.js',
    'test/**/*.js',
    'src/**/*.js'
  ];

  return gulp.src(src)
    .pipe(jscs({
      configPath: './.jscsrc'
    }));
});

gulp.task('watch', function () {
  log('Watching Files');
  gulp.watch(lintFiles, ['lint']);
});

gulp.task('default', ['lint', 'watch']);
