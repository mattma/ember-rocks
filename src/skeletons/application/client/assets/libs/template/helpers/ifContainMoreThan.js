'use strict';

define(
	'assets/libs/template/helpers/ifContainMoreThan',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('ifContainMoreThan', function (list, value, options) {
			if ( !_.isArray(list) ) {
				return options.inverse(this);
			}

			return list.length > value ? options.fn(this) : options.inverse(this);
		});
	}
);

// This is dealing with Array ONLY
//
// {{#ifContainMoreThan names 3}}
// 	the array length is more than 3
// {{else}}
// 	the array length is less than 3
// {{/ifContainMoreThan}}
