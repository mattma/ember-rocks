var attr = DS.attr;

var Others = DS.Model.extend({
	number: attr(),
	other: attr('string')
});

Others.idField = 'number';

export default Others;
