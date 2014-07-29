var express = require('express'),
	router = express.Router();

// http://expressjs.com/4x/api.html#router

// this route uses the ":user" named parameter
// which will cause the 'user' param callback to be triggered
// GET /users/assets/styles/reset.css 304 12ms
router.get('/users/:user', function(req, res, next) {
  console.log('@TODO: need to handle the params here');
  next();
});

// always invoked
router.get('*', function(req, res) {
	return res.render('base');
});

module.exports = router;
