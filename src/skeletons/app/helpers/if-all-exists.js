'use strict';

import ifConditionHelper from './if-condition';

function exists(value) {
  return value !== undefined;
}

/**
 * Logical AND Existence Conditional Block
 *
 * Usage: {{#if-all-exists field1 field2}}Either field1 or field2 is truthy{{/if-all-exists}}
 *
 * Executes the given block if all arguments are defined
 */
export default function() {
  var options = arguments[arguments.length - 1];

  options.conditional = function(results) {
    return results.every(exists);
  };

  return ifConditionHelper.apply(this, arguments);
}
