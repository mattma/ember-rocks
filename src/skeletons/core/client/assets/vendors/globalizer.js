/* global define */
(function () {
  // add supports for ember-resolver
  // Lightweight module loader for app and template codes
  var oldDefine = define;
  var seen = requirejs._eak_seen = {};

  define = function (name, deps, callback) {
    seen[name] = true;
    return oldDefine(name, deps, callback);
  };

  define.amd = oldDefine.amd;

  /* global define, Ember, DS */
  define('ember', [], function () {
    'use strict';

    return {
      'default': Ember
    };
  });

  define('ember-data', [], function () {
    'use strict';

    return {
      'default': DS
    };
  });

  define('handlebars', [], function () {
    'use strict';

    return {
      'default': Handlebars
    };
  });
})();
