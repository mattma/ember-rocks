'use strict';

define(
	'assets/libs/template/helpers/toMoney',
	['handlebars', 'assets/libs/internal'],
	function (Handlebars, Internal) {

		Handlebars.registerHelper('toMoney', function (context, decimalPlaces) {

			if (typeof decimalPlaces !== 'number') {
				decimalPlaces = parseFloat(decimalPlaces);
			}

			//(context, prefix, suffix, decimalPlaces) //decimalPlaces default to 2
			return Internal.formatNumber(context, '$', '', decimalPlaces);
		});
	}
);

// default decimal is 2
// {{toMoney age}}
//
// pass a 2nd arg for adding 0
// {{toMoney age 4}}
//
// if age is negative number, it will show like  -$32.00
