var OtherRoute = Ember.Route.extend({
  model: function(params) {
  	return this.store.find('person', params.other_id );
  }
});

export default OtherRoute;
