'use strict';

define(
	'assets/libs/template/helpers/default',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('default', function (value, defaultValue) {
			return ( _.isEmpty(value) ) ? defaultValue : value;
		});
	}
);

// Provides a default or fallback value if a value doesn't exist.
// Required: defaultValue [string|int] - The default value to use.
// {{default title "Not title available."}}
