define( function( require ) {
  //PhET Model extends Backbone model by adding the following features:
  //Sync method, which adds a listener and calls it back immediately.  Useful for syncing a view with the model when wired up
  //Property interface, which provides a property interface {get/set/addListener} abstraction for reuse
  //ES5 getters and setters for all properties that exist on initialization, including defaults and initialize arguments.
  //TODO: Store initial state as immutable JSON string for reset and add reset method
  //TODO: Eliminate the need for subclasses to call initializeFinished
  //TODO: Provide an alternative 'sync' method (or modify 'sync') that provides new value as 1st parameter
  var PhetModel = Backbone.Model.extend(
      {
        //Add a listener and automatically call it back
        sync: function( key, listener, thisRef ) {
          this.on( 'change:' + key, listener, thisRef );
          if ( typeof thisRef === "undefined" ) {listener( this, this[key] );}
          else {listener.call( thisRef, this, this[key] );} //Follow backbone pattern of passing the this instead of calling bind  
        },

        //Get a property for one of the backbone model attributes
        property: function( key ) {
          var model = this;
          return {
            get: function() { return model[key]; },
            set: function( newValue ) { model[key] = newValue; },
            addListener: function( listener ) { model.sync( key, listener ); }
          };
        },
        initializeFinished: function() {
          var model = this;

          function createProperty( name ) {
            Object.defineProperty( Object.getPrototypeOf( model ), name, {
              // Getter proxies to Model#get()...
              get: function() { return this.get( name ); },
              // Setter proxies to Model#set(attributes)
              set: function( value ) {
                var data = {};
                data[name] = value;
                this.set( data );
              },
              // Make it configurable and enumerable so it's easy to override...
              configurable: true,
              enumerable: true
            } );
          }

          for ( var attribute in this.attributes ) {
            createProperty( attribute );
          }
        }
      } );
  return PhetModel;
} );