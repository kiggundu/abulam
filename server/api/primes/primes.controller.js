'use strict';

import primes from './primes.model';
import log4js from 'log4js';
import path from 'path';
var scriptName = path.basename(__filename);
var log = log4js.getLogger(scriptName);
log.setLevel("INFO");

//import {EventEmitter} from 'events';
var EventEmitter2 = require('eventemitter2').EventEmitter2;
//var PrimeEvents = new EventEmitter();
var PrimeEvents = new EventEmitter2();
var events = {
  next: 'prime:next',
  error: 'prime:error',
  complete: 'prime:complete',
  begin: 'prime:begin'
};

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function emitEvent(event) {
  log.debug('will emit: ' + event );
  return function(payload) {
    log.debug('emitting: ' + payload );
    PrimeEvents.emit(event, payload);
  }
}


// Gets a list of primes
export function index(req, res) {
  var primesObservable = require('./primes.model').fromJsonFile(path.resolve(__dirname, 'data/1000.primes.json'));
  //respondWithResult(res, 200)(thePrimesArr);
  respondWithResult(res, 200)({});
  log.info('Subscribing to receive primes');
  primesObservable.subscribe(
    (next) => {
      log.debug('Sending: ' + next + ' as: ' + events.next);
      emitEvent(events.next)( next);
    },
    (err) => {
      emitEvent(events.error)( err);
      log.error('error occured: ' + err);
    },
    () => {
      log.info('finished sending primes');
      emitEvent(events.complete)();
    }
  )
  log.info('controller out');
  PrimeEvents.on('**', function(){log.info('Got an event m8!!!!!')})
}

export function getEventSource() {
  log.info('getting events...')
  return PrimeEvents;
}


