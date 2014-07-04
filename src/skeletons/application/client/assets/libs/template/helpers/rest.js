'use strict';

define(
	'assets/libs/template/helpers/rest',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('rest', function(array, count) {
			if ( !_.isNumber(count) ) {
				count = 1;
			}
			return array.slice(count);
		});
	}
);

// Returns all of the items in the collection after the specified count.  Index starts at 1, not 0
// count [int] - How many items to omit from the beginning. (Required)

// {{rest names 3}}
// sam,future  // show the items start from 4th index item
