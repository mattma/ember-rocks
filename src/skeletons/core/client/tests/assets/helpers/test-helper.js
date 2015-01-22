/* globals mocha, $ */
/* jscs: disable requireDotNotation */
import resolver from './resolver';
import { setResolver } from 'ember-mocha';

setResolver(resolver);

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

$(document).ready(function () {
  // load up the application testing code
  // from `tests/integration` and `tests/unit`
  // by matching the `require.registry` definition
  require('ember-rocks/test-loader')['default'].load();

  mocha.run();
});
