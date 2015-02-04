'use strict';

// This is a very simple interface
// Used to fire up gulp task in your local project
var Promise = require('bluebird');
var lookupRootPath = require('../utils/lookup-root');
var runner = require('../utils/runner');

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

function optionsBuilder (command, opts) {
  switch (command) {
    case 'serve':
    case 's':
      opts.command = 'serve';
      break;

    case 'build':
    case 'b':
      opts.command = 'release';
      break;

    case 'test':
    case 't':
      opts.command = 'test';
      break;

    case 'mobile':
    case 'm':
      opts.command = 'releaseMobile';
      break;

    default:
      opts.command = 'default';
  }
  return opts;
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

      opts = optionsBuilder(command, opts);
      runner(opts);
    })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = commands;
