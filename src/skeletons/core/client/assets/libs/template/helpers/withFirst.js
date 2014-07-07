'use strict';

define(
	'assets/libs/template/helpers/withFirst',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('withFirst', function(array, count, options) {
			var item, result;
			if (  !_.isNumber(count) ) {
				options = count;
				return options.fn(array[0]);
			} else {
				array = array.slice(0, count);
				result = '';
				for (item in array) {
					result += options.fn(array[item]);
				}
				return result;
			}
		});
	}
);

// Turns a number into an ordinal string
//
// Showing only one item using people context
//{{#withFirst people}}
//     <p>{{this.firstName}} {{this.lastName}} is smart.</p>
// {{/withFirst}}
//
// Showing the first 3 items in people array
// {{#withFirst people 3}}
//     <p>{{this.firstName}} {{this.lastName}} is smart.</p>
// {{/withFirst}}
