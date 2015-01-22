import Ember from 'ember';
import { initialize } from 'rocks/initializers/__DASHERIZE_NAMESPACE__';

describe('__NAMESPACE__', function () {
  var container, application;

  beforeEach(function () {
    Ember.run(function () {
      container = new Ember.Container();
      application = Ember.Application.create();
      application.deferReadiness();
    });
  });

  // Replace this with your real tests.
  it('works', function () {
    initialize(container, application);

    // you would normally confirm the results of the initializer here
    true.should.be.ok;
  });
});
