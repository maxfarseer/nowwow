var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NowWowConstants = require('../constants/NowWowConstants');
var _ = require('underscore');

// Define initial data points
var _things = {};

// Add thing to stats
function add(type, update) {
  update.quantity = type in _things ? _things[type].quantity + 1 : 1;
  _things[type] = _.extend({}, _things[type], update)
}

// Remove item from cart
function removeItem(type) {
  delete _things[type];
}

var StatsStore = _.extend({}, EventEmitter.prototype, {

  getStatsItems: function() {
    return _things;
  },

  // Return counts of people, who doing something now
  getStatsTotal: function() {
    /* TODO
    var total = 0;
    for(product in _things){
      if(_things.hasOwnProperty(product)){
        total += _things[product].price * _things[product].quantity;
      }
    }
    return total.toFixed(2);*/
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

    // Respond to CART_ADD action
    case NowWowConstants.STATS_ADD:
      add(action.type, action.update);
      break;

    // Respond to STATS_REMOVE action
    case NowWowConstants.STATS_REMOVE:
      removeItem(action.type);
      break;

    default:
      return true;
  }

  StatsStore.emitChange();

  return true;

});

module.exports = StatsStore;
