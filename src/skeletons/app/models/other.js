import DS from 'ember-data';

var attr = DS.attr,
  belongsTo = DS.belongsTo;

var Others = DS.Model.extend({
  idField: attr(),
  other: attr('string'),
  users: belongsTo('user')
});

export default Others;
