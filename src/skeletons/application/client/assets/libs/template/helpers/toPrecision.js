'use strict';

define(
	'assets/libs/template/helpers/toPrecision',
	['handlebars', 'underscore'],
	function (Handlebars, _ ) {
		Handlebars.registerHelper('toPrecision', function(number, precision) {
			return ( _.isEmpty(precision.hash) && !_.isNumber(precision) ) ? number : number.toPrecision(precision);
		});
	}
);

// Returns the number in fixed-point or exponential notation rounded to precision significant digits.
// precision [int] - The number of digits. If omitted, it returns the entire number (without any formatting). (Optional)
