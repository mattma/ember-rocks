var attr = DS.attr,
	hasMany = DS.hasMany;

var Person = DS.Model.extend({
	number: attr(),
	firstName: attr('string'),
	lastName: attr('string'),
	occupation: attr('string'),
	others: hasMany('other'),
	fullName: function() {
		return this.get('firstName') + ' ' + this.get('lastName')
	}.property('firstName', 'lastName')
});

Person.idField = 'number';

export default Person;
