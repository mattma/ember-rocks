/* global require */

// help to set the custom resolver for testing app
import helper from './test-helper';

import Application from "rocks/app";
import Router from "rocks/router";
import Ember from 'ember';

function startApp(attrs) {
  var App;

  var attributes = Ember.merge({
    rootElement: '#ember-testing',
    LOG_ACTIVE_GENERATION:false,
    LOG_VIEW_LOOKUPS: false,
    LOG_MODULE_RESOLVER: false,
    LOG_TRANSITIONS: false,
    LOG_TRANSITIONS_INTERNAL: false
  }, attrs);

  Router.reopen({
    location: 'none'
  });

  Ember.run(function(){
    App = Application.create(attributes);
    //App.setupForTesting();
    App.injectTestHelpers();
  });

  // this shouldn't be needed, i want to be able to "start an app at a specific URL"
  App.reset();

  return App;
}

export default startApp;
