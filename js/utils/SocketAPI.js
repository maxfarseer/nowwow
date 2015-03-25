var EventEmitter = require('events').EventEmitter;
var NowWowConstants = require('../constants/NowWowConstants');
var NowWowActions = require('../actions/NowWowActions');
var SocketIO = require('socket.io-client');
var _ = require('underscore');

var CONNECTED_EVENT    = 'connected';
var DISCONNECTED_EVENT = 'disconnected';
var ADD_TO_STATS_EVENT = 'addToStats';
var ADDEDD_TO_STATS_EVENT = 'addedToStats';
var REMOVE_FROM_STATS_EVENT = 'removeFromStats';
var REMOVED_FROM_STATS_EVENT = 'removedFromStats';

var _socket = SocketIO.connect('http://localhost:5000');

var StatsControl = _.extend(EventEmitter.prototype, {

  emitConnected: function() {
    this.emit(CONNECTED_EVENT);
  },

  emitDisconnected: function() {
    this.emit(DISCONNECTED_EVENT);
  },

  addConnectedListener: function(callback) {
    this.on(CONNECTED_EVENT, callback);
  },

  addDisconnectedListener: function(callback) {
    this.on(DISCONNECTED_EVENT, callback);
  },

  removeConnectedListener: function(callback) {
    this.removeListener(CONNECTED_EVENT, callback);
  },

  removeDisonnectedListener: function(callback) {
    this.removeListener(DISCONNECTED_EVENT, callback);
  },

  addToStats: function(thing, update) {
    _socket.emit(ADD_TO_STATS_EVENT, thing, update);
  },

  removeFromStats: function(thing) {
    _socket.emit(REMOVE_FROM_STATS_EVENT, thing);
  }

});

_socket.on('connect', function(data) {
  StatsControl.emitConnected();


  _socket.on(ADDEDD_TO_STATS_EVENT, function (thing, update) {
    NowWowActions.addToStats(thing, update);
  });

  _socket.on(REMOVED_FROM_STATS_EVENT, function (thing) {
    NowWowActions.removeFromStats(thing);
  });

  _socket.on('disconnect', function() {
    StatsControl.emitDisconnected();
  });
});

module.exports = StatsControl;
