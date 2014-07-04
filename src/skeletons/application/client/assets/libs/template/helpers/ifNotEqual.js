'use strict';

define(
	'assets/libs/template/helpers/ifNotEqual',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('ifNotEqual', function (compareTo, text, options) {
			return compareTo !== text ? options.fn(this) : options.inverse(this);
		});
	}
);
