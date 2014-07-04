'use strict';

define(
	'assets/libs/template/helpers/toNumberFormat',
	['handlebars', 'assets/libs/internal'],
	function (Handlebars, Internal) {

		Handlebars.registerHelper('toNumberFormat', function (context, decimalPlaces) {
			if (typeof decimalPlaces !== 'number') {
				decimalPlaces = parseFloat(decimalPlaces);
			}

			//(context, prefix, suffix, decimalPlaces) //decimalPlaces default to 2
			return Internal.formatNumber(context, '', '', decimalPlaces);
		});
	}
);

// Returns exactly digits after the decimal place. Default 2 digit. The number is rounded if necessary, and the fractional part is padded with zeros if necessary so that it has the specified length.

// decimalPlaces [int] - The number of digits to appear after the decimal point. (Optional)

// {{toNumberFormat age}} or {{toNumberFormat age 3}}
