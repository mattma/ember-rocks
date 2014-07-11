var prettyTime = require('pretty-hrtime'),
    gutil = require('gulp-util');

// wire up logging events
var logEvents = function logEvents(gulpInst) {

  // total hack due to fucked up error management in orchestrator
  gulpInst.on('err', function () {
    failed = true;
  });

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
};

module.exports = logEvents;
