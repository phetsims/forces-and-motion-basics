define( function( require ) {
  "use strict";
  function MotionModel() {
    this.listeners = [];
    this.state = {
      stack: [],
      appliedForce: 0,
      friction: 0,
      velocity: 0,
      position: 0,
      showForce: true,
      showSumOfForces: false,
      showValues: false,
      showSpeed: true,
      showMasses: false,
      showAcceleration: false,
      running: true,
      items: [
        {image: 'fridge.png', weight: 100, x: 100, y: 100, dragging: false},
        {image: 'crate.png', weight: 100, x: 200, y: 100, dragging: false},
        {image: 'crate.png', weight: 100, x: 300, y: 100, dragging: false},
        {image: 'girl.png', weight: 100, x: 300, y: 100, dragging: false},
        {image: 'man.png', weight: 100, x: 300, y: 100, dragging: false},
        {image: 'trash.png', weight: 100, x: 300, y: 100, dragging: false},
        {image: 'gift.png', weight: 100, x: 300, y: 100, dragging: false}
      ]
    };

    //TODO: write a function that provides property or other interface to these objects
  }

  MotionModel.prototype = {

    //TODO: These methods held over from backbone prototype, needs to be deleted
    on: function() {},
    trigger: function() {},
    triggerChange: function( propertyName ) {
      for ( var i = 0; i < this.listeners.length; i++ ) {
        var listener = this.listeners[i];
        if ( listener.property === propertyName ) {
          listener.listener( this.state[propertyName] );
        }//TODO: Associative map would be faster
      }
    },
    step: function() {},
    getter: function( propertyName ) {
      var model = this;
      return function() {return model.state[propertyName]};
    },
    setter: function( propertyName ) {
      var model = this;
      return function( value ) {
        model.state[propertyName] = value;
        model.triggerChange( propertyName );//TODO: make sure value actually different
      };
    },
    addListener: function( propertyName ) {
      var model = this;
      return function( listener ) {
        model.listeners.push( {property: propertyName, listener: listener} );
        listener( model.state[propertyName] );
      };
    },
    property: function( propertyName ) {
      return {
        get: this.getter( propertyName ),
        set: this.setter( propertyName ),
        addListener: this.addListener( propertyName )
      };
    }
  };
  return MotionModel;
} );