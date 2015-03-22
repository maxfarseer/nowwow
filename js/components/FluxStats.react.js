var React = require('react');
var NowWowActions = require('../actions/NowWowActions');

// Flux cart view
var FluxStats = React.createClass({

  // Remove item from Cart via Actions
  removeFromStats: function(type){
    NowWowActions.removeFromStats(type);
    // and some others...
    // NowWowActions.updateCartVisible(false);
  },

  // Render cart view
  render: function() {
    var self = this, things = this.props.things;
    return (
      <div className={"flux-cart " + (this.props.visible ? 'active' : '')}>
        <div className="mini-cart">
          <ul>
            {Object.keys(things).map(function(product){
              return (
                <li key={product}>
                  <h1 className="name">{things[product].name}</h1>
                  <p className="type">{things[product].type}</p>
                  <button type="button" className="remove-item" onClick={self.removeFromStats.bind(self, product)}>Remove</button>
                </li>
              )
            })}
          </ul>
          <span className="total">Total: /*{this.props.total}*/</span>
        </div>
      </div>
    );
  },

});

module.exports = FluxStats;
