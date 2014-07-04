'use strict';

define(
	'assets/libs/template/helpers/arrayFirstItem',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('arrayFirstItem', function(context, options) {
			var firstItem = context[0];

			if ( _.isArray(firstItem) ) {
				console.log('first item is an array from arrayFirstItem.js');
				return firstItem;
			} else if ( _.isObject(firstItem) ) {
				return options.fn( firstItem );
			} else {
				return firstItem;
			}
		});
	}
);


//Ex:
// people: [
//     {firstName: "Yehuda", lastName: "Katz"},
//     {firstName: "Carl", lastName: "Lerche"},
//     {firstName: "Alan", lastName: "Johnson"}
//   ],
//
// {{#arrayFirstItem people}}
// 	{{firstName}} {{lastName}}
// {{/arrayFirstItem}}

// nums: [["1",2],2,"4",6],
// {{arrayFirstItem nums}}
