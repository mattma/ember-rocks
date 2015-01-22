import {
  describeModule,
  it
  } from 'ember-mocha';

describeModule(
  'view:__DASHERIZE_NAMESPACE__',
  '__NAMESPACE__',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function () {
    // Replace this with your real tests.
    it('exists', function () {
      var view = this.subject();
      view.should.be.ok;
    });
  }
);
