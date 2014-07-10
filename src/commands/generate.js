var path = require('path'),
    fs = require('fs'),
    exec = require('child_process').exec,
    argv = require('minimist')(process.argv.slice(2)),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename');

var generate = function(generatorPath, options) {
  // Error out when user did not provide any arugments
  if (argv._.length < 2) {
    gutil.log(gutil.colors.red("[-Error:] Missing type:name argument."), "ex: em new route:post");
    gutil.log(gutil.colors.red("[-Error:]"), "See 'em gen --help'");
    process.exit(0);
  }

  var typeAndName = argv._.slice()[1],
    generatorAndTasks = typeAndName.length ? typeAndName.split(':') : undefined,
    validTypes = [ 'component', 'controller', 'helper', 'model', 'route', 'template', 'view', 'mixin', 'adapter' ],
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
        gutil.log(gutil.colors.red('[-Error:] '), gutil.colors.cyan( name ), gutil.colors.red(' must be a valid string.') );
        gutil.log(gutil.colors.red("[-Error:]"), "See 'em gen --help'");
        process.exit(0);
      }
    } else {
      gutil.log(gutil.colors.red('[-Error:] '), gutil.colors.cyan(type), gutil.colors.red(' is not a valid type.') );
      gutil.log(gutil.colors.bold('[-note:] valid types are'), gutil.colors.cyan( validTypes.join(', ') ) );
      process.exit(0);
    }
  } else {
    gutil.log(gutil.colors.red("[-Error:] Provide the wrong argument. It must be in this format "), gutil.colors.cyan('type:name'), ' ex: em gen route:post');
    gutil.log(gutil.colors.red("[-Error:]"), "See 'em gen --help'");
    process.exit(0);
  }

  setupTask(gen);
  // Trigger the generator task
  gulp.start('gen');
};

module.exports = generate;

function setupTask( generator ) {
  //   task: gen
  //   @describe	generate an model,view,store,controller from base template
  return gulp.task('gen', function(callback) {
      var type = generator.type,
        name = generator.name,
        pathName = '',
        moduleName = '',
        i = 0;

      if ( name.indexOf('/') > -1 ) {
        name = name.split('/');
        pathNested = true;
      } else {
        pathNested = false;
      }

      // setup the fileName which used for rename module
      var fileName = pathNested ? name.pop() : name;

      if ( isArray(name) ) {
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

      var srcPath = path.join(__dirname, '..', 'skeletons/generators', type),
          dirName = (type === 'store') ? type : ( type.slice(-1) === 's' ) ? type : type +'s',
          finalPath = pathNested ? dirName + pathName : dirName,
          destPath =  path.resolve('client/app') + '/' + finalPath;

      return gulp.src( srcPath + '.js' )
          .pipe(replace(/\*NAMESPACE\*/g, moduleName))
          .pipe(rename({
            basename : fileName,
            extname: (type === 'template') ? '.hbs' : '.js'
          }))
          .on('end', function() {
            gutil.log(gutil.colors.green('[-done:] Generate a new file at'),  gutil.colors.cyan('client/app/' + finalPath + '/' + fileName + (type === 'template' ? '.hbs' : '.js') ) );
          })
          .pipe(gulp.dest(destPath));
  });
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isArray ( obj ) {
  return Object.prototype.toString.call(obj) == "[object Array]";
}
