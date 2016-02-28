const fs = require('fs');
const readFile = require('fs-readfile-promise');
const path = require('path');
const primesJson = require(path.resolve(__dirname, 'data/1000.primes.json'))

var model = function() {

  return {
    getPrimes: function(){
      return primesJson;
    }
  }
}

export default model()
