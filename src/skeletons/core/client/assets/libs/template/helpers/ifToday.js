'use strict';

define(
	'assets/libs/template/helpers/ifToday',
	['handlebars', 'moment'],
	function (Handlebars, moment) {
		Handlebars.registerHelper('ifToday', function (date, options) {

			if (!date) {
				return options.inverse(this);
			}

			var today = moment().format('MM/DD/YYYY'),
				compDate = moment(date).format('MM/DD/YYYY');

			return date && today === compDate ? options.fn(this) : options.inverse(this);
		});
	}
);

// Checking if it is today
//
// {{#ifToday today}}
// 	it is today
// {{else}}
// 	it is not today
// {{/ifToday}}
