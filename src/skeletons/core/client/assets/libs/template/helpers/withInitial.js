'use strict';

define(
	'assets/libs/template/helpers/withInitial',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('withInitial', function(array, count, options) {
			var item, result;
			if (  !_.isNumber(count) ) {
				options = count;
				array = array.slice(0, -1);
			}else{
				array = array.slice(0, -count);
			}
			result = '';
			for (item in array) {
				result += options.fn(array[item]);
			}
			return result;
		});
	}
);

// Use all of the items in the collection before the specified count inside a block. Opposite of withAfter.
// Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result. Works same like underscore.js
//
// count [int] - How many items to omit from the end. (Required)

// If omit the number, it will remove the last index item, return from the beginning
// {{#withInitial people}}
// 	{{reverse this.firstName}}
// {{/withInitial}}

// It will remove the n index from back,
// {{#withInitial people 2}}
// 	{{reverse this.firstName}}
// {{/withInitial}}
