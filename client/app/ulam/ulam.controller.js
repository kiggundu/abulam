'use strict';

(function () {

  class UlamController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.primes = [];
      this.squareWidth = 5;
      this.paper = Snap("#svgempty");
      this.dx = 0;
      this.dy = 0;

      this.generateLindenmayerWord = function (noOfSquares) {
        var lmayerWord = 'mw+mw+';
        var temp = lmayerWord;
        var transforms = {"mw\\+": "mwmw+"}
        do {
          for (var name in transforms) {
            var re = new RegExp(name, 'g')
            temp = temp.replace(re , transforms[name]);
          }
          lmayerWord = lmayerWord+temp;

        } while ((lmayerWord.split("w").length - 1) < noOfSquares)

        return 'w'+lmayerWord;
      }

      this.drawLmayerRects = function(paper, lmayerWord, primes, originX, originY, squareWidth){
        var directions = [[0,-1], [-1,0], [0,1], [1,0]];
        var currentDirection = 0;
        var counter = 0;
        var rects = [];


        for(var charachter of lmayerWord){
          if(charachter==='+'){ //a 90 degree rotation clockwise
            if(currentDirection === 3){
              currentDirection = 0;
            }
            else{
              currentDirection++;
            }
          }
          else{
            if(charachter === 'm'){
              originX = originX + squareWidth*directions[currentDirection][0];
              originY = originY + squareWidth*directions[currentDirection][1];
            }
            else{
              if(charachter === 'w'){
                var rect = paper.rect(originX, originY, squareWidth, squareWidth);
                rects.push(rect);
                if(!primes.includes(counter)){
                  rect.attr({
                    opacity: 0.0
                  });
                }
                counter++;
              }
            }
          }
        };

        return rects;
      }


      $http.get('/api/primes').then(response => {
        console.log("Response: " + response);
        socket.socket.on("prime:next", function(msg){
          console.log('prime received: ' + msg);
        });
      })
        .catch(function (err) {
          console.log('Failed to get primes: ' + err);
        });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('primes');
      });
    }

    draw() {
      //paper = Snap("#svgempty");
      this.paper = Snap("#svgempty");
      var lmayerWord = this.generateLindenmayerWord(this.primes[this.primes.length-1]);
      var rects = this.drawLmayerRects(this.paper, lmayerWord, this.primes, 500, 500, 5);
      var theGroup = this.paper.group();
      rects.forEach(function(r){
        theGroup.append(r);
      })
      //theGroup.attr({
      //  opacity: 0.0
      //});
      var newGroup = theGroup.clone();
      newGroup.transform( 'r3, 500,500')
      //this.paper.append(newGroup);
      //newGroup.animate({ 'transform' : 'r45,225,225' },4000)

    }


  }

  angular.module('abulamApp')
    .controller('UlamController', UlamController);

})();
