'use strict';

define(
	'assets/libs/template/helpers/ifNotEmpty',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('ifNotEmpty', function (value, options) {
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
			return empty ? options.inverse(this) : options.fn(this);
		});
	}
);

// check undefined, null, false, array empty etc.
//
// {{#ifNotEmpty names }}
// 	// when true
// 	the value is defined
// {{else}}
// 	// when false
// 	the value is undefined
// {{/ifNotEmpty}}
