redisCtrl = require "#{__dirname}/../controllers/redisCtrl"
# {postCache, getCache} = redisCtrl

module.exports = (app)->

  app.route '/api/redis'
    .post (req, res)->
      console.log req.body
      redisCtrl.postCache req.body
      res
        .status 201
        .end()
    .get (req, res)->
      console.log "getHashCache START"
      redisCtrl.getHashCache()
        .then (allCache)->
          console.log "allCache", allCache
          res
            .status 200
            .send allCache
        .catch (err)->
          console.log "ERROR", err, "RES", res
    .delete (req, res)->
      console.log "DELETE ROUTE FIRED"
      redisCtrl.deleteHash()
      res
        .status 204
        .end()
