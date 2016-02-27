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
  });
