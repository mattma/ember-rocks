import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
//import registerComponents from 'rocks/_common/utils/register_components';

var App = Ember.Application.extend({
    LOG_ACTIVE_GENERATION: true,
    LOG_VIEW_LOOKUPS: true,
    // LOG_MODULE_RESOLVER: true,
    // LOG_TRANSITIONS: true,
    // LOG_TRANSITIONS_INTERNAL: true,
    modulePrefix: 'rocks',
    Resolver: Resolver
});

loadInitializers(App, 'rocks');

// App.initializer({
//  name: 'Register Components',
//  initialize: function(container) {
//    registerComponents(container);
//  }
// });

export default App;
