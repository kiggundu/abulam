const path = require('path');
var log4js = require('log4js');
var scriptName = path.basename(__filename);
var Rx = require('rx');
var logger = log4js.getLogger(scriptName);
logger.setLevel("INFO");

describe("Primes model", function(){


  it("returns an array of primes", function (done) {
    console.time("Primes test");
    //var primesObservable = require('./primes.model').fromJsonFileStream(path.resolve(__dirname, 'data/1000.primes.json'));
    var primesObservable = require('./primes.model').fromJsonFile(path.resolve(__dirname, 'data/1000.primes.json'));
    var primesCounter = 0;

    var observer = Rx.Observer.create(
      function(next){
        logger.debug("Value obtained: " + next);
        primesCounter++;
      },
      function(error){
        logger.error("Error obtained: " + error);
        expect(true).to.equal(false);
      },
      function(){
        expect(primesCounter).to.equal(1000);
        logger.info("Completed");
        console.timeEnd("Primes test");
        done();
      }
    );
    primesObservable.subscribe(observer);

  })
})
