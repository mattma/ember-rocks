'use strict';

define(
	'assets/libs/template/helpers/reverse',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('reverse', function (string) {
			return string.split('').reverse().join('');
		});
	}
);

// Reverses a string.
// Parameters: none.
//
// {{reverse "bender should NOT be allowed on TV."}}
// # .VT no dewolla eb TON dluohs redneb
