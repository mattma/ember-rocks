Password = require('../commons/password')

module.exports = (app, db, homeService) ->

	app.get '/', (req, res) ->
		res.render 'index', { module: 'home', data: { age: 32.66} } # index: views/index.hbs

	app.post '/login', (req, res, next) ->
		tempUsername = req.body.username
		tempPassword = req.body.password

		unless(tempUsername and tempPassword)
			# Error: when user did not fill the username or password
			res.json 401, { 'status': 'failed', 'message': 'Username and Password are required' }
		else
			db.collection('users').findOne {username: tempUsername}, (err, doc) ->
				throw err if err
				if( doc )
					# send to password.js to get the password-hash, then run resolvePassword below
					Password.verifyPassword( tempUsername, tempPassword, doc.password, res, resolvePassword )
				else
					# Error: when user did not fill the correct username, db cannot find the username field
					res.json 401, { 'status': 'failed', 'message': 'Username and Password are incorrect' }

	resolvePassword = ( tempPass, password, res ) ->
		if password is tempPass
			# Success: when user fill the correct username and password
			res.json 200, { 'status': 'success', 'message': 'You have successfully logged in' }
		else
			# Error: when user did not fill the correct password
			res.json 401, { 'status': 'failed', 'message': 'Authentication required, Authentication failed!' }

