'use strict';

define(
	'assets/libs/template/helpers/add',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('add', function(value, addition) {
			return value + addition;
		});
	}
);

//Returns the sum of two numbers.
// value [int] - The number to add to the expression. (Required)
//
// {{add age 68}}

