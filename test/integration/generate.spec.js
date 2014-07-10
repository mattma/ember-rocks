var exec = require("child_process").exec;
var rm = require("rimraf");
var helpers = require("../helpers/utils");
var should = require('chai').should();

describe("Command `em gen` - Wrong Argument(s)", function() {
  it("should provide at least one argument", function(done){
    exec("./bin/em gen", function(error, stdout, stderr) {
      // need to test the program should successfully shut down
      stdout.should.include('[-Error:]');
      stdout.should.include('Missing type:name argument');
      stdout.should.include('ex: em new route:post');
      stdout.should.include('See \'em gen --help\'');
      done();
    });
  });

  it("should have an argument which contain a ':'", function(done){
    exec("./bin/em gen route", function(error, stdout, stderr) {
      // need to test the program should successfully shut down
      stdout.should.include('[-Error:]');
      stdout.should.include('Provide the wrong argument.');
      stdout.should.include('type:name');
      stdout.should.include('See \'em gen --help\'');
      done();
    });
  });

  it("should have an argument (type:name), type must be a valid string", function(done){
    exec("./bin/em gen :post", function(error, stdout, stderr) {
      // need to test the program should successfully shut down
      stdout.should.include('[-Error:]');
      stdout.should.include('  is not a valid type.');
      stdout.should.include('[-note:]');
      stdout.should.include('valid types are component, controller, helper, model, route, template, view, adapter');
      done();
    });
  });

  it("should have an argument (type:name), name must be a valid string", function(done){
    exec("./bin/em gen route:", function(error, stdout, stderr) {
      // need to test the program should successfully shut down
      stdout.should.include('[-Error:]');
      stdout.should.include('  must be a valid string');
      stdout.should.include('See \'em gen --help\'');
      done();
    });
  });

  it("should have a right type. ex: route, controller, view, template", function(done){
    exec("./bin/em gen temp:post", function(error, stdout, stderr) {
      stdout.should.include('[-Error:]');
      stdout.should.include('temp  is not a valid type.');
      stdout.should.include('[-note:]');
      stdout.should.include('valid types are component, controller, helper, model, route, template, view, adapter');
      done();
    });
  });
});

describe("Command `em gen` - Generated and Done", function() {
    afterEach(function(done) {
      rm("./client", done);
    });

    // handle the case of type is singular or plural, ex: route:post or routes:post
    it("should generate a js file at app/routes/ folder when type is 'route'", function(done){
      helpers.genCommandTester('./bin/em gen route:post', 'routes/post.js', done);
    });

    // handle the case of type is singular or plural, ex: route:post or routes:post
    it("should generate a js file at app/routes/ folder when type is 'routes'", function(done){
      helpers.genCommandTester('./bin/em gen routes:post', 'routes/post.js', done);
    });

    // handle the case of type is singular or plural, ex: template:post or templates:post
    it("should generate a .hbs file at app/templates/ folder when type is 'template'", function(done){
      helpers.genCommandTester('./bin/em gen template:post', 'templates/post.hbs', done);
    });

    // handle the case of type is singular or plural, ex: template:post or templates:post
    it("should generate a .hbs file at app/templates/ folder when type is 'templates'", function(done){
      helpers.genCommandTester('./bin/em gen templates:post', 'templates/post.hbs', done);
    });

    // handle the case of template(s) or component(s) is singular or plural, ex: template(s):component(s)/post
    it("should generate a .hbs file at app/templates/components folder when type is 'template:component'", function(done){
      helpers.genCommandTester('./bin/em gen template:component/post', 'templates/components/post.hbs', done);
    });

    // handle the case of template(s) or component(s) is singular or plural, ex: template(s):component(s)/post
    it("should generate a .hbs file at app/templates/components folder when type is 'template:component'", function(done){
      helpers.genCommandTester('./bin/em gen templates:component/post', 'templates/components/post.hbs', done);
    });

    // handle the case of template(s) or component(s) is singular or plural, ex: template(s):component(s)/post
    it("should generate a .hbs file at app/templates/components folder when type is 'template:component'", function(done){
      helpers.genCommandTester('./bin/em gen template:components/post', 'templates/components/post.hbs', done);
    });

    // handle the case of template(s) or component(s) is singular or plural, ex: template(s):component(s)/post
    it("should generate a .hbs file at app/templates/components folder when type is 'template:component'", function(done){
      helpers.genCommandTester('./bin/em gen templates:components/post', 'templates/components/post.hbs', done);
    });

    it("should generate a js file at app/controllers/ folder when type is 'controller(s)'", function(done){
      helpers.genCommandTester('./bin/em gen controller:post', 'controllers/post.js', done);
    });

    it("should generate a js file at app/models/ folder when type is 'model(s)'", function(done){
      helpers.genCommandTester('./bin/em gen model:post', 'models/post.js', done);
    });

    it("should generate a js file at app/views/ folder when type is 'view(s)'", function(done){
      helpers.genCommandTester('./bin/em gen view:post', 'views/post.js', done);
    });

    it("should generate a js file at app/components/ folder when type is 'component(s)'", function(done){
      helpers.genCommandTester('./bin/em gen component:post', 'components/post.js', done);
    });

    it("should generate a js file at app/helpers/ folder when type is 'helper(s)'", function(done){
      helpers.genCommandTester('./bin/em gen helper:x-post', 'helpers/x-post.js', done);
    });

    it("should generate a js file at app/adapters/ folder when type is 'adapter(s)'", function(done){
      helpers.genCommandTester('./bin/em gen adapter:application', 'adapters/application.js', done);
    });
});
