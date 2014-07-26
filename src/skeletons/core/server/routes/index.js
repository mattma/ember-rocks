var express = require('express'),
	router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	return res.render('base');
});

module.exports = router;
