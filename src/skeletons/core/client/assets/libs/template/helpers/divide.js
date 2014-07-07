'use strict';

define(
	'assets/libs/template/helpers/divide',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('divide', function(value, divisor) {
			return value / divisor;
		});
	}
);

// Returns the division of two numbers.
// value [int] - The number to divide the expression. (Required)

// {{divide age 2}}
