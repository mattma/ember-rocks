'use strict';

define(
	'assets/libs/template/helpers/sort',
	['handlebars', 'underscore'],
	function (Handlebars, _) {

		Handlebars.registerHelper('sort', function(array, field) {
			if (Utils.isUndefined(field)) {
				return array.sort();
			} else {
				return array.sort(function(a, b) {
					return a[field] > b[field];
				});
			}
		});
	}
);

// Joins all elements of a collection into a string using a separator if specified.
//
// separator [string] - A string to use as a separator between the items. (Optional)

// {{join names ' & '}}
// matt & kelly & sam  // join the string with optional separator, default to empty space
