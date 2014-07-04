define([
	'backbone',
	'app/commons/core/application',
	'app/modules/home/routers/HomeRouter'
], function ( Backbone, App, HomeRouter ) {
	"use strict";

	App.addRegions({
		"mainRegion": "#main"
	});

	// Initialize this module when the app starts
	App.addInitializer(function(){
		var homeRouter = new HomeRouter();
		Backbone.history.start();
	});

	App.start();
});
