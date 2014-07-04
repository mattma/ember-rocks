define([
	'backbone',
	'app/modules/home/views/HomeView'
], function ( Backbone, HomeView ) {
	'use strict';

	var Container = new Backbone.ChildViewContainer();

	var homeView = new HomeView();

	Container.add(homeView, 'HomeView');

	return Container;
});
