var gutil = require('gulp-util'),
	path = require('path'),
	fs = require('fs'),
	_ = require('underscore');

var _utils = require('./_utils');

// retrieve values from user input
var type = gutil.env.type,
	filepath = gutil.env.path;

var typeSupport = [],
	// Get an array of files in  server/skeletons folder
	skeletonsArr = fs.readdirSync(path.join(__dirname, '..', 'skeletons')),
	// return template name from the skeletons folder
	filenames = _.filter(skeletonsArr, function(filename, index) {
		if (path.extname(filename) === '.js') {
			typeSupport.push(path.basename(filename, '.js'));
		}
	});

// Checking type is required
if (!type) {
	gutil.log(' ');
	gutil.log(gutil.colors.red('Generator Type is required.'));
	gutil.log(gutil.colors.red('Must be one of those:', typeSupport.toString()));
	gutil.log(gutil.colors.cyan('Example: gulp gen --type model --path path/to/folder '));
	return gutil.log(' ');
}

// Checking type is valid
if (!_.contains(typeSupport, type)) {
	gutil.log(' ');
	gutil.log(gutil.colors.red(type, ' is not a valid type.'));
	gutil.log(gutil.colors.red('Must be one of those: ', typeSupport.toString()));
	gutil.log(gutil.colors.cyan('Example: gulp gen --type model --path path/to/folder '));
	return gutil.log(' ');
}

// Checking filepath is required
if (!filepath) {
	gutil.log(' ');
	gutil.log(gutil.colors.red('Path is required.'));
	gutil.log(gutil.colors.cyan('Example: gulp gen --type model --path path/to/folder '));
	return gutil.log(' ');
}

// Check the file extension, it need to be .js
var ext = path.extname(filepath),
	basename = path.basename(filepath, ext),
	dirname = path.dirname(filepath);

filepath = ((dirname === '.') ? '' : (dirname + '/')) + basename;
namespace = _utils.capitalFirstLetter(basename) + _utils.capitalFirstLetter(type);

// Example: --type model
// Output: model
exports.type = type;

// Example: --path path/to/filename
// Output: path/to/Filename
exports.filepathPlain = filepath;

exports.namespace = namespace;
