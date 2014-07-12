// ensure we don't share routes between all Router instances
var Router = Ember.Router.extend();

Router.map(function() {
	this.resource('index', { path: '/'});
	this.resource('other', { path: '/other/:other_id'})
});

// Create a clean URL, without the #/
// Router.reopen({
//   location: 'history'
// });

export default Router;
