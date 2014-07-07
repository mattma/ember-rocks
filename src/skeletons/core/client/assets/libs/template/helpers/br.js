'use strict';

define(
	'assets/libs/template/helpers/br',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('br', function(count, options) {
			var br, i;
			br = '<br>';
			if ( count != null ) {
				i = 0;
				while (i < count - 1) {
					br += '<br>';
					i++;
				}
			}
			return new Handlebars.SafeString(br);
		});
	}
);

// Returns <br> tags based on a count.
// count [int] - The number of `br` elements to render. (Optional)

// ex: {{br 5}}
// output: <br><br><br><br><br>

