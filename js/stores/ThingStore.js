var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NowWowConstants = require('../constants/NowWowConstants');
var _ = require('underscore');

var _thing = {};

function _loadThingsData(data) {
  _thing = data[1];
}

var ThingStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getThing: function() {
    return _thing;
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {

    case NowWowConstants.STATS_RECEIVE:
      _loadThingsData(action.data);
      break;

    //...
    //type other callbacks and call private methods like '_loadThingsData'

    default:
      return true;
  }

  ThingStore.emitChange();

  return true;

});

module.exports = ThingStore;
