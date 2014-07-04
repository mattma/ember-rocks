'use strict';

define(
	'assets/libs/template/helpers/floor',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('floor', function(value) {
			return Math.floor(value);
		});
	}
);

// Returns the value rounded down to the nearest integer.
// {{floor floatNumber}}

