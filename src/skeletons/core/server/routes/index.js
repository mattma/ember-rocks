var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	path = require('path');

/* GET search query API. */
router.get('/api/:query', function(req, res) {
	var query = req.params.query,
		ext = path.extname(query),
		filepath = ( ext === '.json' ) ? path.resolve(__dirname, '../data/' + query)
						: path.resolve( __dirname, '../data/' + query + '.json' );

	fs.readFile(filepath, function(err, data){
		return res.json( JSON.parse(data) );
	});
});

router.get('/api/:query/:other_id', function(req, res) {
	var query = req.params.query,
		other_id = req.params.other_id,
		ext = path.extname(query),
		filepath = ( ext === '.json' ) ? path.resolve(__dirname, '../data/' + query)
						: path.resolve( __dirname, '../data/' + query + '.json' );

	// fs.readFile(filepath, function(err, data){
	// 	var dataset = JSON.parse(data);
	// 	console.log('dataset: ', dataset);
	// 	if ( typeof other_id !== undefined && other_id ) {
	// 		dataset[query].forEach(function(val, ind) {
	// 			if( +val.id === +other_id ) {
	// 				return res.json( val );
	// 			}
	// 		});
	// 	}
	// });
	var a = {
		people: {
			id: 2,
			 firstName: 'kelly',
			  lastName: 'gao',
			  occupation: 'account',
			  others: [ '3' ]
		}
	};

	res.json(a);
});

/* GET home page. */
router.get('/', function(req, res) {
	return res.render('base');
});

module.exports = router;
