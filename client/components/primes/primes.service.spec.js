describe('PrimesService', function(){

  var primesService;

  beforeEach(function(){
    module("abulum.primes");

    inject(function (PrimesService, $q) {
      primesService = PrimesService;
    });
  })

  it('gets a list of primes', function(done){
    primesService.getPrimes().then(function(primes){
      expect(primes).toEqual("");
      done();
    })
    .catch(function(err){
        console.log('Error getting primes: ' + err);
      });
  }, 10000)
})
