'use strict';

define(
	'assets/libs/template/helpers/sentence',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('sentence', function (string) {
			return string.replace(/((?:\S[^\.\?\!]*)[\.\?\!]*)/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		});
	}
);

// Capitalizes the first word of each sentence in a string and converts the rest of the sentence to lowercase.
// Parameters: none.
//
// {{sentence "bender should NOT be allowed on TV. fry SHOULD be allowed on TV."}}
// Bender should not be allowed on tv. Fry should be allowed on tv.
