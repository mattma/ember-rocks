// Fake user database
var fs = require('fs');
var path = require('path');

exports.all = function (req, res) {
  var query = req.params.query;
  var ext = path.extname(query);

  var filePath = ( ext === '.json' ) ?
    path.resolve(__dirname, '../mocks/' + query) :
    path.resolve(__dirname, '../mocks/' + query + '.json');

  fs.readFile(filePath, function (err, data) {
    return res.json(JSON.parse(data));
  });
};
