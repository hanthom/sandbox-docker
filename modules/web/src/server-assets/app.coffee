express = require 'express'

app = express()

# Add Routes and middleware here
require("#{__dirname}/routes/redisRoutes") app

module.exports = app
