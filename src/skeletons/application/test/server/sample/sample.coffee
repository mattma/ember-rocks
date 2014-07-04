require('chai').should()

describe 'Simple Mocha Test', ->

	#module = require '../lib/truth'
	describe 'name', ->
		it 'should be matt ma', ->
			name = 'matt ma'
			name.should.be.a 'string'
			name.should.be.equal 'matt ma'
