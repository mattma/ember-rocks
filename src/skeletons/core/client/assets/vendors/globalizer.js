(function() {
   /* global define, Ember, DS */
  define('ember', [], function() {
    "use strict";

    return {
      'default': Ember
    };
  });

  define('ember-data', [], function() {
    "use strict";

    return {
      'default': DS
    };
  });
})();
