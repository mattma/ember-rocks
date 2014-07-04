'use strict';

define(
	'assets/libs/template/helpers/toInt',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('toInt', function(number) {
			return parseInt(number, 10);
		});
	}
);

// Returns an integer.

// Ex: value = '22.2abc'
// {{toInt value}}
// output: 22

