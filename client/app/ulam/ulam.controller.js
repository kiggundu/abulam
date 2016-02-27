'use strict';

(function() {

  class UlamController {

    constructor() {
    }

    draw(){
      var s = Snap("#svgempty");
      s.circle(150, 150, 100);
    }
  }

  angular.module('abulamApp')
    .controller('UlamController', UlamController);

})();
