// this need to rewrite to to be tested

var request = require('request'),
    util = require('util');
   // _ = require('underscore');

module.exports = Service;

function Service(app, timeout) {
    this.app = app;
    this.timeout = timeout ? timeout : 20000;
}

Service.prototype.download = function(resource, session, params, response) {
    var requestinfo =  {
            username: session.username,
            session: session.id,
            account: session.account ? session.account : '',
            request_timestamp: new Date().toJSON(),
            method: 'GET',
            url: resource,
            query_string: (params ? params : ''),
            body: ''
    };
    var that = this;
    response.on('finish', function() {
        that.app.logger.server({
            request: requestinfo,
            response: {
                response_status: response.statusCode,
                response_timestamp: new Date().toJSON()
            }
        });
    });
    request({
        method:'GET',
        url:resource,
        qs:params,
        timeout:20000,
        headers:{cookie:session.cookieString},
        jar:session.jar
    }).pipe(response);
};

Service.prototype.get = function (resource, session, params, callback, userSetTimeout ) {
    // userSetTimeout set in acgService. Added to control the timeout for api that take too long
    this.request('get', callback, session, {
        url:resource,
        qs:params,
        json:'',
        timeout: userSetTimeout ? userSetTimeout : this.timeout
    });
};

Service.prototype.post = function (resource, session, params, callback, userSetTimeout) {

    this.request('post', callback, session, {
        url:resource,
        qs:params.queryString,
        json:params.body,
        timeout: userSetTimeout ? userSetTimeout : 180000
    });
};

Service.prototype.put = function (resource, session, params, callback, userSetTimeout) {
    this.request('put', callback, session, {
        url:resource,
        qs:params.queryString,
        json:params.body,
        timeout: userSetTimeout ? userSetTimeout : 180000
    });
};

Service.prototype.delete = function (resource, session, params, callback) {
    this.request('del', callback, session, {
        url:resource,
        json:{}
    });
};

Service.prototype.request = function (verb, callback, session, options) {
    options['agent'] = false;
    options['timeout'] = options.timeout ? options.timeout : this.timeout;
    options['headers'] = {'cookie':session.cookieString};
    options['jar'] = session.jar;

    var requestinfo = {
        username: session.username,
        session: session.id,
        account: session.account ? session.account : '',
        request_timestamp: new Date().toJSON(),
        method: verb,
        url: options.url,
        query_string: (options.qs ? options.qs : ''),
        body: (options.json ? options.json : '')};
    var that = this;
    request[verb].call(this, options, function (error, response, body) {
        if (error || response.statusCode > 204) {
            that.app.logger.server({
                request: requestinfo,
                response: {
                    response_status: response ? response.statusCode : null,
                    error: error || body,
                    response_timestamp: new Date().toJSON()
                }
            });
            that.app.logger.error({
                request: requestinfo,
                response: {
                    response_status: response ? response.statusCode : null,
                    error: error || body,
                    response_timestamp: new Date().toJSON()
                }
            });
            callback(error || body);
        } else {
            that.app.logger.server({
                request: requestinfo,
                response: {
                    response_status: response.statusCode,
                    body: process.env.LOG_RESP_BODY ? body : "set env variable LOG_RESP_BODY to true to see body content",
                    response_timestamp: new Date().toJSON()
                }
            });
            callback(null, body);
        }
    });
};

Service.prototype.finish = function (response, error, result) {
    response.set('Content-Type', 'application/json');
    if (error) {
        response.send(500, error);
    } else if (result) {
        response.send(result);
    } else {
        response.end();
    }
};
