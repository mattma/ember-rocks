'use strict';

define(
	'assets/libs/template/helpers/toExponential',
	['handlebars', 'underscore'],
	function (Handlebars, _ ) {
		Handlebars.registerHelper('toExponential', function(number, fractions) {
			if ( _.isEmpty(fractions.hash) && !_.isNumber(fractions) ) {
				fractions = 0;
			}
			return number.toExponential(fractions);
		});
	}
);

// Returns the number in exponential notation with one digit before the decimal point, rounded to fractions digits after the decimal point.
// fractions [int] - An integer specifying the number of digits after the decimal point. (Optional)

// value = 5
// {{toExponential value 5}}
// output: 5.00000e+0
