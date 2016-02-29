'use strict';

(function () {

  function PrimesService($resource) {
    return $resource('/api/primes/:quantity',
      {
        quantity: '@_quantity'
      },
      {
        get: {
          method: 'GET',
          params: {
            quantity: '@_quantity'
          }
        }
      });
  }

  angular.module('abulamApp.primes', [])
    .factory('PrimesService', PrimesService);

})();
