'use strict';

define(
	'assets/libs/template/helpers/withLast',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('withLast', function(array, count, options) {
			var item, result;
			if (  !_.isNumber(count) ) {
				options = count;
				return options.fn(array[array.length - 1]);
			} else {
				array = array.slice(-count);
				result = '';
				for (item in array) {
					result += options.fn(array[item]);
				}
				return result;
			}
		});
	}
);

// Use the last item in a collection inside a block. Opposite of withFirst.
//
// Showing only one item using people context
//{{#withLast people}}
//     <p>{{this.firstName}} {{this.lastName}} is smart.</p>
// {{/withLast}}
//
// Showing the first 3 items in people array
// {{#withLast people 3}}
//     <p>{{this.firstName}} {{this.lastName}} is smart.</p>
// {{/withLast}}
