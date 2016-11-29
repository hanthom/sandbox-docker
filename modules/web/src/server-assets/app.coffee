express = require 'express'
bodyParser = require 'body-parser'

app = express()

app.use bodyParser.json()

# Add Routes and middleware here
require("#{__dirname}/routes/redisRoutes") app

module.exports = app
