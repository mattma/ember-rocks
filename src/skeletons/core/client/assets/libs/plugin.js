(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory( require('underscore'), require('jquery'), require('backbone') );
	} else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['underscore', "jquery", "backbone"], factory);
	}
} (this, function (_, jQuery, Backbone) {

	Backbone.PluginName = (function(Backbone, $, _){
		'use strict';

		// Default options
		// ---------------
		var defaultOptions = {
			key: "value"
		};

		var PluginName = { };

		// Plugin Static Property
		// ---------------
		PluginName.ignoredTypes = ["string", 32, "whatever"];

		// Everything chain to PluginName will be public
		PluginName.method = function(view, options){
			var data = {};

			helperFunction(); // call optional private method

			return data; // Return Value is optional
		};


		// Helper / Private functions
		// ----------------
		var helperFunction = function(view, config){
			var elements;

			console.log("rocks me");

			return elements;
		};

		// Helper, chain object method
		// ---------
		var objMethod = PluginName.objMethod = {
			valid: function(view, attr, selector) {
				console.log("matt ma")
			}
		};

		// Return PluginName Object
		return PluginName;

	}) (Backbone, jQuery, _ );


	// Function Prototype functions
	// -------------
	Backbone.PluginName.OtherMethod = function( key ){
		this.staticValue = {};
	};

	// Borrow Backbone's `extend` keyword
	// So it could work as a constructor
	Backbone.PluginName.OtherMethod.extend = Backbone.Model.extend;
	// get() method will be included when object is being created
	_.extend( Backbone.PluginName.OtherMethod.prototype, {

		get: function(type){

		}
	});

	return Backbone.PluginName;
}));
