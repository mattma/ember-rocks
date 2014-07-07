'use strict';

define(
	'assets/libs/template/helpers/toPascal',
	['handlebars', 'assets/libs/internal'],
	function (Handlebars, Internal) {
		Handlebars.registerHelper('toPascal', function (context) {
			return Internal.toPascal(context);
		});
	}
);

// Convert "helloWorld" to "HelloWorld"
