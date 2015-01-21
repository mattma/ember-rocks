/*
 * https://github.com/mattma/ember-rocks
 *
 * Copyright (c) 2015 Matt Ma
 * Licensed under the MIT license.
 */

'use strict';

var program = require('commander'),
    create = require('./create'),
    generate = require('./generate'),
    commands = require('./commands'),
    pkg = require('../../package.json');

program
  .version('em-cli ' + pkg.version)
  .usage('[command] [options]\n\n  Command-Specific Help\n\n    em [command] --help');

program
  .command('new')
  .option(
      '-p, --path [path]',
      '# the generator url on web (ex: github.com/mattma/ember-generator)'
  )
  .option(
      '-T, --test',
      '# running in test mode. It won\'s fetch npm or bower packages or init the git repo'
  )
  .description('Creates a new ember application at [dirName]')
  .usage(
      '[ dirName ]  # Make a new directory and Scaffold a new web application' +
      '\n  Ex:    em new my-app'
  )
  .action(create);

program
  .command('g')
  .alias('generate')
  .description('Generate a new file with ES6 support in the ember app')
  .usage('[type:[name | /nested/folder/to/name]]' +
      '\n\n  @description Generate a new file located app/[type]/[name].js' +
      '\n\n  @arg type: ' +
      '\n\n     adapter        ex: em g adapter(s):post' +
      '\n                    Generated: app/adapters/post.js'+
      '\n\n     component      ex: em g component(s):my-post' +
      '\n                    Generated: app/components/my-post.js'+
      '\n                    Generated: app/templates/components/my-post.hbs'+
      '\n\n     controller     ex: em g controller(s):blog/post' +
      '\n                    Generated: app/controllers/blog/post.js'+
      '\n\n     helper         ex: em g helper(s):post' +
      '\n                    Generated: app/helpers/post.js'+
      '\n\n     initializer    ex: em g initializer(s):post' +
      '\n                    Generated: app/initializers/post.js'+
      '\n\n     mixin          ex: em g mixin(s):post' +
      '\n                    Generated: app/mixins/post.js'+
      '\n\n     model          ex: em g model(s):post' +
      '\n                    Generated: app/models/post.js'+
      '\n\n     route          ex: em g route(s):post' +
      '\n                    Generated: app/routes/post.js'+
      '\n                    Generated: app/templates/post.hbs'+
      '\n\n     serializer     ex: em g serializer(s):post' +
      '\n                    Generated: app/serializers/post.js'+
      '\n\n     template       ex: em g template(s):post' +
      '\n                    Generated: app/templates/post.hbs'+
      '\n\n     transform      ex: em g transform(s):post' +
      '\n                    Generated: app/transforms/post.js'+
      '\n\n     util           ex: em g util(s):post' +
      '\n                    Generated: app/utils/post.js'+
      '\n\n     view           ex: em g view(s):long/folder/name/post' +
      '\n                    Generated: app/views/long/folder/name/post.js'+

      '\n\n  @arg name: any valid string' +
      ' \n             or use \'/\'separated string to create a nested folder structure' +
      '\n             See @arg type (above): controller and view sections for details' +

      '\n\n  @description Generate a new Integration Test located tests/integration/[name]-test.js'+
      '\n\n     test                ex: em g test(s):home' +
      '\n                    Generated: tests/integration/home-test.js'+

      '\n\n  @description Generate a new Unit Test located tests/unit/[type]/[name]-test.js' +
      '\n\n  @arg  ex: route-test:user    [type]: route; [name]: user;' +
      '\n\n     adapter-test        ex: em g adapter-test(s):my-post' +
      '\n                    Generated: tests/unit/adapters/my-post-test.js'+
      '\n\n     component-test      ex: em g component-test(s):blog/post' +
      '\n                    Generated: tests/unit/components/blog/post-test.js'+
      '\n\n     controller-test     ex: em g controller-test(s):blog/post' +
      '\n                    Generated: tests/unit/controllers/blog/post-test.js'+
      '\n\n     helper-test         ex: em g helper-test(s):post' +
      '\n                    Generated: tests/unit/helpers/post-test.js'+
      '\n\n     initializer-test    ex: em g initializer-test(s):post' +
      '\n                    Generated: tests/unit/initializers/post-test.js'+
      '\n\n     mixin-test          ex: em g mixin-test(s):post' +
      '\n                    Generated: tests/unit/mixins/post-test.js'+
      '\n\n     model-test          ex: em g model-test(s):post' +
      '\n                    Generated: tests/unit/models/post-test.js'+
      '\n\n     route-test          ex: em g route-test(s):post' +
      '\n                    Generated: tests/unit/routes/post-test.js'+
      '\n\n     serializer-test     ex: em g serializer-test(s):post' +
      '\n                    Generated: tests/unit/serializers/post-test.js'+
      '\n\n     transform-test      ex: em g transform-test(s):post' +
      '\n                    Generated: tests/unit/transforms/post-test.js'+
      '\n\n     util-test           ex: em g util-test(s):post' +
      '\n                    Generated: tests/unit/utils/post-test.js'+
      '\n\n     view-test           ex: em g view-test(s):long/folder/name/post' +
      '\n                    Generated: tests/unit/views/long/folder/name/post-test.js')
  .action(generate);

program
  .command('s')
  .alias('serve')
  .description('Builds and serves your app, rebuilding on file changes.')
  .action(commands);

program
  .command('m')
  .alias('mobile')
  .description('Builds an Cordova application, and ready to deploy to phone or tablet.')
  .action(commands);

program
  .command('b')
  .alias('build')
  .description('Release your app and places it into the output path \'~/build\'')
  .action(commands);

program
  .command('t')
  .alias('test')
  .description('Run client side integration and unit tests, rerun tests on file changes')
  .action(commands);

// must be before .parse() since node's emit() is immediate
program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ em new [dirName]' +
    '\n\n      @description Scaffold a node.js server-side app and an Ember.js client-side app' +
    '\n\n      @example  em new my-app && cd my-app');
  console.log('');
  console.log('    $ em new [dirName] -p git_public_url' +
    '\n\n      @description Do same things above and fetch an Ember app boilerplate ' +
                  'from custom git repo' +
    '\n\n      @example  em new my-app --path github.com/mattma/Ember-Rocks-Template-Basic');
  console.log('');
  console.log('    $ em generate [type:[name | /nested/folder/to/name]]' +
    '\n\n      @description Generate a new file ember app folder' +
    '\n\n      @info \'em generate --help\' for addtional helper information ' +
    '\n\n      @example  em generate route(s):posts/post' +
    '\n      @example  em generate component(s)/x-foo'
    );
  console.log('');
  console.log('    $ em serve' );
  console.log('');
  console.log('    $ em build' );
  console.log('');
  console.log('    $ em test' );
  console.log('');
  console.log('    $ em mobile' +
    '\n\n      @description Builds an Cordova application, and ready to' +
    ' deploy to phone or tablet.');
  console.log('');
  console.log('');
});

program.parse(process.argv);
