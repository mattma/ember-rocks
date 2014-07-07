'use strict';

define(
	'assets/libs/template/helpers/uppercase',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('uppercase', function (string) {
			return string.toUpperCase();
		});
	}
);

// Turns a string to uppercase. Opposite of {{lowercase}}.
// Parameters: none.
// {{uppercase testString}}
