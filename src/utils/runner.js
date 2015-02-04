'use strict';

var Liftoff = require('liftoff');
var gutil = require('gulp-util');
var cb = require('../utils/callback');

function runner (opts) {
  var G = new Liftoff({
    name:    'gulp', // has to be `gulp` because searching of `gulpfile.js`
    v8flags: ['--harmony'] // to support all flags: require('v8flags');
  });

  G.on('require', function (name) {
    gutil.log(gutil.colors.cyan('[-Loading:] ' + name));
  }).on('requireFail', function (name, err) {
    gutil.log(gutil.colors.red('[-Error:] Unable to load:'),
      gutil.colors.red(name), gutil.colors.red(err));
  });

  // attach the gulp task name into the cb namespace
  // it will be resolved during the run time
  cb.command = opts.command;

  G.launch(opts, cb);
}

module.exports = runner;
