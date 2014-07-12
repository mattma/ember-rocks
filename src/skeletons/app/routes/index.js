var IndexRoute = Ember.Route.extend({
	model: function() {
		// ajax call: /api/people.json
		return this.store.findAll('person');
	}
});

export default IndexRoute;
