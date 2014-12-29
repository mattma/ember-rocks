var exec = require("child_process").exec;
var fs = require("fs");
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

  it("should exit the program when the dirName has been existed", function(done){
    fs.mkdirSync('test-app');
    exec("./bin/em new test-app", function(error, stdout, stderr) {
      // need to test the program should successfully shut down
      stdout.should.include('[-Error:]');
      stdout.should.include('The folder name test-app has existed in this directory tree!');
      done();
    });
  });

  it("should scaffold a bunch of directories", function(done) {
    exec("./bin/em new test-app --test", function() {
      helpers.assertFoldersExist([
        // server folder
        "test-app/server",
        "test-app/server/mocks",
        "test-app/server/routes",
        "test-app/server/views",

        // client folder
        "test-app/client",
        "test-app/client/assets",
        "test-app/client/assets/images",
        "test-app/client/assets/images/touch",
        "test-app/client/assets/styles",
        "test-app/client/assets/styles/sass",
        "test-app/client/assets/vendors",

        // ember application folder
        "test-app/client/app",
        "test-app/client/app/adapters",
        "test-app/client/app/components",
        "test-app/client/app/controllers",
        "test-app/client/app/models",
        "test-app/client/app/routes",
        "test-app/client/app/store",
        "test-app/client/app/templates",
        "test-app/client/app/templates/components",
        "test-app/client/app/templates/users",
        "test-app/client/app/utils",
        "test-app/client/app/views",
        "test-app/client/app/views",
      ], done);
    });
  });

  it("should scaffold a bunch of files", function(done) {
    exec("./bin/em new test-app --test", function() {
      helpers.assertPathsExist([
        "test-app/.bowerrc",
        "test-app/.editorconfig",
        "test-app/.gitattributes",
        "test-app/.gitignore",
        "test-app/.jshintrc",
        "test-app/.npmignore",
        "test-app/bower.json",
        "test-app/config.rb",
        "test-app/gulpfile.js",
        "test-app/package.json",
        "test-app/README.md",

        // Server Folder
        "test-app/server/app.js",
        "test-app/server/index.js",
        "test-app/server/views/base.jade",
        "test-app/server/views/error.jade",
        "test-app/server/routes/index.js",
        "test-app/server/routes/mock_users.js",
        "test-app/server/mocks/users.json",

        // Client Folder
        "test-app/client/index.html",
        "test-app/client/assets/images/touch/chrome-touch-icon-196x196.png",
        "test-app/client/assets/images/touch/icon-128x128.png",
        "test-app/client/assets/styles/reset.css",
        "test-app/client/assets/styles/sass/base.sass",
        "test-app/client/assets/vendors/globalizer.js"
      ], done);
    });
  });

  it("should have an path option for fetching a valid git repo", function(done){
    exec("./bin/em new test-app --test --path github.com/mattma/Ember-Rocks-Template-Basic",
      function(error, stdout, stderr) {
        stdout.should.include('Going to fetch the app template from');
        stdout.should.include('github.com/mattma/Ember-Rocks-Template-Basic');
        stdout.should.include('[-done:] Successfully fetched and installed the app template');
        done();
    });
  });

});
