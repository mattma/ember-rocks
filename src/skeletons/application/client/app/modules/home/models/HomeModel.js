define([
	'backbone'
], function ( Backbone ) {
	'use strict';

	var HomeModel = Backbone.Model.extend({

		defaults: {
			'key': 'value'
		}

	});

	return HomeModel;
});
