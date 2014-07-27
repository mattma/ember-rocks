var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var rm = require('rimraf');
var helpers = require('../helpers/utils');
var should = require('chai').should();

describe('Command `em generate` - Wrong Argument(s)', function() {
  beforeEach(function(done) {
    mkdirp('client/app', done);
  });

  afterEach(function(done) {
    rm('./client', done);
  });

  it('should provide at least one argument', function(done){
    exec('./bin/em generate', function(error, stdout) {
      // need to test the program should successfully shut down
      stdout.should.include('[-Error:]');
      stdout.should.include('Missing type:name argument');
      stdout.should.include('ex: em new route:post');
      stdout.should.include('See \'em generate --help\'');
      done();
    });
  });

  it('should have an argument which contain a \':\'', function(done) {
    exec('./bin/em generate route', function(error, stdout) {
      // need to test the program should successfully shut down
      stdout.should.include('[-Error:]');
      stdout.should.include('Provide the wrong argument.');
      stdout.should.include('type:name');
      stdout.should.include('See \'em generate --help\'');
      done();
    });
  });

  it('should have an argument (type:name), type must be a valid string', function(done){
    exec('./bin/em generate :post', function(error, stdout) {
      // need to test the program should successfully shut down
      stdout.should.include('[-Error:]');
      stdout.should.include('  is not a valid type.');
      stdout.should.include('[-note:]');
      stdout.should.include('valid types are adapter, component, controller, helper, ' +
                'initializer, mixin, model, route, serializer, template, transform, util, view' );
      done();
    });
  });

  it('should have an argument (type:name), name must be a valid string', function(done){
    exec('./bin/em generate route:', function(error, stdout) {
      // need to test the program should successfully shut down
      stdout.should.include('[-Error:]');
      stdout.should.include('  must be a valid string');
      stdout.should.include('See \'em generate --help\'');
      done();
    });
  });

  it('should have a right type. ex: route, controller, view, template', function(done){
    exec('./bin/em generate temp:post', function(error, stdout) {
      stdout.should.include('[-Error:]');
      stdout.should.include('temp  is not a valid type.');
      stdout.should.include('[-note:]');
      stdout.should.include('valid types are adapter, component, controller, helper, ' +
                'initializer, mixin, model, route, serializer, template, transform, util, view' );
      done();
    });
  });

  // when type is component, name has to be dashized string
  it('should have a dash separated name when type is component(s)', function(done){
    exec('./bin/em generate component:post', function(error, stdout) {
      stdout.should.include('[-Error:]');
      stdout.should.include('post  must be a dashize string. ex: my-component');
      stdout.should.include('Generate task has been canceled');
      done();
    });
  });

  // when type is component, name of nest path has to be dashized string
  it('should have a dash separated name of nest path when type is component(s)', function(done){
    exec('./bin/em generate component:awesome/post', function(error, stdout) {
      stdout.should.include('[-Error:]');
      stdout.should.include('post  must be a dashize string. ex: my-component');
      stdout.should.include('Generate task has been canceled');
      done();
    });
  });

  // when type is template, name[0] is component, name of nest path has to be dashized string
  it('should have a dash separated name when type is template(s) and name[0] is component(s)', function(done){
    exec('./bin/em generate template:component/post', function(error, stdout) {
      stdout.should.include('[-Error:]');
      stdout.should.include('post  must be a dashize string. ex: my-component');
      stdout.should.include('Generate task has been canceled');
      done();
    });
  });

  // generator will abort if the file has existed in the folder
  // it should work in all types
  it('should abort the task if the route file has existed', function(done){
    mkdirp('client/app/routes/post.js', function(){
      exec('./bin/em generate route:post', function(error, stdout) {
        stdout.should.include('[-Error:]');
        stdout.should.include('post.js has existed');
        stdout.should.include('Generate task has been canceled');
        done();
      });
    });
  });

  // generator will abort if the file has existed in the folder
  // it should work in all types
  it('should abort the task if the component file has existed', function(done){
    mkdirp('client/app/components/my-post.js', function(){
      exec('./bin/em generate component:my-post', function(error, stdout) {
        stdout.should.include('[-Error:]');
        stdout.should.include('my-post.js has existed');
        stdout.should.include('Generate task has been canceled');
        done();
      });
    });
  });

});


describe('Command `em generate` - Generated and Done', function() {
    beforeEach(function(done) {
      mkdirp('client/app', done);
    });

    afterEach(function(done) {
      rm('./client', done);
    });

    // handle the case of type is singular or plural, ex: route:post or routes:post
    it('should generate a js file at app/routes/ folder when type is \'route\'', function(done){
      helpers.genCommandTester('./bin/em generate route:post', 'routes/post.js', done);
    });

    // route type should generate route and template files
    it('should also generate a hbs at app/templates/ folder when type is \'routes\'', function(done){
      helpers.genCommandTester('./bin/em generate routes:post', 'templates/post.hbs', done);
    });

    // handle the case of type is singular or plural, ex: route:post or routes:post
    it('should generate a js file at app/routes/ folder when type is \'routes\'', function(done){
      helpers.genCommandTester('./bin/em generate routes:post', 'routes/post.js', done);
    });

    // handle the case of type is singular or plural, ex: template:post or templates:post
    it('should generate a .hbs file at app/templates/ folder when type is \'template\'', function(done){
      helpers.genCommandTester('./bin/em generate template:post', 'templates/post.hbs', done);
    });

    // handle the case of type is singular or plural, ex: template:post or templates:post
    it('should generate a .hbs file at app/templates/ folder when type is \'templates\'', function(done){
      helpers.genCommandTester('./bin/em generate templates:post', 'templates/post.hbs', done);
    });

    // handle the case of template(s) or component(s) is singular or plural, ex: template(s):component(s)/post
    it('should generate a .hbs file at app/templates/components folder when type is \'template:component\'', function(done){
      helpers.genCommandTester('./bin/em generate template:component/x-post', 'templates/components/x-post.hbs', done);
    });

    // handle the case of template(s) or component(s) is singular or plural, ex: template(s):component(s)/post
    it('should generate a .hbs file at app/templates/components folder when type is \'template:component\'', function(done){
      helpers.genCommandTester('./bin/em generate templates:component/x-post', 'templates/components/x-post.hbs', done);
    });

    // handle the case of template(s) or component(s) is singular or plural, ex: template(s):component(s)/post
    it('should generate a .hbs file at app/templates/components folder when type is \'template:component\'', function(done){
      helpers.genCommandTester('./bin/em generate template:components/x-post', 'templates/components/x-post.hbs', done);
    });

    // handle the case of template(s) or component(s) is singular or plural, ex: template(s):component(s)/post
    it('should generate a .hbs file at app/templates/components folder when type is \'template:component\'', function(done){
      helpers.genCommandTester('./bin/em generate templates:components/x-post', 'templates/components/x-post.hbs', done);
    });

    it('should generate a js file at app/controllers/ folder when type is \'controller(s)\'', function(done){
      helpers.genCommandTester('./bin/em generate controller:post', 'controllers/post.js', done);
    });

    it('should generate a js file at app/models/ folder when type is \'model(s)\'', function(done){
      helpers.genCommandTester('./bin/em generate model:post', 'models/post.js', done);
    });

    it('should generate a js file at app/views/ folder when type is \'view(s)\'', function(done){
      helpers.genCommandTester('./bin/em generate view:post', 'views/post.js', done);
    });

    it('should generate a js file at app/components/ folder when type is \'component(s)\'', function(done){
      helpers.genCommandTester('./bin/em generate component:x-post', 'components/x-post.js', done);
    });

    // component type should generate component and its template files
    it('should also generate a hbs at app/templates/components folder when type is \'component(s)\'', function(done){
      helpers.genCommandTester('./bin/em generate component:x-post', 'templates/components/x-post.hbs', done);
    });

    it('should generate a js file at app/helpers/ folder when type is \'helper(s)\'', function(done){
      helpers.genCommandTester('./bin/em generate helper:x-post', 'helpers/x-post.js', done);
    });

    it('should generate a js file at app/adapters/ folder when type is \'adapter(s)\'', function(done){
      helpers.genCommandTester('./bin/em generate adapter:application', 'adapters/application.js', done);
    });

    it('should generate a js file at app/mixins/ folder when type is \'mixin\'', function(done){
      helpers.genCommandTester('./bin/em generate mixin:post', 'mixins/post.js', done);
    });

    it('should generate a js file at app/mixins/ folder when type is \'mixins\'', function(done){
      helpers.genCommandTester('./bin/em generate mixins:post', 'mixins/post.js', done);
    });

    it('should generate a js file at app/initializers/ folder when type is \'initializer\'', function(done){
      helpers.genCommandTester('./bin/em generate initializer:post', 'initializers/post.js', done);
    });

    it('should generate a js file at app/initializers/ folder when type is \'initializers\'', function(done){
      helpers.genCommandTester('./bin/em generate initializers:post', 'initializers/post.js', done);
    });

    it('should generate a js file at app/serializers/ folder when type is \'serializer\'', function(done){
      helpers.genCommandTester('./bin/em generate serializer:post', 'serializers/post.js', done);
    });

    it('should generate a js file at app/serializers/ folder when type is \'serializers\'', function(done){
      helpers.genCommandTester('./bin/em generate serializers:post', 'serializers/post.js', done);
    });

    it('should generate a js file at app/transforms/ folder when type is \'transform\'', function(done){
      helpers.genCommandTester('./bin/em generate transform:post', 'transforms/post.js', done);
    });

    it('should generate a js file at app/transforms/ folder when type is \'transforms\'', function(done){
      helpers.genCommandTester('./bin/em generate transforms:post', 'transforms/post.js', done);
    });

    it('should generate a js file at app/utils/ folder when type is \'util\'', function(done){
      helpers.genCommandTester('./bin/em generate util:post', 'utils/post.js', done);
    });

    it('should generate a js file at app/utils/ folder when type is \'utils\'', function(done){
      helpers.genCommandTester('./bin/em generate utils:post', 'utils/post.js', done);
    });

  });
