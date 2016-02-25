'use strict';

angular.module('abulamApp.auth', [
  'abulamApp.constants',
  'abulamApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
