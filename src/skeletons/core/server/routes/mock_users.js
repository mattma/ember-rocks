// Fake user database
var fs = require('fs'),
  path = require('path');

exports.one = function(req, res){
  var query = req.params.query,
   user_id = req.params.other_id,
   ext = path.extname(query),
   filepath = ( ext === '.json' ) ? path.resolve(__dirname, '../mocks/' + query)
           : path.resolve( __dirname, '../mocks/' + query + '.json' );

  fs.readFile(filepath, function(err, data){
    var dataset = JSON.parse(data);
    var user = dataset.users[ user_id - 1 ];
    var other = dataset.others[ Number(user.others) - 1 ];

    var output = {
      users: user,
      others: other
    };

    console.log('output: ', output);

    return res.json( output );
  });
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
