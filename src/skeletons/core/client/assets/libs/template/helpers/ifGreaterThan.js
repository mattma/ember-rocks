'use strict';

define(
	'assets/libs/template/helpers/ifGreaterThan',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('ifGreaterThan', function (compareTo, text, options) {
			if ( _.isString (compareTo) ) {
				compareTo = parseFloat(compareTo);
			}
			if ( _.isString (text) ) {
				text = parseFloat(text);
			}
			return  compareTo > text ? options.fn(this) : options.inverse(this);
		});
	}
);

// {{#ifGreaterThan age 45}}
// 	greater than true
// {{else}}
// 	greater than false
// {{/ifGreaterThan}}
