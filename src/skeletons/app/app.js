import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

/**
 * Flag to enable/disable model factory injections (disabled by default)
 * If model factory injections are enabled, models should not be
 * accessed globally (only through `container.lookupFactory('model:modelName'))`);
 * @type {Boolean}
 */
Ember.MODEL_FACTORY_INJECTIONS = true;

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

export default App;
