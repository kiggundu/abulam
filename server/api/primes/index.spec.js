'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var primesCtrlStub = {
  index: 'primesCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var primesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './primes.controller': primesCtrlStub
});

describe('Primes API Router:', function() {

  it('should return an express router instance', function() {
    primesIndex.should.equal(routerStub);
  });

  describe('GET /api/primes', function() {

    it('should route to primes.controller.index', function() {
      routerStub.get
        .withArgs('/', 'primesCtrl.index')
        .should.have.been.calledOnce;
    });

  });


});
