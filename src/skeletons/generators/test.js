/*jshint -W030 */
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

  describe('__NAMESPACE__ - \'/__DASHERIZE_NAMESPACE__\' -', () => {

    it('can visit /__DASHERIZE_NAMESPACE__',  () => {
      visit('/__DASHERIZE_NAMESPACE__');

      andThen( () => {
        console.log('/__DASHERIZE_NAMESPACE__ currentPath is : ', currentPath());
        // Replace this with your real tests.
        currentPath().should.be.ok;
      });
    });

  });

});
