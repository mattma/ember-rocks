define(['chai'], function(Chai) {

	var expect = Chai.expect,
		should = Chai.should();

	describe('something', function() {
		it('should pass', function(done) {
			var foo = 'matt ma';
			foo.should.be.a('String');
			foo.should.not.be.an('Array');
			done();
		});
	});
});
