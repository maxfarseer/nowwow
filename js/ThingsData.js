module.exports = {
  // Load Mock Stats Data Into localStorage
  init: function() {
    localStorage.clear();
    localStorage.setItem('nw_stats', JSON.stringify([
      {
        name: 'coffee',
        duration: '60'
      },
      {
        name: 'tea',
        duration: '30'
      },
    ]));
  }

};
