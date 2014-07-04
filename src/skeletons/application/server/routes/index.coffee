# Glue Service to connect Services and Routes.

HomeService = require('../libs/homeService')

module.exports = (app, db) ->

	homeService = new HomeService app

	home = require('./homeRoute')(app, db, homeService)
