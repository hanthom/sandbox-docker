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
  server: 'build/server-assets/server.js'
  coffee:
    compile: 'src/**/*.coffee'
    all: ['src/**/*.coffee']

gulp.task 'default', (cb) ->
  runSequence 'build'
  , 'nodemon'
  , cb

gulp.task 'build', (cb) ->
  runSequence ['pug', 'coffee'], cb

gulp.task 'coffee', ->
  coffee paths.coffee.compile, 'build'

gulp.task 'pug', ->
  pug paths.pug.compile, 'build'

gulp.task 'nodemon', ->
  nodemon paths.server

gulp.task 'watch', ->
  watch paths.coffee.all, ->
    runSequence 'coffee'
  watch paths.pug.all, ->
    runSequence 'pug'
