var path = require('path'),
    fs = require('fs'),
    exec = require('child_process').exec,
    argv = require('minimist')(process.argv.slice(2)),
    gulp = require('gulp'),
    gutil = require('gulp-util');

var create = function(generatorPath, options) {
  // Error out when user did not provide any arugments
  if (argv._.length < 2) {
    gutil.log(gutil.colors.red("[-Error:] Missing type:name argument."), "ex: em new route:post");
    gutil.log(gutil.colors.red("[-Error:]"), "See 'em gen --help'");
    process.exit(0);
  }

  var typeAndName = argv._.slice()[1],
    generatorAndTasks = typeAndName.length ? typeAndName.split(':') : undefined,
    validTypes = [ 'component', 'controller', 'helper', 'model', 'route', 'template', 'view', 'mixin'],
    gen;

  // Arugments must be in this format: type:name
  if( generatorAndTasks && generatorAndTasks.length > 1 ) {
    var type = generatorAndTasks[0],
        name = generatorAndTasks[1];
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

  console.log('gen: ', gen);
};

module.exports = create;
