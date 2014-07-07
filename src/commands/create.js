var path = require('path');
var glob = require('glob');
var argv = require('minimist')(process.argv.slice(2));

var create = function(generatorPath, options) {
  // checking the url prefix
  var re = /^http(?:s)?:\/\//,
      userInputPath = options.path,
      // check for remote URL path
      remoteUrl = ( userInputPath ) ? ( re.test(userInputPath) ) ? userInputPath : ('http://' + userInputPath) : undefined;

  // get the full path to the core of application. ( Server && Client )
  var skeletonsCorePath = getSkeletonsCorePath(),
      // get the full path to the ember application or take the generator from github or an URL
      // skeletonsAppPath = ( userInputPath ) ? remoteUrl : getSkeletonsAppPath();
      skeletonsAppPath = getSkeletonsAppPath();

  console.log('argv: ', argv);
};

module.exports = create;

function getSkeletonsCorePath () {
  var skeletonsCorePath = pathResolver('skeletons/core');
  return skeletonsCorePath;
}

function getSkeletonsAppPath () {
  var skeletonsAppPath = pathResolver('skeletons/app');
  return skeletonsAppPath;
}

function pathResolver (relativePath) {
  return path.resolve(__dirname, '..', relativePath);
}
