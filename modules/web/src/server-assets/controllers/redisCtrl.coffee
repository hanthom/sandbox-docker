q = require 'q'
Redis = require 'ioredis'
redis = new Redis('//redis:6379')


module.exports =
  # postCache
  # Posts the data that is being sent in to the Redis cache server
  postCache: (postObj)->
    console.log "POSTObj", postObj
    {vin, data} = postObj
    redis.sadd 'vins', vin
    redis.hmset vin, data
    # obj =
    #   a_key: 'abc'
    #   b_key: '123'
    # for key, val of data
    #   console.log """KEY: #{key}
    #   VALUE: #{val}
    #   """
  getHashCache: ->
    console.log "getHashCache Controller start"
    dfd = q.defer()
    promises = redis.smembers 'vins'
    q.all promises
    .then (vinsList)->
      promiseObjs = []
      for vin in vinsList
        returnObj = redis.hgetall vin
        promiseObjs.push returnObj
      q.all promiseObjs
      .then (returnedObjs)->
        i = 0
        returnList = []
        for vin in vinsList
          newObj =
            vin: vin
            data: returnedObjs[i]
          returnList.push newObj
          i++
        dfd.resolve returnList
    dfd.promise
  deleteHash: ->
    console.log "DeleteHash CTRL FIRED"
    redis.hdel('myhash2','id', 'make', 'model')
  getCache: ->
    stream = redis.scanStream()
    keys = []
    promises = []
    dfd = q.defer()
    stream.on('data', (results)->
      for key in results
        temp = redis.get(key)
        keys.push key
        promises.push temp
      q.all promises
      .then (updatedKeys)->
        i=0
        combinedKeys = []
        flag = false
        while i < 1
          y = 0
          for key in keys
            combinedKeys[y] =
              "#{key}": updatedKeys[y]
            y++
          i++
        if updatedKeys.length < 1
          dfd.reject()
        else
          console.log "ELSE", combinedKeys
          dfd.resolve combinedKeys
    )
    dfd.promise
