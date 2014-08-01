import Ember from 'ember';

// ensure we don't share routes between all Router instances
var Router = Ember.Router.extend({
  // Create a clean URL, without the #/
  // 'history', 'auto', 'hash'
  location: 'auto'
});

Router.map(function() {
  this.resource('users', function() {
    this.route('user', { path: '/:user_id' } );
  });
});

export default Router;
