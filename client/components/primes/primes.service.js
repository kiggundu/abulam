(function(module){

  function PrimesService($http, $q){
    return {
      getPrimes: function(){
        var deferred = $q.defer();
        console.log('Getting the primes');

        $http.get('file://data/1000.txt')
          .success(function(data) {
            console.log('Greaaaat!');
            deferred.resolve(data);
          })
          .error(function() {
            console.log('Ohhhh no!!!!');
            deferred.reject();
          });

        return deferred.promise;

      }
    }
  }

  module.factory('PrimesService', PrimesService)

})(angular.module('abulum.primes', []))
