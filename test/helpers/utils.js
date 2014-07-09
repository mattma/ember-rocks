var fs = require('fs');
var exec = require('child_process').exec;
var should = require('chai').should();

// check an array of file path are existed or not
exports.assertPathsExist = function(paths, done) {
  var count, totalFileNum, isFinished;

  isFinished = function() {
    count++;
    if (count === totalFileNum) {
      done();
    }
  };

  totalFileNum = paths.length;
  count = 0;

  paths.forEach(function(path) {
    fs.exists(path, function(exists) {
      ("" + path + ":" + exists).should.equal("" + path + ":true");
      exists.should.equal(true);
      isFinished();
    });
  });
};
