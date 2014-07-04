define([
	'jquery',
	'backbone',
	'app/commons/core/application',
	'app/modules/home/views/HomeView',
	'app/modules/home/views/LoginView'
], function ( $, Backbone, App,  HomeView, LoginView ) {
	'use strict';

	var HomeController = {

		showLoginPage: function() {
			var loginView = new LoginView();
			App.mainRegion.show( loginView );
			console.log('show login view...');
		},

		default: function() {

			var model = new Backbone.Model({ age: 32 });

			var homeView = new HomeView({ model: model });
			App.mainRegion.show( homeView );

			console.log('Application Starts...');
		}

	};

	return HomeController;
});
