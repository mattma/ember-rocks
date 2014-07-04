'use strict';

define(
	'assets/libs/template/helpers/debug',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('debug', function (value) {
			console.log('Context: ', this);
			if ( !_.isNull(value) ) {
				console.log('Value: ', value);
			}
			return console.log('-----------------------------------------------');
		});
	}
);

// Simple console.debug() that shows the current context.
// {{#withFirst collection}}  {{debug name}} {{/withFirst}}
// {{debug name}}
