import Ember from 'ember';
import startApp from 'rocksTest/start-app';

describe('Integration -', function () {
  let App;

  beforeEach(() => {
    App = startApp();
  });

  afterEach(() => {
    Ember.run(App, App.destroy);
  });

  describe('Home - \'/\' -', function () {
    it('should have a page title', function () {
      visit('/');

      andThen(() => {
        find('h2').text().should.equal(' Home Page ');
        find('h1 a').text().should.equal(' Ember Rocks ');
      });
    });
  });

  describe('Users - \'/users\' -', function () {
    it('should have a page title', function () {
      visit('/users');

      andThen(() => {
        find('.users h2').text().should.equal(' Users Page ');
      });
    });
  });
});
