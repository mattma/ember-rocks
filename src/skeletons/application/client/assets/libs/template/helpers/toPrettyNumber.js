'use strict';

define(
	'assets/libs/template/helpers/toPrettyNumber',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('toPrettyNumber', function(number) {
			return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		});
	}
);

// Adds commas to a number.
// Ex: value = 2222222
// {{toPrettyNumber value}}
// output: 2,222,222
