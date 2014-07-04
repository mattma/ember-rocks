var Mongodb = require('mongodb'),
	MongoClient = Mongodb.MongoClient,
	// mongodb driver module
	Server = Mongodb.Server;
	//fixtures = require('mongodb-fixtures');
	//path = require('path');

// Configurations
var host = 'localhost',
	port = 27017,
	databaseName = 'boilerplate';
	// type = 'mongo';

// if ( type === 'mock') {
// 	var Db = require('mongodb').Db,
// 		Connection = require('mongodb').Connection;

// 	var db = new Db(databaseName, new Server(host, port, { 'native_parser': true } ));
// } else {


// Not connection, only setup the connection information. it is synchrous
var mongoclient = new MongoClient(
		new Server(host, port, { 'native_parser': true } ) // native bson parser
	),
	db = mongoclient.db(databaseName);


module.exports = {
	'connect': function( callback ) {

		// if ( type === 'mock') {
		// 	var currentPath = path.resolve(__dirname, 'mockDB');
		// 	fixtures.load(currentPath);
		// 	callback();
		//
		mongoclient.open(function(err, mongoclient){
			if(err) throw err;
			console.log('Successfully connect to MongoDB');
			callback(db);
		});
	}
};




