'use strict';

angular.module('abulamApp', [
  'abulamApp.auth',
  'abulamApp.primes',
  'abulamApp.admin',
  'abulamApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
