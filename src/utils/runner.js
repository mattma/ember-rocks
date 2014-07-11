// Highly inspired by [gulpjs](https://github.com/gulpjs/gulp/blob/master/bin/gulp.js)
// Credit to [Eric Schoffstall](https://github.com/contra)
var argv = require('minimist')(process.argv.slice(2)),
    Liftoff = require('liftoff'),
    gutil = require('gulp-util');

var runner = function(cb) {
  var G = new Liftoff({
    name: 'gulp'
  });

  G.on('require', function (name, module) {
    gutil.log(gutil.colors.cyan('[-Loading:] ' + name));
  }).on('requireFail', function (name, err) {
    gutil.log(gutil.colors.red('[-Error:] Unable to load:'), gutil.colors.red(name), gutil.colors.red(err));
  });

  G.launch({
    cwd: argv.cwd,
    configPath: argv.gulpfile,
    require: argv.require,
    completion: argv.completion
  }, cb );
};

module.exports = runner;
