'use strict';

define(
	'assets/libs/template/helpers/ceil',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('ceil', function(value) {
			return Math.ceil(value);
		});
	}
);

// Returns the value rounded down to the nearest integer.
// {{ceil floatNumber}}

