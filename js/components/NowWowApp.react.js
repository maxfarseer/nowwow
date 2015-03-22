var React = require('react');
var StatsStore = require('../stores/StatsStore');
var ThingStore = require('../stores/ThingStore');
var FluxThing = require('./FluxThing.react');
var FluxStats = require('./FluxStats.react'); //cart

// Method to retrieve state from Stores
function getCartState() {
  return {
    thing: ThingStore.getThing(),
    statsItems: StatsStore.getStatsItems()
    //statsTotal: StatsStore.getStatsTotal() TODO
  };
}

// Define main Controller View
var NowWowApp = React.createClass({

  // Get initial state from stores
  getInitialState: function() {
    return getCartState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    ThingStore.addChangeListener(this._onChange);
    StatsStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    ThingStore.removeChangeListener(this._onChange);
    StatsStore.removeChangeListener(this._onChange);
  },

  // Render our child components, passing state via props
  render: function() {
  	return (
      <div className="flux-cart-app">
        <FluxStats things={this.state.statsItems} />
        <FluxThing thing={this.state.thing} /*cartitems={this.state.cartItems}*/ />
      </div>
  	);
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getCartState());
  }

});

module.exports = NowWowApp;
