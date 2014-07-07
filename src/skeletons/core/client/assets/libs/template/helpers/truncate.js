'use strict';

define(
	'assets/libs/template/helpers/truncate',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('truncate', function (string, length, omission) {

			if ( _.isEmpty(omission.hash) && !_.isString(omission) ) {
				omission = '...';
			}

			if (string.length > length) {
				return string.substring(0, length) + omission;
			} else {
				return string;
			}
		});
	}
);

// Truncates a string given a specified length, providing a custom string to denote an omission.
//
// Parameters:
// length [int] - The number of characters to keep (Required)
// omission [string] - A string to denote an omission (Optional)
//
// Ex:
// {{truncate testString 6}}
// Bender...
//
// {{truncate "Bender should not be allowed on tv." 31 "..."}}
// Bender should not be allowed...
