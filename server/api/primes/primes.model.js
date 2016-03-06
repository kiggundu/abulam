const fs = require('fs');
const readFile = require('fs-readfile-promise');
const path = require('path');
var Rx = require('rx');
var makeSource = require("stream-json");
var log4js = require('log4js');
var scriptName = path.basename(__filename);
var logger = log4js.getLogger(scriptName);
logger.setLevel("INFO");


var model = function () {


  return {

    fromJsonFile: function (filePath) {
      const primesJson = require(filePath);
      //var primesBufferSize = 10;
      var primesStream = Rx.Observable
        .from(primesJson)
        //.bufferWithCount(primesBufferSize);
      return primesStream;
    },

    fromJsonFileStream: function (filePath) {

      var primesObservable = Rx.Observable.create(function(observer){
        var fs = require("fs");
        var source = makeSource();
        var objectCounter = 0;
        var currentNumber = "";

        source.on("startNumber", function () {
          logger.debug("Found number...");
          ++objectCounter;
        });

        source.on("numberChunk", function (chunk) {
          currentNumber = currentNumber+chunk;;
        });

        source.on("endNumber", function () {
          logger.debug("number is: ", currentNumber);
          observer.onNext(parseInt(currentNumber));
          currentNumber = "";
        });

        source.on("end", function () {
          logger.info("Found ", objectCounter, " numbers.");
          observer.onCompleted()
        });

        fs.createReadStream(filePath).pipe(source.input);

      });

      return primesObservable;
    },

    fromJson: function (primesJson) {
      return getPrimesObservable(primesJson);
    }
  }
};


export default model();
