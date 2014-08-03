module.exports = function(options) {
  var PUBLIC_PATH, VIEWS_PATH, app, express, fs, emberApp,
    sysPath, env, logger, favicon, cookieParser, bodyParser;

  express = require('express');
  sysPath = require('path');
  fs = require('fs');
  logger = require('morgan');
  favicon = require('static-favicon');
  cookieParser = require('cookie-parser');
  bodyParser = require('body-parser');

  app = module.exports = express();
  emberApp = 'client';
  PUBLIC_PATH = sysPath.join(__dirname, '..', emberApp);
  VIEWS_PATH = sysPath.join(__dirname, '..', 'server/views');

  env = process.env.NODE_ENV || 'development';

  var rootRoute = require('./routes/index');

  app.set('view engine', 'jade');
  app.set('views', VIEWS_PATH);
  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  //app.use(express.methodOverride());
  app.use(express.static(PUBLIC_PATH));

  // Send cross-origin resource sharing enabling header.
  // app.use(function(req, response, next) {
  //   req.header('Cache-Control', 'no-cache');
  //   req.header('Access-Control-Allow-Origin', '*');
  //   next();
  // });

  // Need to be deleted in development
  // GET mocks data from /server/mocks/people.json
  var fakeUsersRoute = require('./routes/mock_users');
  app.get('/api/:query', fakeUsersRoute.all);

  // Route General
  app.use('/', rootRoute);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    if (process.argv[3]) {
      options = {
        host: process.argv[2],
        port: process.argv[3]
      };
    } else {
      options = {
        host: 'localhost',
        port: 3001
      };
    }
      app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: err
          });
      });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: {}
      });
  });

  return app.listen(options.port, function() {
    return console.log (
      'Starting web server on port ' + options.port + ' in ' + app.locals.settings.env + ' mode'
    );
  }).on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
      return console.log('Port ' + options.port + '  is already in use by another process.');
    }
  });
};
