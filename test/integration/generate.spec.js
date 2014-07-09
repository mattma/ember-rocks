var exec = require("child_process").exec;
var rm = require("rimraf");
var helpers = require("../helpers/utils");
var should = require('chai').should();

describe("Command `em gen`", function() {
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

describe("Command `em gen`", function() {
    afterEach(function(done) {
      rm("./client", done);
    });

    it("should generate a js file at app/routes/ folder", function(done){
      exec("./bin/em gen routes:post", function(error, stdout, stderr) {
        stdout.should.include('[-done:]');
        helpers.assertPathExist('client/app/routes/post.js', done);
      });
    });
});
