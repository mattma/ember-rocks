# Glue Handlebar Template helper function on server side.
# hbs  : is the require 'express-hbs' object for running the handlebars instance
# template/helpers/*.{coffee, js} will auto register itself, no additional work needed

fs = require 'fs'

module.exports = (hbs) ->

	helpersRequire = (name) -> require("./helpers/#{name}") hbs

	fs.readdir "#{__dirname}/helpers/", (err, files) ->
		helpersRequire file.split('.').shift() for file in files
