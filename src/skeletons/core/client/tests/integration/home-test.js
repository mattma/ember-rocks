describe('Homepage', function() {
  it('should have a page title', function(){
    visit('/');
    find('h2').text().should.equal(' Home Page ');
    find('h1 a').text().should.equal(' Ember Rocks ');
    //visit('/users');
    //find('h2').text().should.equal(' Users Page ');
  });
});
