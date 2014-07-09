var exec = require("child_process").exec;
var rm = require("rimraf");
var helpers = require("../helpers/utils");
var should = require('chai').should();

describe("Command `em new`", function() {
  it("should require a dirName argument", function(done){
    exec("./bin/em new", function(error, stdout, stderr) {
      // need to test the program should successfully shut down
      stdout.should.include('[-Error:]');
      stdout.should.include('Missing directory name.');
      stdout.should.include('See \'em new --help\'');
      done();
    });
  });
});

describe("Created directory", function() {
  afterEach(function(done) {
    rm("./test-app", done);
  });

  it("should scaffold a bunch of files and directories", function(done) {
    exec("./bin/em new test-app --test", function() {
      helpers.assertPathsExist([
        "test-app/.gitignore",
        "test-app/.jshintrc",
        "test-app/.bowerrc",
        "test-app/config.rb",
        "test-app/package.json",
        "test-app/bower.json",
        //"test-app/gulpfile.js",
        "test-app/server/app.coffee",
        "test-app/client/views/index.hbs"
      ], done);
    });
  });
});
