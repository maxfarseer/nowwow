var React = require('react');
//var NowWowActions = require('../actions/NowWowActions');
var SocketAPI = require('../utils/SocketAPI');

// Flux product view
var FluxThing = React.createClass({

  // Add item to cart via Actions
  addToStats: function(event){
    var thing = this.props.thing;
    var update = {
      name: this.props.thing.name,
      start: new Date()
    }
    //NowWowActions.addToStats(thing, update);
    SocketAPI.addToStats(thing,update);
  },

  // Select product variation via Actions
  selectVariant: function(event){
    NowWowActions.selectProduct(event.target.value);
  },

  // Render product View
  render: function() {

    return (
      <div className="flux-product">
        {/*<img src={'img/' + this.props.product.image}/>*/}
        <div className="flux-product-detail">
          {this.props}
          <h1 className="name">{this.props.thing.name}</h1>
          <p> things </p>
          <button type="button" onClick={this.addToStats} >
            Пью NOW
          </button>
          {/*
          <p className="description">{this.props.product.description}</p>

          */}
        </div>
      </div>
    );
  },

});

module.exports = FluxThing;
