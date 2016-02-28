var primes = require('./primes.model');

describe("Primes model", function () {
  it("returns an array of primes", function () {
    var primeNumbers = primes.getPrimes();
    expect(primeNumbers).to.be.instanceof(Array);
    assert.instanceOf(primeNumbers, Array);
    assert.include(primeNumbers, 29);

  })
})
