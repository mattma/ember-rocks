import Ember from 'ember';

var UsersRoute = Ember.Route.extend({
  setupController: function(controller, model){
    this._super(controller, model);
    this.controllerFor('application').set('isMenuOpen', false);
  },

  actions: {
    toggleMenu: function(){
      var app = this.controllerFor('application'),
        status = app.get('isMenuOpen');
      return app.set('isMenuOpen', !status);
    },
    close: function() {
      var app = this.controllerFor('application'),
        status = app.get('isMenuOpen');
      if ( status === true ) {
        return app.set('isMenuOpen', !status);
      }
      return false;
    }
  }
});

export default UsersRoute;
