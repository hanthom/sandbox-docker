redisCtrl = require "#{__dirname}/../controllers/redisCtrl"

module.exports = (app)->

  app.route '/api/redis'
    .post (req, res)->
      postCache req.body
        .then (postedCache)->
          res
            .status 201
            .send postedCache
        .catch (err)->
          console.log "ERROR", err, "RES", res
    .get (req, res)->
      if req.query.id
        getCache req.query.id
          .then (queriedCache)->
            res
              .status 200
              .send queriedCache
          .catch (err)->
            console.log "ERROR", err, "RES", res
      else
        getCache "all"
          .then (allCache)->
            res
              .status 200
              .send allCache
          .catch (err)->
            console.log "ERROR", err, "RES", res
    
