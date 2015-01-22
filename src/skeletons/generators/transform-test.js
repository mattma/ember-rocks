import {
  describeModule,
  it
  } from 'ember-mocha';

describeModule(
  'transform:__DASHERIZE_NAMESPACE__',
  '__NAMESPACE__',
  {
    // Specify the other units that are required for this test.
    // needs: ['transform:foo']
  },
  function () {
    // Replace this with your real tests.
    it('exists', function () {
      var transform = this.subject();
      transform.should.be.ok;
    });
  }
);
