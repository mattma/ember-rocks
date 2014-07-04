'use strict';

define(
	'assets/libs/template/helpers/initial',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('initial', function(array, count) {
			if ( !_.isNumber(count) ) {
				count = 1;
			}
			return array.slice(0, -count);
		});
	}
);

// Returns all of the items in the collection before the specified count. Opposite of after. Index starts at 1, not 0
// Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result. Works same like underscore.js
//
// count [int] - How many items to omit from the end. (Required)

// {{initial names 3}}
// matt,kelly  // Remove the last 3 index items, and show the rest
