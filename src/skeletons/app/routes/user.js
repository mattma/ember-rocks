import Ember from 'ember';

var UserRoute = Ember.Route.extend({
  model: function(params) {
    var users = this.modelFor('users');
    return users.get('store').find('user', params.user_id);
  }
});

export default UserRoute;
