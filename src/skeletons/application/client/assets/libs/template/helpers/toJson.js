'use strict';

define(
	'assets/libs/template/helpers/toJson',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('toJson', function (obj) {
			return JSON.stringify(obj);
		});
	}
);

// Convert it to the json format
//
// {{toJson objNums}}
// {"matt":{"name":"matt","ages":1},"kelly":{"name":"kelly","ages":2} }
