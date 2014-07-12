'use strict';

import ifConditionHelper from './if-condition';

function exists(value) {
  return value !== undefined;
}

/**
 * Logical OR Existence Conditional Block
 *
 * Usage: {{#if-any-exists field1 field2}}Either field1 or field2 is truthy{{/if-any-exists}}
 *
 * Executes the given block if any argument is defined
 */
export default function() {
  var options = arguments[arguments.length - 1];

  options.conditional = function(results) {
    return results.any(exists);
  };

  return ifConditionHelper.apply(this, arguments);
}
