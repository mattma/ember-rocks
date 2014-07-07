'use strict';

define(
	'assets/libs/template/helpers/titleize',
	['handlebars'],
	function (Handlebars) {
		Handlebars.registerHelper('titleize', function (string) {
			var capitalize, title, word, words;
			title = string.replace(/[ \-_]+/g, ' ');
			words = title.match(/\w+/g);
			capitalize = function(word) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			};
			return ((function() {
				var _i, _len, _results;
				_results = [];
				for (_i = 0, _len = words.length; _i < _len; _i++) {
					word = words[_i];
					_results.push(capitalize(word));
				}
				return _results;
			})()).join(' ');
		});
	}
);

// Capitalizes all words within a string
// Parameters: none.
//
// {{titleize "Bender-should-Not-be-allowed_on_Tv."}}
// # Bender Should Not Be Allowed On Tv.
