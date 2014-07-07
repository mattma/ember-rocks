'use strict';

define(
	'assets/libs/template/helpers/ifNotNull',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('ifNotNull', function (value, options) {
			var empty = null;
			if (typeof value === 'undefined') {
				empty = true;
			}
			else if (value === null) {
				empty = true;
			}

			return empty ? options.inverse(this) : options.fn(this);
		});
	}
);

// Same like ifEmpty or ifNotEmpty, but only check null & undefined value
//
// {{#ifNotNull nullAndUndefined}}
// 	// when true
// 	the value is not null or undefined
// {{else}}
// 	// when false
// 	the value is null or undefined
// {{/ifNotNull}}
