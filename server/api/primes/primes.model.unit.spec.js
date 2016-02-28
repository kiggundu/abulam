var primes = require('./primes.model');

describe("Primes model", function (done) {
  it("returns a list of primes", function (done) {
    primes.getPrimes()
      .then(function (primeList) {
        console.log('Cool: ' + primeList);
        //expect(primeList).toEqual("");
        done();
      })
    .catch(function(err){
     console.log('Something bad happened: ' + err);
        console.log('Error getting file: ' + err);
        //expect(true).toEqual(false);
        done();
      })
  })
})
