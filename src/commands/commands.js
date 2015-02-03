'use strict';

// This is a very simple interface
// Used to fire up gulp task in your local project
var Promise = require('bluebird');
var runner = require('../utils/runner');
var cb = require('../utils/callback');
var lookupRootPath = require('../utils/lookup-root');

function lookup (configFileName) {
  var currentPath = process.cwd();

  return new Promise(function (resolve, reject) {
    lookupRootPath(currentPath, configFileName, function (err, rootCwd) {
      if (err) {
        reject(err);
      }
      if (!rootCwd) {
        var customErr = '[-Error:]  This project may not be created by \'Ember-Rocks\'\n' +
          '[-Error:]  Or you are not in the project root directory. Try: `pwd`\n' +
          '[-Helper:] To create an \'Ember-Rocks\' project. Try: `em new myApp`';
        reject(customErr);
      }
      resolve(rootCwd);
    });
  });
}

function execCommand (command, opts) {
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
}

function commands(options) {
  var command = process.argv.slice(2)[0] || options.parent.rawArgs[2];
  var configFileName = 'gulpfile.js';

  lookup(configFileName)
    .then(function (rootCwd) {
      // based on the return value, root cwd assigned to `LiftOff` setting
      var cwd = rootCwd || process.cwd();
      var opts = {
        cwd:        cwd,
        configPath: cwd + '/' + configFileName
      };
      execCommand(command, opts);
    })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = commands;
