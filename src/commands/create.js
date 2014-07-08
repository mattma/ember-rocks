var path = require('path');
var glob = require('glob');
var fs = require('fs');
var exec = require('child_process').exec;
var argv = require('minimist')(process.argv.slice(2));

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    install = require('gulp-install');

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

  // Create a new directory name what user passed in
  fs.mkdirSync(generatorPath);

  var currentAppPath = path.resolve(generatorPath);
  // Setup gulp task, copy the source files into the newly create folder
  setupTask (skeletonsCorePath, skeletonsAppPath, currentAppPath);
  // Trigger the generator task
  gulp.start('generator');
};

module.exports = create;

create.getPaths = function(appPath, env) {
  if (arguments.length > 2) return false;
  if (arguments.length == 1) {
    env = appPath;
    appPath = '.';
  }
  return {
    app: appPath
  };
};

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



// function rmGItRepo(cb) {
//     gutil.log('\n[-log]', gutil.colors.magenta('Removing .git/* ...') );
//     shell.rm('-rf', path.join(__dirname, '..', '..', '.git'));
//     shell.cd(_root);
//     gutil.log('\n[-log]', gutil.colors.magenta('Be Patient, Gulp is doing REALLY hard to initialize your repo ...') );

//     var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         today = new Date(),
//         todayDate = today.getDate(),
//         todayMonth = month[today.getMonth()],
//         todayYear = today.getFullYear(),
//         init = 'git init && git add . && git commit -m "Initial Commit @ ' + todayMonth + ' ' + todayDate + ', ' + todayYear + '"';

//     shell.exec(init, function() {
//         gutil.log('\n[-log]', gutil.colors.green('6th - Initialized a new git repo & did first commit') );
//         gutil.log('\n[-log]', gutil.colors.green('Finished! Your Mobile App Development is ready to go! Hooray!'), '\n[gulp]');
//         cb();
//     });
// }

// function keepingGitRepo(skipPrompt, cb) {
//     // Kick off the command line prompt to accept user input
//     // when first time user kick off `gulp setup --bane appName` with a flag,
//     // by default, we want to kill the repo, start from a fresh point. Remove .git folder
//     // when no flag passed, it will launch the prompt for user to choose
//     if (skipPrompt) {
//         rmGItRepo(cb);
//     } else {
//         prompt.start();

//         var schema = [{
//             description: 'Do you want to init a new repo? [Warning: it will remove your current repo!] (Y or N)',
//             type: 'string',
//             default: 'Y',
//             required: true
//         }];

//         prompt.get(schema, function(err, userInput) {
//             if (err) {
//                 gutil.log('\n[-log]', gutil.colors.red('Cannot run the final task of initializing a git repo!') );
//                 cb();
//             }

//             var result = userInput.question;

//             if (result === 'Y' || result === 'y' || result === 'yes' || result === 'Yes') {
//                 rmGItRepo(cb);
//             } else {
//                 gutil.log('\n[-log]', gutil.colors.cyan('Do not forget to manage your repo! RUN git status && git log !') );
//                 gutil.log('\n[-log]', gutil.colors.green('Finished! Your Mobile App Development is ready to go! Hooray!'), '\n[gulp]');
//                 cb();
//             }
//         });
//     }
// }

// function setupStep(appName, skipPrompt, cb) {

//     // STEP 1
//     // Override config.json  apllicationName value to sencha app variable name
//     gulp.src( _configs.configJsonSrc )
//         .pipe(replace(/"applicationName"(\s+)?:(\s+)?"(\w+)?"/, '"applicationName": "' + appName + '"'))
//         .pipe(gulp.dest( _root ));
//     gutil.log('\n[-log]', 'config.json has updated', gutil.colors.cyan('applicationName: ' + appName));

//     // STEP 2
//     // override  base.jade  sencha app variable name
//     gulp.src( _configs.baseViewSrc )
//         .pipe(replace(/.*/, 'include ../../' + appName + '/index.html'))
//         .pipe(gulp.dest( _configs.baseViewDest ));
//     gutil.log('\n[-log]', 'Setup the include path at', gutil.colors.cyan('server/views/base.jade'));

//     // STEP 3
//     // override app.js  sencha app variable
//     gulp.src( _configs.appJsSrc )
//         .pipe(replace(/senchaAppName\s=\s+\'(\w+)?\'/, 'senchaAppName = \'' + appName + '\''))
//         .pipe(gulp.dest( _configs._server ));
//     gutil.log('\n[-log]', '3rd - Setup the setup', gutil.colors.cyan('server/app.js'), 'sencha appName to', gutil.colors.cyan(appName) );

//     // STEP 4
//     // Create a sample README.md file about this repo
//     var readmeContent = '# ' + appName + '\n\n> Your application description goes here.\n\n\n## Getting started' +
// 			'\n\nWrite your getting startted guide here.\n\n\n## License\n\nMIT License • © [Matt Ma](http://mattmadesign.com)';
//     gulp.src( _configs.readmeSrc )
//         .pipe(replace(/[\s\S]*/gm, ''))
//         .pipe(replace(/[\s\S]*/, readmeContent ))
//         .pipe(gulp.dest(_root));
//     gutil.log('\n[-log]', 'Generate a sample', gutil.colors.cyan('README.md'), ', please, write your own instead!');

//     // STEP 5
//     // Override Compass config.rb in project root with the appName value
//     gulp.src(_configs.configRbSrc )
//         .pipe(replace(/curDir,(?:\s+)?'\s*(.*?)\s*'/, 'curDir, \'' + appName +'\'' ))
//         .on('end', function() {
//             gutil.log('\n[-log]', gutil.colors.cyan('config.rb'), ' is ready to use for your sass compiler task', '\n[gulp]' );
//             // STEP 6
//             // Pass cb to clean current .git repo or remain the old git
//             // Remove the project .git folder and init a new git
//             keepingGitRepo(skipPrompt, cb);
//         })
//         .pipe(gulp.dest(_root));
// }

