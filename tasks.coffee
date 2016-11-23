gulp = require 'gulp'
sourcemaps = require "gulp-sourcemaps"

##### _addBase #####
# Adds the cwd to the path provided.
# Handles for the paths that ignore files
# @returns: string
_addBase = (path) ->
  base = "#{__dirname}/../#{path}"
  if path[0] is '!'
    path = path.slice 1, path.length - 1
    "!#{base}"
  else
    base

##### _fixPath #####
# Dynamically calls _addBase fn with a src and dest
# @params: src -> string or array
# @returns: object
_fixPath = (src, dest)->
  fixedPaths = {}
  if Array.isArray src
    # Handling for array type src
    fixedSrc = []
    fixedSrc.push _addBase path for path in src
  else
    fixedSrc = _addBase src
  if dest
    fixedDest = _addBase dest
  fixedPaths =
    src: fixedSrc
    dest: fixedDest
  fixedPaths

module.exports =
  ##### coffee #####
  # Compiles coffeescript files to js
  coffee: (src, dest)->
    coffee = require 'gulp-coffee'
    sourcemaps = require 'gulp-sourcemaps'
    {src, dest} = _fixPath src, dest
    stream = gulp.src src
    stream
      .pipe sourcemaps.init()
      .pipe coffee()
      .pipe sourcemaps.write()
      .on 'error', (e)->
        console.log "COFFEE ERROR >>>> #{e.message}"
        this.emit 'end'
      .pipe gulp.dest dest

  ##### nodemon #####
  # Runs nodemon with the given script
  nodemon: (script)->
    # script = _addBase script
    nodemon = require 'gulp-nodemon'
    nodemon
      script: script
      delay: 1000
      exec: 'node --debug'

  ##### pug #####
  # Compiles pug into HTML
  pug: (src, dest) ->
    pug = require 'gulp-pug'
    {src, dest} = _fixPath src, dest
    stream = gulp.src src
    stream
      .pipe pug()
    stream
      .pipe gulp.dest dest

  ##### move #####
  # Moves src files to dest path
  move: (src, dest)->
    {src, dest} = _fixPath src, dest
    gulp.src src
      .pipe gulp.dest dest

  ##### watch #####
  # Watches the specified files for changes and runs the
  # @params: cb -> function
  watch: (path, cb)->
    {src} = _fixPath path
    gulp.watch src, cb

  # serverRunner: (script)->
  #   script = _addBase script
  #   {
  #     ##### close #####
  #     # Closes the serverInst
  #     # @params: server -> http.Server object
  #     # @params: cb -> function
  #     close: (cb)=>
  #       # cb = cb || () -> console.log 'Server closing!'
  #       @server.close ()=>
  #         # delete require.cache[require.resolve("#{script}")]
  #         @server = undefined
  #         cb()
  #     ##### listen #####
  #     # Spins up a server with the given port, calls the cb when listening
  #     # @params: custPort -> number
  #     # @params: cb -> function
  #     # @returns: http.Server object
  #     listen: (custPort, cb)=>
  #       app = require "#{script}"
  #       {port} = require "#{__dirname}/src/server-assets/config/serverConfig"
  #       @server = app.listen custPort || port, (e) ->
  #         if e
  #           console.log "ERROR LISTENING ON PORT #{port}", e
  #         else
  #           console.log "SERVER SPUN UP ON PORT #{port}"
  #         if cb then cb()
  #     server:undefined
  #   }
