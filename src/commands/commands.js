'use strict';

// This is a very simple interface
// Used to fire up gulp task in your local project
var runner = require('../utils/runner'),
    cb = require('../utils/callback'),
    argv = require('minimist')(process.argv.slice(2));

var commands = function(options) {
  var command = argv._[0] || options.parent.rawArgs[2];
  switch( command ) {
    case 'serve':
      runner(cb, 'serve');
      break;
    case 'build':
      runner(cb, 'release');
      break;
    default:
      runner(cb, 'default');
  }
};

module.exports = commands;
