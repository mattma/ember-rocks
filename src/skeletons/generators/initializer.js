// Setup module Factory logic at 'client/app/utils/__DASHERIZE_NAMESPACE__.js'
import __CLASSIFY_NAMESPACE__ from 'rocks/utils/__DASHERIZE_NAMESPACE__';

// Setup module Template Helpers logic at 'client/app/helpers/__DASHERIZE_NAMESPACE__.js'
// import __CLASSIFY_NAMESPACE__Helper from 'rocks/helpers/__DASHERIZE_NAMESPACE__';

var __NAMESPACE__ = {
  name: '__DASHERIZE_NAMESPACE__',
  // before: 'anyInitializerName',  //optional

  initialize: function(container, application) {

    // container.optionsForType('route', { instantiate: false, singleton: true });

    application.register('__DASHERIZE_NAMESPACE__:main', __CLASSIFY_NAMESPACE__);

    application.inject('route', '__DASHERIZE_NAMESPACE__', '__DASHERIZE_NAMESPACE__:main');

    // Ember.Handlebars.registerHelper('__DASHERIZE_NAMESPACE__', __CLASSIFY_NAMESPACE__Helper);
  }
};

export default __NAMESPACE__;
