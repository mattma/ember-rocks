import Ember from 'ember';

/**
 * Handle URL between hash and history API automatically
 * ensure we don't share routes between all Router instances
 * @attr location: {string} // 'history', 'auto', 'hash'
 */
var Router = Ember.Router.extend({
  location: 'auto'
});

Router.map(function () {
  this.resource('users', function () {
    this.route('user', {path: '/:user_id'});
  });
});

export default Router;
