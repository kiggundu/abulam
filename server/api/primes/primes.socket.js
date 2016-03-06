/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PrimeEvents = require('./primes.controller').getEventSource();
import path from 'path';
var scriptName = path.basename(__filename);
var log4js = require('log4js');
var log = log4js.getLogger(scriptName);
log.setLevel("DEBUG");

// Model events to emit
var events = ['prime:next', 'prime:complete'];

export function register(socket) {
  log.debug('registering: ' + socket);
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    log.debug('register event: ' + events[i]);
    var event = events[i];
    var listener = createListener(event, socket);

    PrimeEvents.on(event, listener);
    //PrimeEvents.on('prime:next', listener);
    //PrimeEvents.on(listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  log.debug('Creating listener...');
  return function(payload) {
    log.debug('emmiting event:' +event+ ' payload: ' + payload);
    socket.emit(event, payload);
  };
}

function removeListener(event, listener) {
  return function() {
    PrimeEvents.removeListener(event, listener);
  };
}
