'use strict';

define(
	'assets/libs/template/helpers/eachObject',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('eachObject', function (obj, options) {
			var buffer = '';

			if ( obj && typeof obj === 'object' ) {
				for ( var key in obj) {
					var item = obj[key];
					if ( obj.hasOwnProperty(key) ) {
						item = {
							value: obj[key]
						};
					}

					item.key = key;

					buffer = buffer + options.fn(item);
				}
			} else {
				buffer = options.inverse(this);
			}

			return buffer;
		});
	}
);

// {{#eachObject pairs}}
// 	{{this.key}}: {{this.value}}
// {{/eachObject}}
//
//  father: matt mother: kelly son: aaron

