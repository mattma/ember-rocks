define([
	'jquery',
	'marionette',
	'app/commons/core/application',
	'hbs!app/modules/home/templates/LoginTemplate'
], function ( $, Marionette, App, template ) {
	'use strict';

	var LoginItemView = Marionette.ItemView.extend({

		template: template,

		events: {
			'click #loginSubmit': 'submitLoginForm'
		},

		ui: {
			username: '#username',
			password: '#password',
			message: '#loginMessage'
		},

		submitLoginForm: function(e){
			e.preventDefault();

			var self = this,
				loginData = {
					username: this.ui.username.val(),
					password: this.ui.password.val()
				};

			$.ajax({
				url: '/login',
				type: 'POST',
				dataType: 'json',
				data: loginData,
				statusCode: {
					401: function(data){
						var info = JSON.parse(data.responseText);
						self.loginFailed(info.message);
					}
				},
				success: function(data){
					var status = data.status,
						message = data.message;

					if(status === 'success') {
						App.loggedIn = true;
						self.loginSuccess(message);
					}else{
						self.loginFailed(message);
					}
				}
			});
		},

		loginFailed: function(message) {
			this.ui.message.text(message);
		},

		loginSuccess: function(message) {
			this.ui.message.text(message);
		}
	});

	return LoginItemView;
});

