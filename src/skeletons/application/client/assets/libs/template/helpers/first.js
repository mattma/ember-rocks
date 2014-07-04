                                                       'use strict';

define(
	'assets/libs/template/helpers/first',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('first', function(array, count) {

			if (  _.isNumber(count) ) {
				return array.slice(0, count);
			} else {
				return array[0];
			}
		});
	}
);

//Returns the first item in a collection.
// Count must be a number
//
// Showing the first two items in the array
// {{first names 2}}

// Show the first one in the array
// {{first names}}
