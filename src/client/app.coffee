angular = require 'angular'
require 'bootstrap'

angular.module 'sandbox-docker'
  .config ($urlRouterProvider, $httpProvider, $stateProvider)->
    $urlRouterProvider.otherwise 'home'
