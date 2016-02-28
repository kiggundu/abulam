'use strict';

(function() {

  class UlamController {

    constructor() {
    }

    draw(){
      var s = Snap("#svgempty");
      s.rect(500, 500, 200, 200);
    }
  }

  angular.module('abulamApp')
    .controller('UlamController', UlamController);

})();
