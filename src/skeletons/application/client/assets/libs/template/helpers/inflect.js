'use strict';

define(
	'assets/libs/template/helpers/inflect',
	['handlebars', 'underscore'],
	function (Handlebars, _) {
		Handlebars.registerHelper('inflect', function(count, singular, plural, include) {
			var word;
			word = count > 1 || count === 0 ? plural : singular;

			if ( ( _.isEmpty(include.hash) && !_.isBoolean(include) ) || include === false ) {
				return word;
			} else {
				return '' + count + ' ' + word;
			}
		});
	}
);

// Returns the plural or singular form of a word based on a count.

// Parameters:
// count [number] - How many words in counts
// singular [string] - The singular form of the word. (Required)
// plural [string] - The plural form of the word. (Required)
// include [boolean] - whether or not to include the count before the word. (Optional)

// Usage:

// enemies = 0
// friends = 1

// {{inflect enemies "enemy" "enemies"}}
// {{inflect friends "friend" "friends" true}}

// enemies
// 1 friend
