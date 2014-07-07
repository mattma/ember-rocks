# roundNumber
# handlebar helpers example
#
module.exports = (hbs) ->

	hbs.registerHelper 'roundNumber', (context, options) ->
		Math.round context
