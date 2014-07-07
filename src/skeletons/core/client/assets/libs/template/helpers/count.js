'use strict';

define(
	'assets/libs/template/helpers/count',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('count', function (context) {

			var length = 0;

			if ( _.isArray(context) ) {
				length = context.length;
			}

			if ( _.isObject(context) ) {
				length = Object.keys(context).length;
			}

			if ( _.isString(context) ) {
				length = context.length;
			}

			return length;
		});
	}
);

// {{count string}}  string character number
// {{count array}}	array length
// {{count object}}  object children length
