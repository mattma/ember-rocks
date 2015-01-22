var fs = require('fs');
var exec = require('child_process').exec;
var should = require('chai').should();

// check an array of file path are existed or not
exports.assertPathsExist = function (paths, done) {
  var count, totalFileNum, isFinished;

  isFinished = function () {
    count++;
    if (count === totalFileNum) {
      done();
    }
  };

  totalFileNum = paths.length;
  count = 0;

  paths.forEach(function (path) {
    fs.exists(path, function (exists) {
      ('' + path + ':' + exists).should.equal('' + path + ':true');
      exists.should.equal(true);
      isFinished();
    });
  });
};

// check a file path is existed or not
var assertPathExist = function (path, done) {
  fs.exists(path, function (exists) {
    ('' + path + ':' + exists).should.equal('' + path + ':true');
    exists.should.equal(true);
    done();
  });
};

exports.assertPathExist = assertPathExist;

exports.genCommandTester = function (command, pathExist, done) {
  exec(command, function (error, stdout, stderr) {
    var fullPath = 'client/app/' + pathExist;
    stdout.should.include('[-done:]');
    assertPathExist(fullPath, done);
  });
};

exports.genIntegrationTestsCommandTester = function (command, fileName, done) {
  exec(command, function (error, stdout, stderr) {
    var fullPath = 'client/tests/integration/' + fileName;
    stdout.should.include('[-done:]');
    assertPathExist(fullPath, done);
  });
};

exports.genUnitTestsCommandTester = function (command, pathExist, done) {
  exec(command, function (error, stdout, stderr) {
    var fullPath = 'client/tests/unit/' + pathExist;
    stdout.should.include('[-done:]');
    assertPathExist(fullPath, done);
  });
};

exports.assertFolderExist = function (folderPath, done) {
  // Query the entry
  fs.lstat(folderPath, function (err, stats) {
    (!err).should.equal(true);
    // Is it a directory?
    stats.isDirectory().should.equal(true);
    done();
  });
};

exports.assertFoldersExist = function (folderPathArray, done) {
  var count, totalFileNum, isFinished;

  isFinished = function () {
    count++;
    if (count === totalFileNum) {
      done();
    }
  };

  totalFileNum = folderPathArray.length;
  count = 0;

  folderPathArray.forEach(function (path) {
    fs.lstat(path, function (err, stats) {
      (!err).should.equal(true);
      // Is it a directory?
      stats.isDirectory().should.equal(true);
      isFinished();
    });
  });
};
