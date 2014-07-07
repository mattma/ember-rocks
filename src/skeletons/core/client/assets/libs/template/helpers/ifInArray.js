'use strict';

define(
	'assets/libs/template/helpers/ifInArray',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('ifInArray', function(array, value, options) {
			return (array.indexOf(value) !== -1) ? options.fn(this) : options.inverse(this);
		});
	}
);

// Conditionally render a block if a specified value is in the collection.
// value [string|int] - A value to test against. (Required)

// {{#ifInArray names 'sam'}}
// 	it is sam
// {{else}}
// 	it is not sam
// {{/ifInArray}}

// it is sam
