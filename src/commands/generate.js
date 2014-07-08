var path = require('path'),
    fs = require('fs'),
    exec = require('child_process').exec,
    argv = require('minimist')(process.argv.slice(2)),
    gulp = require('gulp'),
    gutil = require('gulp-util');

var create = function(generatorPath, options) {
  if (argv._.length < 2) {
    gutil.log(gutil.colors.red("[-Error:] Missing type:name argument."), "ex: em new route:post");
    gutil.log(gutil.colors.red("[-Error:]"), "See 'em gen --help'");
    process.exit(0);
  }

  var typeAndName = argv._.slice()[1],
    generatorAndTasks = typeAndName.length ? typeAndName.split(':') : undefined,
    validTypes = [ 'component', 'controller', 'helper', 'model', 'route', 'template', 'view', 'mixin'];

  if( generatorAndTasks && generatorAndTasks.length > 1 ) {
    var type = generatorAndTasks[0];
    if (validTypes.indexOf(type)) {
      gutil.log(gutil.colors.red('[-Error:] '), gutil.colors.cyan(type), gutil.colors.red(' is not a valid type.') );
      gutil.log(gutil.colors.bold('[-note:] valid types are'), gutil.colors.cyan( validTypes.join(', ') ) );
      process.exit(0);
    } else {
      var gen = {
        type: type,
        name: generatorAndTasks[1]
      };
    }
  } else {
    gutil.log(gutil.colors.red("[-Error:] Provide the wrong argument. It must be in this format "), gutil.colors.cyan('type:name'), ' ex: em gen route:post');
    gutil.log(gutil.colors.red("[-Error:]"), "See 'em gen --help'");
    process.exit(0);
  }

  console.log('generatorAndTasks: ', generatorAndTasks);
};

module.exports = create;
