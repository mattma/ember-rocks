'use strict';

var prettyTime = require('pretty-hrtime');
var gutil = require('gulp-util');

// format orchestrator errors
function formatError (e) {
  if (!e.err) {
    return e.message;
  }

  if (typeof e.err === 'string') {
    return new Error(e.err).stack;
  }

  // PluginError
  if (typeof e.err.showStack === 'boolean') {
    return e.err.toString();
  } else {
    return e.err.stack;
  }
}

// wire up logging events
function logEvents (gulpInst) {
  gulpInst.on('task_start', function (e) {
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    gutil.log('Starting', '\'' + gutil.colors.cyan(e.task) + '\'...');
  });

  gulpInst.on('task_stop', function (e) {
    var time = prettyTime(e.hrDuration);
    gutil.log(
      'Finished', '\'' + gutil.colors.cyan(e.task) + '\'',
      'after', gutil.colors.magenta(time)
    );
  });

  gulpInst.on('task_err', function (e) {
    var msg = formatError(e);
    var time = prettyTime(e.hrDuration);
    gutil.log(
      '\'' + gutil.colors.cyan(e.task) + '\'',
      gutil.colors.red('errored after'),
      gutil.colors.magenta(time)
    );
    gutil.log(msg);
  });
}

module.exports = logEvents;
