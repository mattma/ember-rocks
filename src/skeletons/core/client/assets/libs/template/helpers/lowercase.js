'use strict';

define(
	'assets/libs/template/helpers/lowercase',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('lowercase', function (string) {
			return string.toLowerCase();
		});
	}
);

// Turns a string to lowercase.
// Parameters: none.
// {{lowercase testString}}
