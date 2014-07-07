'use strict';

define(
	'assets/libs/template/helpers/capitalize',
	['handlebars', 'assets/libs/internal'],
	function (Handlebars, Internal) {
		Handlebars.registerHelper('capitalize', function (text) {
			return Internal.capitalize(text);
		});
	}
);

// {{capitalize this.value}}
// # Matt
