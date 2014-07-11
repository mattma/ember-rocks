// Highly inspired by [gulpjs](https://github.com/gulpjs/gulp/blob/master/bin/gulp.js)
// Credit to [Eric Schoffstall](https://github.com/contra)
var argv = require('minimist')(process.argv.slice(2)),
    Liftoff = require('liftoff'),
    tildify = require('tildify'),
    gutil = require('gulp-util'),
    semver = require('semver'),
    cliPackage = require('../../node_modules/gulp/package'),
    logEvents = require('../utils/logEvents');

var serve = function(options) {
  var G = new Liftoff({
    name: 'gulp'
  }).on('require', function (name, module) {
    gutil.log(gutil.colors.cyan('[-Loading:] ' + name));
  }).on('requireFail', function (name, err) {
    gutil.log(gutil.colors.red('[-Error:] Unable to load:'), gutil.colors.red(name), gutil.colors.red(err));
  });

  G.launch({
    cwd: argv.cwd,
    configPath: argv.gulpfile,
    require: argv.require,
    completion: argv.completion
  }, invoke);
};

module.exports = serve;

function invoke (env) {
  if (!env.modulePath && !env.configPath) {
    gutil.log(
      gutil.colors.red('This project may not be created by \'Ember-Rocks\''),
      gutil.colors.red('`em new [dirName]` does not install the NPM packages dependencies correctly')
    );
    process.exit(1);
  }

  // check for semver difference between cli and local installation
  if (semver.gt(cliPackage.version, env.modulePackage.version)) {
    gutil.log(gutil.colors.red('[-Error:] gulp version mismatch!'));
    gutil.log(gutil.colors.bold('[-Error:] Submit an issue @ https://github.com/mattma/ember-rocks/issues'));
    //     gutil.log(gutil.colors.red('Global gulp is', cliPackage.version));
    //     gutil.log(gutil.colors.red('Local gulp is', env.modulePackage.version));
  }

  // this is what actually loads up the gulpfile
  require(env.configPath);
  var gulpInst = require(env.modulePath);

  logEvents(gulpInst);
  gutil.log('Using gulpfile', gutil.colors.magenta( tildify(env.configPath) ));

  process.nextTick(function () {
    gulpInst.start.apply(gulpInst, ['lint']);
  });
}
