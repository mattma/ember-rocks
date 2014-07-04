'use strict';

var allTestFiles = [];
var TEST_REGEXP = /Test\.js$/;

Object.keys(window.__karma__.files).forEach(function(file) {
	if (TEST_REGEXP.test(file)) {
		allTestFiles.push(file);
	}
});

require.config({

	// Base URL relative to the test runner
	// Paths are relative to this
	baseUrl: '/base/client',

	paths: {
		'underscore': 'assets/vendor/lodash/lodash',
		'underscore_4_hbs' : 'assets/vendor/require-handlebars-plugin/hbs/underscore',
		'backbone': 'assets/vendor/backbone/backbone',
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
		'moment': 'assets/vendor/moment/moment',

		'chai': '../test/libs/chai',
		'mocha': '../test/libs/mocha/mocha',
		'common': '../test/libs/common',
		'sinon-chai': '../test/libs/sinon-chai',
		'sinon': '../test/libs/sinon',

		// Modules
		'home': 'app/modules/home/models/HomeModel'
	},

	shim : {
		backbone : {
			exports : 'Backbone',
			deps : ['jquery', 'underscore']
		},
		marionette : {
			exports : 'Backbone.Marionette',
			deps : ['backbone']
		},
		handlebars: {
			exports: 'Handlebars'
		}
	},

	hbs : {
		templateExtension : 'hbs',

		disableI18n: false,

		i18nDirectory: 'assets/libs/template/i18n/',

		disableHelpers: false,

		helperPathCallback: function (name) {
			return 'assets/libs/template/helpers/' + name;
		}
	},

	//dynamically load all test files
	deps: allTestFiles,

	// we have to kick of mocha, as it is asynchronous
	callback: window.__karma__.start
});
