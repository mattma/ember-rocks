'use strict';

define(
	'assets/libs/template/helpers/toFloat',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('toFloat', function(number) {
			return parseFloat(number);
		});
	}
);

// Returns an integer.

// Ex: value = '22.2abc'
// {{toFloat value}}
// output: 22.2

