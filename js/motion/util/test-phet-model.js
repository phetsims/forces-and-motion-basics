//Demonstration of usage of PhetModel, see documentation for PhetModel
define( function( require ) {
  var PhetModel = require( 'motion/util/PhetModel' );
  return function() {

    //Creates a model 'class' which can be instantiated.
    var TestModel = PhetModel.extend(
        {

          //Values common to all model instances declared here
          defaults: {
            showElectrons: true,
            paused: false,
            position: 0
          },

          //To wire up ES5 getters and setters for all defaults and all values
          //And to store the initial state, call initializeFinished at the end of your initialize block
          //TODO: alleviate the need for calling initializeFinished in subclasses
          initialize: function() {this.initializeFinished();}
        } );

    //Instantiate a model, and specify some values for this instance
    var model = new TestModel( {color: 'red'} );

    //Output the JSON, nice and clean and ready for storage, serialization, etc.
    console.log( model.toJSON() );

    //Wire up to a property for change notifications, and immediately synchronize with the view.
    model.sync( 'color', function( model, newColor ) {
      console.log( "Updating view color to be: " + newColor );
    } );
    //Demonstrate setting the value with ES5 setters.
    model.color = 'green';

    //Wire up to a property only for future changes
    model.on( 'change:position', function( model, newPosition ) {
      console.log( "position changed to: ", newPosition, " (it used to be ", model.previous( 'position' ) + ")" );
    } );
    model.position = 123;

    console.log( "Resetting!" );
    model.reset();
  };
} );