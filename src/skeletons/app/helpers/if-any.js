'use strict';

import ifConditionHelper from './if-condition';

function identity(value) {
  return value;
}

/**
 * Logical OR Conditional Block
 *
 * Usage: {{#if-any field1 field2}}Either field1 or field2 is truthy{{/if-any}}
 *
 * Executes the given block if any argument is truthy
 */
export default function() {
  var options = arguments[arguments.length - 1];

  options.conditional = function(results) {
    return results.any(identity);
  };

  return ifConditionHelper.apply(this, arguments);
}
