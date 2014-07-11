var path = require('path'),
    fs = require('fs'),
    exec = require('child_process').exec,
    argv = require('minimist')(process.argv.slice(2)),
    gulp = require('gulp'),
    gutil = require('gulp-util');

var serve = function(generatorPath, options) {
  console.log('serve has fired');
};

module.exports = serve;
