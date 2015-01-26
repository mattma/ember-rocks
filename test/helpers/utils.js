var expect = require('../helpers/test-helper').expect;

var fs = require('fs');
var exec = require('child_process').exec;

// check an array of file path are existed or not
var assertPathsExist = exports.assertPathsExist = function (paths, done) {
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
      expect('' + path + ':' + exists).to.deep.equal('' + path + ':true');
      expect(exists).to.be.true();
      isFinished();
    });
  });
};

// check a file path is existed or not
var assertPathExist = exports.assertPathExist = function (path, done) {
  fs.exists(path, function (exists) {
    expect('' + path + ':' + exists).to.deep.equal('' + path + ':true');
    expect(exists).to.be.true();
    done();
  });
};

exports.assertFolderExist = function (folderPath, done) {
  // Query the entry
  fs.lstat(folderPath, function (err, stats) {
    expect(!err).to.be.true();
    // Is it a directory?
    expect(stats.isDirectory()).to.be.true();
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
      expect(!err).to.be.true();
      // Is it a directory?
      expect(stats.isDirectory()).to.be.true();
      isFinished();
    });
  });
};

exports.genCommandTester = function (command, pathExist, done) {
  exec(command, function (error, stdout, stderr) {
    var fullPath = 'client/app/' + pathExist;
    expect(stdout).to.include('[-done:]');
    assertPathExist(fullPath, done);
  });
};

exports.genCommandAndUnitTester = function (command, multiplePathsExist, done) {
  exec(command, function (error, stdout, stderr) {
    expect(stdout).to.include('[-done:]');
    assertPathsExist(multiplePathsExist, done);
  });
};

exports.genIntegrationTestsCommandTester = function (command, fileName, done) {
  exec(command, function (error, stdout, stderr) {
    var fullPath = 'client/tests/integration/' + fileName;
    expect(stdout).to.include('[-done:]');
    assertPathExist(fullPath, done);
  });
};

exports.genUnitTestsCommandTester = function (command, pathExist, done) {
  exec(command, function (error, stdout, stderr) {
    var fullPath = 'client/tests/unit/' + pathExist;
    expect(stdout).to.include('[-done:]');
    assertPathExist(fullPath, done);
  });
};
