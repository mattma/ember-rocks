import Ember from 'ember';
// import {test} from 'ember-mocha';
import startApp from 'rocksTest/start-app';

describe('Integration Test', function () {

  let App;

  before(() => {
    App = startApp();
  });

  after(() => {
    Ember.run(App, App.destroy);
  });

  describe('Homepage', function () {

    it('should have a page title', function () {
      visit('/')
        .then(function () {
          find('h2').text().should.equal(' Home Page ');
          find('h1 a').text().should.equal(' Ember Rocks ');
        });
    });

  });

  describe('User Page', function () {

    it('should have a page title', function () {
      visit('/users')
        .then(() => {
          find('.users h2').text().should.equal(' Users Page ');
        });
    });

  });
});
