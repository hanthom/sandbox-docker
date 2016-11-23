app = require "#{__dirname}/app"

port = 8000

server = app.listen port, (e)->
  if e then console.log 'Server START ERROR =====>', e
  else
    console.log "Server SPUN UP ON PORT #{port}"

# require("#{__dirname}/controllers/socketCtrl").getConn server
module.exports = server
