define([
	'backbone',
	'app/modules/home/models/HomeModel'
], function ( Backbone, HomeModel ) {
	'use strict';

	var HomeCollection = Backbone.Collection.extend({
		model: HomeModel
	});

	return HomeCollection;
});
