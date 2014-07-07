'use strict';

define(
	'assets/libs/template/helpers/round',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('round', function(value) {
			return Math.round(value);
		});
	}
);

// Returns the value rounded to the nearest integer.
// {{round floatNumber}}

