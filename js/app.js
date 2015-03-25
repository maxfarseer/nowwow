var React = require('react');
var ThingsData = require('./ThingsData');
var CartAPI = require('./utils/CartAPI');
//var SocketAPI = require('./utils/SocketAPI');
var NowWowApp = require('./components/NowWowApp.react');

// Load Mock Product Data into localStorage
ThingsData.init();

// Load Mock API Call
CartAPI.getProductData();

// Render NowWowApp Controller View
React.render(
  <NowWowApp />,
  document.getElementById('now-wow')
);
