import ifConditionHelper from './if-condition';

/**
 * Equality Comparison Conditional Block
 *
 * Usage: {{#if-equal field1 field2 "foo"}}field1 and field2 are equal to 'foo'{{/if-equal}}
 *
 * Executes the given block if all arguments are equal
 */
export default function() {
  var options = arguments[arguments.length - 1];

  // Find all unique values in the array; if one is left, they were all equal
  options.conditional = function(results) {
    return results.uniq().length === 1;
  };

  return ifConditionHelper.apply(this, arguments);
}
