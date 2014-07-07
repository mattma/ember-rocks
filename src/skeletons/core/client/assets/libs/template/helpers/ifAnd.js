'use strict';

define(
	'assets/libs/template/helpers/ifAnd',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('ifAnd', function (value1, value2, options) {
			return (value1 && value2) ? options.fn(this) : options.inverse(this);
		});
	}
);

// Check value is present or not
//
// {{#ifAnd names pairs}}
// 	names and pairs are both appear
// {{else}}
// 	names and pairs are not present
// {{/ifAnd}}
