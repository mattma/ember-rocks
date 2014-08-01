var express = require('express'),
  router = express.Router();

// http://expressjs.com/4x/api.html#router

// always invoked
router.get('*', function(req, res) {
  return res.render('base');
});

module.exports = router;
