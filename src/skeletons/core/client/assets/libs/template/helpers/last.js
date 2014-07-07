'use strict';

define(
	'assets/libs/template/helpers/last',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('last', function(array, count) {

			if (  _.isNumber(count) ) {
				return array.slice(-count);
			} else {
				return array[array.length - 1];
			}
		});
	}
);

//Returns the last item in a collection.
// Count must be a number
//
// Showing the last two items in the array
// {{last names 2}}

// Show the last one in the array
// {{last names}}
