'use strict';

define(
	'assets/libs/template/helpers/ifOr',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('ifOr', function (value1, value2, options) {
			return (value1 || value2) ? options.fn(this) : options.inverse(this);
		});
	}
);

// Check value is present or not
//
// {{#ifOr names pairs}}
//  one of them are appear
// {{else}}
// 	names and pairs are not present
// {{/ifOr}}
