gulp = require 'gulp'
runSequence = require 'run-sequence'
tasks = require "#{__dirname}/tasks"
{coffee, pug, nodemon, watch} = tasks

######
# Place to store paths that will be used again
paths =
  pug:
    compile: 'src/**/*.pug'
    all: ['src/**/*.pug']
  server: 'modules/web/build/server-assets/server.js'
  coffee:
    compile: 'src/**/*.coffee'
    all: ['src/**/*.coffee']

gulp.task 'default', (cb) ->
  runSequence 'build'
  , 'nodemon'
  , cb

gulp.task 'build', [
  'web:build'
]

gulp.task 'web:build', (cb) ->
  runSequence ['web:pug', 'web:coffee'], cb

gulp.task 'web:coffee', ->
  coffee 'web', paths.coffee.compile, 'build'

gulp.task 'web:pug', ->
  pug 'web', paths.pug.compile, 'build'

gulp.task 'nodemon', (cb)->
  nodemon paths.server, cb

# gulp.task 'watch', ->
#   watch paths.coffee.all, ->
#     runSequence 'coffee'
#   watch paths.pug.all, ->
#     runSequence 'pug'
