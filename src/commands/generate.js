'use strict';

var path = require('path'),
    fs = require('fs'),
    argv = require('minimist')(process.argv.slice(2)),
    tildify = require('tildify'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename');

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isArray ( obj ) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

var STRING_CAMELIZE_REGEXP = (/(\-|_|\.|\s)+(.)?/g);

function camelize(str) {
  return str.replace(STRING_CAMELIZE_REGEXP, function(match, separator, chr) {
    return chr ? chr.toUpperCase() : '';
  });
}

function dashizeNameError ( filename ) {
  if ( filename.indexOf('-') === -1 ) {
    gutil.log(
      gutil.colors.red('[-Error:] '),
      gutil.colors.cyan( filename ),
      gutil.colors.red(' must be a dashize string. ex: my-component')
    );
    gutil.log(
      gutil.colors.red('[-Error:]  Generate task has been canceled')
    );
    process.exit(0);
  }
}

function generatorEngine(type, srcPath, moduleName, fileName, finalPath, destPath ) {

     var ext = (type === 'template') ? '.hbs' : '.js',
        fullFilePath = destPath + '/' + fileName + ext;

    // if the file has existed, it will abort the task
    if ( fs.existsSync( fullFilePath ) ) {
      gutil.log(
        gutil.colors.red('[-Error:] '),
        gutil.colors.cyan(fileName + ext),
        gutil.colors.red('has existed at '),
        gutil.colors.magenta( tildify(destPath) )
      );
      gutil.log(
        gutil.colors.red('[-Error:]  Generate task has been canceled')
      );
      process.exit(0);
    }

    // @TODO when generate multiple files on certain type
    // moduleName is not being defined correctly.
    // fine for now, since multiple file generation are only template file
    return gulp.src( srcPath )
      .pipe(replace(/__NAMESPACE__/g, moduleName))
      .pipe(rename({
        basename : fileName,
        extname: ext
      }))
      .on('end', function() {
        gutil.log(
          gutil.colors.green('[-done:] Generate'),
          gutil.colors.cyan(fileName + ext),
          gutil.colors.green('at'),
          gutil.colors.magenta( tildify(destPath) )
        );
      })
      .pipe(gulp.dest(destPath));
}

function setupTask( generator ) {
  //   task: gen
  //   @describe	generate an model,view,store,controller from base template
  return gulp.task('gen', function() {
      var type = generator.type,
        name = generator.name,
        pathName = '',
        moduleName = '',
        i = 0,
        pathNested;

      if ( name.indexOf('/') > -1 ) {
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
      if ( type === 'component' && !pathNested ) {
        dashizeNameError(fileName);
      }

      if ( isArray(name) ) {
        // when type is component, name of nest path has to be dashized string
        // when type is template, name[0] is component, name of nest path has to be dashized string
        if ( type === 'template' && name[0] === 'component' || type === 'component') {
          dashizeNameError(fileName);
        }
        // build up the nested path
        for( ; i < name.length; i++) {
          // 'component' and 'components' resolve as a 'app/templates/components/'
          if ( type === 'template' && name[0] === 'component') {
            name[i] = 'components';
          }
          pathName += '/' + name[i];
          moduleName += capitaliseFirstLetter(name[i]);
        }
        // append fileName to the moduleName string
        moduleName += capitaliseFirstLetter(fileName);
      } else {
        pathName += name;
        moduleName += capitaliseFirstLetter(name);
      }

      moduleName += capitaliseFirstLetter(type);

      // if it has dashized moduleName, it will camelize
      moduleName = camelize(moduleName);

      // ignore the 'store' case, since it is already created
      var typeFolder = path.resolve('client/app', type+'s');

      // if client/app/[type](s) is not existed, simply create one
      if (!fs.existsSync(typeFolder)) {
        fs.mkdirSync(typeFolder);
        gutil.log(
          gutil.colors.gray('[-log:] Created a new folder at '),
          gutil.colors.cyan( '~/client/app/' +  type + 's')
        );
      }

      // when generator type is route or component
      // it will also generate the template as well
      var srcPath =
          (type === 'route' || type === 'component') ?
            [{
                type: type,
                generatorPath: path.join(__dirname, '..', 'skeletons/generators', type)  + '.js'
              }, {
                type: 'template',
                injection: ( type === 'component' ) ? 'components' : void 0,
                generatorPath: path.join(__dirname, '..', 'skeletons/generators', 'template.js')
              }]
            : path.join(__dirname, '..', 'skeletons/generators', type) + '.js';

      var dirName, finalDirName, finalPath, destPath;

      // if type is test, or route-test or any sorts, it should append `-test` to the filename
      fileName = (type.indexOf('test') > -1) ? fileName+'-test' : fileName;

      // if it is a string, simple call generatorEngine once
      // else it is an object(array), repeat the generatorEngine call
      if ( typeof srcPath === 'string' ) {

        dirName = (type === 'store') ? type : ( type.slice(-1) === 's' ) ? type : type +'s';

        if (type.indexOf('test') > -1) {
          if(type.indexOf('-test') > -1) {
            var typeArray = type.split('-');
            finalDirName = 'tests/unit/' + typeArray[0] + 's';
          } else {
            finalDirName = dirName + '/integration';
          }
        } else {
          finalDirName = dirName;
        }

        finalPath = pathNested ? finalDirName + pathName : finalDirName;
        destPath =  (type.indexOf('test') > -1) ?
          path.resolve('client') + '/' + finalPath
          : path.resolve('client/app') + '/' + finalPath;

        generatorEngine( type, srcPath, moduleName, fileName, finalPath, destPath );
      } else {

        for ( var j = 0, l = srcPath.length; j < l; j++ ) {
          var _type = srcPath[j].type,
            // when original type is 'component'
            // it will create a template file at 'templates/components' folder
            injection = srcPath[j].injection;

          dirName = (_type === 'store') ? _type : ( _type.slice(-1) === 's' ) ? _type : _type +'s';
          dirName = ( injection ) ? dirName + '/' + injection : dirName;

          finalPath = pathNested ? dirName + pathName : dirName;
          destPath =  path.resolve('client/app') + '/' + finalPath;

          generatorEngine(
            _type, srcPath[j].generatorPath, moduleName, fileName, finalPath, destPath
          );
        }
      }
    });
}

var generate = function(options) {

  // if the folder 'client/app' is not existed
  // can assume that the project may not be created by Ember Rocks
  if ( !fs.existsSync('client') && !fs.existsSync('client/app') ) {
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

  // Error out when user did not provide any arugments
  if (argv._.length < 2) {
    gutil.log(gutil.colors.red('[-Error:] Missing type:name argument.'), 'ex: em new route:post');
    gutil.log(gutil.colors.red('[-Error:]'), 'See \'em generate --help\'');
    process.exit(0);
  }

  var typeAndName = argv._.slice()[1],
    generatorAndTasks = typeAndName.length ? typeAndName.split(':') : undefined,
    validTypes = [
      'adapter', 'component', 'controller', 'helper', 'initializer', 'mixin', 'model',
      'route', 'serializer', 'template', 'transform', 'util', 'view',
      'test', 'adapter-test', 'component-test', 'controller-test', 'helper-test', 'initializer-test',
      'mixin-test', 'model-test', 'route-test', 'serializer-test', 'transform-test', 'util-test', 'view-test'
    ],
    gen;

  // Arugments must be in this format: type:name
  if( generatorAndTasks && generatorAndTasks.length > 1 ) {
    var type = generatorAndTasks[0],
        name = generatorAndTasks[1];

    // type could be either route or routes
    type = ( type.slice(-1) === 's' ) ? type.substring(0, type.length - 1) : type;

    // Type must be in the `validTypes` array
    if (validTypes.indexOf(type) > -1) {
      // Name must be a valid string
      if( name.length > 0 ) {
        gen = {
          type: type,
          name: name
        };
      } else {
        gutil.log(
          gutil.colors.red('[-Error:] '),
          gutil.colors.cyan( name ),
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
        gutil.colors.cyan( validTypes.join(', ') )
      );
      process.exit(0);
    }
  } else {
    gutil.log(
      gutil.colors.red('[-Error:] Provide the wrong argument. It must be in this format '),
      gutil.colors.cyan('type:name'), ' ex: em generate route:post'
    );
    gutil.log(
      gutil.colors.red('[-Error:]'),
      'See \'em generate --help\''
    );
    process.exit(0);
  }

  setupTask(gen);
  // Trigger the generator task
  gulp.start('gen');
};

module.exports = generate;
