define(['chai'], function(Chai) {

	var expect = Chai.expect,
		should = Chai.should();

	describe('Sample Match Name', function() {

		// beforeEach( function () {

		// });

		// afterEach( function () {

		// });

		describe('name', function() {
			it('should be a string', function(done) {
				var foo = 'matt ma';
				foo.should.be.a('String');
				foo.should.not.be.an('Array');
				done();
			});
		});
	});
});
