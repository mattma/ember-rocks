'use strict';

define(
	'assets/libs/template/helpers/center',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('center', function (string, spaces) {
			var i, space;
			space = '';
			i = 0;
			while (i < spaces) {
				space += '&nbsp;';
				i++;
			}
			return new Handlebars.SafeString('' + space + string + space);
		});
	}
);

// Centers a string using non-breaking spaces.
// Parameters:
// spaces [int] - The number of spaces. (Required)
//
// {{center testString 10}}
// adding 10 spaces before and after the String content
