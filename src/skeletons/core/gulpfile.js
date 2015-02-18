'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')();
var babel = require('gulp-babel');
var del = require('del');
var opn = require('opn');
var testem = new (require('testem'))();

// https://github.com/ai/autoprefixer. Default: > 1%, last 2 versions, Firefox ESR, Opera 12.1
// Android, BlackBerry or bb, iOS
// Chrome, Firefox or ff, Explorer or ie, Opera, Safari
//
// last 2 versions, last 2 Chrome versions, > 5%, ff > 20, ff >= 20, Firefox ESR, none
// Blackberry and stock Android browsers will not be used in last n versions. Add them by name:
// autoprefixer("last 1 version", "BlackBerry 10", "Android 4")
var AutoPrefixerConfig = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
var path = require('path');
var server = require('tiny-lr')();
var clientFolder = 'client';
var sassRootPath = clientFolder + '/assets/styles/sass/';
// Local Variable
var options = {
  hostname: 'localhost',
  port:     3001
};

// task: jshint
// @describe need to be passed to be able to build the project
gulp.task('jshint', function () {
  var src = [
    'gulpfile.js',
    'client/app/**/*.js',
    'client/tests/**/*.js',
    '!client/app/utils/register-components.js',
    'server/**/*.js'
  ];

  return gulp.src(src)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

// task: jscs
// @describe need to be passed to be able to build the project
gulp.task('jscs', function () {
  var src = [
    '*.js',
    'client/**/*.js',
    'server/**/*.js'
  ];

  return gulp.src(src)
    .pipe($.jscs());
});

// Lint will run code quality task: jscs and jshint
gulp.task('lint', ['jscs', 'jshint']);

// task: stripLRScript
// @describe  Strip out the LiveReload Script tag in HTML
gulp.task('stripLRScript', function () {
  return gulp.src([clientFolder + '/index.html'])
    .pipe(
    $.replace(/<script src="http:\/\/localhost:\d+\/livereload\.js\?snipver=\d+"><\/script>(\s+)?/g,
      '')
  )
    .pipe(gulp.dest(path.join(__dirname, clientFolder)));
});

// task: injectLRScript
// @describe  inject livereload script into index.html
gulp.task('injectLRScript', function () {
  return gulp.src([clientFolder + '/index.html'])
    .pipe(
    $.replace(/<script src="http:\/\/localhost:\d+\/livereload\.js\?snipver=\d+"><\/script>(\s+)?/g,
      '')
  )
    .pipe(
    $.replace(/<\/body>/,
      '<script src="http://localhost:35729/livereload.js?snipver=1"></script>\n</body>')
  )
    .pipe(gulp.dest(path.join(__dirname, clientFolder)));
});

gulp.task('sass', function () {
  var styleDestPath = clientFolder + '/assets/styles';

  return $.rubySass(sassRootPath, {
    sourcemap: true,
    style:     'expanded',
    loadPath:  [sassRootPath]
  })
    .on('error', function (err) {
      console.log('[Error]: ', err.message);
    })
    .pipe($.autoprefixer({
      browsers: AutoPrefixerConfig
    }))
    .pipe($.sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot:     styleDestPath
    }))
    .pipe(gulp.dest(styleDestPath))
    // .pipe($.size({title: 'compiled css'}))
    .pipe($.notify({message: 'Compiled <%= file.relative %>'}));
});

// https://github.com/sindresorhus/gulp-imagemin
// @describe remove extra pixels out of images
gulp.task('imagemin', function () {
  var imgSrc = clientFolder + '/assets/images/**/*';
  var imgDst = 'build/client/assets/images/';

  return gulp.src(imgSrc)
    .pipe($.imagemin({
      progressive: true,
      interlaced:  true
    }))
    .pipe(gulp.dest(imgDst));
  // .pipe($.size({title: '[-log:] images folder'}));
});

// @describe compile es6 modules into amd modules
gulp.task('buildjs', function () {
  return gulp.src(clientFolder + '/app/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.esperantoRocks({
      _evilES3SafeReExports: false,
      strict:                true,
      type:                  'amd',
      moduleRoot:            'client/app/',
      modulePrefix:          'rocks/',
      sourceMap:             true
    }))
    .pipe(babel({
      blacklist: ['useStrict']
    }))
    .pipe($.concat('application.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(clientFolder + '/assets/build/'));
});

// @describe pre-compile handlebars templates
gulp.task('buildhbs', function () {
  return gulp.src(clientFolder + '/app/templates/**/*.hbs')
    .pipe($.htmlbars({
      isHTMLBars:       true,
      templateCompiler: require('./client/assets/vendors/ember/ember-template-compiler')
    }))
    .pipe($.wrapAmd({
      deps:         ['exports'],          // dependency array
      params:       ['__exports__'],        // params for callback
      moduleRoot:   'client/app/',
      modulePrefix: 'rocks/'
    }))
    .pipe($.replace(
      /return export default/, 'return __exports__["default"] ='
    ))
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest(clientFolder + '/assets/build/'));
});

// @describe build front end code base
gulp.task('build', ['buildjs', 'buildhbs'], function () {
  gutil.log(
    gutil.colors.green('[-done:] application.js and templates.js has been generated!')
  );
});

// @describe Remove the 'build/' folder, start from a clean slate
gulp.task('clean', del.bind(null, ['build'], {force: true}));

// @describe In release step, use production ready libraries
gulp.task('envProd', function () {
  var src = 'client/index.html';
  var dest = 'client';

  return gulp.src(src)
    // .pipe( $.replace(/\/vendors\/jquery\/dist\/jquery.js/,'/vendors/jquery/dist/jquery.min.js'))
    .pipe($.replace(
      /\/vendors\/handlebars\/handlebars.js/, '/vendors/handlebars/handlebars.min.js'
    ))
    .pipe($.replace(/\/vendors\/ember\/ember.debug.js/, '/vendors/ember/ember.prod.js'))
    .pipe(gulp.dest(dest));
});

// @describe In development step, use development libraries
gulp.task('envDev', function () {
  var src = 'client/index.html';
  var dest = 'client';

  return gulp.src(src)
    // .pipe( $.replace(/\/vendors\/jquery\/dist\/jquery.min.js/,'/vendors/jquery/dist/jquery.js'))
    .pipe($.replace(
      /\/vendors\/handlebars\/handlebars.min.js/, '/vendors/handlebars/handlebars.js'
    ))
    .pipe($.replace(/\/vendors\/ember\/ember.prod.js/, '/vendors/ember/ember.debug.js'))
    .pipe(gulp.dest(dest));
});

function wireUpMobile (callback) {
  var appPath = 'build/cordova/www/';
  var indexPath = appPath + 'index.html';
  var mainAppPath = appPath + 'assets/scripts/main.min.js';
  var scriptPath = appPath + 'assets/scripts/';
  var serverAppPath = 'build/server/app.js';
  var serverPath = 'build/server';

  gulp.src(indexPath)
    .pipe($.replace(/base(?:\s+)?href=\"\/\"/, 'base href=""'))
    .pipe(gulp.dest(appPath));

  gulp.src(mainAppPath)
    .pipe($.replace(/\{(?:\s+)?location:(\s+)?[\'\"]auto[\'\"](?:\s+)?\}/, '{location:"hash"}'))
    .pipe(gulp.dest(scriptPath));

  gulp.src(serverAppPath)
    .pipe($.replace(/emberApp(?:\s+)?=(?:\s+)?\'client\'/, 'emberApp = \'cordova/www\''))
    .pipe(gulp.dest(serverPath));

  del(['build/client'], {force: true}, function () {
    callback();
  });
}

// copy all the core files and release to production
gulp.task('releaseMobile', ['release'],
  function (callback) {
    var cordovaPath = 'node_modules/ember-rocks/src/skeletons/cordova/**/*';
    var clientPath = 'build/client/**/*';
    var cordovaAppPath = 'build/cordova/www';
    var dest = 'build/cordova/';

    gulp.src(cordovaPath)
      .pipe(gulp.dest(dest));

    gulp.src(clientPath)
      .on('end', function () {
        wireUpMobile(callback);
      })
      .pipe(gulp.dest(cordovaAppPath));
  });

// copy all the core files and release to production
gulp.task('releaseClient',
  ['clean', 'sass', 'lint', 'build', 'envProd'],
  function () {
    var src = 'client/index.html';
    var dest = 'build/client';
    var assets = $.useref.assets({searchPath: 'client'});

    // clean task has to be done
    // imagemin will minify all images and copy into build
    gulp.start('imagemin');

    return gulp.src(src)
      .pipe($.replace(
        /<script src="http:\/\/localhost:\d+\/livereload\.js\?snipver=\d+"><\/script>(\s+)?/g, ''))
      // handle file concatenation but not minification.
      // usage: <!-- build:js scripts/combined.js --><!-- endbuild -->
      .pipe(assets)
      // Concatenate And Minify JavaScript
      .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
      // Concatenate And Minify Styles
      .pipe($.if('*.css', $.csso()))
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.if('*.html', $.minifyHtml()))
      .pipe(gulp.dest(dest));
    // .pipe($.size({title: '[-log:] client folder'}));
  });

gulp.task('copyServer', function () {
  var src = [
    'server/**/*.*'
  ];
  var dest = 'build/server';

  return gulp.src(src, {base: 'server/.'})
    .pipe(gulp.dest(dest));
  // .pipe($.size({title: '[-log:] server folder'}));
});

gulp.task('releaseServer', ['releaseClient'], function () {
  gulp.start('copyServer');
  return gulp.src('package.json')
    .pipe($.replace(/"devDependencies"[\S\s]+?},/, ''))
    .pipe(gulp.dest('build'));
});

gulp.task('release', ['releaseServer'], function () {
  // reset the development libraries
  gulp.start('envDev');
  gutil.log(
    gutil.colors.green('[-done:] Application has been successfully built at'),
    gutil.colors.magenta('~/build ')
  );
  gutil.log(
    gutil.colors.bold('[-copy:] => cd build '),
    gutil.colors.gray('# navigate to the freshly built application')
  );
  gutil.log(
    gutil.colors.bold('[-copy:] => npm install '),
    gutil.colors.gray('# install the dependencies in build folder')
  );
  gutil.log(
    gutil.colors.bold('[-copy:] => node server '),
    gutil.colors.gray('# running your application in production mode')
  );
});

function rerunTest () {
  gulp.start('testem');
}

gulp.task('test', ['prepareTests'], function () {
  $.watch('build/tests/*.js', rerunTest);
  return rerunTest();
});

gulp.task('testem', function () {
  var options = {
    file:     'build/testem.json',  // configFile
    port:     7357,  // testem default port
    cwd:      'build',  // testem rootpath
    // timeout: 10000,
    reporter: 'tap',
    parallel: 1
  };
  testem.startCI(options, function (exitCode) {
    if (!testem.app.reporter.total) {
      console.log(
        'No tests were run, ensure that you have a test launcher (e.g. PhantomJS) enabled.'
      );
    }
    // All tests has been finished. Do something here.
    // console.log('exitCode: ', exitCode);
  });
});

// Clean up the build folder, generate the test files in build folder
// if express server has started, use the existing server for testing
gulp.task('prepareTests', ['clean', 'build', 'sass', 'express'], function () {
  var assets = $.useref.assets({searchPath: 'client'});
  var testsRoot = ['client/tests/*.{html,json}'];

  var dest = 'build';
  var testsDest = dest + '/tests';
  var testsScriptsDest = testsDest + '/assets/scripts';

  // loading test-support scripts and stylesheet
  var testsLibs = [
    'client/tests/assets/scripts/*.js',
    'client/assets/vendors/ember-mocha/ember-mocha.amd.js',
    'client/assets/vendors/mocha/mocha.{js,css}',
    'client/assets/vendors/should/should.js',
    'client/assets/vendors/ember-mocha-adapter/adapter.js'
  ];

  var tests = ['client/tests/assets/helpers/**/*.js',
    'client/tests/unit/**/*.js',
    'client/tests/integration/**/*.js'
  ];

  // Copy the tests/ folder root file.
  // 'test.html' & 'testem.json' configuration file
  gulp.src(testsRoot)
    .pipe(gulp.dest(dest));

  // Copy library scripts/css into the scripts folder
  gulp.src(testsLibs)
    .pipe(gulp.dest(testsScriptsDest));

  // Generate application logic and template script into scripts folder
  gulp.src('client/index.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(testsDest));

  // Rebuild ES6 tests, generate a test file at `build/tests/tests.js`
  function buildTests (reminder) {
    return gulp.src(tests)
      .pipe(babel({
        modules:    'amd',
        sourceRoot: __dirname + '/client/app',
        moduleRoot: 'rocksTest',
        moduleIds:  true
      }))
      .pipe($.concat('tests.js'))
      .on('end', function () {
        if (reminder) {
          gutil.log(
            gutil.colors.green(reminder.successInfo)
          );
          gutil.log(
            gutil.colors.magenta(reminder.watchingInfo)
          );
        }
      })
      .pipe(gulp.dest(testsDest));
  }

  $.watch(tests, function (event) {
    return buildTests();
  });

  return buildTests({
    successInfo:  '[-done:] Using `testem` UI by executing `cd build && testem`',
    watchingInfo: '[-info:] Watching test file changes at folders `tests/unit & tests/integration`'
  });
});

// task: express
gulp.task('express', function () {
  require('./server/app')(options);
});

gulp.task('open', function () {
  var url = 'http://' + options.hostname + ':' + options.port;
  opn(url);
});

// Notifies livereload of changes detected by `gulp.watch()`
function notifyLivereload (event) {
  // `gulp.watch()` events provide an absolute path
  //  make it relative path. Both relative and absolute should work
  var fileName = path.relative(__dirname, event.path);

  server.changed({
    body: {
      files: [fileName]
    }
  });
}

function rebuildProject (event) {
  switch (path.extname(event.path)) {
    case '.sass' :
    case '.scss' :
      gulp.start('sass');
      break;
    case '.hbs' :
      gulp.start('buildhbs');
      break;
    case '.js' :
      gulp.start('buildjs');
      break;
    default :
      gulp.start('build');
      break;
  }
}

gulp.task('serve', ['express', 'sass', 'build', 'injectLRScript'], function () {
  gulp.start('open');

  server.listen(35729, function (err) {
    if (err) {
      return gutil.log('\n[-log]', gutil.colors.red(err));
    }

    $.watch(sassRootPath + '**/*.{scss,sass}', rebuildProject);
    $.watch(clientFolder + '/app/**/*.js', rebuildProject);
    $.watch(clientFolder + '/app/**/*.hbs', rebuildProject);
    $.watch(clientFolder + '/index.html', notifyLivereload);
    $.watch(clientFolder + '/assets/build/*.js', notifyLivereload);
    $.watch(clientFolder + '/assets/images/**/*', notifyLivereload);
    $.watch(clientFolder + '/assets/styles/**/*.css', notifyLivereload);
  });
});

gulp.task('default', ['serve']);
