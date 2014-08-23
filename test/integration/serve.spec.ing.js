// This Test does not run in the test suite
// It requires to fetch the modules from npm and bower
// It will dramatically increase the testing time

var exec = require("child_process").exec;
var fs = require("fs");
var rm = require("rimraf");
var helpers = require("../helpers/utils");
var should = require('chai').should();

describe("Command `em serve`", function() {
  it("should build the application and generate those folders", function(done) {
    exec("./bin/em serve", function() {
      helpers.assertFoldersExist([
        "test-app/client/assets/build"
      ], done);
    });
  });

  it("should build the application and generate those files", function(done) {
    exec("./bin/em serve", function() {
      helpers.assertFoldersExist([
        "test-app/client/assets/build/application.js",
        "test-app/client/assets/build/templates.js",
        "test-app/client/assets/styles/base.css",
        "test-app/client/assets/styles/base.css.map"
      ], done);
    });
  });
});
