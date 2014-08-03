import DS from 'ember-data';

// http://emberjs.com/guides/models/defining-models/
var attr = DS.attr,
  hasMany = DS.hasMany;

var UserModel = DS.Model.extend({
  idField: attr(),
  firstName: attr('string'),
  lastName: attr('string'),
  occupation: attr('string'),
  // lookup for models/other.js
  others: hasMany('other'),
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')
});

export default UserModel;
