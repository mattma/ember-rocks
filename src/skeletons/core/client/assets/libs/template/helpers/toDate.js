'use strict';

define(
	'assets/libs/template/helpers/toDate',
	['handlebars', 'underscore', 'moment'],
	function (Handlebars, _, moment) {
		Handlebars.registerHelper('toDate', function (date, format) {

			if (!date) {
				return;
			}

			if (typeof format !== 'string') {
				format = 'MM/DD/YYYY';
			}

			var DATE = '';


			if ( _.isDate(date) ){
				DATE = moment(date).format( format );
			} else {
				DATE = '';
			}

			return DATE;
		});
	}
);

// http://momentjs.com/  Follow this guide
// http://momentjs.com/docs/
//
// Converts the date to a default MM/DD/YYYY date.
// {{toDate date}}
//
// "YYYY-MM-DD"
// "YYYY-MM-DDTHH"
// "YYYY-MM-DD HH"
// "YYYY-MM-DDTHH:mm"
// "YYYY-MM-DD HH:mm"
// "YYYY-MM-DDTHH:mm:ss"
// "YYYY-MM-DD HH:mm:ss"
// "YYYY-MM-DDTHH:mm:ss.SSS"
// "YYYY-MM-DD HH:mm:ss.SSS"
// "YYYY-MM-DDTHH:mm:ss Z"
// "YYYY-MM-DD HH:mm:ss Z"

// Example Format
//
// 'MMMM Do YYYY, h:mm:ss a'
// May 5th 2013, 3:36:16 pm

// 'dddd'
// Sunday

// 'MMM Do YY'
// May 5th 13

// 'YYYY [escaped] YYYY'
// 2013 escaped 2013

// ''  <= this is the default format
// 2013-05-05T15:38:07-07:00

// Internationalization Format
//
// 'L'
// 05/05/2013

// 'LL'
// May 5 2013

// 'LLL'
// May 5 2013 3:40pm

// 'LLLL'
// Sunday, May 5 2013 3:40 PM
