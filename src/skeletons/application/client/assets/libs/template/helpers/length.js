'use strict';

define(
	'assets/libs/template/helpers/length',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('length', function(array) {
			return array.length;
		});
	}
);

// Returns the length of the collection.
// {{length people}}
// 3
