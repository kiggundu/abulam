'use strict';

angular.module('abulamApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
    $stateProvider
      .state('graphics', {
        url: '/graphics',
        templateUrl: 'app/graphics/graphics.html',
        controller: 'GraphicsController',
        controllerAs: 'graphics'
      });
    $stateProvider
      .state('ulam', {
        url: '/ulam',
        templateUrl: 'app/ulam/ulam.html',
        controller: 'UlamController',
        controllerAs: 'ulam'
      });
  });
