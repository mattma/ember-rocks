'use strict';

// This is a very simple interface
// Used to fire up gulp task in your local project
var runner = require('../utils/runner');
var cb = require('../utils/callback');
var lookupRootPath = require('../utils/lookup-root');

var commands = function (options) {
  var command = process.argv.slice(2)[0] || options.parent.rawArgs[2];
  var currentPath = process.cwd();
  var configFileName = 'gulpfile.js';

  lookupRootPath(currentPath, configFileName, function (err, rootCwd) {
    if (!rootCwd) {
      console.log(
        ' [-Error:]  This project may not be created by \'Ember-Rocks\'\n',
        '[-Error:]  Or you are not in the project root directory. Try: `pwd`\n',
        '[-Helper:] To create an \'Ember-Rocks\' project. Try: `em new myApp`'
      );
      return;
    }
    // based on the return value, root cwd assigned to `LiftOff` setting
    var cwd = rootCwd || currentPath;
    var opts = {
      cwd:        cwd,
      configPath: cwd + '/' + configFileName
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
