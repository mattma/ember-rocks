'use strict';

define(
	'assets/libs/template/helpers/withRest',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('withRest', function(array, count, options) {
			var item, result;
			if (  !_.isNumber(count) ) {
				options = count;
				array = array.slice(1);
			}else{
				array = array.slice(count);
			}
			result = '';
			for (item in array) {
				result += options.fn(array[item]);
			}
			return result;
		});
	}
);

// Use all of the items in the collection after the specified count inside a block.
// Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result. Works same like underscore.js
//
// count [int] - How many items to omit from the beginning. (Required)

// If omit the number, it will remove the first index item, return from the n index to the end
// {{#withRest people}}
// 	{{reverse this.firstName}}
// {{/withRest}}
// output: lraC nalA
//
// It will remove the n index from beginning,
// {{#withRest people 2}}
// 	{{reverse this.firstName}}
// {{/withRest}}