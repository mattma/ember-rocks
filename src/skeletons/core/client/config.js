'use strict';

require.config({
	paths : {
		'underscore' : 'assets/vendor/lodash/lodash',
		'underscore_4_hbs' : 'assets/vendor/require-handlebars-plugin/hbs/underscore',
		'backbone'   : 'assets/vendor/backbone/backbone',
		'backbone.eventbinder': 'assets/vendor/marionette/public/javascripts/backbone.eventbinder',
		'backbone.wreqr': 'assets/vendor/marionette/public/javascripts/backbone.wreqr',
		'backbone.babysitter': 'assets/vendor/marionette/public/javascripts/backbone.babysitter',
		'marionette' : 'assets/vendor/marionette/lib/core/amd/backbone.marionette',
		'jquery'     : 'assets/vendor/jquery/jquery',
		'handlebars': 'assets/vendor/require-handlebars-plugin/Handlebars',
		'json2': 'assets/vendor/require-handlebars-plugin/hbs/json2',
		'i18nprecompile' : 'assets/vendor/require-handlebars-plugin/hbs/i18nprecompile',
		'hbs': 'assets/vendor/require-handlebars-plugin/hbs',
		'text': 'assets/vendor/requirejs-text/text',
		'moment': 'assets/vendor/moment/moment'
	},
	shim : {
		backbone : {
			exports : 'Backbone',
			deps : ['jquery', 'underscore']
		},
		marionette : {
			exports : 'Backbone.Marionette',
			deps : ['backbone']
		}
	},
	hbs : {
		templateExtension : 'hbs',

		// if disableI18n is `true` it won't load locales and the i18n helper won't work as well.
		disableI18n: false,

		// Update the default i18n folder path
		i18nDirectory: 'assets/libs/template/i18n/',

		disableHelpers: false,

		// When true, won't look for and try to automatically load helpers (false by default)
		// Update the default helpers folder path
		helperPathCallback: function (name) { // ('/template/helpers/'+name by default)
			return 'assets/libs/template/helpers/' + name;
		}
	}
});
