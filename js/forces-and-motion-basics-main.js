require( [ "tugofwar/model/TugOfWarModel",
  "motion/model/MotionModel",
  'SCENERY/nodes/Image',
  'PHETCOMMON/util/ImagesLoader',
  'motion/view/MotionTabView',
  'tugofwar/view/TugOfWarTabView',
  'JOIST/Sim',
  'imageLoader',
  'Strings',
  'PHETCOMMON/model/property/Property',
  'PHETCOMMON/model/property/PropertySet'
], function( TugOfWarModel, MotionModel, Image, ImagesLoader, MotionTabView, TugOfWarTabView, Sim, imageLoader, Strings, Property, PropertySet ) {
  "use strict";

  var loader = new ImagesLoader( function( loader ) {

    //Initialize the image loader
    imageLoader.getImage = loader.getImage;

    //Create and start the sim
    new Sim( Strings['forces-and-motion-basics.name'], [

      { name: Strings.tugOfWar,
        icon: new Image( imageLoader.getImage( 'Tug_Icon.png' ) ),
        createModel: function() {return new TugOfWarModel();},
        createView: function( model ) {return new TugOfWarTabView( model );}
      },
      { name: Strings.motion,
        icon: new Image( imageLoader.getImage( 'Motion_icon.png' ) ),
        createModel: function() {return new MotionModel( 'motion', true );},
        createView: function( model ) {return new MotionTabView( model );}},

      { name: Strings.friction,
        icon: new Image( imageLoader.getImage( 'Friction_Icon.png' ) ),
        createModel: function() {return new MotionModel( 'friction', false );},
        createView: function( model ) {return new MotionTabView( model );}},

      { name: Strings.acceleration,
        icon: new Image( imageLoader.getImage( 'Acceleration_Icon.png' ) ),
        createModel: function() {return new MotionModel( 'acceleration', false );},
        createView: function( model ) {return new MotionTabView( model );}}

    ], { showHomeScreen: false, tab: 0, navigationBarInFront: true, accessibility: true} )
      .start();

    var p = new Property( 'hello' );
    p.link( function( string ) {console.log( "the string is : " + string );} );
    p.lazyLink( function( string ) {console.log( "LAZYstring is : " + string );} );
    p.value = 'bye';

    console.log( "######" );
    var person = new PropertySet( {name: 'larry', age: 100} );
    var handle = person.multilink( ['name', 'age'], function( name, age ) {
      console.log( "person is " + name + ", with " + age );
    } );

    person.name = 'Super Larry';
    person.age = '101';
    person.unmultilink( handle );
    person.name = 'Supreme Larrymundo';

    console.log( p.toString() );
    console.log( person.toString() );

    person.addProperty( 'lastName', 'Jenkins' );
    console.log( person.lastName );
    person.lastNameProperty.link( function( lastName ) {console.log( "last name is " + lastName );} );
    person.lastName = 'Jefferson';
    console.log( person.toString() );
    person.removeProperty( 'lastName' );//TODO?
    console.log( person.toString() );
  } );
} );