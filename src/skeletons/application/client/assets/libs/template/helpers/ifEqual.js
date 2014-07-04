'use strict';

define(
	'assets/libs/template/helpers/ifEqual',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('ifEqual', function (compareTo, text, options) {
			return compareTo === text ? options.fn(this) : options.inverse(this);
		});
	}
);

// {{#ifEqual age 32}}
// 	{{age}}
// {{else}}
// 	matt ma
// {{/ifEqual}}
