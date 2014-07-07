'use strict';

define(
	'assets/libs/template/helpers/log',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('log', function (value) {
			return console.log('log: ', value);
		});
	}
);

// Simple console.log()
// {{log name}}
