
'use strict';

import primes from './primes.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of primes
export function index(req, res) {
  primes.getPrimes()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

