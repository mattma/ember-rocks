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

  it("should have an argument (type:name), name must be a valid string", function(done){
    exec("./bin/em gen route:", function(error, stdout, stderr) {
      // need to test the program should successfully shut down
      stdout.should.include('[-Error:]');
      stdout.should.include('  must be a valid string');
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

  it("should have a right type. ex: route, controller, view, template", function(done){
    exec("./bin/em gen temp:post", function(error, stdout, stderr) {
      stdout.should.include('[-Error:]');
      stdout.should.include('temp  is not a valid type.');
      stdout.should.include('[-note:]');
      stdout.should.include('valid types are component, controller, helper, model, route, template, view, mixin, adapter');
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
      exec("./bin/em gen route:post", function(error, stdout, stderr) {
        stdout.should.include('[-done:]');
        helpers.assertPathExist('client/app/routes/post.js', done);
      });
    });

    // handle the case of type is singular or plural, ex: route:post or routes:post
    it("should generate a js file at app/routes/ folder when type is 'routes'", function(done){
      exec("./bin/em gen routes:post", function(error, stdout, stderr) {
        stdout.should.include('[-done:]');
        helpers.assertPathExist('client/app/routes/post.js', done);
      });
    });
});
