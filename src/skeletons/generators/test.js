import Ember from 'ember';
import startApp from 'rocksTest/start-app';

describe('Integration Test', function () {

  let App;

  beforeEach(() => {
    App = startApp();
  });

  afterEach(() => {
    Ember.run(App, App.destroy);
  });

  describe('Acceptance: <%= classifiedModuleName %>', () => {

    it('can visit /<%= dasherizedModuleName %>',  () => {
      visit('/<%= dasherizedModuleName %>');

      andThen( () => {
        currentPath().should.equal('<%= dasherizedModuleName %>');
      });
    });

  });

});
