var fs = require('../utils/fs');
var msg = require('../utils/message');
//var appDirs = require('../utils/appDirs');

var create = function(dirName, options) {
  var paths = create.getPaths.apply(null, arguments);
  if (!paths) msg.error("See 'em new --help'.");

  // Create a new directory name what user passed in
  fs.mkdirpSync(paths.app);

  msg.notify("\n-> All done! Your Ember App ( " + paths.app + " ) has been successfully created!");
};

module.exports = create;

create.getPaths = function(appPath, env) {
  if (arguments.length > 2) return false;
  if (arguments.length == 1) {
    env = appPath;
    appPath = '.';
  }
  return {
    app: appPath
  };
};

function copyVendor(paths) {
  var src = __dirname+'/../../packages';
  var dest = paths.js+'/vendor';
  fs.readdirSync(src).forEach(function(filePath) {
    var file = fs.readFileSync(src+'/'+filePath).toString();
    fs.writeFileSync(dest+'/'+filePath, file);
  });
}


