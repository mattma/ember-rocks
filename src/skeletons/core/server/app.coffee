module.exports =  (options) ->
	express = require 'express'
	routes = require './routes'
	template = require './template'  # handlebars helper fn
	sysPath = require 'path'
	hbs = require 'express-hbs'
	dbConnect = require './commons/dbConnect'

	app = module.exports = express()

	clientFolderName = 'client'

	PUBLIC_PATH = sysPath.join __dirname, '..', clientFolderName
	VIEWS_PATH = sysPath.join __dirname, '..', "#{clientFolderName}/views"

	# Basic Authentication
	# auth = express.basicAuth (user, pass, callback)->
	# 	result = (user is 'testUser' and pass is 'testPass')
	# 	callback null, result
	# app.get '/home', auth, (req, res) -> res.send 'Hello World'

	# Configuration
	app.configure 'development', ->
		if options then app.locals gruntEnabled: true
		else
			if process.argv[3]
				options = { host: process.argv[2], port: process.argv[3] }
				app.locals gruntEnabled: process.argv[4]
				# process.argv.forEach (val, index, array) -> app.locals gruntEnabled: true if ( val is 'gruntEnabled' )
			else
				options = { host: 'localhost', port: 3000 }

		app.use express.errorHandler({ dumpExceptions: true, showStack: true })

	app.configure 'production', ->
		app.use express.errorHandler()

	app.configure ->
		app.engine 'hbs', hbs.express3
			partialsDir: VIEWS_PATH + '/partials'
			layoutsDir: VIEWS_PATH + '/layout'

		app.set 'view engine', 'hbs'
		app.set 'views', 		VIEWS_PATH

		app.use express.favicon()
		app.use express.logger('dev')

		# https://github.com/senchalabs/connect/wiki/Connect-3.0
		#app.use express.bodyParser()
		app.use express.urlencoded()
		app.use express.json()

		app.use express.cookieParser()
		app.use express.methodOverride()
		app.use app.router
		app.use express.static( PUBLIC_PATH )


	# Templates: setup all handlebars template helpers function used on server side
	template(hbs)

	dbConnect.connect (db) ->
		# Routes: setup all controllers : handle by routes/index.coffee
		routes(app, db)

		app.listen options.port, ->
			console.log "Starting web server on port #{options.port} in #{app.locals.settings.env} mode"
		.on "error", (err) ->
			console.log "Port #{options.port}  is already in use by another process." if err.code is 'EADDRINUSE'
