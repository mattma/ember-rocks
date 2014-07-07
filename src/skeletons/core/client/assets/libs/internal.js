'use strict';

define(
	'assets/libs/internal',
	['underscore'],
	function ( _ ) {
		var Internal = {};

		Internal.capitalize = function(text){
			return !text ?  '' :
				text.length === 1 ? text.toUpperCase() :
				text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
		};

		/**
		 * Used for changing the internal variable
		 * Capitalizes the first letter of the given text.
		 * @param text    The text to capitalize the first letter with.
		 */
		Internal.capitalizeFirstLetter = function(text) {
			return !text ?  '' :
				text.length === 1 ? text.toUpperCase() :
				text.substring(0, 1).toUpperCase() + text.substring(1);
		};

		/**
		 * Used for changing the internal variable
		 * Uncapitalizes the first letter of the given text.
		 * @param text    The text to uncapitalize the first letter with.
		 */
		Internal.uncapitalizeFirstLetter = function(text) {
			return !text ?  '' :
				text.length === 1 ? text.toLowerCase() :
				text.substring(0, 1).toLowerCase() + text.substring(1);
		};

		/**
		 * Converts the X cased object to a Y cased object using the caseFunction.
		 * @param obj   The object to convert
		 * @param caseFunction    The caseFunction to used for converting.
		 * @returns The converted object.
		 */
		Internal._toCasing = function (obj, caseFunction) {
			var self = this;

			if (_.isArray(obj)) {
				return _.map(obj, function (value) {
					return self._toCasing(value, caseFunction);
				});
			}
			else if (_.isObject(obj)) {
				var newObject = {};
				for (var key in obj) {
					if ( obj.hasOwnProperty(key) ) {
						newObject[key === 'ID' ? 'id' : key === 'id' ? 'ID' : caseFunction(key)] = self._toCasing(obj[key], caseFunction);
					}
				}
				return newObject;
			}
			else if ( _.isString(obj) ) {
				obj = caseFunction(obj);
			}
			return obj;
		};

		/**
		 * Converts the pascal cased object to a camel cased object.
		 * @param obj     The object to convert
		 * @returns The converted object.  Convert "HelloWorld" to "helloWorld"
		 */
		Internal.toCamel = function(obj)  {
			return this._toCasing(obj, this.uncapitalizeFirstLetter);
		};

		/**
		 * Converts the camel cased object to a pascal cased object.
		 * @param obj   The object to convert
		 * @returns The converted object.  Convert "helloWorld" to "HelloWorld"
		 */
		Internal.toPascal = function(obj)  {
			return this._toCasing(obj, this.capitalizeFirstLetter);
		};

		/**
		 * Formats a number into a comma separated value with two decimal places prepending/appending
		 * a prefix and/or suffix if there is one.
		 * @param context   The text to format
		 * @param prefix  The prefix to prepend
		 * @param suffix  The suffix to append
		 * @param decimalPlaces   The number of decimal places to round to.
		 * @return The formated number
		 */
		Internal.formatNumber = function(context, prefix, suffix, decimalPlaces) {
			// default value is 2 decimal
			decimalPlaces = decimalPlaces === 0 ? 0 : (decimalPlaces || 2);

			var number = context,
				roundTo = Math.pow(10, decimalPlaces);

			if (typeof number !== 'number') {
				number = parseFloat(context);
				if (isNaN(number)) {
					number = 0.0;
				}
			}

			number = Math.round( Number(number * roundTo) );

			var decimal = (Math.abs(number) % roundTo) + '',
				ones = String(Math.floor(Math.abs(number / roundTo))),
				count = 0,
				newNumber = '',
				negative = number < 0 ? '-' : '';

			while (decimal.length < decimalPlaces) {
				decimal = '0' + decimal;
			}
			while (count < ones.length) {
				newNumber = ones.charAt(ones.length - count - 1) + (count !== 0 && count % 3 === 0 ? ',' : '') + newNumber;
				count += 1;
			}
			// Handle Accounting format for negative values
			if(suffix === '()') {
				if(negative) {
					return (prefix || '') + '(' + newNumber + (decimalPlaces > 0 ? '.' + decimal : '') + ')';
				}
				else {
					suffix = '';
				}
			}
			// Standard Formatting
			return negative + (prefix || '') + newNumber + (decimalPlaces > 0 ? '.' + decimal : '') + (suffix || '');
		};

		/**
		 * Have not used or tested before
		 *
		 * Removes all formatting from a number.
		 * @param val  The string to format as a number
		 * @return The formated number
		 */
		Internal.unFormatNumber = function(val, floatPosition) {
			if( !val) { return 0; }

			// Handle Accounting format for negative values
			if(typeof val !== 'number') {
				val = val.replace('(', '-');
				val = val.replace(')', '');
			}

			var newVal = (isNaN(val)) ? val : this.formatNumber(val, '', '', floatPosition),
				number = parseFloat(newVal.replace( /[^\d\.-]/g,''));

			if (isNaN(number)) {
				number = 0.0;
			}

			return number;
		};

		return Internal;
	}
);


