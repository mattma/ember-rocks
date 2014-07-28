import Ember from 'ember';

var UsersRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user');
  }
});

export default UsersRoute;
