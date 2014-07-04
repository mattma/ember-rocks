'use strict';

define(
	'assets/libs/template/helpers/ifLengthEqual',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('ifLengthEqual', function (array, length, options) {
			var size = array.length || 0 ;
			if ( _.isObject (array) && !_.isArray(array) ) {
				for ( var key in array ) {
					if( array.hasOwnProperty(key) ) { size++; }
				}
			}
			if ( _.isString (length) ) {
				length = parseFloat(length);
			}

			return size === length ? options.fn(this) : options.inverse(this);
		});
	}
);

// Conditionally render a block based on the length of a collection ( Array or Object ).
// length [int] - The value to test against. (Required)
//
// {{#ifLengthEqual objNums 3}}
// 	it is 3
// {{else}}
// 	it is not 3
// {{/ifLengthEqual}}
