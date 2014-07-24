'use strict';

// This is a very simple interface
// Used to fire up gulp task in your local project
var runner = require('../utils/runner'),
    cb = require('../utils/callback');

var serve = function() {
  runner(cb, 'release');
};

module.exports = serve;
