'use strict';

// This is a very simple interface
// Used to fire up gulp task in your local project
var runner = require('../utils/runner');
var cb = require('../utils/callback');
var argv = require('minimist')(process.argv.slice(2));

var commands = function (options) {
  var command = argv._[0] || options.parent.rawArgs[2];
  switch (command) {
    case 'serve':
    case 's':
      runner(cb, 'serve');
      break;
    case 'build':
    case 'b':
      runner(cb, 'release');
      break;
    case 'test':
    case 't':
      runner(cb, 'test');
      break;
    case 'mobile':
    case 'm':
      runner(cb, 'releaseMobile');
      break;
    default:
      runner(cb, 'default');
  }
};

module.exports = commands;
