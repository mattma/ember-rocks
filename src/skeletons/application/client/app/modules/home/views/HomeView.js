define([
	'jquery',
	'backbone',
	'marionette',
	'hbs!app/modules/home/templates/HomeTemplate'
], function ( $, Backbone, Marionette, template ) {
	'use strict';

	var HomeLayout = Backbone.Marionette.Layout.extend({

		//el: $('body'),

		template: template,

		regions: {
			mainRegion: '#main-content'
		}

	});

	return HomeLayout;
});

