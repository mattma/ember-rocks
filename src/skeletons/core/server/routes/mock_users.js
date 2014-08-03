// Fake user database
var fs = require('fs'),
  path = require('path');

exports.all = function(req, res) {
  var query = req.params.query,
        ext = path.extname(query);

  var filepath = ( ext === '.json' ) ? path.resolve(__dirname, '../mocks/' + query)
    : path.resolve( __dirname, '../mocks/' + query + '.json' );

  fs.readFile(filepath, function(err, data){
    return res.json( JSON.parse(data) );
  });
};
