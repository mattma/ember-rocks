/* jshint expr:true */
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'adapter:__DASHERIZE_NAMESPACE__',
  '__NAMESPACE__',
  {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      var adapter = this.subject();
      adapter.should.be.ok;
    });
  }
);
