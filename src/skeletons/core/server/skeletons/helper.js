var *NAMESPACE* = Ember.Handlebars.makeBoundHelper(function(input) {
  return new Ember.Handlebars.SafeString(window.showdown.makeHtml(input));
});

export default *NAMESPACE*;
