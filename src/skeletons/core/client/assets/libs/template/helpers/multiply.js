'use strict';

define(
	'assets/libs/template/helpers/multiply',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('multiply', function(value, multiplier) {
			return value * multiplier;
		});
	}
);

// Returns the multiplication of two numbers.
// value [int] - The number to multiply the expression. (Required)

// {{multiply age 2}}
