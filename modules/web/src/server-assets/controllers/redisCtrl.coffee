q = require 'q'
Redis = require 'ioredis'
redis = new Redis('//redis:6379')


module.exports =
  # postCache
  # Posts the data that is being sent in to the Redis cache server
  postCache: (postObj)->
    console.log "POSTObj", postObj
    # obj =
    #   a_key: 'abc'
    #   b_key: '123'
    for key, val of postObj
      console.log """KEY: #{key}
      VALUE: #{val}
      """
      redis.set(key, val)
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
