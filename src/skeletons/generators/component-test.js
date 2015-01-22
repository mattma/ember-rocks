import {
  describeComponent,
  it
  } from 'ember-mocha';

describeComponent(
  '__DASHERIZE_NAMESPACE__',
  '__NAMESPACE__',
  {
    // specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar']
  },
  function () {
    it('renders', function () {
      // creates the component instance
      var component = this.subject();
      component._state.should.equal('preRender');

      // renders the component on the page
      this.render();
      component._state.should.equal('inDOM');
    });
  }
);
