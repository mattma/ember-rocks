'use strict';

define(
	'assets/libs/template/helpers/ifLessThan',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('ifLessThan', function (compareTo, text, options) {
			if ( _.isString (compareTo) ) {
				compareTo = parseFloat(compareTo);
			}
			if ( _.isString (text) ) {
				text = parseFloat(text);
			}
			return compareTo < text ? options.fn(this) : options.inverse(this);
		});
	}
);

// {{#ifLessThan age 45}}
// 	less than true
// {{else}}
// 	less than false
// {{/ifLessThan}}
