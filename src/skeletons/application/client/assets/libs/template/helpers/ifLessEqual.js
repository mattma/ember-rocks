'use strict';

define(
	'assets/libs/template/helpers/ifLessEqual',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('ifLessEqual', function (compareTo, text, options) {
			if ( _.isString (compareTo) ) {
				compareTo = parseFloat(compareTo);
			}
			if ( _.isString (text) ) {
				text = parseFloat(text);
			}
			return compareTo <= text ? options.fn(this) : options.inverse(this);
		});
	}
);

// {{#ifLessEqual age 45}}
// 	less than true
// {{else}}
// 	less than false
// {{/ifLessEqual}}
