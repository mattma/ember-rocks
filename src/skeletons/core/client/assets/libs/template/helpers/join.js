'use strict';

define(
	'assets/libs/template/helpers/join',
	['handlebars', 'underscore'],
	function (Handlebars, _) {

		Handlebars.registerHelper('join', function(array, separator) {
			if ( _.isEmpty(separator.hash) && !_.isString(separator) ) {
				separator = ' ';
			}
			return array.join(separator);
		});
	}
);

// Joins all elements of a collection into a string using a separator if specified.
//
// separator [string] - A string to use as a separator between the items. (Optional)

// {{join names ' & '}}
// matt & kelly & sam  // join the string with optional separator, default to empty space
