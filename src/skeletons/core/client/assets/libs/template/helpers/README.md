## Some Resources
- https://github.com/elving/swag  (http://elving.github.io/swag/)

# Strings

1. lowercase  
	* # Turns a string to lowercase.*
	ex: {{lowercase "BENDER SHOULD NOT BE ALLOWED ON TV"}}
	output: bender should not be allowed on tv

2. uppercase  
	* # Turns a string to uppercase. Opposite of {{lowercase}}*
	ex: {{uppercase "bender should not be allowed on tv"}}
	output: BENDER SHOULD NOT BE ALLOWED ON TV

3. capitalize
	* # Capitalizes the firs word in a string. *
	ex: {{capitalizeFirst "bender should not be allowed on TV"}}
	output: Bender should not be allowed on TV

4. capitalizeEach  
	* # Capitalizes each word in a string.*
	ex: {{capitalizeEach "bender should NOT be allowed on TV"}}
	output: Bender Should NOT Be Allowed On TV

5. titleize  
	* # Turns a string to uppercase. Opposite of {{lowercase}}*
	ex: {{titleize "Bender-should-Not-be-allowed_on_Tv."}}
	output: Bender Should Not Be Allowed On Tv.

6. sentence
	* # Capitalizes the first word of each sentence in a string and converts the rest of the sentence to lowercase. *
	ex: {{sentence "bender should NOT be allowed on TV. fry SHOULD be allowed on TV."}}
	output: Bender should not be allowed on tv. Fry should be allowed on tv.

7. reverse  
	* # Reverses a string. *
	ex: {{reverse "bender should NOT be allowed on TV."}}
	output: .VT no dewolla eb TON dluohs redneb

8. truncate  
	* # Truncates a string given a specified length, providing a custom string to denote an omission. *
	ex: {{truncate "Bender should not be allowed on tv." 6 "..."}}
	output: Bender...

9. center
	* # Centers a string using non-breaking spaces. *
	ex: {{center "Bender should not be allowed on tv." 10}}
	output:                   Bender should not be allowed on tv.

10. toBreakFromNewLine  
	* # Converts new line characters \n to line breaks <br>. *
	ex: {{{toBreakFromNewLine "Bender \n should \n not \n be allowed on tv."}}}
	output: Bender <br> should <br> not <br> be allowed on tv.

11. titleize  
	* # Turns a string to uppercase. Opposite of {{lowercase}}*
	ex: {{titleize "Bender-should-Not-be-allowed_on_Tv."}}
	output: Bender Should Not Be Allowed On Tv.

12. sentence
	* # Capitalizes the first word of each sentence in a string and converts the rest of the sentence to lowercase. *
	ex: {{sentence "bender should NOT be allowed on TV. fry SHOULD be allowed on TV."}}
	output: Bender should not be allowed on tv. Fry should be allowed on tv.

13. toCamel

14. toPascal

15. inflect
	Returns the plural or singular form of a word based on a count.
	Args: (count, singular, plural, include)
	ex: {{inflect friends "friend" "friends" true}}
	output: 1 friend || 2 friends

---

# Array or Collections

1. arrayFirstItem

2. eachArray
	Like default Handlebars loop helper {{#each}} adding index (0-based index) to the loop context.
	ex: {{#eachArray names}}
			{{this.number}}: {{this.value}} index{{this.index}}
		{{/eachArray}}
	output: 1: matt index0    2: kelly index1    3: aaron index2

3. eachStripe

4. first
	Returns the first item in a collection.
	ex: collection = ['Amy Wong', 'Bender', 'Dr. Zoidberg', 'Fry'] {{first collection 2}} 
	ouptut: Amy Wong, Bender
	
5. last
	Returns the last item in a collection. Opposite of first.
	ex: collection = ['Amy Wong', 'Bender', 'Dr. Zoidberg', 'Fry'] {{last collection 2}} 
	ouptut: Dr. Zoidberg, Fry
	
6. withFirst
	Use the first item in a collection inside a block. Using the context for object in the array
	ex: {{#withFirst people 2}} <p>{{this.firstName}} {{this.lastName}} is smart.</p> {{/withFirst}}
	output: Yehuda Katzis smart. Carl Lercheis smart.
	
6. withLast
	Use the last item in a collection inside a block. Opposite of withFirst. Using the context for object in the array
	ex: {{#withFirst people 2}} <p>{{this.firstName}} {{this.lastName}} is smart.</p> {{/withFirst}}
	output: Carl Lercheis smart. Alan Johnsonis smart.

7. initial ( Works same like underscore.js )
	Returns everything but the last entry of the array. Pass n to exclude the last n elements from the result. 
	ex: {{initial [5, 4, 3, 2, 1]}}
	output: 5, 4, 3, 2

8. rest ( Works same like underscore.js )
	Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward. 
	ex: {{rest [5, 4, 3, 2, 1]}}
	output: 4, 3, 2, 1

9. withInitial
	Returns everything but the last entry of the array. Pass n to exclude the last n elements from the result. 
	Use all of the items in the collection before the specified count inside a block. Opposite of withRest.
	ex: 	{{#withInitial people 2}} {{reverse this.firstName}} {{/withInitial}}
	output: aduheY lraC  # start from the beginning, cut from the end

9. withRest
	Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.
	Use all of the items in the collection before the specified count inside a block. Opposite of withRest.
	ex: 	{{#withRest people 2}} {{reverse this.firstName}} {{/withRest}}
	output: lraC nalA   # cut from beginning to the end

10.  join
	Joins all elements of a collection into a string using a separator if specified.
	ex: {{join names}} or {{join names ', '}} 
	output: matt & kelly & sam  # join the string with optional separator, default to empty space

11. sort
	TODO

12. withSort
	TODO

13. length
	Returns the length of the collection.
	ex: {{length people}}
	output: 3


---

# Objects

1. count

2. eachObject

3. toJson

4. toMoney



---


# Numbers && Math

1. sum

2. toNumberFormat
	Returns exactly digits after the decimal place. Default 2 digit. The number is rounded if necessary, and the fractional part is padded with zeros if necessary so that it has the specified length.
	ex: {{toNumberFormat age 3}}

3. add
	Returns the sum of two numbers.
	ex: {{add age 68}}

4. subtract
	Returns the difference of two numbers. Opposite of add
	ex: {{subtract age 5}}

5. multiply
	Returns the multiplication of two numbers.
	ex: {{multiply age 2}}

6. divide
	Returns the division of two numbers.
	ex: {{divide age 2}}

7. floor
	Returns the value rounded down to the nearest integer.
	ex: {{floor floatNumber}}

8. ceil
	Returns the value rounded up to the nearest integer.
	ex: {{ceil floatNumber}}

8. round
	Returns the value rounded to the nearest integer.
	ex: {{round floatNumber}}

9. toPrecision
	Returns the number in fixed-point or exponential notation rounded to precision significant digits. 
	If omitted precisionDigit, it returns the entire number
	ex: {{toPrecision age}} or {{toPrecision age 2}}

10. toExponential
	Returns the number in exponential notation with one digit before the decimal point, rounded to fractions digits after the decimal point. default fraction digit is 0;
	ex: value = 5
		{{toExponential value 5}}
	output: 5.00000e+0

11. toInt
	Returns an integer.
	ex: value = '22.2abc'
		{{toInt value}}
	output: 22

12. toFloat
	Returns a floating point number.
	ex: value = '22.2abc'
		{{toFloat value}}
	output: 22.2

13. toPrettyNumber
	Adds commas to a number.
	ex: value = 2222222
		{{toPrettyNumber value}}
	output: 2,222,222

14. ordinalize
	Turns a number into an ordinal string
	ex: {{ordinalize 3}}
	output: 3rd

---


# Conditionals or Comparisons

1. ifEqual
	* # Conditionally render a block if the two value are equal *
	ex: {{#ifEqual number 5}} Statement is true {{else}} Statement is false {{/ifEqual}}

2. ifNotEqual
	* # Conditionally render a block if the condition is false. Opposite of ifEqual. *
	ex: {{#ifNotEqual number 5}} Statement is false {{else}} Statement is true {{/ifNotEqual}}

3. ifGreaterThan
	* # Conditionally render a block if the value is greater than a given number. *
	ex: {{#ifGreaterThan number 5}} Statement is true {{else}} Statement is false {{/ifGreaterThan}}

4. ifGreaterEqual
	* # Conditionally render a block if the value is greater or equal than a given number. *
	ex: {{#ifGreaterEqual number 5}} Statement is true {{else}} Statement is false {{/ifGreaterEqual}}

5. ifLessEqual
	* # Conditionally render a block if the value is less than a given number. Opposite of ifGreaterThan. *
	ex: {{#ifLessThan number 5}} Statement is true {{else}} Statement is false {{/ifLessThan}}

6. ifLessEqual
	* # Conditionally render a block if the value is less or equal than a given number. Opposite of ifGreaterEqual. *
	ex: {{#ifLessEqual number 5}} Statement is true {{else}} Statement is false {{/ifLessEqual}}

7. ifAnd
	* # Conditionally render a block if both values are truthy. *
	ex: {{#ifAnd A B}} A & B both true {{else}} Statement is false {{/ifAnd}}

8. ifOr
	* # Conditionally render a block if one of the values is truthy. *
	ex: {{#ifOr A B}} A || B is true {{else}} Statement is false {{/ifOr}}

9. ifContainMoreThan

10. ifEmpty
	Conditionally render a block if the collection is empty.
	ex: {{#ifEmpty}} {{else}} {{/ifEmpty}}

11. ifNotEmpty
	Conditionally render a block if the collection isn't empty. Opposite of ifEmpty
	ex: {{#ifNotEmpty}} {{else}} {{/ifNotEmpty}}

12. ifNotNull

13. ifLengthEqual
	Conditionally render a block based on the length of a collection ( Array or Object ).
	length [int] - The value to test against. (Required)
	ex: {{#ifLengthEqual objNums 3}} it is 3 {{else}} it is not 3 {{/ifLengthEqual}}
	output: it is 3

14. ifInArray
	Conditionally render a block if a specified value is in the collection.
 	ex: {{#ifInArray}} {{else}} {{/ifInArray}}



---

# Dates

1. ifToday

2. toDate

3. toDateRange

---

# Inflections

---

# HTML

1.  br
	Returns <br> tags based on a count.
	ex: {{br 5}}
	output: <br><br><br><br><br>

---


# Logging

1. log
	* # Simple console.log() *
	ex: {{log "Hi console :)"}}

2. debug
	* # Simple console.debug() that shows the current context. *
	ex:  {{#withFirst collection}}  {{debug name}}  {{/withFirst}}  or  {{debug name}}

---


# Miscellaneous

1. default 
	* # Provides a default or fallback value if a value doesn't exist. *
	ex: {{default title "Not title available."}}
	
---
