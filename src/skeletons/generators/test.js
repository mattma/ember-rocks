/*jshint -W030 */
import Ember from 'ember';
import startApp from 'rocksTest/start-app';

describe('__CLASSIFY_NAMESPACE__ - "/__DASHERIZE_NAMESPACE__" -', () => {
  var App;

  beforeEach(() => {
    App = startApp();
  });

  afterEach(() => {
    Ember.run(App, App.destroy);
  });

  it('can visit /__DASHERIZE_NAMESPACE__', () => {
    visit('/__DASHERIZE_NAMESPACE__');

    andThen(() => {
      console.log('"/__DASHERIZE_NAMESPACE__" currentPath is : ', currentPath());
      // Replace this with your real tests.
      currentPath().should.be.ok;
    });
  });
});
