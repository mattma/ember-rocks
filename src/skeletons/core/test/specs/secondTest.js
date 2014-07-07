define([
	'chai',
	'home'
], function(Chai, HomeModel) {

	var homeModel = new HomeModel({ age: 32 });

	var expect = Chai.expect,
		should = Chai.should();


	describe('home module', function() {
		describe('age', function() {
			it('should be 32', function(done) {
				expect(homeModel.get('age')).equal(32);
				done();
			});
		});
		describe('key', function() {
			it('should be value', function(done) {
				homeModel.get('key').should.be.equal('value');
				done();
			});
		});
	});
});
