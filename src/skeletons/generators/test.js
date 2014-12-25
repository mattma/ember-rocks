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

  describe('Acceptance: __NAMESPACE__', () => {

    it('can visit /__DASHERIZE_NAMESPACE__',  () => {
      visit('/__DASHERIZE_NAMESPACE__');

      andThen( () => {
        currentPath().should.equal('__DASHERIZE_NAMESPACE__');
      });
    });

  });

});
