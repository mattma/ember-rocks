'use strict';

define(
	'assets/libs/template/helpers/toCamel',
	['handlebars', 'assets/libs/internal'],
	function (Handlebars, Internal) {
		Handlebars.registerHelper('toCamel', function (context) {
			return Internal.toCamel(context);
		});
	}
);

// Convert "HelloWorld" to "helloWorld"
