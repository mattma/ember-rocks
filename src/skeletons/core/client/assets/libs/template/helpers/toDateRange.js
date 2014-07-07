'use strict';

define(
	'assets/libs/template/helpers/toDateRange',
	['handlebars', 'moment'],
	function (Handlebars, moment) {
		Handlebars.registerHelper('toDateRange', function (date) {

			var DATE = '';

			if (!date) {
				return;
			}

			DATE = moment(date).fromNow();

			return DATE;
		});
	}
);

// {{toDateRange yesterday}}
// a day ago
//
// {{toDateRange tomorrow}}
// in a day
