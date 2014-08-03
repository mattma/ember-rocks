import DS from 'ember-data';
import ApplicationAdapter from 'rocks/adapters/application';

var Store = DS.Store.extend({
    adapter: ApplicationAdapter
});

export default Store;
