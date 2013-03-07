define( function( require ) {
  "use strict";
  function Model( parent, state ) {
    this.state = state;
    this.parent = parent;
  }

  Model.prototype = {
    listeners: [],
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
    },

    //Returns a model wrapper for one of the child elements
    get: function( propertyName ) {
      return new Model( this, this.state[propertyName] );
    }
  };
  return Model;
} );