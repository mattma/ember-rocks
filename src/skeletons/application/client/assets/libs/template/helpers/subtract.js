'use strict';

define(
	'assets/libs/template/helpers/subtract',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('subtract', function(value, substraction) {
			return value - substraction;
		});
	}
);

// Returns the difference of two numbers. Opposite of add
// value [int] - The number to subtract from the expression. (Required)
//
// {{subtract age 5}}
