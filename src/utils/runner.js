// Highly inspired by [gulpjs](https://github.com/gulpjs/gulp/blob/master/bin/gulp.js)
// Credit to [Eric Schoffstall](https://github.com/contra)

'use strict';

var argv = require('minimist')(process.argv.slice(2)),
    Liftoff = require('liftoff'),
    gutil = require('gulp-util');

var runner = function(cb, command) {
  var G = new Liftoff({
    name: 'gulp'
  });

  G.on('require', function (name) {
    gutil.log(gutil.colors.cyan('[-Loading:] ' + name));
  }).on('requireFail', function (name, err) {
    gutil.log(
      gutil.colors.red('[-Error:] Unable to load:'),
      gutil.colors.red(name),
      gutil.colors.red(err)
    );
  });

  // attach the gulp task name into the cb namespace
  // it will be resolved during the run time
  cb.command = command;

  G.launch({
    cwd: argv.cwd,
    configPath: argv.gulpfile,
    require: argv.require,
    completion: argv.completion
  }, cb );
};

module.exports = runner;
