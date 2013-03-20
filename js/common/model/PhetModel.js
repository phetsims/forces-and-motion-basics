define( function( require ) {
  "use strict";
  //PhET Model extends Backbone model by adding the following features:
  //Sync method, which adds a listener and calls it back immediately.  Useful for syncing a view with the model when wired up
  //Property interface, which provides a property interface {get/set/sync} abstraction for reuse
  //ES5 getters and setters for all properties that exist on initialization, including defaults and initialize arguments.
  //TODO: Store initial state JSON as JSON.stringify string for immutability
  //TODO: Add automated tests
  //TODO (Maybe): Provide an alternative 'sync' method (or modify 'sync') that provides new value as 1st parameter.  Note: adapting to different function signature could make it difficult to remove listeners.
  var PhetModel = Backbone.Model.extend(
      {
        //Add a listener and automatically call it back.  Unlike BackboneModel.on('change:x change:y') style, this only works for a single value
        sync: function( key, listener, thisRef ) {
          this.on( 'change:' + key, listener, thisRef );
          if ( typeof thisRef === "undefined" ) {listener( this, this[key] );}
          else {listener.call( thisRef, this, this[key] );} //Follow backbone pattern of passing the this instead of calling bind  
        },

        //Get a property interface for one of the backbone model attributes, which provides get/set/sync methods
        property: function( key ) {
          var model = this;
          return {
            get: function() { return model[key]; },
            set: function( newValue ) { model[key] = newValue; },
            sync: function( listener ) { model.sync( key, listener );}
          };
        },

        //PhetModel subclasses should declare init() instead of initialize so that initializeFinished can be called afterwards.
        initialize: function() {

          //Generate es5 getters and setters before init called so that subclasses can use es5 in their init methods.
          this.generateGettersAndSetters();
          if ( typeof this.init !== "undefined" ) {
            this.init.apply( this, Array.prototype.slice.call( arguments, 0 ) );
          }

          //Store initial state after constructor finished.
          this.initialState = this.toJSON();//TODO: Stringify so it cannot be modified?
        },

        //When initialize is finished, call this method which will do the following:
        // 1. create ES5 getters and setters for each property
        // 2. store the initial state for reset
        generateGettersAndSetters: function() {
          var model = this;

          //Taken from https://gist.github.com/dandean/1292057, same as in github/Atlas
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
        },

        //Reset the model by setting the stored initial attributes
        //TODO: automatically detect attached child models that are PhetModel type and call reset on them too.
        //TODO: if new values have been added, they may need to be cleared out
        reset: function() {
          this.set( this.initialState );
        }
      } );
  return PhetModel;
} );