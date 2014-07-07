'use strict';

define(
	'assets/libs/template/helpers/capitalizeEach',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('capitalizeEach', function (string) {
			return string.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1);
			});
		});
	}
);

// Capitalizes each word in a string.
// Parameters: none.
//
// {{capitalizeEach testString}}
