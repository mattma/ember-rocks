'use strict';

var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var tildify = require('tildify');
var gulp = require('gulp');
var rimraf = require('rimraf');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

function runningCallback (isRunningTest, dest, newFolderName, callback) {
  // switch to the newly generated folder
  process.chdir(dest);
  // rename `gitignore` to `.gitignore`
  // then remove the originial `gitignore`
  gulp.src('./gitignore')
    .pipe(rename('.gitignore'))
    .on('end', function () {
      rimraf('./gitignore', function () {});
    })
    .pipe(gulp.dest(dest));

  if (!isRunningTest) {
    // Flow Control: execute serial tasks: npm install, bower install, git init
    npmInstaller(dest)
      .then(function () {
        bowerInstaller(dest);
      })
      .then(function () {
        gitInitializer(dest);
      })
      .then(function () {
        successInfoLogger(newFolderName);
        // give the control back to gulp task
        callback();
      })
      .catch(function (err, errFunction) {
        // output error for individual task
        errFunction(err);
      });
  } else {
    callback();
  }
}

function npmInstaller (dest) {
  return new Promise(function (resolve, reject) {
    dest = dest || process.cwd();
    gutil.log(gutil.colors.gray('[-log:]'), 'NPM is installing node packages...');
    process.chdir(dest);
    return exec('npm install', function (error, stdout, stderr) {
      if (error !== null) {
        var err = stderr.toString();
        reject(err, npmInstallationFailLogger);
      }
      resolve();
    });
  });
}

function bowerInstaller (dest) {
  return new Promise(function (resolve, reject) {
    dest = dest || process.cwd();
    gutil.log(gutil.colors.gray('[-log:]'), 'Bower is installing javascript packages...');
    process.chdir(dest);
    return exec('bower install', function (error, stdout, stderr) {
      if (error !== null) {
        var err = stderr.toString();
        reject(err, bowerInstalltionFailLogger);
      }
      resolve();
    });
  });
}

function gitInitializer (dest) {
  gutil.log(
    gutil.colors.gray('[-log:]'),
    gutil.colors.cyan('em-cli'),
    'is doing REALLY hard to initialize your repo ...'
  );

  var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var today = new Date();
  var todayDate = today.getDate();
  var todayMonth = month[today.getMonth()];
  var todayYear = today.getFullYear();
  var command = 'git init && git add . && git commit -m \'Initial Commit @ ' +
    todayMonth + ' ' + todayDate + ', ' + todayYear + '\'';

  return new Promise(function (resolve, reject) {
    dest = dest || process.cwd();
    process.chdir(dest);
    return exec(command, function (error, stdout, stderr) {
      if (error !== null) {
        var err = stderr.toString();
        reject(err, gitInitializerFailLogger);
      }
      resolve();
    });
  });
}

function setupTask (newFolderName, options) {
  var dest = path.resolve(newFolderName);
  gutil.log(
    gutil.colors.gray('[-log:]'),
    'Starting to generate an application at',
    gutil.colors.magenta(tildify(dest))
  );

  // check for the mode, is running test or not
  var isRunningTest = options.test || false;

  // get the full path to the core of application. ( Server && Client )
  var skeletonsCorePath = getSkeletonsCorePath();
  var coreSrc = [skeletonsCorePath + '/**/*'];

  // get the full path to the ember application or take the generator from github or an URL
  var appSrcPath = getSkeletonsAppPath(options);
  var appSrc = ( appSrcPath.indexOf('http') !== -1 ) ? appSrcPath : [appSrcPath + '/**/*'];

  return gulp.task('generator', function (callback) {
    // Scaffold the "core/" of the application. ( Server && Client )
    gulp.src(coreSrc, {dot: true})
      .on('end', coreGenerationLogger)
      .pipe(gulp.dest(dest));

    // if option.path exist and it is a git url, it will be fetched
    // Otherwise, it will use the default scaffold folder app
    if (typeof appSrc === 'string') {
      var command = 'git clone ' + appSrc + ' app';
      var rootPath = dest || process.cwd();
      var clientPath = rootPath + '/client';

      // if client/ folder is not existed, simply create one
      if (!fs.existsSync(clientPath)) {
        fs.mkdirSync(clientPath);
      }

      gutil.log(
        gutil.colors.gray('[-log:]'),
        'Going to fetch the app template from ',
        gutil.colors.cyan(appSrc)
      );

      // change to the client folder to install app template
      process.chdir(path.resolve(clientPath));

      // fetch the git url now
      exec(command, function (error, stdout, stderr) {
        if (error !== null) {
          var log = stderr.toString();
          gutil.log(gutil.colors.red('[-Error:] ' + log));
          gutil.log(gutil.colors.red('[-Error:] --path ' + appSrc + ' cannot be fetched!'));
          process.exit(0);
        }

        gutil.log(
          gutil.colors.green('[-done:] Successfully fetched and installed the app template ')
        );

        appGenerationLogger();

        // After fetching a git repo, then remove the .git folder
        return rimraf(path.join(dest, 'client', 'app', '.git'), function (error) {
          if (error !== null) {
            var log = stderr.toString();
            gutil.log(gutil.colors.red('[-Error:] ' + log));
            process.exit(0);
          }
          // running npm install callback
          runningCallback(isRunningTest, dest, newFolderName, callback);
        });
      });
    } else {
      // Scaffold the "app/" folder from bundled "ember-rocks"
      gulp.src(appSrc, {dot: true})
        .on('end', function () {
          appGenerationLogger();
          runningCallback(isRunningTest, dest, newFolderName, callback);
        })
        .pipe(gulp.dest(dest + '/client/app'));
    }
  });
}

function npmInstallationFailLogger (err) {
  gutil.log(gutil.colors.red('[-Error:] ' + err));
  gutil.log(gutil.colors.red('[-Error:] npm install failed dramatically.'));
  gutil.log(gutil.colors.red('[-Error:] Need to manually do "npm install" and "bower install"'));
  gutil.log(gutil.colors.red('[-Error:] Before the project is fully ready for development'));
}

function bowerInstalltionFailLogger (err) {
  gutil.log(gutil.colors.red('[-Error:] ' + err));
  gutil.log(gutil.colors.red('[-Error:] bower install failed dramatically.'));
  gutil.log(gutil.colors.red('[-Error:] Need to manually do \'bower install\''));
  gutil.log(gutil.colors.red('[-Error:] Before the project is fully ready for development'));
}

function gitInitializerFailLogger (err) {
  gutil.log(gutil.colors.red('[-Error:] ' + err));
  gutil.log(gutil.colors.red('[-Error:] initialize git repository failed dramatically.'));
  gutil.log(gutil.colors.red('[-Error:] Need to manually do'));
  gutil.log(gutil.colors.red('[-Error:] \'git init && git add . && git commit -m\''));
}

function successInfoLogger (newFolderName) {
  gutil.log(
    gutil.colors.green('[-done:] Initialized a new git repo and did a first commit')
  );
  gutil.log(
    gutil.colors.bold('[-copy:] =>'),
    gutil.colors.cyan('cd ' + newFolderName),
    gutil.colors.gray('# navigate to the newly created application')
  );
  gutil.log(
    gutil.colors.bold('[-copy:] =>'),
    gutil.colors.cyan('em serve'),
    gutil.colors.gray(' # kick start the server, open project in favorite browser,'),
    gutil.colors.gray('auto watch file changes and rebuild the project')
  );
}

function appGenerationLogger () {
  gutil.log(
    gutil.colors.green('[-done:] A new'),
    gutil.colors.cyan('Ember.js'),
    gutil.colors.green('mvc application have been successfully created!')
  );
}

function coreGenerationLogger () {
  gutil.log(
    gutil.colors.green('[-done:] A new'),
    gutil.colors.cyan('Node.js'),
    gutil.colors.green('web server have been successfully created!')
  );
  gutil.log(
    gutil.colors.gray('[-log:]'),
    gutil.colors.magenta('It may take up to 1 minute and half!')
  );
  gutil.log(
    gutil.colors.gray('[-log:]'),
    gutil.colors.magenta('Be patient, fetching packages from internet ...')
  );
}

function pathResolver (relativePath) {
  return path.resolve(__dirname, '..', relativePath);
}

function getSkeletonsCorePath () {
  var skeletonsCorePath = pathResolver('skeletons/core');
  return skeletonsCorePath;
}

function getSkeletonsAppPath (options) {
  // Pass in a valid git url for installing ember-application-template
  var re = /^http(?:s)?:\/\//;
  var userInputPath = options.path;
  // check for remote URL path
  var remoteUrl = (userInputPath) ?
    (re.test(userInputPath)) ?
      userInputPath : ('http://' + userInputPath) : undefined;

  var skeletonsAppPath = (remoteUrl !== undefined) ? remoteUrl : pathResolver('skeletons/app');
  return skeletonsAppPath;
}

var create = function (generatorPath, options) {
  if (!generatorPath || typeof generatorPath !== 'string') {
    gutil.log(gutil.colors.red('[-Error:] Missing directory name.'), 'ex: em new my-app');
    gutil.log(gutil.colors.red('[-Error:]'), 'See \'em new --help\'');
    process.exit(0);
  }

  // Create the folder if it is not existed
  // If existed, do what? maybe just empty it and start scaffolding???
  if (fs.existsSync(generatorPath)) {
    gutil.log(
      gutil.colors.red('[-Error:]'), 'The folder name',
      gutil.colors.red(generatorPath), 'has existed in this directory tree!'
    );
    process.exit(0);
  } else {
    // Create a new directory name what user passed in
    fs.mkdirSync(generatorPath);
  }

  // Setup gulp task, copy the source files into the newly create folder
  setupTask(generatorPath, options);
  // Trigger the generator task
  gulp.start('generator');
};

module.exports = create;
