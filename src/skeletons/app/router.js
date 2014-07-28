import Ember from 'ember';

// ensure we don't share routes between all Router instances
var Router = Ember.Router.extend({
  // Create a clean URL, without the #/
  // 'history', 'auto', 'hash'
  location: 'hash'
});

Router.map(function() {
  this.resource('users');
  this.resource('user', { path: '/users/:user_id' } );
});

export default Router;
