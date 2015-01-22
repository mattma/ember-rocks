import {
  describeModule,
  it
  } from 'ember-mocha';

describeModule(
  'route:__DASHERIZE_NAMESPACE__',
  '__NAMESPACE__',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function () {
    it('exists', function () {
      var route = this.subject();
      route.should.be.ok;
    });
  }
);
