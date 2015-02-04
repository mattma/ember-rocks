'use strict';

var Promise = require('bluebird');
var tildify = require('tildify');
var gutil = require('gulp-util');
var semver = require('semver');
var path = require('path');
var logEvents = require('./logEvents');

// callback is loaded `env` which passed from `LiftOff` instance
// you could tweak the `env` properties in `runner.js` `G.launch(opts, cb);`
function callback (env) {
  if (!env.modulePath && !env.configPath) {
    gutil.log(
      gutil.colors.red('[-Error:] This project may not be created by \'Ember-Rocks\'\n'),
      gutil.colors.red(
        '[-Error:] `em new [dirName]` does not install the NPM packages dependencies correctly')
    );
    process.exit(1);
  }

  var localGulpPackagePath = path.resolve(env.cwd, 'node_modules/gulp/package');
  var localGulpPackage = require(localGulpPackagePath);

  // check for semver difference between global and local installation
  if (semver.gt(localGulpPackage.version, env.modulePackage.version)) {
    gutil.log(
      gutil.colors.red('[-Error:] gulp version mismatch!')
    );
    gutil.log(
      gutil.colors.bold(
        '[-Error:] Submit an issue @ https://github.com/mattma/ember-rocks/issues'
      )
    );
  }

  // this is what actually loads up the gulpfile
  require(env.configPath);
  var gulpInst = require(env.modulePath);

  logEvents(gulpInst);
  gutil.log('Using gulpfile', gutil.colors.magenta(tildify(env.configPath)));

  process.nextTick(function () {
    gulpInst.start.apply(gulpInst, [callback.command]);
  });
}

module.exports = callback;
