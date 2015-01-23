'use strict';

// This is a very simple interface
// Used to fire up gulp task in your local project
var runner = require('../utils/runner');
var cb = require('../utils/callback');
var fs = require('fs');

// Recursive checking the root path of application
// so that setup the correct `cwd` in the `LiftOff` setting
var walk = function (dir, done) {
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    (function next (parent) {
      // reaching to the root of the file system
      if (parent === '/') {
        return done(err, undefined);
      }
      // either in the root folder or project folder
      var rootFolder = (parent) ? parent : dir;
      var gulpfilePath = rootFolder + '/gulpfile.js';
      // check the current directory includes the file, `gulpfile.js`
      fs.stat(gulpfilePath, function (err, stat) {
        if (stat) {
          // hooray! we found the file, send back the root path
          var ret = (parent) ? parent : dir;
          return done(null, ret);
        } else {
          // Not yet, traverse to the parent level
          process.chdir('../');
          var parentDir = process.cwd();
          // recursive calling itself to check for the root path
          next(parentDir);
        }
      });
    })();
  });
};

var commands = function (options) {
  var command = process.argv.slice(2)[0] || options.parent.rawArgs[2];
  var currentPath = process.cwd();
  var opts;

  walk(currentPath, function (err, rootCwd) {
    if (!rootCwd) {
      console.log(
        ' [-Error:]  This project may not be created by \'Ember-Rocks\'\n',
        '[-Error:]  Or you are not in the project root directory. Try: `pwd`\n',
        '[-Helper:] To create an \'Ember-Rocks\' project. Try: `em new myApp`'
      );
      return ;
    }
    // based on the return value, root cwd assigned to `LiftOff` setting
    var cwd = rootCwd || currentPath;
    opts = {
      cwd:        cwd,
      configPath: cwd + '/gulpfile.js'
    };

    switch (command) {
      case 'serve':
      case 's':
        runner(cb, 'serve', opts);
        break;
      case 'build':
      case 'b':
        runner(cb, 'release', opts);
        break;
      case 'test':
      case 't':
        runner(cb, 'test', opts);
        break;
      case 'mobile':
      case 'm':
        runner(cb, 'releaseMobile', opts);
        break;
      default:
        runner(cb, 'default', opts);
    }
  });
};

module.exports = commands;
