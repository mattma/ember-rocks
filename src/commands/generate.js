'use strict';

var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var tildify = require('tildify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var stringUtils = require('../utils/string');

// Add a test file template into the generating file list
function injectTestFile (srcPath, type) {
  var injectTestFile = [{
    type:          type + '-test',
    injection:     true,
    generatorPath: path.join(__dirname, '..', 'skeletons/generators', type) + '-test.js',
    generateUnitTest: true
  }];
  // flag `-T` or `--test`, will generate the unit test file
  srcPath = srcPath.concat(injectTestFile);

  // return the modified `srcPath` array
  return srcPath;
}

// Add a template file template into the generating file list
function injectTemplateFile (srcPath, type) {
  var injectTemplateGenerator = [{
    type:          'template',
    // injection: components is needed to setup the correct path: "templates/components/*.hbs"
    injection:     (type === 'component') ? 'components' : true,
    generatorPath: path.join(__dirname, '..', 'skeletons/generators/template.js')
  }];
  srcPath = srcPath.concat(injectTemplateGenerator);

  // return the modified `srcPath` array
  return srcPath;
}

// Add a default type template into the generating file list
function injectDefaultTemplate (srcPath, type) {
  var defaultTemplateGenerator = [{
    type:          type,
    generatorPath: path.join(__dirname, '..', 'skeletons/generators', type) + '.js'
  }];
  srcPath = srcPath.concat(defaultTemplateGenerator);

  // return the modified `srcPath` array
  return srcPath;
}

function injectFiles (type, options) {
  var srcPath = []; // the filePath/srcPath would be used to generate files

  // check for the options mode, to generate an unit test file or not
  if (options.test || false) {
    srcPath = injectTestFile(srcPath, type);
  }
  // when `type` is `route` or `component`, will generate its template file
  if (type === 'route' || type === 'component') {
    srcPath = injectTemplateFile(srcPath, type);
  }
  // Default, it will generate whatever user inserts the `type`
  srcPath = injectDefaultTemplate(srcPath, type);
  return srcPath;
}

function generateSimpleFile (type, srcPath, moduleName, fileName, pathName, options) {
  var dirName = (type === 'store') ? type : (type.slice(-1) === 's') ? type : type + 's';
  var finalDirName;
  var finalPath;

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

  finalPath = options.nestPath ? finalDirName + pathName : finalDirName;

  var destPath = (type.indexOf('test') > -1) ?
  path.resolve('client') + '/' + finalPath :
  path.resolve('client/app') + '/' + finalPath;

  var ext = (type === 'template') ? '.hbs' : '.js';
  var fullFilePath = destPath + '/' + fileName + ext;

  // if the file has existed in destination folder, exit the program. with Two exception,
  // 1. injection file, if true & existed, handle the case in the next condition
  // 2, generate a template, if existed, stop the template generating, won't exit program
  if (!!checkFileExisted(fullFilePath, null, fileName, ext, destPath)) {
    return;
  }

  generatorEngine(type, srcPath, moduleName, fileName, destPath);
}

function generateFileTask (srcPath, moduleName, fileName, pathName, options) {
  for (var i = 0, l = srcPath.length; i < l; i++) {
    var _type = srcPath[i].type;
    var dirName;
    // Not asked by user input, create automatically by framework
    var injection = srcPath[i].injection;
    // original fileName, or if test is true, append "-test"
    var finalFileName;
    // used to build up the final output directory path "destPath"
    var finalPath;
    // final output directory path
    var destPath;

    // Update the direction name, if store, won't append 's'
    dirName = (_type === 'store') ? _type : (_type.slice(-1) === 's') ? _type : _type + 's';
    // when template is injected automatically, setup the right path "templates/components/"
    dirName = (injection === 'components') ? dirName + '/' + injection : dirName;

    // Figure out the type is testing generator
    if (_type.indexOf('test') > -1) {
      // Is it an Unit Test generator or Integration Test generator
      if (_type.indexOf('-test') > -1) {
        var typeArray = _type.split('-');
        dirName = 'tests/unit/' + typeArray[0] + 's';
      } else {
        dirName = dirName + '/integration';
      }
    }

    finalPath = options.nestPath ? dirName + pathName : dirName;

    if(_type.indexOf('test') > -1 && !!injection === false ) {
      // srcPath length is 1, no injection files, only ask for one test file generation
      destPath = path.resolve('client') + '/' + finalPath;
      console.log('destPath: ', destPath);
      finalFileName = fileName;
    } else if (options.test && srcPath[i].generateUnitTest) {
      // user pass "--test" flag, and inject test is true, generate an unit test file or not
      destPath = path.resolve('client/tests/unit') + '/' + dirName;
      console.log('second destPath: ', destPath);
      finalFileName = fileName + '-test';
    } else {
      // generate an application development file
      destPath = path.resolve('client/app') + '/' + finalPath;
      finalFileName = fileName;
    }

    var ext = (_type === 'template') ? '.hbs' : '.js';
    var fullFilePath = destPath + '/' + fileName + ext;

    // if the file has existed in destination folder, exit the program. with Two exception,
    // 1. injection file, if true & existed, handle the case in the next condition
    // 2, generate a template, if existed, stop the template generating, won't exit program
    if (!!checkFileExisted(fullFilePath, injection, fileName, ext, destPath)) {
      return;
    }

    generatorEngine(_type, srcPath[i].generatorPath, moduleName, finalFileName, destPath);
  }
}

function generateFile (type, moduleName, fileName, pathName, options) {
  // an Array, contains a list of generating file info: path, generatorPath, type, etc
  var srcPath = injectFiles(type, options);
  generateFileTask (srcPath, moduleName, fileName, pathName, options);
}

// Core function to generate the file from template, insert into the destination folder
function generatorEngine (type, srcPath, moduleName, fileName, destPath) {
  var ext = (type === 'template') ? '.hbs' : '.js';
  var namespace = stringUtils.classify(moduleName + '-' + type);
  var dasherizeName = stringUtils.dasherize(moduleName);
  var classifyName = stringUtils.classify(moduleName);

  // __DASHERIZE_NAMESPACE__  mainly used in `-test` generator
  // __CLASSIFY_NAMESPACE__ mainly used in regular generator
  return gulp.src(srcPath)
    .pipe(replace(/__NAMESPACE__/g, namespace))
    .pipe(replace(/__DASHERIZE_NAMESPACE__/g, dasherizeName))
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

// @describe	generate an model,view,store,controller from base template
function runTasks (generator, options) {
  var type = generator.type;
  var name = generator.name;
  var pathName = '';
  var moduleName = '';
  var fileName; // setup the fileName which used for rename module
  // var srcPath = []; // the filePath/srcPath would be used to generate files

  // based on the passing name arguments, to determine it is an nested folder structure
  // or it is a simple file generation. assign a var `fileName` for current file name
  if (name.indexOf('/') > -1) {
    options.nestPath = true;
    name = name.split('/');
    fileName = name.pop();
  } else {
    options.nestPath = false;
    fileName = name;
  }

  // component name has to be dash separated string
  validComponentName(type, fileName, name[0], options);

  // ignore the 'store' case, since it is already created
  // create a folder if it is not existed in the "client/app/"
  createFolderWhenMissing(type);

  // Setup `pathName`
  // `moduleName` would be used inside replacement of template placeholder
  if (options.nestPath) {
    // build up the nested path
    for (var i = 0; i < name.length; i++) {
      // 'component' and 'components' resolve as a 'app/templates/components/'
      if (type === 'template' && name[0] === 'component') {
        name[i] = 'components';
      }
      pathName += '/' + name[i];
      moduleName += name[i] + '-';
    }
    // append fileName to the moduleName string
    moduleName += fileName;
  } else {
    pathName += name;
    moduleName = name;
  }

  // if type is test, or route-test or any sorts, it should append `-test` to the filename
  fileName = (type.indexOf('test') > -1) ? fileName + '-test' : fileName;

  // Handle `flag` of `--test` case, and other special case
  // like generate template when the type is route or component, etc
  // srcPath = generatorSrcPath(type, srcPath, options);

  generateFile(type, moduleName, fileName, pathName, options);

  // if it is a string, simple call generatorEngine once
  // else it is an object(array), repeat the generatorEngine call
  //if (typeof srcPath === 'string') {
  //  generateSimpleFile(type, srcPath, moduleName, fileName, pathName, options);
  //} else {
  //  generateNestedFile(type, srcPath, moduleName, fileName, pathName, options);
  //}
}

// Entry point of the generate command
function generate (generator, options) {
  options = options || {};
  // must be Ember Rocks project, user input must exist and is a string,
  // generator must be in the right format separated by ":", otherwise, exit the program
  validProjectAndValidUserInput(generator);

  var validTypes = [
    'adapter', 'component', 'controller', 'helper', 'initializer', 'mixin', 'model',
    'route', 'serializer', 'template', 'transform', 'util', 'view',
    'test', 'adapter-test', 'component-test', 'controller-test', 'helper-test',
    'initializer-test', 'mixin-test', 'model-test', 'route-test', 'serializer-test',
    'transform-test', 'util-test', 'view-test'
  ];
  var generatorAndTasks = generator.split(':', 2);
  var type = generatorAndTasks[0];
  // type could be either route or routes
  type = (type.slice(-1) === 's') ? type.substring(0, type.length - 1) : type;

  var gen = {
    type: type,
    name: generatorAndTasks[1]
  };

  // must be a valid name, must be a valid type, otherwise, exit the program
  validTypesAndValidName(gen, validTypes);
  // only run tasks when it is a valid type and name
  runTasks(gen, options);
}

module.exports = generate;

function validProjectAndValidUserInput (generator) {
  // if the folder 'client/app' is not existed
  // can assume that the project may not be created by Ember Rocks
  if (!fs.existsSync('client') && !fs.existsSync('client/app')) {
    gutil.log(gutil.colors.red('[-Error:] This project may not be created by \'Ember-Rocks\'\n'),
      gutil.colors.red(
        '[-Error:] `em new [dirName]` does not install the NPM packages dependencies correctly'));
    exitProgram(1);
  }

  // Error out when user did not provide any argument
  if (!generator || typeof generator !== 'string') {
    gutil.log(gutil.colors.red('[-Error:] Missing type:name argument.'), 'ex: em new route:post');
    gutil.log(gutil.colors.red('[-Error:]'), 'See \'em generate --help\'');
    exitProgram();
  }

  // Check the fullname(generator) attribute is correct or not
  var VALID_FULL_NAME_REGEXP = /^[^:]+.+:[^:]+$/;
  if (!VALID_FULL_NAME_REGEXP.test(generator)) {
    gutil.log(gutil.colors.red('[-Error:] Invalid argument, expected: `type:name` got: '),
      gutil.colors.bold(generator));

    gutil.log('[-Syntax:]', gutil.colors.cyan('type:name'), ' ex: em generate route:post');

    gutil.log(gutil.colors.red('[-Error:]'), 'See \'em generate --help\'');
    exitProgram();
  }
}

function validTypesAndValidName (gen, validTypes) {
  var type = gen.type;
  var name = gen.name;

  // Type must be in the `validTypes` array
  if (validTypes.indexOf(type) > -1) {
    // Name must be a valid string
    if (name.length <= 0) {
      gutil.log(gutil.colors.red('[-Error:] '), gutil.colors.cyan(name),
        gutil.colors.red(' must be a valid string.'));

      gutil.log(gutil.colors.red('[-Error:]'), 'See \'em generate --help\'');
      exitProgram();
    }
  } else {
    gutil.log(gutil.colors.red('[-Error:] '), gutil.colors.cyan(type),
      gutil.colors.red(' is not a valid type.'));

    gutil.log(gutil.colors.bold('[-note:] valid types are'),
      gutil.colors.cyan(validTypes.join(', ')));
    exitProgram();
  }
}

function validComponentName (type, fileName, folderName, options) {
  // Three error cases:
  // case 1: `em g component:name`         <= simple case
  // case 2: `em g component:nested/name`  <= nested case
  // case 3: `em g template:component/name`  <= name of nest path has to be dashized string
  if (type === 'component' ||
    type === 'template' && options.nestPath &&
    folderName === 'components' || folderName === 'component') {
    if (fileName.indexOf('-') === -1) {
      gutil.log(gutil.colors.red('[-Error:] '), gutil.colors.cyan(fileName),
        gutil.colors.red(' must be a dashize string. ex: my-component')
      );
      gutil.log(gutil.colors.red('[-Error:]  Generate task has been canceled'));
      exitProgram();
    }
  }
}

function createFolderWhenMissing (type) {
  var typeFolder = path.resolve('client/app', type + 's');

  // if client/app/[type](s) is not existed and it is not a test generator, simply create one
  if (!fs.existsSync(typeFolder) && type.indexOf('test') === -1) {
    fs.mkdirSync(typeFolder);
    gutil.log(gutil.colors.gray('[-log:] Created a new folder at '),
      gutil.colors.cyan('~/client/app/' + type + 's'));
  }
}

function checkFileExisted (fullFilePath, injection, fileName, ext, destPath) {
  if (fs.existsSync(fullFilePath)) {
    if (!!injection) {
      gutil.log(
        gutil.colors.red('[-Warning:] '),
        gutil.colors.cyan(fileName + ext),
        gutil.colors.red('has existed at '),
        gutil.colors.magenta(tildify(destPath))
      );
      // Does not continue to generate file, but won't stop the process
      return true;
    } else {
      gutil.log(
        gutil.colors.red('[-Error:] '),
        gutil.colors.cyan(fileName + ext),
        gutil.colors.red('has existed at '),
        gutil.colors.magenta(tildify(destPath))
      );
      gutil.log(
        gutil.colors.red('[-Error:]  Generate task has been canceled')
      );
      // File is existed in the system, kill the process
      exitProgram();
    }
  }
}

function exitProgram (errNumber) {
  errNumber = errNumber || 0;
  process.exit(errNumber);
}
