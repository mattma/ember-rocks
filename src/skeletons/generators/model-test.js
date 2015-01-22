import {
  describeModel,
  it
  } from 'ember-mocha';

describeModel(
  '__DASHERIZE_NAMESPACE__',
  '__NAMESPACE__',
  {
    // Specify the other units that are required for this test.
    needs: []
  },
  function () {
    // Replace this with your real tests.
    it('exists', function () {
      var model = this.subject();
      // var store = this.store();
      model.should.be.ok;
    });
  }
);
