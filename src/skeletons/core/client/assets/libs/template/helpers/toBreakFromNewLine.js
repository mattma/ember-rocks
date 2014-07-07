
'use strict';

define(
	'assets/libs/template/helpers/toBreakFromNewLine',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('toBreakFromNewLine', function (text) {
			var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
			return new Handlebars.SafeString(nl2br);
		});
	}
);

// Convert new lines (\r\n, \n\r, \r, \n) to line breaks ( <br> )
// from http://phpjs.org/functions/nl2br:480

// ex: "dfhs \n   \n dfasd \r "
// # dfhs <br> <br> dfasd <br>
