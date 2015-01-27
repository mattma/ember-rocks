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

// Promises for each task...

// Fetching the "app/" content from any "git" protocol of github
function appContentFetchingFromGithub (appSrc, dest) {
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

  return new Promise(function (resolve, reject) {
    // fetch the git url now
    exec(command, function (err, stdout, stderr) {
      if (err !== null) {
        appContentFetchingError(stderr, reject, {appSrc: appSrc});
      }
      // After fetching a git repo, then remove the .git folder
      rimraf(path.join(dest, 'client', 'app', '.git'), function (err) {
        if (err !== null) {
          appContentFetchingError(stderr, reject);
        }
        // this function has been decorated with options
        appGenerationLogger(resolve, {remote: true})();
      });
    });
  });
}

// Copying "app/" folder contents from Local file system bundled with "ember-rocks"
function appContentScaffoldFromLocal (appSrc, dest) {
  return new Promise(function (resolve, reject) {
    gulp.src(appSrc, {dot: true})
      .on('error', reject)
      .on('end', appGenerationLogger(resolve))
      .pipe(gulp.dest(dest + '/client/app'));
  });
}

// Copy "scaffold/core" files to the destination
function copyCoreContent (dest) {
  // get the full path to the core of application. ( Server && Client )
  var skeletonsCorePath = getSkeletonsCorePath();
  var coreSrc = [skeletonsCorePath + '/**/*'];

  return new Promise(function (resolve, reject) {
    // Scaffold the "core/" of the application. ( Server && Client )
    gulp.src(coreSrc, {dot: true})
      .on('error', reject)
      .on('end', coreGenerationLogger(resolve))
      .pipe(gulp.dest(dest));
  });
}

// "npm install" task to install project module dependencies
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

// "bower install" task to install client side libraries
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

// "git init" task to kick start a git project
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

// rename `gitignore` to `.gitignore`
// then remove the originial `gitignore`
function setupGitignore (dest) {
  gulp.src('./gitignore')
    .pipe(rename('.gitignore'))
    .on('end', function () {
      rimraf('./gitignore', function () {
      });
    })
    .pipe(gulp.dest(dest));
}

// Second series of tasks
// Flow Control: execute serial tasks: npm install, bower install, git init
function installerTasks (newFolderName, dest) {
  var tasks = [
    npmInstaller(dest),
    bowerInstaller(dest),
    gitInitializer(dest)
  ];

  Promise.all(tasks)
    .then(function () {
      successInfoLogger(newFolderName);
    })
    .catch(function (err, errFunction) {
      // output error for individual task
      errFunction(err);
    });
}

// executed by "runTasks" function, copy "app/" assets
function copyAppContent (dest, options) {
  // get the full path to the ember application or take the generator from github or an URL
  var appSrcPath = getSkeletonsAppPath(options);
  var appSrc = ( appSrcPath.indexOf('http') !== -1 ) ? appSrcPath : [appSrcPath + '/**/*'];
  var ret;

  // if option.path exist and it is a git url, it will be fetched
  // Otherwise, it will use the default scaffold folder app
  // it should return an Promise
  if (typeof appSrc === 'string') {
    // fetching "app/" contents from github repo url
    ret = appContentFetchingFromGithub(appSrc, dest);
  } else {
    // Scaffolding the "app/" folder from bundled "ember-rocks"
    ret = appContentScaffoldFromLocal(appSrc, dest);
  }
  return ret;
}

function runTasks (newFolderName, options) {
  var dest = path.resolve(newFolderName);
  // check for the mode, is running test or not
  var isRunningTest = options.test || false;

  gutil.log(gutil.colors.gray('[-log:]'), 'Starting to generate an application at',
    gutil.colors.magenta(tildify(dest))
  );

  var tasks = [
    copyCoreContent(dest),
    copyAppContent(dest, options)
  ];

  Promise.all(tasks)
    .then(function () {
      // switch to the newly generated folder
      process.chdir(dest);
      // can be run in concurrency, since it won't affect other tasks
      setupGitignore(dest);
    })
    .then(function () {
      if (!isRunningTest) {
        installerTasks(newFolderName, dest);
      }
    })
    .catch(function () {
      gutil.log(gutil.colors.red('[-Error:]'),
        'ember-rocks could not generate an application due to the error above!');
      process.exit(0);
    });
}

// Create command entry point function
function create (generatorPath, options) {
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
  // Orchestration, copy the source files into the newly create folder
  runTasks(generatorPath, options);
}

module.exports = create;

// Resolve project paths start...

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

// App content github fetching error handler start...

function appContentFetchingError (err, reject, options) {
  return function () {
    var log = err.toString();
    gutil.log(gutil.colors.red('[-Error:] ' + log));
    if (options.appSrc) {
      gutil.log(gutil.colors.red('[-Error:] --path ' + appSrc + ' cannot be fetched!'));
    }
    reject(err);
  }
}

// Logger functions start...

// Trigger when NPM installation fails, output error message in terminal
function npmInstallationFailLogger (err) {
  gutil.log(gutil.colors.red('[-Error:] ' + err));
  gutil.log(gutil.colors.red('[-Error:] npm install failed dramatically.'));
  gutil.log(gutil.colors.red('[-Error:] Need to manually do "npm install" and "bower install"'));
  gutil.log(gutil.colors.red('[-Error:] Before the project is fully ready for development'));
}

// Trigger when Bower installation fails, output error message in terminal
function bowerInstalltionFailLogger (err) {
  gutil.log(gutil.colors.red('[-Error:] ' + err));
  gutil.log(gutil.colors.red('[-Error:] bower install failed dramatically.'));
  gutil.log(gutil.colors.red('[-Error:] Need to manually do \'bower install\''));
  gutil.log(gutil.colors.red('[-Error:] Before the project is fully ready for development'));
}

// Trigger when Git initialization fails, output error message in terminal
function gitInitializerFailLogger (err) {
  gutil.log(gutil.colors.red('[-Error:] ' + err));
  gutil.log(gutil.colors.red('[-Error:] initialize git repository failed dramatically.'));
  gutil.log(gutil.colors.red('[-Error:] Need to manually do'));
  gutil.log(gutil.colors.red('[-Error:] \'git init && git add . && git commit -m\''));
}

// When `em new` command succeed and output successfully message to user
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

// When "app/" folder has been inserted into "client/" for client side development
function appGenerationLogger (resolve, options) {
  options = options || {};
  return function () {
    if (options.remote) {
      gutil.log(
        gutil.colors.green('[-done:] Successfully fetched and installed the app template ')
      );
    }
    gutil.log(
      gutil.colors.green('[-done:] A new'),
      gutil.colors.cyan('Ember.js'),
      gutil.colors.green('mvc application have been successfully created!')
    );
    resolve();
  }
}

// When all root files and core files has been generated from the scaffold folder
function coreGenerationLogger (resolve) {
  return function () {
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
    resolve();
  }
}
