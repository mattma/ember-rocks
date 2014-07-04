var Service = require('./service'),
    util = require('util');

module.exports = HomeService;

function HomeService(app) {
    HomeService.super_.call(this, app);
}

util.inherits(HomeService, Service);

HomeService.prototype.someMethod = function (session, callback) {
    var resource = this.someMethod(session.account) + '/someMethod/',
        params = {};
    this.get(resource, session, params, callback);
};
