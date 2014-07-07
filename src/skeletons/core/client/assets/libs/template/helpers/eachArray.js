'use strict';

define(
	'assets/libs/template/helpers/eachArray',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('eachArray', function (array, options) {
			var buffer = '';

			if (array && array.length > 0) {
				for (var i = 0, j = array.length; i < j; i++) {
					var item = array[i];

					if (typeof item !== 'object') {
						item = {
							index: i,
							number: i+1,
							value: array[i]
						};
					}

					buffer = buffer + options.fn(item);
				}
			} else {
				buffer = options.inverse(this);
			}
			return buffer;
		});
	}
);

// {{#eachArray names}}
// 	{{this.number}}: {{this.value}} index{{this.index}}
// {{/eachArray}}
//
// # 1: matt index0    2: kelly index1    3: aaron index2

