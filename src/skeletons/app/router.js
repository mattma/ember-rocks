import Ember from 'ember';

// ensure we don't share routes between all Router instances
var Router = Ember.Router.extend({
  // Create a clean URL, without the #/
  // 'history', 'auto'
  location: 'auto'
});

Router.map(function() {
  this.resource('index', { path: '/'});
  this.resource('other', { path: '/other/:other_id'});
});

export default Router;
