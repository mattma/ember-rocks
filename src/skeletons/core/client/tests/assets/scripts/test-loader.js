// Loading test files. Match the file name of `.spec`

/* globals requirejs, require */
(function () {
  define('ember-rocks/test-loader',
    [],
    function () {
      'use strict';

      var TestLoader = function () {
      };

      TestLoader.prototype = {
        shouldLoadModule: function (moduleName) {
          return (moduleName.match(/[-_]test$/));
        },

        loadModules: function () {
          var moduleName;

          for (moduleName in requirejs.entries) {
            if (this.shouldLoadModule(moduleName)) {
              require(moduleName);
            }
          }
        }
      };

      TestLoader.load = function () {
        new TestLoader().loadModules();
      };

      return {
        'default': TestLoader
      };
    }
  );
})();
