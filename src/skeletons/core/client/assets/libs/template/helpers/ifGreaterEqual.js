'use strict';

define(
	'assets/libs/template/helpers/ifGreaterEqual',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('ifGreaterEqual', function (compareTo, text, options) {
			if ( _.isString (compareTo) ) {
				compareTo = parseFloat(compareTo);
			}
			if ( _.isString (text) ) {
				text = parseFloat(text);
			}
			return compareTo >= text ? options.fn(this) : options.inverse(this);
		});
	}
);

// {{#ifGreaterEqual age 45}}
// 	greater than true
// {{else}}
// 	greater than false
// {{/ifGreaterEqual}}
