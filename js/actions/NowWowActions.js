var AppDispatcher = require('../dispatcher/AppDispatcher');
var NowWowConstants = require('../constants/NowWowConstants');

// Define action methods
var NowWowActions = {

  receiveStats: function(data) {
    AppDispatcher.handleAction({
      actionType: NowWowConstants.STATS_RECEIVE,
      data: data
    })
  },

  addToStats: function(type, update) {
    AppDispatcher.handleAction({
      actionType: NowWowConstants.STATS_ADD,
      type: type,
      update: update
    })
  },

  removeFromStats: function(type) {
    AppDispatcher.handleAction({
      actionType: NowWowConstants.STATS_REMOVE,
      type: type
    })
  }

};

module.exports = NowWowActions;
