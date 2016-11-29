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
  getCache: ()->
    stream = redis.scanStream()
    keys = []
    stream.on('data', (results)->
      for key in results
        temp = redis.get(key)
        newObj = {}
        newObj[key] = temp
        keys.push newObj
    )
    return keys
