'use strict';

define(
	'assets/libs/template/helpers/ordinalize',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('ordinalize', function(value) {
			var normal,
				_ref,
				__indexOf = [].indexOf
					|| function( item ) {
						for (var i = 0, l = this.length; i < l; i++) {
							if (i in this && this[i] === item) {
								return i;
							}
						}
						return -1;
					};

			normal = Math.abs(Math.round(value));

			if (_ref = normal % 100, __indexOf.call([11, 12, 13], _ref) >= 0) {
				return '' + value + 'th';
			} else {
				switch (normal % 10) {
					case 1:
						return '' + value + 'st';
					case 2:
						return '' + value + 'nd';
					case 3:
						return '' + value + 'rd';
					default:
						return '' + value + 'th';
				}
			}
		});
	}
);

// Turns a number into an ordinal string.

// Usage:

// {{ordinalize 3}}
// {{ordinalize 12}}
// {{ordinalize 22}}

// 3rd
// 12th
// 22nd
