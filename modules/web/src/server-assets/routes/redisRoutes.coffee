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
      redisCtrl.getCache()
        .then (allCache)->
          console.log "allCache", allCache
          res
            .status 200
            .send allCache
        .catch (err)->
          console.log "ERROR", err, "RES", res
