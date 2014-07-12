import ifConditionHelper from './if-condition';

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

function identity(value) {
  return value;
}
