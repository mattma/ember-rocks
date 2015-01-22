'use strict';

var path = require('path');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var tildify = require('tildify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var stringUtils = require('../utils/string');

function isArray (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function dashizeNameError (filename) {
  if (filename.indexOf('-') === -1) {
    gutil.log(
      gutil.colors.red('[-Error:] '),
      gutil.colors.cyan(filename),
      gutil.colors.red(' must be a dashize string. ex: my-component')
    );
    gutil.log(
      gutil.colors.red('[-Error:]  Generate task has been canceled')
    );
    process.exit(0);
  }
}

function generatorEngine (type, srcPath, moduleName, fileName, finalPath, destPath) {
  var ext = (type === 'template') ? '.hbs' : '.js';
  var fullFilePath = destPath + '/' + fileName + ext;

  // if the file has existed, it will abort the task
  if (fs.existsSync(fullFilePath)) {
    gutil.log(
      gutil.colors.red('[-Error:] '),
      gutil.colors.cyan(fileName + ext),
      gutil.colors.red('has existed at '),
      gutil.colors.magenta(tildify(destPath))
    );
    gutil.log(
      gutil.colors.red('[-Error:]  Generate task has been canceled')
    );
    process.exit(0);
  }

  var dasherizeName = '';
  var classifyName = '';
  var matcher;

  // if generating any testing files, need to clean up moduleName without "Test"
  if (type.indexOf('test') > -1) {
    if (type.indexOf('model-test') > -1) {
      moduleName = moduleName.replace(/ModelTest(\s+)?$/, '');
      dasherizeName = stringUtils.dasherize(moduleName);
    } else {
      matcher = stringUtils.classify(type);
      var dasherizeModuleName = moduleName.replace(new RegExp(matcher), '');

      moduleName = moduleName.replace(/Test(\s+)?$/, '');
      dasherizeName = stringUtils.dasherize(dasherizeModuleName);
    }
  } else {
    matcher = stringUtils.capitalize(type);
    var localModuleName = moduleName.replace(new RegExp(matcher), '');

    dasherizeName = stringUtils.dasherize(localModuleName);
    classifyName = stringUtils.classify(localModuleName);
  }

  // @TODO when generate multiple files on certain type
  // moduleName is not being defined correctly.
  // fine for now, since multiple file generation are only template file
  return gulp.src(srcPath)
    .pipe(replace(/__NAMESPACE__/g, moduleName))
    // __DASHERIZE_NAMESPACE__  mainly used in `-test` generator
    .pipe(replace(/__DASHERIZE_NAMESPACE__/g, dasherizeName))
    // __CLASSIFY_NAMESPACE__ mainly used in regular generator
    .pipe(replace(/__CLASSIFY_NAMESPACE__/g, classifyName))
    .pipe(rename({
      basename: fileName,
      extname:  ext
    }))
    .on('end', function () {
      gutil.log(
        gutil.colors.green('[-done:] Generate'),
        gutil.colors.cyan(fileName + ext),
        gutil.colors.green('at'),
        gutil.colors.magenta(tildify(destPath))
      );
    })
    .pipe(gulp.dest(destPath));
}

function setupTask (generator) {
  //   task: gen
  //   @describe	generate an model,view,store,controller from base template
  return gulp.task('gen', function () {
    var type = generator.type;
    var name = generator.name;
    var pathName = '';
    var moduleName = '';
    var i = 0;
    var pathNested;

    if (name.indexOf('/') > -1) {
      name = name.split('/');
      pathNested = true;
    } else {
      pathNested = false;
    }

    // setup the fileName which used for rename module
    var fileName = pathNested ? name.pop() : name;

    // handle the error case when arg is  component:foo
    // component name has to be dashized string
    // here does not handle the nested path case
    if (type === 'component' && !pathNested) {
      dashizeNameError(fileName);
    }

    if (isArray(name)) {
      // when type is component, name of nest path has to be dashized string
      // when type is template, name[0] is component, name of nest path has to be dashized string
      if (type === 'template' && name[0] === 'component' || type === 'component') {
        dashizeNameError(fileName);
      }
      // build up the nested path
      for (; i < name.length; i++) {
        // 'component' and 'components' resolve as a 'app/templates/components/'
        if (type === 'template' && name[0] === 'component') {
          name[i] = 'components';
        }
        pathName += '/' + name[i];
        moduleName += stringUtils.capitalize(name[i]);
      }
      // append fileName to the moduleName string
      moduleName += stringUtils.capitalize(fileName);
    } else {
      pathName += name;
      moduleName += stringUtils.capitalize(name);
    }

    moduleName += stringUtils.capitalize(type);

    // if it has dashized moduleName, it will camelize
    moduleName = stringUtils.classify(moduleName);

    // ignore the 'store' case, since it is already created
    var typeFolder = path.resolve('client/app', type + 's');

    // if client/app/[type](s) is not existed and it is not a test generator, simply create one
    if (!fs.existsSync(typeFolder) && type.indexOf('test') === -1) {
      fs.mkdirSync(typeFolder);
      gutil.log(
        gutil.colors.gray('[-log:] Created a new folder at '),
        gutil.colors.cyan('~/client/app/' + type + 's')
      );
    }

    // when generator type is route or component
    // it will also generate the template as well
    var srcPath =
      (type === 'route' || type === 'component') ?
        [{
          type:          type,
          generatorPath: path.join(__dirname, '..', 'skeletons/generators', type) + '.js'
        }, {
          type:          'template',
          injection:     ( type === 'component' ) ? 'components' : void 0,
          generatorPath: path.join(__dirname, '..', 'skeletons/generators', 'template.js')
        }]
        : path.join(__dirname, '..', 'skeletons/generators', type) + '.js';

    var dirName, finalDirName, finalPath, destPath;

    // if type is test, or route-test or any sorts, it should append `-test` to the filename
    fileName = (type.indexOf('test') > -1) ? fileName + '-test' : fileName;

    // if it is a string, simple call generatorEngine once
    // else it is an object(array), repeat the generatorEngine call
    if (typeof srcPath === 'string') {
      dirName = (type === 'store') ? type : ( type.slice(-1) === 's' ) ? type : type + 's';

      // Figure out the type is testing generator
      if (type.indexOf('test') > -1) {
        // Is it an Unit Test generator or Integration Test generator
        if (type.indexOf('-test') > -1) {
          var typeArray = type.split('-');
          finalDirName = 'tests/unit/' + typeArray[0] + 's';
        } else {
          finalDirName = dirName + '/integration';
        }
      } else {
        finalDirName = dirName;
      }

      finalPath = pathNested ? finalDirName + pathName : finalDirName;
      destPath = (type.indexOf('test') > -1) ?
      path.resolve('client') + '/' + finalPath
        : path.resolve('client/app') + '/' + finalPath;

      generatorEngine(type, srcPath, moduleName, fileName, finalPath, destPath);
    } else {
      for (var j = 0, l = srcPath.length; j < l; j++) {
        var _type = srcPath[j].type;
        // when original type is 'component'
        // it will create a template file at 'templates/components' folder
        var injection = srcPath[j].injection;

        dirName = (_type === 'store') ? _type : ( _type.slice(-1) === 's' ) ? _type : _type + 's';
        dirName = ( injection ) ? dirName + '/' + injection : dirName;

        finalPath = pathNested ? dirName + pathName : dirName;
        destPath = path.resolve('client/app') + '/' + finalPath;

        generatorEngine(
          _type, srcPath[j].generatorPath, moduleName, fileName, finalPath, destPath
        );
      }
    }
  });
}

// Check the fullname attribute is correct or not
var VALID_FULL_NAME_REGEXP = /^[^:]+.+:[^:]+$/;

function errorHandler (fullName) {
  gutil.log(
    gutil.colors.red('[-Error:] Invalid argument, expected: `type:name` got: '),
    gutil.colors.bold(fullName)
  );

  gutil.log(
    '[-Syntax:]',
    gutil.colors.cyan('type:name'), ' ex: em generate route:post'
  );

  gutil.log(
    gutil.colors.red('[-Error:]'),
    'See \'em generate --help\''
  );
  process.exit(0);
}

var generate = function (options) {
  // if the folder 'client/app' is not existed
  // can assume that the project may not be created by Ember Rocks
  if (!fs.existsSync('client') && !fs.existsSync('client/app')) {
    gutil.log(
      gutil.colors.red(
        '[-Error:] This project may not be created by \'Ember-Rocks\'\n'
      ),
      gutil.colors.red(
        '[-Error:] `em new [dirName]` does not install the NPM packages dependencies correctly'
      )
    );
    process.exit(1);
  }

  // Error out when user did not provide any argument
  if (argv._.length < 2) {
    gutil.log(gutil.colors.red('[-Error:] Missing type:name argument.'), 'ex: em new route:post');
    gutil.log(gutil.colors.red('[-Error:]'), 'See \'em generate --help\'');
    process.exit(0);
  }

  var typeAndName = argv._.slice()[1];

  if (!VALID_FULL_NAME_REGEXP.test(typeAndName)) {
    errorHandler(typeAndName);
  }

  var validTypes = [
    'adapter', 'component', 'controller', 'helper', 'initializer', 'mixin', 'model',
    'route', 'serializer', 'template', 'transform', 'util', 'view',
    'test', 'adapter-test', 'component-test', 'controller-test', 'helper-test',
    'initializer-test', 'mixin-test', 'model-test', 'route-test', 'serializer-test',
    'transform-test', 'util-test', 'view-test'
  ];
  var gen;
  var generatorAndTasks = typeAndName.split(':', 2);
  var type = generatorAndTasks[0];
  var name = generatorAndTasks[1];

  // type could be either route or routes
  type = (type.slice(-1) === 's') ? type.substring(0, type.length - 1) : type;

  // Type must be in the `validTypes` array
  if (validTypes.indexOf(type) > -1) {
    // Name must be a valid string
    if (name.length > 0) {
      gen = {
        type: type,
        name: name
      };
    } else {
      gutil.log(
        gutil.colors.red('[-Error:] '),
        gutil.colors.cyan(name),
        gutil.colors.red(' must be a valid string.')
      );
      gutil.log(gutil.colors.red('[-Error:]'), 'See \'em generate --help\'');
      process.exit(0);
    }
  } else {
    gutil.log(
      gutil.colors.red('[-Error:] '),
      gutil.colors.cyan(type),
      gutil.colors.red(' is not a valid type.')
    );
    gutil.log(
      gutil.colors.bold('[-note:] valid types are'),
      gutil.colors.cyan(validTypes.join(', '))
    );
    process.exit(0);
  }

  setupTask(gen);
  // Trigger the generator task
  gulp.start('gen');
};

module.exports = generate;
