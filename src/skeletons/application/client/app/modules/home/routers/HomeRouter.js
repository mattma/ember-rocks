define([
	'backbone',
	'marionette',
	'app/modules/home/controllers/HomeController'
], function ( Backbone, Marionette, HomeController ) {
	'use strict';

	var HomeRouter = Backbone.Marionette.AppRouter.extend({

		appRoutes:{
			'login': 'showLoginPage',
			'*action': 'default'
		},

		controller: HomeController
	});

	return HomeRouter;

});
