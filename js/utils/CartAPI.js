var NowWowActions = require('../actions/NowWowActions');

module.exports = {

  // Load mock nw_stats data from localStorage into StatsStore via Action
  getProductData: function() {
    var data = JSON.parse(localStorage.getItem('nw_stats'));
    NowWowActions.receiveStats(data);
  }

};
