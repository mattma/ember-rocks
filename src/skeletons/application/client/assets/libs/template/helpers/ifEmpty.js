'use strict';

define(
	'assets/libs/template/helpers/ifEmpty',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('ifEmpty', function (value, options) {
			var empty = null;
			if ( typeof value === 'undefined' ) {
				empty = true;
			}
			else if (value === null) {
				empty = true;
			}
			else if (value === false) {
				empty = true;
			}
			else if (Object.prototype.toString.call(value) === '[object Array]' && value.length === 0) {
				empty = true;
			}
			else if (Object.prototype.toString.call(value) === '[object Object]' && Object.keys(value).length === 0) {
				empty = true;
			}
			else {
				empty = false;
			}
			return empty ? options.fn(this) : options.inverse(this);
		});
	}
);

// check undefined, null, false, array empty etc.
//
// {{#ifEmpty names }}
// 	// when true
// 	the value is undefined
// {{else}}
// 	// when false
// 	the value is defined
// {{/ifEmpty}}
