'use strict';

define(
	'assets/libs/template/helpers/sum',
	['handlebars', 'underscore'],
	function (Handlebars, _ ) {
		Handlebars.registerHelper('sum', function (context, pluckKey) {
			var total = 0;

			if ( _.isArray(context) ) {
				for(var i = 0, l = context.length; i < l; i++ ) {
					if ( _.isNumber(context[i]) ) {
						total += context[i];
					} else {
						total += parseFloat(context[i]);
					}
				}
				return total;
			}

			if ( _.isObject(context) ) {
				if ( pluckKey ) {
					context = _.pluck( context, pluckKey );
				}
				for(var key in context) {
					if ( _.isNumber( context[key] ) ) {
						total += context[key];
					} else {
						total += parseFloat( context[key] );
					}
				}
				return total;
			}
		});
	}
);

// numbers: ["1",2,"4",6]
// total: {{sum numbers}}   #total: 13
//
// nums: { "1": 1, "2": 2, "3": 3}
// total: {{sum nums}}  #total 6
//
// objNums: {
// 	matt: { "name": "matt", "ages": 1 },
// 	kelly: { "name": "kelly", "ages": 2 }
// },
// total: {{sum objNums "ages"}}  #total 3
