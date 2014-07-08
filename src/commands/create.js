var path = require('path'),
    fs = require('fs'),
    exec = require('child_process').exec,
    argv = require('minimist')(process.argv.slice(2)),
    gulp = require('gulp'),
    gutil = require('gulp-util');

var create = function(generatorPath, options) {
  if (argv._.length < 2) {
    gutil.log("Error: See 'em new --help'.");
    process.exit(0);
  }
  // checking the url prefix
  var re = /^http(?:s)?:\/\//,
      userInputPath = options.path,
      // check for remote URL path
      remoteUrl = ( userInputPath ) ? ( re.test(userInputPath) ) ? userInputPath : ('http://' + userInputPath) : undefined;

  // get the full path to the core of application. ( Server && Client )
  var skeletonsCorePath = getSkeletonsCorePath(),
      // get the full path to the ember application or take the generator from github or an URL
      // skeletonsAppPath = ( userInputPath ) ? remoteUrl : getSkeletonsAppPath();
      skeletonsAppPath = getSkeletonsAppPath();

  if (fs.existsSync(generatorPath)) {
    gutil.log('[-log]', 'Folder (', generatorPath, ') has existed in this directory!' );
    process.exit(0);
  } else {
    // Create a new directory name what user passed in
    fs.mkdirSync(generatorPath);
  }

  var currentAppPath = path.resolve(generatorPath);
  // Setup gulp task, copy the source files into the newly create folder
  setupTask (skeletonsCorePath, skeletonsAppPath, currentAppPath);
  // Trigger the generator task
  gulp.start('generator');
};

module.exports = create;

function setupTask (coreSrcPath, appSrcPath, dest) {
  gutil.log('[-log]', 'Starting to generate application at ', dest );
  var coreSrc = [ coreSrcPath + '/**', coreSrcPath + '/**/.*' ],
      appSrc = [ appSrcPath + '/**' ];

  return gulp.task('generator', function (callback) {
      gulp.src(coreSrc)
          .on('end', function() {
              gutil.log('[-log]', 'You new application Server is ready');
          })
          .pipe(gulp.dest(dest));

      gulp.src(appSrc)
          .on('end', function() {
              gutil.log('[-log]', 'New Ember application is ready');
              installNpm( dest, callback );
          })
          .pipe(gulp.dest(dest+'/client/app'));
  });
}

function installNpm (rootPath, callback) {
    rootPath = rootPath || process.cwd();
    gutil.log('[-log]', 'NPM is installing packages...');
    process.chdir(rootPath);
    return exec('npm install', function(error, stdout, stderr) {
      var log;
      //process.chdir(rootPath);
      if (error !== null) {
        log = stderr.toString();
        gutil.log('[-log]', log);
        return callback(log);
      }
      installBower(rootPath, callback);
    });
}

function installBower (rootPath, callback) {
  rootPath = rootPath || process.cwd();
  gutil.log('[-log]', 'Bower is installing javascript packages...');
  process.chdir(rootPath);
  return exec('bower install', function(error, stdout, stderr) {
    var log;
    //process.chdir(rootPath);
    if (error !== null) {
      log = stderr.toString();
      gutil.log('[-log]', log);
      return callback(log);
    }
    gitInit(rootPath, callback);
  });
}

function gitInit(rootPath, callback) {
    gutil.log('[-log]', 'Be Patient, em-cli is doing REALLY hard to initialize your repo ...' );

    rootPath = rootPath || process.cwd();
    process.chdir(rootPath);
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today = new Date(),
        todayDate = today.getDate(),
        todayMonth = month[today.getMonth()],
        todayYear = today.getFullYear(),
        init = 'git init && git add . && git commit -m "Initial Commit @ ' + todayMonth + ' ' + todayDate + ', ' + todayYear + '"';
    return exec(init, function(error, stdout, stderr) {
        var log;
        if (error !== null) {
          log = stderr.toString();
          gutil.log('[-log]', log);
          return callback(log);
        }
        gutil.log('[-log]', 'Initialized a new git repo & did first commit' );
        callback();
    });
}

function getSkeletonsCorePath () {
  var skeletonsCorePath = pathResolver('skeletons/core');
  return skeletonsCorePath;
}

function getSkeletonsAppPath () {
  var skeletonsAppPath = pathResolver('skeletons/app');
  return skeletonsAppPath;
}

function pathResolver (relativePath) {
  return path.resolve(__dirname, '..', relativePath);
}
