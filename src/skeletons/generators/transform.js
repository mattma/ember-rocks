import DS from 'ember-data';

var __NAMESPACE__ = DS.Transform.extend({
  deserialize: function (serialized) {
    return serialized;
  },

  serialize: function (deserialized) {
    return deserialized;
  }
});

export default __NAMESPACE__;
