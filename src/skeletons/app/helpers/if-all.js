'use strict';

import ifConditionHelper from './if-condition';

function identity(value) {
  return value;
}

/**
 * Logical AND Conditional Block
 *
 * Usage: {{#if-all field1 field2}}Both field1 and field2 are truthy{{/if-all}}
 *
 * Executes the given block if all arguments are truthy
 */
export default function() {
  var options = arguments[arguments.length - 1];

  options.conditional = function(results) {
    return results.every(identity);
  };

  return ifConditionHelper.apply(this, arguments);
}
