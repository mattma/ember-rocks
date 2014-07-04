'use strict';

define(
	'assets/libs/template/helpers/eachStripe',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('eachStripe', function (array, odd, even, options) {

			if (array && array.length > 0) {
				var buffer = '';
				for (var i = 0, j = array.length; i < j; i++) {
					var item = array[i];

					item = {
						index: i,
						number: i+1,
						value: array[i],
						stripeClass: (i % 2 === 0 ? even : odd)
					};

					buffer = buffer + options.fn(item);
				}
				return buffer;
			}
			else {
				return options.inverse(this);
			}

		});
	}
);

// Since array is 0 index, we consider 0 as even number
// but the actually number count start with 1
// the hacks here is switching the odd even class when passing into args
//
// {{#eachStripe names "odd" "even" }}
// 	<li class="{{this.stripeClass}}">{{this.number}}: {{this.value}} index({{this.index}})</li>
// {{/eachStripe}}
