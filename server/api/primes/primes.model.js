const fs = require('fs');
const readFile = require('fs-readfile-promise');
const path = require('path');

var model = function() {

  return {
    getPrimes: function(){
      console.log('dirname: ' + path.resolve(__dirname, 'data/1000.txt'));
      return readFile(path.resolve(__dirname, 'data/1000.txt'));
    }
  }
}

export default model()
