'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  fs = require('fs'),
  $ = require('gulp-load-plugins')(),
  del = require('del'),
  opn = require('opn'),
  pagespeed = require('psi');

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
  ],
  clientFolder = 'client',
  path = require('path'),
  server = require('tiny-lr')(),
  modulePrefix = 'rocks',
  compileAllSrc, // Compile all src if filename start with _, or single without leading _
  sassFilePath, // Used to dynamicially set sass path, default to all sass
  // Local Variable
  options = {
    hostname: 'localhost',
    port: 3001
  };

// task: jshint
// @describe need to be passed to be able to build the project
gulp.task('lint', function() {
  var src = [
    'gulpfile.js',
    'client/app/**/*.js',
    '!client/app/utils/register-components.js',
    'server/**/*.js'
  ];

  return gulp.src( src )
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'));
});

// task: stripLRScript
// @describe  Strip out the LiveReload Script tag in HTML
gulp.task('stripLRScript', function() {
  return gulp.src(path.join(__dirname, clientFolder, 'index.html'))
  .pipe( $.replace(
      /<script *src="http:\/\/localhost:\d+\/livereload\.js\?snipver=\d+"><\/script>(\s+)?/g, ''
  ))
  .pipe(gulp.dest(path.join(__dirname, clientFolder)));
});

// task: injectLRScript
// @describe  inject livereload script into index.html
gulp.task('injectLRScript', function() {
  return gulp.src(path.join(__dirname, clientFolder, 'index.html'))
  .pipe( $.replace(
      /<script *src="http:\/\/localhost:\d+\/livereload\.js\?snipver=\d+"><\/script>(\s+)?/g, ''
  ))
 .pipe( $.replace(
    /<\/body>/, '<script src="http://localhost:35729/livereload.js?snipver=1"></script>\n</body>'
  ))
 .pipe(gulp.dest(path.join(__dirname, clientFolder)));
});

// Smart compile: if filename start with _, when save it will compile the whole project.
// if filename is all text without _, when save it will only compile changed file
gulp.task('sass', function() {
  var allSrc = clientFolder + '/assets/styles/sass/**/*.{scss,sass}',
      compileFiles = ( compileAllSrc ) ? allSrc : ( sassFilePath ) ? sassFilePath : allSrc,
      nestedFolder = void 0;

  // When it is single file for compiling, it needs to render it in the right folder path.
  // default it is   appName +'/resources/css',
  // If it is nested folder inside sass/path/to/compileFilename, it will alert the dest folder path
  if ( !compileAllSrc ) {
    var basepathArr = path.dirname(sassFilePath).split('/'),
      len = basepathArr.length,
      lastPos = len -1,
      sassPos = basepathArr.indexOf('sass');

    if ( len > sassPos ) {
      nestedFolder = '';
      var diff = lastPos - sassPos;
      for ( var i = 0 ; i < diff; i++ ) {
        var foldername = '/' + basepathArr[ lastPos - i ];
        nestedFolder = foldername.concat(nestedFolder);
      }
    }
  }

  var destPath = clientFolder + '/assets/styles' + ( ( nestedFolder ) ? nestedFolder : '' );

  return gulp.src( compileFiles )
    .pipe($.rubySass({
      // compass: false,  // default value
      // debugInfo: false,  // default value
      // lineNumbers: false,  // default value
      sourcemap: true,
      style: 'expanded',
      precision: 10,
      loadPath: ['/assets/styles/sass']
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer.apply( this, AutoPrefixerConfig ))
    .pipe(gulp.dest( destPath ))
    .pipe($.size({title: 'compiled css'}))
    .pipe($.notify({ message: 'Compiled <%= file.relative %>' }));
});

// https://github.com/sindresorhus/gulp-imagemin
// @describe remove extra pixels out of images
gulp.task('imagemin', function() {
  var imgSrc = clientFolder + '/assets/images/**/*',
    imgDst = 'build/client/assets/images/';

  return gulp.src(imgSrc)
  .pipe($.cache(
    $.imagemin({
      progressive: true,
      interlaced: true
    })
  ))
  .pipe(gulp.dest(imgDst))
  .pipe($.size({title: '[-log:] images folder'}));
});

// @describe compile es6 modules into amd modules
gulp.task('buildjs', function () {
  return gulp.src(clientFolder + '/app/**/*.js')
    .pipe($.es6ModuleTranspiler({
      type: 'amd',
      moduleName: function(path) {
        return modulePrefix + '/' + path;
      }
    }))
    .pipe($.concat('application.js'))
    .pipe(gulp.dest(clientFolder + '/assets/build/'));
});

// @describe pre-compile handlebars templates
gulp.task('buildhbs', function () {
  return gulp.src(clientFolder + '/app/templates/**/*.hbs')
    .pipe($.emberHandlebars({
      outputType: 'amd',
      templateRoot: modulePrefix + '/templates'
    }))
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest(clientFolder + '/assets/build/'));
});

// @describe build front end code base
gulp.task('build', ['buildjs', 'buildhbs'], function(){
  gutil.log(
    gutil.colors.green('[-done:] application.js and templates.js has been generated!')
  );
});

// @describe Remove the 'build/' folder, start from a clean slate
gulp.task('clean', del.bind(null, ['build'], {force : true} ));

// @describe In release step, use production ready libraries
gulp.task('envProd', function(){
  var src = 'client/index.html',
    dest = 'client';

  return gulp.src(src)
  //.pipe( $.replace( /\/vendors\/jquery\/dist\/jquery.js/, '/vendors/jquery/dist/jquery.min.js'))
      .pipe( $.replace(
          /\/vendors\/handlebars\/handlebars.js/, '/vendors/handlebars/handlebars.min.js'
      ))
      .pipe( $.replace( /\/vendors\/ember\/ember.js/, '/vendors/ember/ember.prod.js'))
      .pipe(gulp.dest(dest));
});

// @describe In development step, use development libraries
gulp.task('envDev', function(){
  var src = 'client/index.html',
    dest = 'client';

  return gulp.src(src)
  //.pipe( $.replace( /\/vendors\/jquery\/dist\/jquery.min.js/, '/vendors/jquery/dist/jquery.js'))
      .pipe( $.replace(
          /\/vendors\/handlebars\/handlebars.min.js/, '/vendors/handlebars/handlebars.js'
      ))
      .pipe( $.replace( /\/vendors\/ember\/ember.prod.js/, '/vendors/ember/ember.js'))
      .pipe(gulp.dest(dest));
});

// copy all the core files and release to production
gulp.task('releaseClient',
  [ 'clean', 'sass', 'lint', 'build', 'stripLRScript', 'envProd'],
  function(){
    var src = 'client/index.html',
      dest = 'build/client';

    // clean task has to be done
    // imagemin will minify all images and copy into build
    gulp.start('imagemin');

    return gulp.src(src)
      .pipe($.useref.assets({searchPath: 'client'}))
      // Concatenate And Minify JavaScript
      .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
      // Remove Any Unused CSS, Used as needed
      // .pipe($.if('*.css', $.uncss({
      //   html: src,
      //   ignore: [ ] // CSS Selectors for UnCSS to ignore
      // })))
      // Concatenate And Minify Styles
      .pipe($.if('*.css', $.csso()))
      .pipe($.useref.restore())
      .pipe($.useref())
      .pipe($.if('*.html', $.minifyHtml()))
      .pipe(gulp.dest(dest))
      .pipe($.size({title: '[-log:] client folder'}));
  });

gulp.task('releaseServer', [ 'releaseClient' ], function(){
  var src = 'server/**/*',
    dest = 'build',
    destServer = dest + '/server';

  gulp.src(src)
    .pipe(gulp.dest(destServer))
    .pipe($.size({title: '[-log:] server folder'}));

  return gulp.src('package.json')
    .pipe( $.replace( /"devDependencies"[\S\s]+?},/, ''))
    .pipe(gulp.dest(dest));
});

gulp.task('release', [ 'releaseServer' ], function(){
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

// task: express
gulp.task('express', function() {
  require('./server/app')(options);
});

gulp.task('open', function () {
  var url = 'http://' + options.hostname + ':' + options.port;
  opn(url);
});

// Run mobile and desktop performance tests via Google PageSpeed Insights
// For a production build process, register for an API key from Google Developer Console
// See http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
// More Info:  https://www.npmjs.org/package/psi
gulp.task('pagespeed', pagespeed.bind(null, {
  // key: key
  nokey: 'true',
  // Update `url` below to the public URL for your site
  url: 'http://mattmadesign.com',
  // default strategy: desktop. Values: mobile, desktop
  strategy: 'mobile',
  locale: 'en_US'
}));

// Notifies livereload of changes detected by `gulp.watch()`
function notifyLivereload(event) {
  // `gulp.watch()` events provide an absolute path
  //  make it relative path. Both relative and absolute should work
  var fileName = path.relative(__dirname, event.path);

  server.changed({
    body: {
      files: [fileName]
    }
  });
}

function rebuildProject(event) {
  switch( path.extname(event.path) ) {
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

gulp.task('serve', [ 'express', 'sass', 'build', 'injectLRScript' ], function() {
  gulp.start('open');
  gulp.watch( clientFolder + '/assets/styles/sass/**/*.{scss,sass}', function(event) {
    sassFilePath = event.path; // Only pass changed file to the sass task
    var basename = path.basename(sassFilePath);
    compileAllSrc = ( basename.indexOf('_') > -1 ) ? true : false;

    if ( sassFilePath && !compileAllSrc ) {
      var contents = fs.readFileSync(sassFilePath, 'utf8'),
        exist = contents.match(/[^\/\/| ]@import/gm);

      if ( exist && exist.length > 0 ) {
        compileAllSrc = true;
      }
    }
    gulp.start('sass');
  });

  server.listen(35729, function(err) {
    if (err) { return gutil.log('\n[-log]', gutil.colors.red(err)); }

    gulp.watch(clientFolder + '/app/**/*.js', rebuildProject);
    gulp.watch(clientFolder + '/app/**/*.hbs', rebuildProject);
    gulp.watch(clientFolder + '/index.html', notifyLivereload);
    gulp.watch(clientFolder + '/assets/build/*.js', notifyLivereload);
    gulp.watch(clientFolder + '/assets/images/**/*', notifyLivereload);
    gulp.watch(clientFolder + '/assets/styles/**/*.css', notifyLivereload);
  });
});

gulp.task('default', [ 'serve' ]);
