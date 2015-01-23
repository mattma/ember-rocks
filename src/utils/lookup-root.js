var fs = require('fs');

// Recursive checking the root path of application
// so that setup the correct `cwd` in the `LiftOff` setting
function lookupRootPath(dir, fileName, done) {
  fs.readdir(dir, function (err, list) {
    if (err) {
      return done(err);
    }
    (function next(parent) {
      // reaching to the root of the file system, simply return nothing
      if (parent === '/') {
        return done(err, undefined);
      }

      // Continue traversing up to the root of the file system
      // either in the root folder or project folder
      var rootFolder = (parent) ? parent : dir;
      var gulpfilePath = rootFolder + '/' + fileName;

      // check the current directory includes the file, `gulpfile.js`
      fs.stat(gulpfilePath, function (err, stat) {
        if (stat) {
          // hooray! we found the file, send back the root path
          return done(null, rootFolder);
        } else {
          // Not yet, traverse to the parent level
          process.chdir('../');
          var parentDir = process.cwd();
          // recursive calling itself to check for the root path
          next(parentDir);
        }
      });
    })();
  });
}

module.exports = lookupRootPath;
