// Fake user database
var fs = require('fs'),
  path = require('path');

exports.one = function(req, res){
  // var query = req.params.query,
  //  other_id = req.params.other_id,
  //  ext = path.extname(query),
  //  filepath = ( ext === '.json' ) ? path.resolve(__dirname, '../mocks/' + query)
  //          : path.resolve( __dirname, '../mocks/' + query + '.json' );

  var obj = {
    people: {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      occupation: 'account',
      others: [ '3' ]
    }
  };

  res.json(obj);
};

exports.all = function(req, res) {
  var query = req.params.query,
        ext = path.extname(query),
        filepath = ( ext === '.json' )
                          ? path.resolve(__dirname, '../mocks/' + query)
                          : path.resolve( __dirname, '../mocks/' + query + '.json' );

  fs.readFile(filepath, function(err, data){
    return res.json( JSON.parse(data) );
  });
};
